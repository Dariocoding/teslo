import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DetailTempOrder } from "./entities/detailTemp.order.entity";
import { Repository } from "typeorm";
import { CreateTempOrderDto } from "./dto/create-temp-order.dto";
import { User } from "../users/entities/user.entity";
import { UpdateTempOrderDto } from "./dto/update-temp-order.dto";
import { ProductImage } from "../products/entities";

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
      await this.detailTempRepository.findOne({ where: { id: tempOrder.id } })
    );
  }

  async update(id: number, updateTempOrderDto: UpdateTempOrderDto) {
    await this.detailTempRepository.update(id, updateTempOrderDto);
    return this.mapProducts(await this.detailTempRepository.findOne({ where: { id } }));
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
