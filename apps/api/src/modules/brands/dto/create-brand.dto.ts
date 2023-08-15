import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateBrandDto {
	@ApiProperty({
		uniqueItems: true,
	})
	@IsString()
	@MinLength(2)
	title: string;
}
