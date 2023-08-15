import { ApiProperty } from '@nestjs/swagger';

export class FindOrdersByAnioMonthDto {
  @ApiProperty()
  year: number;

  @ApiProperty()
  month: string;

  @ApiProperty()
  total: string;

  @ApiProperty({
    isArray: true,
    example: [{ day: 1, total: 500, quantity: 2 }],
  })
  orders: Array<{ day: number; total: string; quantity: number }>;
}
