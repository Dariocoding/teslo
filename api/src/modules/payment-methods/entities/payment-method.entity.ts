import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/modules/orders/entities/order.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('payment-methods')
export class PaymentMethod {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  idpaymentmethod: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  owner: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column()
  dni: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @OneToMany(() => Order, (order) => order.paymentMethod)
  orders?: Order[];
}
