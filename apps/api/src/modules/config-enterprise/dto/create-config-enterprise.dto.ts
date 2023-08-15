import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateConfigEnterpriseDto {
	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	phone: string;

	@ApiProperty()
	@IsString()
	email: string;

	@ApiProperty()
	@IsString()
	address: string;

	@ApiProperty()
	@IsNumber()
	iva: number;

	@ApiProperty()
	@IsArray()
	@IsOptional()
	prefixes: string[];
}
