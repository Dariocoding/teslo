import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/modules/products/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { DetailOrder as IDetailOrder } from '@teslo/interfaces';

@Entity('detail-order')
export class DetailOrder implements IDetailOrder {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	id?: number;

	@Column()
	@ApiProperty()
	total?: number;

	@Column()
	@ApiProperty()
	quantity?: number;

	@Column({ default: '' })
	@ApiProperty()
	title?: string;

	@ManyToOne(() => Product, product => product.detail, { eager: true })
	@ApiProperty({ type: () => Product })
	//@ts-ignore
	product: Product;

	@ManyToOne(() => Order, order => order.detail)
	@ApiProperty()
	//@ts-ignore
	order?: Order;
}
