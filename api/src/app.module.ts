import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MailModule } from './mail/mail.module';
import { OrdersModule } from './modules/orders/orders.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PaymentMethodsModule } from './modules/payment-methods/payment-methods.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),

		TypeOrmModule.forRoot({
			ssl: process.env.STAGE === 'prod',
			extra: {
				ssl:
					process.env.STAGE === 'prod'
						? { rejectUnauthorized: false }
						: null,
			},
			type: 'postgres',
			host: process.env.DB_HOST,
			port: +process.env.DB_PORT,
			database: process.env.DB_NAME,
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			autoLoadEntities: true,
			synchronize: true,
			logging: process.env.STATE !== 'prod',
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
	],
	providers: [],
})
export class AppModule {}
