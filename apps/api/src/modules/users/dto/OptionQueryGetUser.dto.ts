import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class OptionsQueryGetUser {
	@ApiProperty({ default: null })
	@IsString()
	@IsOptional()
	prefix: string;
}
