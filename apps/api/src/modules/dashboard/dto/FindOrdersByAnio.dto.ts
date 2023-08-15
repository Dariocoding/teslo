import { ApiProperty } from "@nestjs/swagger";

export class FindOrdersAnioDto {
	@ApiProperty()
	year: number;

	@ApiProperty({ example: [{ num_month: 1, sell: 400 }], isArray: true })
	orders: { num_month: number; sell: number }[];
}
