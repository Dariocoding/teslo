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
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Product } from "./entities/product.entity";
import { ProductsService } from "./products.service";
import { UpdateProductDto } from "./dto/update-product.dto";
import { User } from "../users/entities/user.entity";
import { Auth, GetUser } from "../auth/common/decorators";
import { Gender, ValidRoles, StatusProduct } from "@teslo/interfaces";
import { FindOperator, ILike, In } from "typeorm";
import { PaginationProductsDto } from "./dto/pagination.products.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { FiltersProductDto } from "./dto/filters.product.dto";

@ApiTags("3 - Products")
@Controller("products")
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad request" })
	@ApiResponse({ status: HttpStatus.CREATED, type: Product, isArray: false })
	create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
		return this.productsService.create(createProductDto, user);
	}

	@Get()
	@ApiResponse({ status: HttpStatus.OK, type: Product, isArray: true })
	findByPagination(@Query() paginationDto: PaginationProductsDto) {
		return this.productsService.findByPagination(paginationDto);
	}

	@Get("/all")
	@ApiResponse({ status: HttpStatus.OK, type: Product, isArray: true })
	findAll() {
		return this.productsService.findAll();
	}

	@Get("/all/category/:idcategory")
	@ApiResponse({ status: HttpStatus.OK, type: Product, isArray: true })
	findAllByCategory(@Param("idcategory", ParseUUIDPipe) idcategory: string) {
		return this.productsService.findAllByCategory(idcategory);
	}

	@Get("/all/brand/:idbrand")
	@ApiResponse({ status: HttpStatus.OK, type: Product, isArray: true })
	findAllByBrand(@Param("idbrand", ParseUUIDPipe) idbrand: string) {
		return this.productsService.findAllByBrand(idbrand);
	}

	@Get("/all/provider/:idprovider")
	@ApiResponse({ status: HttpStatus.OK, type: Product, isArray: true })
	findAllByProvider(@Param("idprovider", ParseUUIDPipe) idprovider: string) {
		return this.productsService.findAllByProvider(idprovider);
	}

	@Get("/all/filters")
	@ApiResponse({ status: HttpStatus.OK, type: Product, isArray: true })
	findAllByFilter(@Query() query: FiltersProductDto) {
		return this.productsService.findAllByFilters(query);
	}

	@Get("/select/:idproducts")
	@ApiResponse({ status: HttpStatus.OK, type: Product, isArray: true })
	findAllByIdProducts(@Param("idproducts") idproducts: string) {
		return this.productsService.findAll({ id: In(idproducts.split(",")) });
	}

	@Get("/search/:term")
	@ApiResponse({ status: HttpStatus.OK, type: Product, isArray: true })
	searchProducts(@Param("term") term: string) {
		const like = ILike("%" + term + "%");
		return this.productsService.findAll([
			{ title: like },
			{ slug: like },
			{ categories: { title: like } },
			{ categories: { slug: like } },
			{ gender: like as FindOperator<Gender> },
			{ status: like as FindOperator<StatusProduct> },
			+term ? { code: +term } : {},
			{ customCode: like },
		]);
	}

	@Get(":term")
	@ApiResponse({ status: HttpStatus.OK, type: Product, isArray: false })
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "Product Not Found",
	})
	findOne(@Param("term") term: string) {
		return this.productsService.findOnePlain(term);
	}

	@Put(":id")
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ status: HttpStatus.OK, type: Product, isArray: false })
	update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() updateProductDto: UpdateProductDto,
		@GetUser() user: User
	) {
		return this.productsService.update(id, updateProductDto, user);
	}

	@Delete(":id")
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	remove(@Param("id", ParseUUIDPipe) id: string) {
		return this.productsService.remove(id);
	}
}
