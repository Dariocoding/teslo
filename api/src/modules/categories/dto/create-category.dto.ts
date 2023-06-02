import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
	@ApiProperty({
		uniqueItems: true,
	})
	@IsString()
	@MinLength(2)
	title: string;
}
