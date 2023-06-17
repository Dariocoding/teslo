import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { Global } from "@nestjs/common/decorators/modules/global.decorator";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DetailOrder } from "./entities/detail.order.entity";
import { Order } from "./entities/order.entity";

@Global()
@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [TypeOrmModule.forFeature([DetailOrder, Order])],
  exports: [TypeOrmModule],
})
export class OrdersModule {}
