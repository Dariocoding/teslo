import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	HttpStatus,
	ParseUUIDPipe,
	Put,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ValidRoles } from '@teslo/interfaces';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Brand } from './entities/brand.entity';
import { Auth } from '../auth/common/decorators';

@Controller('brands')
@ApiTags('7 - Brands')
export class BrandsController {
	constructor(private readonly brandsService: BrandsService) {}

	@Post()
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
	@ApiResponse({ status: HttpStatus.CREATED, type: Brand, isArray: false })
	create(@Body() createProviderDto: CreateBrandDto) {
		return this.brandsService.create(createProviderDto);
	}

	@Get()
	@ApiResponse({ status: HttpStatus.OK, type: Brand, isArray: true })
	findAll() {
		return this.brandsService.findAll();
	}

	@Get(':term')
	@ApiResponse({ status: HttpStatus.OK, type: Brand, isArray: false })
	findOne(@Param('term') term: string) {
		return this.brandsService.findOne(term);
	}

	@Put(':idbrand')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ status: HttpStatus.OK, type: Brand, isArray: false })
	update(
		@Param('idbrand', ParseUUIDPipe) idbrand: string,
		@Body() updateCategoryDto: UpdateBrandDto
	) {
		return this.brandsService.update(idbrand, updateCategoryDto);
	}

	@Delete(':idbrand')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	remove(@Param('idbrand', ParseUUIDPipe) idbrand: string) {
		return this.brandsService.remove(idbrand);
	}
}
