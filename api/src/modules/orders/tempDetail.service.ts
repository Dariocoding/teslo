import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DetailTempOrder } from "./entities/detailTemp.order.entity";
import { FindOptionsRelations, FindOptionsSelect, Repository } from "typeorm";
import { CreateTempOrderDto } from "./dto/create-temp-order.dto";
import { User } from "../users/entities/user.entity";
import { UpdateTempOrderDto } from "./dto/update-temp-order.dto";
import { Product, ProductImage } from "../products/entities";

const selectArrTempDetail: FindOptionsSelect<DetailTempOrder> = {
  id: true,
  qty: true,
  size: true,
  product: {
    id: true,
    code: true,
    customCode: true,
    price: true,
    stock: true,
    title: true,
    sizes: true,
    slug: true,
    gender: true,
  },
};

const relations: FindOptionsRelations<DetailTempOrder> = { product: true };

@Injectable()
export class TempDetailService {
  constructor(
    @InjectRepository(DetailTempOrder)
    private readonly detailTempRepository: Repository<DetailTempOrder>
  ) {}

  async getByUser(userId: string) {
    const details = await this.detailTempRepository.find({
      where: { userOrder: { iduser: userId } },
      order: { id: "DESC" },
      select: selectArrTempDetail,
      relations,
    });

    return details.map(this.mapProducts);
  }

  async create(createTempOrderDto: CreateTempOrderDto, userOrder: User) {
    const exist = await this.detailTempRepository.findOne({
      where: {
        product: { id: createTempOrderDto.product.id },
        userOrder: { iduser: userOrder.iduser },
        ...(createTempOrderDto.size ? { size: createTempOrderDto.size } : {}),
      },
      select: selectArrTempDetail,
      relations,
    });

    if (exist) {
      const qty = exist.qty + createTempOrderDto.qty;
      await this.detailTempRepository.update(exist.id, {
        qty,
      });
      exist.qty = qty;
      return this.mapProducts(exist);
    }

    const tempOrder = this.mapProducts(
      this.detailTempRepository.create({
        userOrder: { iduser: userOrder.iduser },
        ...createTempOrderDto,
      })
    );

    await this.detailTempRepository.save(tempOrder);
    return this.mapProducts(
      await this.detailTempRepository.findOne({
        where: { id: tempOrder.id },
        select: selectArrTempDetail,
        relations,
      })
    );
  }

  async update(id: number, updateTempOrderDto: UpdateTempOrderDto) {
    await this.detailTempRepository.update(id, updateTempOrderDto);
    return this.mapProducts(
      await this.detailTempRepository.findOne({
        where: { id },
        select: selectArrTempDetail,
        relations,
      })
    );
  }

  deleteAll(userId: string) {
    return this.detailTempRepository.delete({ userOrder: { iduser: userId } });
  }

  deleteOne(tempOrderId: number, userId: string) {
    return this.detailTempRepository.delete({ id: tempOrderId, userOrder: { iduser: userId } });
  }

  private mapProducts(detail: DetailTempOrder): DetailTempOrder {
    return {
      ...detail,
      product: {
        ...detail.product,
        //@ts-ignore
        images: detail.product.images.map((image: ProductImage) => image.url),
      },
    };
  }
}
