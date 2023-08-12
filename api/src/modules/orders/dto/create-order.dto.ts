import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsIn,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from "class-validator";
import { StatusOrder, ARRSTATUSORDER } from "@teslo/interfaces";
import { PaymentMethod } from "src/modules/payment-methods/entities/payment-method.entity";
import { CreateDetailDto } from "./create-detail.dto";
import { User } from "src/modules/users/entities/user.entity";

export class CreateOrderDto {
  @ApiProperty({ title: "Total ammount of the order" })
  @IsNumber()
  @Min(0)
  total: number;

  @ApiProperty({ title: "Reference of the transaction" })
  @IsString()
  @IsOptional()
  reference: string;

  @ApiProperty({})
  @IsIn([...ARRSTATUSORDER])
  @IsOptional()
  @IsString()
  status: StatusOrder;

  @ApiProperty({ type: CreateDetailDto, isArray: true })
  @IsArray()
  detail: CreateDetailDto[];

  @ApiProperty({ type: PaymentMethod })
  @IsObject()
  paymentMethod: PaymentMethod;

  @ApiProperty({})
  @IsNumber()
  @IsOptional()
  iva: number;

  @ApiProperty({})
  @IsNumber()
  subtotal: number;

  @ApiPropertyOptional({})
  @IsObject()
  @IsOptional()
  customer?: User;

  @ApiPropertyOptional({})
  @IsPositive()
  @IsOptional()
  discount?: number;
}
