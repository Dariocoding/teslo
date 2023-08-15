import { ApiProperty } from '@nestjs/swagger';
import { StatusOrder } from '@teslo/interfaces';
import { IsArray, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { DetailBillDto } from './detail-bill.dto';
import { Provider } from 'src/modules/providers/entities/provider.entity';

export class CreateBillDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	reference: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	description: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	status: StatusOrder;

	@ApiProperty()
	@IsArray()
	details: DetailBillDto[];

	@ApiProperty()
	@IsObject()
	provider: Provider;

	@ApiProperty()
	@IsNumber()
	total: number;

	@ApiProperty()
	@IsNumber()
	subtotal: number;

	@ApiProperty()
	@IsNumber()
	@IsOptional()
	delivery: number;

	@ApiProperty()
	@IsNumber()
	@IsOptional()
	tax: number;
}
