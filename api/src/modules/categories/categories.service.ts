import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { handleDBErrors } from 'src/common/utils/handleDBErros';
import { stringToSlug } from 'src/common/utils/string-to-slug';
import { DataSource, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create({
        ...createCategoryDto,
      });

      await this.categoryRepository.save(category);

      return { category };
    } catch (error) {
      handleDBErrors(error);
    }
  }

  async findByPagination(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto || {};

    const categories = await this.categoryRepository.find({
      take: limit,
      skip: offset,
    });

    return categories;
  }

  findAll() {
    return this.categoryRepository.find({ order: { dateCreated: 'DESC' } });
  }

  async findOne(term: string) {
    let category: Category;

    if (isUUID(term)) {
      category = await this.categoryRepository.findOneBy({ idcategory: term });
    } else {
      category = await this.categoryRepository.findOne({
        where: [{ title: term.toUpperCase() }, { slug: stringToSlug(term) }],
      });
    }

    if (!category) {
      throw new NotFoundException(`Category with ${term} not found`);
    }
    return category;
  }

  async update(idcategory: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.preload({
      idcategory,
      ...updateCategoryDto,
      slug: stringToSlug(updateCategoryDto.title),
    });

    if (!category)
      throw new NotFoundException(`Category with id: ${idcategory} not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(category);
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return { category: await this.findOne(idcategory) };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      handleDBErrors(error);
    }
  }

  async remove(idcategory: string) {
    const query = this.categoryRepository.createQueryBuilder('category');

    try {
      return await query.delete().where({ idcategory }).execute();
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
