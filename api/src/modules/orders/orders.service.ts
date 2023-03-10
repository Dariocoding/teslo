import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidRoles } from '@teslo/interfaces';
import { FindOptionsWhere, Repository } from 'typeorm';
import { JwtPayload } from '../auth/interfaces';
import { ProductImage } from '../products/entities';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DetailOrder } from './entities/detail.order.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
	constructor(
		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,

		@InjectRepository(DetailOrder)
		private readonly detailRepository: Repository<DetailOrder>,

		@InjectRepository(ProductImage)
		private readonly productImageRepository: Repository<ProductImage>
	) {}

	async create(createOrderDto: CreateOrderDto, userJWT: JwtPayload) {
		const order = this.orderRepository.create({
			...createOrderDto,
			user: userJWT,
			detail: createOrderDto.detail.map(detail => {
				return this.detailRepository.create({
					...detail,
					title: detail.product.title,
				});
			}),
		});

		return this.orderRepository.save(order);
	}

	findAll(userJWT: JwtPayload) {
		const user: FindOptionsWhere<User> = userJWT.roles.includes(ValidRoles.USER)
			? { iduser: userJWT.iduser }
			: null;

		return this.orderRepository.find({
			where: user ? { user } : {},
			order: { idorder: 'DESC' },
			relations: { user: true },
		});
	}

	finAllByPaymentMethodId(id: number) {
		return this.orderRepository.find({
			where: { paymentMethod: { idpaymentmethod: id } },
			order: { idorder: 'DESC' },
			relations: { user: true },
		});
	}

	finAllByUserId(userId: string) {
		return this.orderRepository.find({
			where: { user: { iduser: userId } },
			order: { idorder: 'DESC' },
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
}
