import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class FiltersProductDto {
  @ApiPropertyOptional({
    description: "categoryID",
  })
  @IsOptional()
  categoryID?: string;

  @ApiPropertyOptional({
    description: "providerID",
  })
  @IsOptional()
  providerID?: string;

  @ApiPropertyOptional({
    description: "brandID",
  })
  @IsOptional()
  brandID?: string;
}
