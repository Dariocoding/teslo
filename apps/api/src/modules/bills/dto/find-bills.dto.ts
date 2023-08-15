import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class FindBillsByDateDto {
	@ApiProperty({ title: 'Date from' })
	@Type(() => Date)
	@IsDate()
	@IsOptional()
	from?: Date;

	@ApiProperty({ title: 'Date to' })
	@Type(() => Date)
	@IsDate()
	@IsOptional()
	to?: Date;
}
