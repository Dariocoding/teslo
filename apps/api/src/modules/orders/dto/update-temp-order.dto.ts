import { PartialType } from "@nestjs/swagger";
import { CreateTempOrderDto } from "./create-temp-order.dto";

export class UpdateTempOrderDto extends PartialType(CreateTempOrderDto) {}
