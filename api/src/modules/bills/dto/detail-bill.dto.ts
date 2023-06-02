import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsPositive } from 'class-validator';
import { Product } from 'src/modules/products/entities';

export class DetailBillDto {
	@ApiProperty({ type: () => Product })
	@IsObject()
	product: Product;

	@ApiProperty()
	@IsNumber()
	@IsPositive()
	price: number;

	@ApiProperty()
	@IsNumber()
	@IsPositive()
	qty: number;
}
