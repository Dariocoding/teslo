import { ApiProperty } from "@nestjs/swagger";
import { ValidSizes } from "@teslo/interfaces";
import { IsInt, IsNumber, IsObject, IsOptional, IsString, Min } from "class-validator";
import { Product } from "src/modules/products/entities";

export class CreateDetailDto {
	@ApiProperty()
	@IsNumber()
	@Min(0)
	total: number;

	@ApiProperty()
	@IsInt()
	quantity: number;

	@ApiProperty()
	@IsString()
	@IsOptional()
	size?: ValidSizes;

	@ApiProperty()
	@IsObject()
	product: Product;
}
