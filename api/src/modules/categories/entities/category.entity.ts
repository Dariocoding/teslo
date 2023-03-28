import { ApiProperty } from '@nestjs/swagger';
import { stringToSlug } from 'src/common/utils/string-to-slug';
import { Product } from 'src/modules/products/entities';
import { Category as ICategory } from '@teslo/interfaces';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class Category implements ICategory {
	@ApiProperty({
		example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
		description: 'Product ID',
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

	@OneToMany(() => Product, category => category.category, { cascade: true })
	//@ts-ignore
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
