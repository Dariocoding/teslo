import { Controller, Get, Post, Body, Param, Delete } from "@nestjs/common";
import { PaymentMethodsService } from "./payment-methods.service";
import { CreatePaymentMethodDto } from "./dto/create-payment-method.dto";
import { UpdatePaymentMethodDto } from "./dto/update-payment-method.dto";
import { ApiTags } from "@nestjs/swagger";
import { Auth } from "../auth/common/decorators";
import { Put } from "@nestjs/common/decorators";
import { ValidRoles } from "@teslo/interfaces";

@Controller("payment-methods")
@ApiTags("6 - Payment Methods")
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Post()
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR)
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodsService.create(createPaymentMethodDto);
  }

  @Get()
  findAll() {
    return this.paymentMethodsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentMethodsService.findOne(+id);
  }

  @Put(":id")
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR)
  update(@Param("id") id: string, @Body() updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.paymentMethodsService.update(+id, updatePaymentMethodDto);
  }

  @Delete(":id")
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR)
  remove(@Param("id") id: string) {
    return this.paymentMethodsService.remove(+id);
  }
}
