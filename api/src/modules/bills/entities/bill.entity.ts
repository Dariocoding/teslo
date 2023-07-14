import { ApiProperty } from "@nestjs/swagger";
import { StatusOrder, ValidStatusOrder } from "@teslo/interfaces";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { DetailBill } from "./detail.bill.entity";
import { Provider } from "src/modules/providers/entities/provider.entity";

@Entity("bill")
export class Bill {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	idbill: number;

	@ApiProperty()
	@CreateDateColumn({ name: "date_created" })
	dateCreated: Date;

	@ApiProperty()
	@UpdateDateColumn()
	dateUpdated: Date;

	@ApiProperty()
	@Column({ default: ValidStatusOrder.PENDING })
	status: StatusOrder;

	@ApiProperty()
	@Column({ default: "" })
	reference: string;

	@ApiProperty()
	@OneToMany(() => DetailBill, detail => detail.bill, { cascade: true })
	details: DetailBill[];

	@ApiProperty()
	@Column({ default: "" })
	description: string;

	@ApiProperty()
	@Column({ default: 0, type: "float" })
	total: number;

	@ApiProperty()
	@Column({ default: 0, type: "float" })
	subtotal: number;

	@ManyToOne(() => Provider, provider => provider.bill, { eager: true })
	@ApiProperty({ type: () => Provider })
	provider: Provider;

	@ApiProperty()
	@Column({ default: 0, type: "float" })
	delivery: number;

	@ApiProperty()
	@Column({ default: 0, type: "float" })
	tax: number;
}
