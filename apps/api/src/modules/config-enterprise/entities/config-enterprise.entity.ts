import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('config_enterprise')
export class ConfigEnterprise {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column({ name: 'name_enterprise' })
	name: string;

	@ApiProperty()
	@Column({ name: 'phone_enterprise' })
	phone: string;

	@ApiProperty()
	@Column({ name: 'email_enterprise' })
	email: string;

	@ApiProperty()
	@Column({ name: 'address_enterprise' })
	address: string;

	@ApiProperty()
	@Column('float')
	iva?: number;

	@ApiProperty({})
	@Column('text', { array: true, default: [] })
	prefixes?: string[];
}
