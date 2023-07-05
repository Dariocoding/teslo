import { ApiProperty } from "@nestjs/swagger";
import { stringToSlug } from "src/common/utils";
import { Bill } from "src/modules/bills/entities";
import { Product } from "src/modules/products/entities";
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity("providers")
export class Provider {
	@ApiProperty({})
	@PrimaryGeneratedColumn("uuid")
	idprovider: string;

	@ApiProperty({
		uniqueItems: true,
	})
	@Column("text", {
		unique: true,
		nullable: true,
	})
	name?: string;

	@ApiProperty()
	@Column("text", {
		unique: true,
	})
	slug?: string;

	@ApiProperty()
	@Column("text", { nullable: true })
	phone1?: string;

	@ApiProperty()
	@Column("text", { nullable: true })
	phone2?: string;

	@ApiProperty()
	@Column("text", { nullable: true })
	email?: string;

	@ApiProperty()
	@CreateDateColumn({
		name: "date_created",
	})
	dateCreated?: Date;

	@ManyToMany(() => Product, product => product.providers, {
		cascade: true,
		onDelete: "CASCADE",
	})
	@JoinTable({
		name: "providers_products",
		joinColumn: { name: "provider_id" },
		inverseJoinColumn: { name: "product_id" },
	})
	products: Product[];

	@OneToMany(() => Bill, bill => bill.provider)
	bill: Bill[];

	@Column({ nullable: true, default: "" })
	address: string;

	@BeforeInsert()
	checkSlugInsert() {
		if (!this.slug) {
			this.slug = this.name;
		}

		if (this.slug) {
			this.slug = stringToSlug(this.slug);
		}
	}

	@BeforeUpdate()
	checkSlugUpdate() {
		if (this.slug) {
			this.slug = stringToSlug(this.slug);
		}
	}
}
