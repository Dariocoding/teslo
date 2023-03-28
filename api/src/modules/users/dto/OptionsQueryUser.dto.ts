import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class OptionsQueryUser {
	@ApiProperty({ default: true })
	@IsOptional()
	@Transform(({ value }) => value === 'true')
	@IsBoolean()
	returnUser: boolean;
}
