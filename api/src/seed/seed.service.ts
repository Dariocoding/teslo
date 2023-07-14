import { Injectable, BadRequestException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
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
import { BillsService } from "src/modules/bills/bills.service";
import { DetailTempOrder } from "src/modules/orders/entities/detailTemp.order.entity";
import * as fs from "fs";
import * as path from "path";

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

    private readonly billsService: BillsService,

    private readonly dataSource: DataSource
  ) {}

  async runSeed() {
    await this.deleteTables({ truncateTables: true });
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

  async deleteTables(options?: {
    deleteUsers?: boolean;
    truncateTables?: boolean;
    removeConfigData?: boolean;
    deleteBrandCategories?: boolean;
  }) {
    const {
      deleteUsers = true,
      truncateTables = false,
      removeConfigData = true,
      deleteBrandCategories = true,
    } = options || {};
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
      deleteUsers && queryBuilderUser.delete().where({}).execute(),
      deleteBrandCategories && queryBuilderCategory.delete().where({}).execute(),
      deleteBrandCategories && queryBuilderBrand.delete().where({}).execute(),
      removeConfigData && queryBuilderConfigEnterprise.delete().where({}).execute(),
      queryBuilderProviders.delete().where({}).execute(),
      removeConfigData && queryBuilderConfigApp.delete().where({}).execute(),
    ]);

    if (truncateTables) {
      const sequencesArr: string[][] = [
        ["products", "code"],
        ["payment-methods", "idpaymentmethod"],
        ["product_images", "id"],
        ["orders", "idorder"],
        ["detail-order", "id"],
        ["detail-temp-order", "id"],
      ];
      let pg_get_serial_sequences = sequencesArr.reduce(
        (prev, curr) =>
          prev +
          `pg_get_serial_sequence('${curr[0]}','${curr[1]}') AS ${curr[0].replaceAll("-", "")}${
            curr[1]
          },`,
        ""
      );
      pg_get_serial_sequences = pg_get_serial_sequences.substring(
        0,
        pg_get_serial_sequences.length - 1
      );

      const query = `SELECT ${pg_get_serial_sequences} ;`;
      const sequences: any = (await this.dataSource.query(query))[0];
      const keysSequences = Object.keys(sequences);
      for (let i = 0; i < keysSequences.length; i++) {
        const keySequence = keysSequences[i];
        const query = `ALTER SEQUENCE ${sequences[keySequence]} RESTART WITH 1;`;
        await this.dataSource.query(query);
      }
    }
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    const dbUsers = await this.userRepository.save(seedUsers);

    return dbUsers[0];
  }

  private async insertCategories() {
    const categories = initialData.categories;

    const insertPromises: Category[] = [];

    categories.forEach((category) => {
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

    products.forEach((product) => {
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
      paymentMethods.map((paymentMethod) => {
        const paymentMeth = this.paymentMethod.create(paymentMethod);
        return this.paymentMethod.save(paymentMeth);
      })
    );
    return payments[0];
  }

  private async insertOrders(product: Product, user: User, paymentMethod: PaymentMethod) {
    const initialOrders = initialData.orders;
    const initialConfigEnterprise = initialData.configEnterprise;

    const orders = initialOrders.map(async (order) => {
      const detail = order.detail.map((d) => ({
        ...d,
        product,
        title: product.title,
      }));
      const subtotal = order.detail.reduce((prev, curr) => prev + curr.quantity * curr.total, 0);
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
        userSell: user,
      });
      return await this.orderRepository.save(newOrder);
    });

    return Promise.all(orders);
  }

  private async insertBrands(): Promise<Brand[]> {
    const brands = initialData.brands;
    const insertPromises: Brand[] = [];

    brands.forEach((brand) => {
      insertPromises.push(this.brandRepository.create(brand));
    });

    const dbBrands = await this.brandRepository.save(insertPromises);
    return dbBrands;
  }

  private async insertProviders(): Promise<Provider[]> {
    const providers = initialData.providers;
    const insertPromises: Provider[] = [];

    providers.forEach((brand) => {
      insertPromises.push(this.providerRepository.create(brand));
    });

    const dbProviders = await this.providerRepository.save(insertPromises);
    return dbProviders;
  }

  private async insertConfigEnterprise() {
    const configEnterprise = [initialData.configEnterprise];

    const insertPromises: ConfigEnterprise[] = [];

    configEnterprise.forEach((config) => {
      insertPromises.push(this.configEnterpriseRepository.create(config));
    });

    const dbConfigEnterprise = await this.configEnterpriseRepository.save(insertPromises);
    return dbConfigEnterprise[0];
  }

  private async insertConfigApp() {
    const configApp = [initialData.configApp];

    const insertPromises: ConfigApp[] = [];

    configApp.forEach((config) => {
      insertPromises.push(this.configAppRepository.create(config));
    });

    const dbConfigApp = await this.configAppRepository.save(insertPromises);
    return dbConfigApp[0];
  }

  async seedProductsAngabParts() {
    await this.deleteTables({
      deleteUsers: false,
      truncateTables: true,
      removeConfigData: false,
      deleteBrandCategories: false,
    });
    interface Product {
      customCode: string;
      brand: string;
      img: string;
      category: string;
      title: string;
      description: string;
    }

    const urlProduct = path.join(process.cwd(), "dist", "seed", "data", "products.txt");
    const products = JSON.parse(fs.readFileSync(urlProduct, "utf8")) as Product[];
    const user = await this.userRepository.findOne({
      where: { email: "darioflores170@gmail.com" },
    });
    console.log(products.length);
    await Promise.all(
      products.map(async (p) => {
        try {
          const category = await this.categoryRepository.findOne({
            where: { title: p.category.trim() },
          });

          if (!category) {
            throw new BadRequestException("Category not found");
          }

          const brand = await this.brandRepository.findOne({ where: { title: p.brand.trim() } });

          if (!brand) {
            throw new BadRequestException("Brand not found");
          }

          await this.productsService.create(
            {
              categories: [category],
              brand,
              customCode: p.customCode,
              title: p.title,
              description: p.description,
              images: p.img === "foto_default.jpg" ? [] : [p.img],
              providers: [],
              sizes: [],
              gender: null,
              stock: getRandomInt(1, 20),
              price: getRandomInt(10, 100),
            },
            user
          );
        } catch (error) {
          console.log(error);
        }
      })
    );
  }
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
