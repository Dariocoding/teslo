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
import { ApiProperty } from '@nestjs/swagger';
import { ProductImage } from '.';
import { User } from 'src/modules/users/entities/user.entity';
import { stringToSlug } from 'src/common/utils/string-to-slug';
import { Category } from 'src/modules/categories/entities/category.entity';
import { DetailOrder } from 'src/modules/orders/entities/detail.order.entity';
import { Gender, Size, Product as IProduct, ARRSIZES } from '@teslo/interfaces';

@Entity({ name: 'products' })
export class Product implements IProduct {
	@ApiProperty({
		example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
		description: 'Product ID',
		uniqueItems: true,
	})
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@ApiProperty({
		example: 'T-Shirt Teslo',
		description: 'Product Title',
		uniqueItems: true,
	})
	@Column('text', {
		unique: true,
	})
	title?: string;

	@Column('text', {
		unique: true,
	})
	slug?: string;

	@ApiProperty({
		example: 0,
		description: 'Product price',
	})
	@Column('float', {
		default: 0,
	})
	price?: number;

	@ApiProperty({
		example: 'Anim reprehenderit nulla in anim mollit minim irure commodo.',
		description: 'Product description',
		default: null,
	})
	@Column({
		type: 'text',
		nullable: true,
	})
	description?: string;

	@ApiProperty({
		example: 10,
		description: 'Product stock',
		default: 0,
	})
	@Column('int', {
		default: 0,
	})
	stock?: number;

	@ApiProperty({
		example: ARRSIZES,
		description: 'Product sizes',
	})
	@Column('text', { array: true })
	sizes?: Size[];

	@ApiProperty({
		example: 'women',
		description: 'Product gender',
	})
	@Column('text')
	gender?: Gender;

	@ApiProperty()
	@Column('text', {
		array: true,
		default: [],
	})
	tags?: string[];

	@ApiProperty()
	@ManyToOne(() => Category, category => category.products, { eager: true })
	//@ts-ignore
	category?: Category;

	// images
	@ApiProperty()
	@OneToMany(() => ProductImage, productImage => productImage.product, {
		cascade: true,
		eager: true,
	})
	//@ts-ignore
	images?: string[] | ProductImage[];

	@ManyToOne(() => User, user => user.product)
	//@ts-ignore
	user?: User;

	@OneToMany(() => DetailOrder, detail => detail.product)
	//@ts-ignore
	detail?: DetailOrder;

	@CreateDateColumn({
		name: 'date_created',
	})
	dateCreated?: Date;

	@BeforeInsert()
	checkSlugInsert?() {
		if (!this.slug) {
			this.slug = this.title;
		}

		if (this.slug) {
			this.slug = stringToSlug(this.slug);
		}
	}

	@BeforeUpdate()
	checkSlugUpdate?() {
		if (this.slug) {
			this.slug = stringToSlug(this.slug);
		}
	}
}
