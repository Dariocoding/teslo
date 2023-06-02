import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/modules/products/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('detail-order')
export class DetailOrder {
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

	@ManyToOne(() => Product, product => product.detailOrders, { eager: true })
	@ApiProperty({ type: () => Product })
	product: Product;

	@ManyToOne(() => Order, order => order.detail)
	@ApiProperty()
	order?: Order;
}
