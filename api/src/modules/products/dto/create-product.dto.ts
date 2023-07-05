import { ApiProperty } from "@nestjs/swagger";
import {
	IsArray,
	IsIn,
	IsInt,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	Min,
	MinLength,
} from "class-validator";
import { Gender, Size, StatusProduct, ARRGENDERS } from "@teslo/interfaces";
import { Category } from "src/modules/categories/entities/category.entity";
import { Provider } from "src/modules/providers/entities/provider.entity";
import { Brand } from "src/modules/brands/entities/brand.entity";

export class CreateProductDto {
	@ApiProperty({
		description: "Product title (unique)",
		nullable: false,
		minLength: 1,
	})
	@IsString()
	@MinLength(1)
	title: string;

	@ApiProperty()
	@IsNumber()
	@Min(0)
	@IsOptional()
	price?: number;

	@ApiProperty()
	@IsString()
	@IsOptional()
	description?: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	slug?: string;

	@ApiProperty()
	@IsInt()
	@Min(0)
	@IsOptional()
	stock?: number;

	@ApiProperty()
	@IsString()
	@IsOptional()
	customCode?: string;

	@ApiProperty()
	@IsString({ each: true })
	@IsArray()
	sizes: Size[];

	@ApiProperty()
	@IsIn([...ARRGENDERS, ""])
	@IsOptional()
	gender: Gender;

	@ApiProperty()
	@IsString({ each: true })
	@IsArray()
	@IsOptional()
	images?: string[];

	@ApiProperty()
	@IsArray()
	categories?: Category[];

	@ApiProperty()
	@IsString()
	@IsOptional()
	status?: StatusProduct;

	@ApiProperty()
	@IsArray()
	providers: Provider[];

	@ApiProperty()
	@IsObject()
	brand: Brand;
}
