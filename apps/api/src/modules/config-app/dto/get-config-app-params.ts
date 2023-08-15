import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

type ValuesGet = 'email' | 'colors' | 'chatgpt';

export class GetConfigAppParams {
	@ApiPropertyOptional({
		default: ['email', 'colors', 'chatgpt'],
		enum: ['email', 'colors', 'chatgpt'],
	})
	@IsString({ each: true })
	@Transform(({ value }: { value: string }) =>
		value.split?.(',') ? value.split?.(',') : value
	)
	@IsOptional()
	values: ValuesGet[];
}
