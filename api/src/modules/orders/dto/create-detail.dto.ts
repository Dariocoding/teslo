import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Min } from 'class-validator';
import { Product } from 'src/modules/products/entities';

export class CreateDetailDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  total: number;

  @ApiProperty()
  @IsInt()
  quantity: number;

  @ApiProperty()
  product: Product;
}
