import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional } from "class-validator";

export class OptimizeProduct {
  @ApiPropertyOptional()
  @IsOptional()
  optimize?: string;
}
