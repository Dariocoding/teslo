import { ApiProperty } from '@nestjs/swagger';

export class CounterDashboardDto {
  @ApiProperty()
  totalCategories: number;

  @ApiProperty()
  totalOrders: number;

  @ApiProperty()
  totalProducts: number;

  @ApiProperty()
  totalUsers: number;
}
