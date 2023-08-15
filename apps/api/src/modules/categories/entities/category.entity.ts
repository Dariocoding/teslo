import { ApiProperty } from '@nestjs/swagger';
import { stringToSlug } from 'src/common/utils/string-to-slug';
import { Product } from 'src/modules/products/entities';
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
} from 'typeorm';

@Entity('categories')
export class Category {
	@ApiProperty({
		uniqueItems: true,
	})
	@PrimaryGeneratedColumn('uuid')
	idcategory?: string;

	@ApiProperty({
		example: 'T-Shirt Teslo',
		description: 'Product Title',
		uniqueItems: true,
	})
	@Column('text', {
		unique: true,
	})
	title?: string;

	@ApiProperty()
	@Column('text', {
		unique: true,
	})
	slug?: string;

	@ManyToMany(() => Product, category => category.categories)
	@JoinTable({
		name: 'categories_products',
		joinColumn: { name: 'category_id' },
		inverseJoinColumn: { name: 'product_id' },
	})
	products?: Product[];

	@CreateDateColumn({
		name: 'date_created',
	})
	dateCreated?: Date;

	@BeforeInsert()
	checkSlugInsert() {
		if (!this.slug) {
			this.slug = this.title;
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
