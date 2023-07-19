import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBillDto } from "./dto/create-bill.dto";
import { UpdateBillDto } from "./dto/update-bill.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Bill, DetailBill } from "./entities";
import { Between, DataSource, FindOptionsWhere, Repository } from "typeorm";
import { Product, ProductImage } from "../products/entities";
import { FindBillsByDateDto } from "./dto/find-bills.dto";
import { handleDBErrors } from "src/common/utils";

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill) private readonly billRepository: Repository<Bill>,
    @InjectRepository(DetailBill)
    private readonly detailBillRepository: Repository<DetailBill>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,

    private readonly dataSource: DataSource
  ) {}

  async create(createBillDto: CreateBillDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const details = createBillDto.details.map((detail) => {
        return queryRunner.manager.create(DetailBill, detail);
      });

      let bill = queryRunner.manager.create(Bill, { ...createBillDto, details });
      await Promise.all(
        details.map(async (d) => {
          const product = await queryRunner.manager.findOne(Product, {
            where: { id: d.product.id },
          });
          const newStock = product.stock + d.qty;
          await queryRunner.manager.update(
            Product,
            { id: d.product.id },
            { stock: newStock < 0 ? 0 : newStock }
          );
        })
      );

      bill = await queryRunner.manager.save(bill);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return bill;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      handleDBErrors(error);
    }
  }

  findAll(findBillsByDateDto: FindBillsByDateDto) {
    const { from, to } = findBillsByDateDto || {};

    if (from && to) {
      new Date(from).setHours(0, 0, 0, 0);
      new Date(to).setHours(23, 59, 59, 999);
    }

    let where: FindOptionsWhere<Bill> | FindOptionsWhere<Bill>[] = {
      ...(from && to ? { dateCreated: Between(from, to) } : {}),
    };

    return this.billRepository.find({
      where,
      order: { idbill: "DESC" },
    });
  }

  async findOne(id: number) {
    const bill = await this.billRepository.findOne({
      where: { idbill: id },
      relations: ["details", "details.product"],
    });
    if (!bill) return null;

    bill.details = bill.details.map((detail) => {
      const product = this.productRepository.create(detail.product);
      return {
        ...detail,
        product: {
          ...product,
          images: (product.images as ProductImage[]).map((image) => image.url),
        },
      };
    });
    return bill;
  }

  async update(idbill: number, updateBillDto: UpdateBillDto) {
    const { details, ...toUpdate } = updateBillDto;

    const bill = await this.billRepository.preload({ idbill, ...toUpdate });

    if (!bill) throw new NotFoundException(`Bill with id: ${idbill} not found`);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (details) {
        await queryRunner.manager.delete(DetailBill, { bill: { idbill } });
        bill.details = details.map((detail) => this.detailBillRepository.create({ ...detail }));
      }

      await queryRunner.manager.save(bill);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return this.findOne(idbill);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      handleDBErrors(error);
    }
  }

  remove(id: number) {
    return this.billRepository.delete(id);
  }

  async removeAll() {
    await Promise.all([this.detailBillRepository.delete({}), this.billRepository.delete({})]);
  }
}
