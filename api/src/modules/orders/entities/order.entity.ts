import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from 'src/modules/payment-methods/entities/payment-method.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { ValidStatusOrder, StatusOrder } from '@teslo/interfaces';
import { DetailOrder } from './detail.order.entity';

@Entity('orders')
export class Order {
	@PrimaryGeneratedColumn()
	@ApiProperty({})
	idorder?: number;

	@ApiProperty()
	@Column({ default: '' })
	reference?: string;

	@ApiProperty()
	@Column({ default: ValidStatusOrder.PENDING })
	status?: StatusOrder;

	@ApiProperty()
	@Column('float')
	total?: number;

	@ApiProperty()
	@CreateDateColumn({
		name: 'date_created',
	})
	dateCreated?: Date;

	@ApiProperty({ type: () => DetailOrder, isArray: true })
	@OneToMany(() => DetailOrder, detail => detail.order, { cascade: true })
	detail?: DetailOrder[];

	@ApiProperty({ type: () => User })
	@ManyToOne(() => User, user => user.orders)
	user?: User;

	@ApiProperty()
	@ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.orders, {
		eager: true,
	})
	@JoinColumn({ name: 'idpaymentmethod' })
	paymentMethod?: PaymentMethod;
}
