import { Product } from './product';

export interface Brand {
	idbrand: string;
	title: string;
	slug: string;
	products?: Product[];
	dateCreated: Date;
}

export interface BrandDto {
	title: string;
}

/* @ApiProperty({})
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
dateCreated?: Date; */
