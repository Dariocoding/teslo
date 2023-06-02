import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateProviderDto {
	@ApiProperty({
		uniqueItems: true,
	})
	@IsString()
	@MinLength(2)
	name: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	phone1: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	phone2: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	email: string;
}
