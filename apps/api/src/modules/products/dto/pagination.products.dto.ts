import { ApiPropertyOptional } from '@nestjs/swagger';
import { ARRGENDERS, ARRSIZES, ARRSTATUSPRODUCT, Gender, StatusProduct } from '@teslo/interfaces';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class PaginationProductsDto extends PaginationDto {
	@ApiPropertyOptional({
		description: 'Gender of the product',
		example: ARRGENDERS,
	})
	@IsOptional()
	gender?: Gender;

	@ApiPropertyOptional({ description: 'ids of the categories related' })
	@IsOptional()
	@Transform(({ value }: { value: string }) =>
		value.split?.(',') ? value.split?.(',') : value
	)
	categories?: string[];

	@ApiPropertyOptional({ description: 'Sizes of the products', example: ARRSIZES })
	@IsOptional()
	@Transform(({ value }: { value: string }) =>
		value.split?.(',') ? value.split?.(',') : value
	)
	sizes?: string[];

	@ApiPropertyOptional({ description: 'Status Product', example: ARRSTATUSPRODUCT })
	@IsOptional()
	status?: StatusProduct;
}
