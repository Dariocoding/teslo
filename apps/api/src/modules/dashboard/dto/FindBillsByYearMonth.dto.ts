import { ApiProperty } from "@nestjs/swagger";

export class FindBillsByYearAndMonthDto {
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
	bills: Array<{ day: number; total: string; quantity: number }>;
}

export class FindBillsByYearDto {
	@ApiProperty()
	year: number;

	@ApiProperty({ example: [{ num_month: 1, sell: 400 }], isArray: true })
	bills: { num_month: number; sell: number }[];
}
