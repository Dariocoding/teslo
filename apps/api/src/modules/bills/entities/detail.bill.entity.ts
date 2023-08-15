import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bill } from './bill.entity';
import { Product } from 'src/modules/products/entities';

@Entity('detail_bill')
export class DetailBill {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	iddetailbill: number;

	@ApiProperty()
	@ManyToOne(() => Bill, bill => bill.details)
	bill: Bill;

	@ManyToOne(() => Product, product => product.detailBills, { eager: true })
	@ApiProperty({ type: () => Product })
	product: Product;

	@ApiProperty()
	@Column({ default: 0, type: 'float' })
	price: number;

	@ApiProperty()
	@Column({ default: 0, type: 'int' })
	qty: number;
}
