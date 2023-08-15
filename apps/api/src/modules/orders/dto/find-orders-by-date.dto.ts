import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsOptional } from "class-validator";

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

  @ApiPropertyOptional({ title: "Take Orders" })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  take: number;
}
