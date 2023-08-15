import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { DataSource, Repository } from 'typeorm';
import { handleDBErrors, stringToSlug } from 'src/common/utils';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class BrandsService {
	constructor(
		@InjectRepository(Brand)
		private brandRepository: Repository<Brand>,
		private readonly dataSource: DataSource
	) {}

	async create(createBrandDto: CreateBrandDto) {
		try {
			const brand = this.brandRepository.create({
				...createBrandDto,
			});

			await this.brandRepository.save(brand);

			return brand;
		} catch (error) {
			handleDBErrors(error);
		}
	}

	async findByPagination(paginationDto: PaginationDto) {
		const { limit = 10, offset = 0 } = paginationDto || {};

		const brands = await this.brandRepository.find({
			take: limit,
			skip: offset,
		});

		return brands;
	}

	findAll() {
		return this.brandRepository.find({ order: { dateCreated: 'DESC' } });
	}

	async findOne(term: string) {
		let brand: Brand;

		if (isUUID(term)) {
			brand = await this.brandRepository.findOneBy({ idbrand: term });
		} else {
			brand = await this.brandRepository.findOne({
				where: [
					{ title: (term as string).toUpperCase() },
					{ slug: stringToSlug(term as string) },
				],
			});
		}

		if (!brand) {
			throw new NotFoundException(`Brand with ${term} not found`);
		}
		return brand;
	}

	async update(idbrand: string, updateBrandDto: UpdateBrandDto) {
		const brand = await this.brandRepository.preload({
			idbrand,
			...updateBrandDto,
			slug: stringToSlug(updateBrandDto.title),
		});

		if (!brand) throw new NotFoundException(`Brand with id: ${idbrand} not found`);

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			await queryRunner.manager.save(brand);
			await queryRunner.commitTransaction();
			await queryRunner.release();
			return await this.findOne(idbrand);
		} catch (error) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();
			handleDBErrors(error);
		}
	}

	async remove(idbrand: string) {
		const query = this.brandRepository.createQueryBuilder('brands');

		try {
			return await query.delete().where({ idbrand }).execute();
		} catch (error) {
			handleDBErrors(error);
		}
	}
}
