import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidRoles } from "@teslo/interfaces";
import { Between, DataSource, FindOptionsWhere, QueryRunner, Repository } from "typeorm";
import { JwtPayload } from "../auth/interfaces";
import { Product, ProductImage } from "../products/entities";
import { User } from "../users/entities/user.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { DetailOrder } from "./entities/detail.order.entity";
import { Order } from "./entities/order.entity";
import { FindOrdersByDateDto } from "./dto/find-orders-by-date.dto";
import { DetailTempOrder } from "./entities/detailTemp.order.entity";
import { handleDBErrors } from "src/common/utils";

type Status = "completed" | "cancelled";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(DetailOrder)
    private readonly detailRepository: Repository<DetailOrder>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    @InjectRepository(DetailTempOrder)
    private readonly detailTempOrderRepository: Repository<DetailTempOrder>,

    private readonly dataSource: DataSource
  ) {}

  async create(createOrderDto: CreateOrderDto, userJWT?: JwtPayload, sellerJWT?: JwtPayload) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let order = queryRunner.manager.create(Order, {
        ...createOrderDto,
        user: createOrderDto.customer || userJWT,
        userSell: sellerJWT,
        detail: createOrderDto.detail.map((detail) => {
          return this.detailRepository.create({
            ...detail,
            title: detail.product.title,
          });
        }),
      });

      order = await queryRunner.manager.save(order);
      await this.updateStockProducts(queryRunner, { isCreating: true }, order);
      if (sellerJWT) {
        await queryRunner.manager.delete(DetailTempOrder, {
          userOrder: { iduser: sellerJWT.iduser },
        });
      }
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return order;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      handleDBErrors(error);
    }
  }

  findAll(userJWT: JwtPayload, findOrdersByDateDto: FindOrdersByDateDto) {
    const whereUser = this.getQueryUser(userJWT);
    const whereDateCreated = this.getQueryByDate(findOrdersByDateDto);

    let where: FindOptionsWhere<Order> | FindOptionsWhere<Order>[] = {
      ...whereUser,
      ...whereDateCreated,
    };

    return this.orderRepository.find({
      where,
      order: { idorder: "DESC" },
      relations: { user: true },
    });
  }

  finAllByPaymentMethodId(
    id: number,
    userJWT: JwtPayload,
    findOrdersByDateDto: FindOrdersByDateDto
  ) {
    const whereUser = this.getQueryUser(userJWT);
    const whereDateCreated = this.getQueryByDate(findOrdersByDateDto);

    return this.orderRepository.find({
      where: { ...whereUser, paymentMethod: { idpaymentmethod: id }, ...whereDateCreated },
      order: { idorder: "DESC" },
      relations: { user: true },
    });
  }

  finAllByUserId(userId: string, userJWT: JwtPayload) {
    const whereUser = this.getQueryUser(userJWT);
    return this.orderRepository.find({
      where: { ...whereUser, user: { iduser: userId } },
      order: { idorder: "DESC" },
      relations: { user: true },
    });
  }

  async findOne(id: number, userJWT: JwtPayload) {
    const whereUser = this.getQueryUser(userJWT);

    const order = await this.orderRepository.findOne({
      where: { idorder: id, ...whereUser },
      relations: { user: true, detail: true },
    });

    if (!order) {
      new NotFoundException(`Order #${id} not found.`);
    }

    const newDetails = order.detail.map(async (detail) => {
      const imagesProduct = await this.productImageRepository.find({
        where: { product: { id: detail.product.id } },
      });
      detail.product = {
        ...detail.product,
        images: imagesProduct.map((image) => image.url),
      };
      return detail;
    });
    order.detail = await Promise.all(newDetails);

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, userJWT: JwtPayload) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const whereUserRoles = this.getQueryUser(userJWT);
      const { detail, ...restUpdateOrderDto } = updateOrderDto;
      const order = await queryRunner.manager.findOne(Order, {
        where: { idorder: id, ...whereUserRoles },
        relations: ["detail"],
      });
      if (!order) {
        throw new NotFoundException(`Order with id: '${id}' not found`);
      }
      const keysOrderDto = Object.keys(updateOrderDto || {});
      if (keysOrderDto.length === 1 && keysOrderDto[0] === "status") {
        if (
          updateOrderDto[keysOrderDto[0]] === "completed" ||
          updateOrderDto[keysOrderDto[0]] === "cancelled"
        ) {
          const status: Status = updateOrderDto[keysOrderDto[0]] as unknown as Status;
          await this.updateStockProducts(queryRunner, { status, unique: true }, order);
        }
      }

      if (detail) {
        await Promise.all(
          order.detail.map(async (d) => {
            if (!detail.some((detail) => detail.id === d.id)) {
              await queryRunner.manager.delete(DetailOrder, { id: d.id });
            }
          })
        );
        await Promise.all(
          detail.map(async (d) => {
            if (d.id) {
              await queryRunner.manager.update(DetailOrder, { id: d.id }, { ...d });
            } else {
              const newDetail = queryRunner.manager.create(DetailOrder, {
                ...d,
                order,
              });
              await queryRunner.manager.save(newDetail);
            }
          })
        );
      }

      await queryRunner.manager.update(Order, { idorder: order.idorder }, restUpdateOrderDto);
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      handleDBErrors(error);
    }

    return this.orderRepository.findOne({
      where: { idorder: id },
      relations: { user: true },
    });
  }

  remove(id: number) {
    return this.orderRepository.delete({ idorder: id });
  }

  private async updateStockProducts(
    queryRunner: QueryRunner,
    opts: { status?: Status; isCreating?: boolean; unique?: boolean },
    order: Order
  ) {
    const { status, isCreating, unique } = opts;
    if (unique) {
      if (status === "cancelled") {
        await Promise.all(order.detail.map((detail) => UniqueOrder(detail, "add")));
      } else if (status === "completed") {
        await Promise.all(order.detail.map((detail) => UniqueOrder(detail, "minus")));
      }
      return;
    }

    if (isCreating) {
      order.detail = order.detail.map((o) => {
        const newStock = order.detail.reduce((prev, curr) => {
          if (curr.product.id === o.product.id) {
            prev = prev + curr.quantity;
          }
          return prev;
        }, 0);
        return { ...o, quantity: newStock };
      });
      await Promise.all(order.detail.map((detail) => UniqueOrder(detail, "minus")));
      return;
    }

    async function UniqueOrder(detail: DetailOrder, action: "minus" | "add") {
      const product = await queryRunner.manager.findOne(Product, {
        where: { id: detail.product.id },
      });
      let newStock: number;
      if (action === "minus") newStock = product.stock - detail.quantity;
      else if (action === "add") newStock = product.stock + detail.quantity;
      await queryRunner.manager.update(
        Product,
        { id: detail.product.id },
        { stock: newStock < 0 ? 0 : newStock }
      );
    }
  }

  private getQueryUser(userJWT: JwtPayload) {
    let where: FindOptionsWhere<Order>;
    if (userJWT?.roles?.includes?.(ValidRoles.USER)) {
      where = { user: { iduser: userJWT.iduser } };
    } else if (userJWT?.roles?.includes?.(ValidRoles.SELLER)) {
      where = { userSell: { iduser: userJWT.iduser } };
    }
    return where || {};
  }

  private getQueryByDate(findOrdersByDateDto: FindOrdersByDateDto) {
    let where: FindOptionsWhere<Order> = {};
    const { from, to } = findOrdersByDateDto || {};

    if (from && to) {
      new Date(from).setHours(0, 0, 0, 0);
      new Date(to).setHours(23, 59, 59, 999);
      where.dateCreated = Between(from, to);
    }
    return where;
  }
}
