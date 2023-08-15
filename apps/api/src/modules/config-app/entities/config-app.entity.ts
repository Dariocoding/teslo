import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConfigApp {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column({
		name: 'colors-admin',
		type: 'json',
		nullable: true,
		default: {},
		transformer: {
			from: (value: string) => JSON.parse(value),
			to: (value: Object) => JSON.stringify(value),
		},
	})
	colorsAdmin: Object;

	@ApiProperty()
	@Column({ default: '' })
	chatGptKey: string;

	@ApiProperty()
	@Column({ nullable: true, type: 'int' })
	emailPort: number;

	@ApiProperty()
	@Column({ nullable: true, default: '' })
	emailHost: string;

	@ApiProperty()
	@Column({ nullable: true, default: '' })
	emailUser: string;

	@ApiProperty()
	@Column({ nullable: true, default: '' })
	emailPassword: string;

	@ApiProperty()
	@Column({ nullable: true, default: '' })
	emailFrom: string;

	@ApiProperty()
	@Column({ nullable: true, default: '' })
	emailName: string;

	@ApiProperty()
	@Column({ nullable: true, default: '' })
	emailSecure: string;
}
