import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill, DetailBill } from './entities';

@Module({
	controllers: [BillsController],
	providers: [BillsService],
	imports: [TypeOrmModule.forFeature([Bill, DetailBill])],
	exports: [BillsService, TypeOrmModule],
})
export class BillsModule {}
