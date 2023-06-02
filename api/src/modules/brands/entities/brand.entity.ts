import { ApiProperty } from '@nestjs/swagger';
import { stringToSlug } from 'src/common/utils';
import { Product } from 'src/modules/products/entities';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('brands')
export class Brand {
	@ApiProperty({})
	@PrimaryGeneratedColumn('uuid')
	idbrand: string;

	@ApiProperty({
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

	@OneToMany(() => Product, brand => brand.brand, { cascade: true })
	//@ts-ignore
	products?: Product[];

	@ApiProperty()
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
