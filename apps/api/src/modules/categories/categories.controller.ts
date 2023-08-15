import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpStatus,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ValidRoles } from "@teslo/interfaces";
import { Auth } from "../auth/common/decorators";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";

@Controller("categories")
@ApiTags("4 - Categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR)
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad request" })
  @ApiResponse({ status: HttpStatus.CREATED, type: Category, isArray: false })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: Category, isArray: true })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(":term")
  @ApiResponse({ status: HttpStatus.OK, type: Category, isArray: false })
  findOne(@Param("term") term: string) {
    return this.categoriesService.findOne(term);
  }

  @Put(":idcategory")
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR)
  @ApiResponse({ status: HttpStatus.OK, type: Category, isArray: false })
  update(
    @Param("idcategory", ParseUUIDPipe) idcategory: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(idcategory, updateCategoryDto);
  }

  @Delete(":idcategory")
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR)
  remove(@Param("idcategory", ParseUUIDPipe) idcategory: string) {
    return this.categoriesService.remove(idcategory);
  }
}
