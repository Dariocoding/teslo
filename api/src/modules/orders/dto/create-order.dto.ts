import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { StatusOrder, ValidStatusOrder } from '@teslo/interfaces';
import { PaymentMethod } from 'src/modules/payment-methods/entities/payment-method.entity';
import { CreateDetailDto } from './create-detail.dto';

export class CreateOrderDto {
	@ApiProperty({ title: 'Total ammount of the order' })
	@IsNumber()
	@Min(0)
	total: number;

	@ApiProperty({ title: 'Reference of the transaction' })
	@IsString()
	@IsOptional()
	reference: string;

	@ApiProperty({})
	@IsIn([ValidStatusOrder.CANCELED, ValidStatusOrder.COMPLETED, ValidStatusOrder.PENDING])
	@IsOptional()
	@IsString()
	status: StatusOrder;

	@ApiProperty({ type: CreateDetailDto, isArray: true })
	detail: CreateDetailDto[];

	@ApiProperty({ type: PaymentMethod })
	paymentMethod: PaymentMethod;
}
