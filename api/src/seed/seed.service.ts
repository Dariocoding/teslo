import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { initialData } from "./data/seed-data";
import { User } from "../modules/users/entities/user.entity";
import { ProductsService } from "src/modules/products/products.service";
import { Category } from "src/modules/categories/entities/category.entity";
import { Product } from "src/modules/products/entities";
import { Order } from "src/modules/orders/entities/order.entity";
import { DetailOrder } from "src/modules/orders/entities/detail.order.entity";
import { PaymentMethod } from "src/modules/payment-methods/entities/payment-method.entity";
import { Brand } from "src/modules/brands/entities/brand.entity";
import { Provider } from "src/modules/providers/entities/provider.entity";
import { ConfigEnterprise } from "src/modules/config-enterprise/entities/config-enterprise.entity";
import { ConfigApp } from "src/modules/config-app/entities/config-app.entity";
import { Bill } from "src/modules/bills/entities";
import { BillsService } from "src/modules/bills/bills.service";
import { DetailTempOrder } from "src/modules/orders/entities/detailTemp.order.entity";

@Injectable()
export class SeedService {
	constructor(
		private readonly productsService: ProductsService,

		@InjectRepository(User)
		private readonly userRepository: Repository<User>,

		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>,

		@InjectRepository(Brand)
		private readonly brandRepository: Repository<Brand>,

		@InjectRepository(Provider)
		private readonly providerRepository: Repository<Provider>,

		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,

		@InjectRepository(DetailOrder)
		private readonly detailRepository: Repository<DetailOrder>,

		@InjectRepository(PaymentMethod)
		private readonly paymentMethod: Repository<PaymentMethod>,

		@InjectRepository(ConfigEnterprise)
		private readonly configEnterpriseRepository: Repository<ConfigEnterprise>,

		@InjectRepository(ConfigApp)
		private readonly configAppRepository: Repository<ConfigApp>,

		@InjectRepository(DetailTempOrder)
		private readonly detailTempOrderRepository: Repository<DetailTempOrder>,

		private readonly billsService: BillsService
	) {}

	async runSeed() {
		await this.deleteTables();
		const [adminUser, category, paymentMethod, brands, providers, configEnterprise] =
			await Promise.all([
				this.insertUsers(),
				this.insertCategories(),
				this.insertPaymentMethods(),
				this.insertBrands(),
				this.insertProviders(),
				this.insertConfigEnterprise(),
				this.insertConfigApp(),
			]);

		const products = await this.insertNewProducts(adminUser, category, brands[0], providers);

		await this.insertOrders(products[0], adminUser, paymentMethod);
		return "SEED EXECUTED";
	}

	private async deleteTables() {
		await this.detailTempOrderRepository.delete({});
		await this.billsService.removeAll();
		await this.detailRepository.delete({});
		await this.orderRepository.delete({});
		await this.paymentMethod.delete({});
		await this.productsService.deleteAllProducts();

		const queryBuilderCategory = this.categoryRepository.createQueryBuilder();
		const queryBuilderUser = this.userRepository.createQueryBuilder();
		const queryBuilderBrand = this.brandRepository.createQueryBuilder();
		const queryBuilderProviders = this.providerRepository.createQueryBuilder();
		const queryBuilderConfigEnterprise = this.configEnterpriseRepository.createQueryBuilder();

		const queryBuilderConfigApp = this.configAppRepository.createQueryBuilder();

		await Promise.all([
			queryBuilderUser.delete().where({}).execute(),
			queryBuilderCategory.delete().where({}).execute(),
			queryBuilderBrand.delete().where({}).execute(),
			queryBuilderConfigEnterprise.delete().where({}).execute(),
			queryBuilderProviders.delete().where({}).execute(),
			queryBuilderConfigApp.delete().where({}).execute(),
		]);
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

	private async insertNewProducts(
		user: User,
		categories: Category[],
		brand: Brand,
		providers: Provider[]
	): Promise<Product[]> {
		await this.productsService.deleteAllProducts();

		const products = initialData.products;

		const insertPromises = [];

		products.forEach(product => {
			insertPromises.push(
				this.productsService.create(
					{
						...product,
						categories: [categories[Math.floor(Math.random() * categories.length)]],
						providers,
						brand,
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
		const initialConfigEnterprise = initialData.configEnterprise;

		const orders = initialOrders.map(async order => {
			const detail = order.detail.map(d => ({
				...d,
				product,
				title: product.title,
			}));
			const subtotal = order.detail.reduce(
				(prev, curr) => prev + curr.quantity * curr.total,
				0
			);
			const IVA = ((subtotal * initialConfigEnterprise.iva) / 100).toFixed(2);
			const total = subtotal + parseFloat(IVA);
			const newOrder = this.orderRepository.create({
				...order,
				detail,
				user,
				paymentMethod,
				iva: initialConfigEnterprise.iva,
				total,
				subtotal,
			});
			return await this.orderRepository.save(newOrder);
		});

		return Promise.all(orders);
	}

	private async insertBrands(): Promise<Brand[]> {
		const brands = initialData.brands;
		const insertPromises: Brand[] = [];

		brands.forEach(brand => {
			insertPromises.push(this.brandRepository.create(brand));
		});

		const dbBrands = await this.brandRepository.save(insertPromises);
		return dbBrands;
	}

	private async insertProviders(): Promise<Provider[]> {
		const providers = initialData.providers;
		const insertPromises: Provider[] = [];

		providers.forEach(brand => {
			insertPromises.push(this.providerRepository.create(brand));
		});

		const dbProviders = await this.providerRepository.save(insertPromises);
		return dbProviders;
	}

	private async insertConfigEnterprise() {
		const configEnterprise = [initialData.configEnterprise];

		const insertPromises: ConfigEnterprise[] = [];

		configEnterprise.forEach(config => {
			insertPromises.push(this.configEnterpriseRepository.create(config));
		});

		const dbConfigEnterprise = await this.configEnterpriseRepository.save(insertPromises);
		return dbConfigEnterprise[0];
	}

	private async insertConfigApp() {
		const configApp = [initialData.configApp];

		const insertPromises: ConfigApp[] = [];

		configApp.forEach(config => {
			insertPromises.push(this.configAppRepository.create(config));
		});

		const dbConfigApp = await this.configAppRepository.save(insertPromises);
		return dbConfigApp[0];
	}
}
