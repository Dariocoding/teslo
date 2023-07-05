import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidRoles } from "@teslo/interfaces";
import { Between, FindOptionsWhere, Repository } from "typeorm";
import { JwtPayload } from "../auth/interfaces";
import { ProductImage } from "../products/entities";
import { User } from "../users/entities/user.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { DetailOrder } from "./entities/detail.order.entity";
import { Order } from "./entities/order.entity";
import { FindOrdersByDateDto } from "./dto/find-orders-by-date.dto";
import { DetailTempOrder } from "./entities/detailTemp.order.entity";
import { handleDBErrors } from "src/common/utils";

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
		private readonly detailTempOrderRepository: Repository<DetailTempOrder>
	) {}

	async create(createOrderDto: CreateOrderDto, userJWT?: JwtPayload, sellerJWT?: JwtPayload) {
		try {
			let order = this.orderRepository.create({
				...createOrderDto,
				user: createOrderDto.customer || userJWT,
				userSell: sellerJWT,
				detail: createOrderDto.detail.map(detail => {
					return this.detailRepository.create({
						...detail,
						title: detail.product.title,
					});
				}),
			});

			order = await this.orderRepository.save(order);
			if (sellerJWT && order) await this.cleanTempOrders(sellerJWT);
			return order;
		} catch (error) {
			handleDBErrors(error);
		}
	}

	findAll(userJWT: JwtPayload, findOrdersByDateDto: FindOrdersByDateDto) {
		const { from, to } = findOrdersByDateDto || {};
		const user: FindOptionsWhere<User> = userJWT?.roles?.includes?.(ValidRoles.USER)
			? { iduser: userJWT.iduser }
			: null;

		if (from && to) {
			from.setHours(0, 0, 0, 0);
			to.setHours(23, 59, 59, 999);
		}

		let where: FindOptionsWhere<Order> | FindOptionsWhere<Order>[] = {
			...(user ? { user } : {}),
			...(from && to ? { dateCreated: Between(from, to) } : {}),
		};

		return this.orderRepository.find({
			where,
			order: { idorder: "DESC" },
			relations: { user: true },
		});
	}

	finAllByPaymentMethodId(id: number) {
		return this.orderRepository.find({
			where: { paymentMethod: { idpaymentmethod: id } },
			order: { idorder: "DESC" },
			relations: { user: true },
		});
	}

	finAllByUserId(userId: string) {
		return this.orderRepository.find({
			where: { user: { iduser: userId } },
			order: { idorder: "DESC" },
			relations: { user: true },
		});
	}

	async findOne(id: number, userJWT: JwtPayload) {
		const user: FindOptionsWhere<User> = userJWT.roles.includes(ValidRoles.USER)
			? { iduser: userJWT.iduser }
			: null;

		const order = await this.orderRepository.findOne({
			where: user ? { user, idorder: id } : { idorder: id },
			relations: { user: true, detail: true },
		});

		if (!order) {
			new NotFoundException(`Order #${id} not found.`);
		}

		const newDetails = order.detail.map(async detail => {
			const imagesProduct = await this.productImageRepository.find({
				where: { product: { id: detail.product.id } },
			});
			detail.product = {
				...detail.product,
				images: imagesProduct.map(image => image.url),
			};
			return detail;
		});
		order.detail = await Promise.all(newDetails);

		return order;
	}

	async update(id: number, updateOrderDto: UpdateOrderDto) {
		await this.orderRepository.update({ idorder: id }, updateOrderDto);
		return this.orderRepository.findOne({
			where: { idorder: id },
			relations: { user: true },
		});
	}

	remove(id: number) {
		return this.orderRepository.delete({ idorder: id });
	}

	private async cleanTempOrders(user: JwtPayload) {
		this.detailTempOrderRepository.delete({ userOrder: { iduser: user.iduser } });
	}
}
