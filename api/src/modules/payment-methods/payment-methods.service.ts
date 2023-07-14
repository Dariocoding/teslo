import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { handleDBErrors } from "src/common/utils";
import { Repository } from "typeorm";
import { CreatePaymentMethodDto } from "./dto/create-payment-method.dto";
import { UpdatePaymentMethodDto } from "./dto/update-payment-method.dto";
import { PaymentMethod } from "./entities/payment-method.entity";

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>
  ) {}

  create(createPaymentMethodDto: CreatePaymentMethodDto) {
    const paymentMethod = this.paymentMethodRepository.create(createPaymentMethodDto);

    return this.paymentMethodRepository.save(paymentMethod);
  }

  findAll() {
    return this.paymentMethodRepository.find({
      order: { idpaymentmethod: "DESC" },
    });
  }

  async findOne(id: number) {
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: { idpaymentmethod: id },
    });

    if (!paymentMethod) new NotFoundException(`Payment method not found with #id ${id}`);

    return paymentMethod;
  }

  async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    await this.paymentMethodRepository.update({ idpaymentmethod: id }, updatePaymentMethodDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    try {
      await this.paymentMethodRepository.delete({ idpaymentmethod: id });
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
