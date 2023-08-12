import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ValidSizes } from "@teslo/interfaces";
import { IsInt, IsNumber, IsObject, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { Product } from "src/modules/products/entities";

export class CreateDetailDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  id?: number;

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

  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;
}
