import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	ParseUUIDPipe,
	Query,
	HttpStatus,
	Put,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { User } from '../users/entities/user.entity';
import { Auth, GetUser } from '../auth/common/decorators';
import { ValidRoles } from '@teslo/interfaces';

@ApiTags('3 - Products')
@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
	@ApiResponse({ status: HttpStatus.CREATED, type: Product, isArray: false })
	create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
		return this.productsService.create(createProductDto, user);
	}

	@Get()
	@ApiResponse({ status: HttpStatus.OK, type: Product, isArray: true })
	findByPagination(@Query() paginationDto: PaginationDto) {
		return this.productsService.findByPagination(paginationDto);
	}

	@Get('/all')
	@ApiResponse({ status: HttpStatus.OK, type: Product, isArray: true })
	findAll() {
		return this.productsService.findAll();
	}

	@Get('/all/:idcategory')
	@ApiResponse({ status: HttpStatus.OK, type: Product, isArray: true })
	findAllByCategory(@Param('idcategory', ParseUUIDPipe) idcategory: string) {
		return this.productsService.findAllByCategory(idcategory);
	}

	@Get(':term')
	@ApiResponse({ status: HttpStatus.OK, type: Product, isArray: false })
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Product Not Found',
	})
	findOne(@Param('term') term: string) {
		return this.productsService.findOnePlain(term);
	}

	@Put(':id')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ status: HttpStatus.OK, type: Product, isArray: false })
	update(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateProductDto: UpdateProductDto,
		@GetUser() user: User
	) {
		return this.productsService.update(id, updateProductDto, user);
	}

	@Delete(':id')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	remove(@Param('id', ParseUUIDPipe) id: string) {
		return this.productsService.remove(id);
	}
}
