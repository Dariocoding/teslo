import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from 'src/modules/payment-methods/entities/payment-method.entity';

type PaymentMethodsArr = (PaymentMethod & {
  quantity: number;
  total: number;
})[];

export class findPaymentMethodsOrders {
  @ApiProperty()
  year: number;

  @ApiProperty()
  month: string;

  @ApiProperty({
    isArray: true,
    example: [
      {
        idpaymentmethod: 1,
        title: 'Cash',
        owner: 'Dario',
        phone: '051205105',
        quantity: 5,
        total: 500,
        dni: '051025',
        orders: [],
        email: 'email@example.com',
      },
    ] as PaymentMethodsArr,
  })
  paymentMethods: PaymentMethodsArr;
}
