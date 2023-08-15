import { StatusOrder } from "@teslo/interfaces";
import { IsOptional, IsString } from "class-validator";

export class FindStatisticQueryDto {
	@IsString({})
	@IsOptional()
	status: StatusOrder;
}
