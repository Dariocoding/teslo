import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";

export class FindOrdersByDateDto {
	@ApiPropertyOptional({ title: "Date from" })
	@Type(() => Date)
	@IsDate()
	@IsOptional()
	from?: Date;

	@ApiPropertyOptional({ title: "Date to" })
	@Type(() => Date)
	@IsDate()
	@IsOptional()
	to?: Date;
}
