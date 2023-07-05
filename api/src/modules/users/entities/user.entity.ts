import { ApiProperty } from "@nestjs/swagger";
import { EXAMPLE_UUID } from "src/common/utils/consts";
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "../../products/entities";
import { Order } from "src/modules/orders/entities/order.entity";
import { ValidRol, ValidRoles } from "@teslo/interfaces";
import { DetailTempOrder } from "src/modules/orders/entities/detailTemp.order.entity";

@Entity("users")
export class User {
	@ApiProperty({ example: EXAMPLE_UUID })
	@PrimaryGeneratedColumn("uuid")
	iduser?: string;

	@ApiProperty({ example: "test1@gmail.com" })
	@Column("text", { unique: true })
	email?: string;

	@ApiProperty({ example: "1023602106201" })
	@Column("text", { nullable: true })
	phone?: string;

	@ApiProperty({ example: "Dario" })
	@Column("text", { nullable: true })
	firstName?: string;

	@ApiProperty({ example: "Flores" })
	@Column("text", { nullable: true })
	lastName?: string;

	@ApiProperty({ example: "password" })
	@Column("text", { select: false })
	password?: string;

	@ApiProperty()
	@Column("bool", { default: true, nullable: false })
	isActive?: boolean;

	@ApiProperty()
	@Column("text", { nullable: true })
	token?: string;

	@Column("bool", { default: false, select: false, nullable: false })
	isDeleted?: boolean;

	@ApiProperty({})
	@Column("text", { array: true, default: [ValidRoles.USER] })
	roles?: ValidRol[];

	@ApiProperty({})
	@Column("text", { array: true, default: [] })
	wishlist?: string[];

	@OneToMany(() => Product, product => product.user, {
		cascade: true,
		onDelete: "SET NULL",
	})
	//@ts-ignore
	product?: Product;

	@CreateDateColumn({
		name: "date_created",
	})
	dateCreated?: Date;

	@ApiProperty({})
	@Column({ nullable: true })
	prefix?: string;

	@ApiProperty({})
	@Column({ unique: true, nullable: true, default: null })
	dni: string;

	@OneToMany(() => Order, order => order.user)
	orders?: Order[];

	@OneToMany(() => Order, order => order.userSell)
	sells?: Order[];

	@OneToMany(() => DetailTempOrder, detailTemp => detailTemp.userOrder)
	detailUserOrders?: DetailTempOrder[];

	@BeforeInsert()
	checkFieldsBeforeInsert?() {
		if (this.email) {
			this.email = this.email.toLowerCase().trim();
		}
	}

	@BeforeUpdate()
	checkFieldsBeforeUpdate?() {
		this.checkFieldsBeforeInsert();
	}
}
