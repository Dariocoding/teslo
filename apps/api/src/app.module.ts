import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "./common/common.module";
import { SeedModule } from "./seed/seed.module";
import { FilesModule } from "./files/files.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ProductsModule } from "./modules/products/products.module";
import { UsersModule } from "./modules/users/users.module";
import { CategoriesModule } from "./modules/categories/categories.module";
import { MailModule } from "./mail/mail.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { PaymentMethodsModule } from "./modules/payment-methods/payment-methods.module";
import { BrandsModule } from "./modules/brands/brands.module";
import { ProvidersModule } from "./modules/providers/providers.module";
import { ConfigEnterpriseModule } from "./modules/config-enterprise/config-enterprise.module";
import { ConfigAppModule } from "./modules/config-app/config-app.module";
import { BillsModule } from "./modules/bills/bills.module";
import { ExcelModule } from "./excel/excel.module";
import { PdfModule } from "./pdf/pdf.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join, resolve } from "path";
/* import * as dotenv from "dotenv";

 dotenv.config({ path: resolve(__dirname, "../.env") });
console.log({
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
}); */

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      envFilePath: resolve(__dirname, "../.env"),
    }),
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === "prod",
      extra: {
        ssl: process.env.STAGE === "prod" ? { rejectUnauthorized: false } : null,
      },
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),

    ProductsModule,

    CommonModule,

    SeedModule,

    FilesModule,

    AuthModule,

    UsersModule,

    CategoriesModule,

    MailModule,

    OrdersModule,

    DashboardModule,

    PaymentMethodsModule,

    BrandsModule,

    ProvidersModule,

    ConfigEnterpriseModule,

    ConfigAppModule,

    BillsModule,

    ExcelModule,

    PdfModule,
    /*    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../..", "admin", "dist"),
      renderPath: "/*",
      exclude: ["/api*"],
    }), */
  ],
  providers: [],
})
export class AppModule {}

/* rootPath?: string;
renderPath?: string | RegExp;
serveRoot?: string;
exclude?: string[];
serveStaticOptions?: {
    cacheControl?: boolean;
    dotfiles?: string;
    etag?: boolean;
    fallthrough?: boolean;
    extensions?: string[];
    immutable?: boolean;
    index?: boolean | string | string[];
    lastModified?: boolean;
    maxAge?: number | string;
    redirect?: boolean;
    setHeaders?: (res: any, path: string, stat: any) => any;
}; */
