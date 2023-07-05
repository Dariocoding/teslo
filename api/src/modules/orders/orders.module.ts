import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { Global } from "@nestjs/common/decorators/modules/global.decorator";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DetailOrder } from "./entities/detail.order.entity";
import { Order } from "./entities/order.entity";
import { TempDetailController } from "./tempDetail.controller";
import { DetailTempOrder } from "./entities/detailTemp.order.entity";
import { TempDetailService } from "./tempDetail.service";
import { PDFModule, PDFModuleOptions } from "@t00nday/nestjs-pdf";

@Global()
@Module({
	controllers: [OrdersController, TempDetailController],
	providers: [OrdersService, TempDetailService],
	imports: [
		TypeOrmModule.forFeature([DetailOrder, Order, DetailTempOrder]),
		PDFModule.registerAsync({
			useFactory: (): PDFModuleOptions => ({
				view: {
					root: process.cwd() + "/static/pdf/",
					engine: "handlebars",
					extension: "hbs",
				},
			}),
		}),
	],
	exports: [TypeOrmModule],
})
export class OrdersModule {}
