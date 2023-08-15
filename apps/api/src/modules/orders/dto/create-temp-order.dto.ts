import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Size } from "@teslo/interfaces";
import { IsNumber, IsObject, IsOptional, IsPositive, IsString } from "class-validator";
import { Product } from "src/modules/products/entities";

export class CreateTempOrderDto {
  @ApiProperty({ type: () => Product })
  @IsObject()
  product: Product;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  qty: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  size?: Size;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  price: number;
}
