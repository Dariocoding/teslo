import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { initialData } from './data/seed-data';
import { User } from '../modules/users/entities/user.entity';
import { ProductsService } from 'src/modules/products/products.service';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Product } from 'src/modules/products/entities';
import { Order } from 'src/modules/orders/entities/order.entity';
import { DetailOrder } from 'src/modules/orders/entities/detail.order.entity';
import { PaymentMethod } from 'src/modules/payment-methods/entities/payment-method.entity';

@Injectable()
export class SeedService {
	constructor(
		private readonly productsService: ProductsService,

		@InjectRepository(User)
		private readonly userRepository: Repository<User>,

		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>,

		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,

		@InjectRepository(DetailOrder)
		private readonly detailRepository: Repository<DetailOrder>,

		@InjectRepository(PaymentMethod)
		private readonly paymentMethod: Repository<PaymentMethod>
	) {}

	async runSeed() {
		await this.deleteTables();
		const adminUser = await this.insertUsers();
		const category = await this.insertCategories();
		const products = await this.insertNewProducts(adminUser, category);
		const paymentMethod = await this.insertPaymentMethods();

		await this.insertOrders(products[0], adminUser, paymentMethod);
		return 'SEED EXECUTED';
	}

	private async deleteTables() {
		await this.detailRepository.delete({});
		await this.orderRepository.delete({});
		await this.paymentMethod.delete({});
		await this.productsService.deleteAllProducts();

		const queryBuilderCategory = this.categoryRepository.createQueryBuilder();
		const queryBuilderUser = this.userRepository.createQueryBuilder();

		await queryBuilderCategory.delete().where({}).execute();
		await queryBuilderUser.delete().where({}).execute();
	}

	private async insertUsers() {
		const seedUsers = initialData.users;

		const users: User[] = [];

		seedUsers.forEach(user => {
			users.push(this.userRepository.create(user));
		});

		const dbUsers = await this.userRepository.save(seedUsers);

		return dbUsers[0];
	}

	private async insertCategories() {
		const categories = initialData.categories;

		const insertPromises: Category[] = [];

		categories.forEach(category => {
			insertPromises.push(this.categoryRepository.create(category));
		});

		const dbCategories = await this.categoryRepository.save(insertPromises);
		return dbCategories;
	}

	private async insertNewProducts(user: User, categories: Category[]): Promise<Product[]> {
		await this.productsService.deleteAllProducts();

		const products = initialData.products;

		const insertPromises = [];

		products.forEach(product => {
			insertPromises.push(
				this.productsService.create(
					{
						...product,
						category: categories[
							Math.floor(
								Math.random() * categories.length
							)
						],
					},
					user
				)
			);
		});

		return Promise.all(insertPromises);
	}

	private async insertPaymentMethods() {
		const paymentMethods = initialData.payments;

		const payments = await Promise.all(
			paymentMethods.map(paymentMethod => {
				const paymentMeth = this.paymentMethod.create(paymentMethod);
				return this.paymentMethod.save(paymentMeth);
			})
		);
		return payments[0];
	}

	private async insertOrders(product: Product, user: User, paymentMethod: PaymentMethod) {
		const initialOrders = initialData.orders;

		const orders = initialOrders.map(async order => {
			const detail = order.detail.map(d => ({
				...d,
				product,
				title: product.title,
			}));
			const newOrder = this.orderRepository.create({
				...order,
				detail,
				user,
				paymentMethod,
			});
			return await this.orderRepository.save(newOrder);
		});

		return Promise.all(orders);
	}
}
