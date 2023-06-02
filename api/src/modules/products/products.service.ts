import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, DataSource, FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { validate as isUUID } from 'uuid';
import { ProductImage, Product } from './entities';
import { User } from '../users/entities/user.entity';
import { handleDBErrors } from 'src/common/utils/handleDBErros';
import { stringToSlug } from 'src/common/utils/string-to-slug';
import { PaginationProductsDto } from './dto/pagination.products.dto';
import { FiltersProductDto } from './dto/filters.product.dto';

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,

		@InjectRepository(ProductImage)
		private readonly productImageRepository: Repository<ProductImage>,

		private readonly dataSource: DataSource
	) {}

	async create(createProductDto: CreateProductDto, user: User) {
		try {
			const { images = [], ...productDetails } = createProductDto;

			const product = this.productRepository.create({
				...productDetails,
				images: images.map(image =>
					this.productImageRepository.create({ url: image })
				),
				user,
			});

			await this.productRepository.save(product);

			return { ...product, images };
		} catch (error) {
			handleDBErrors(error);
		}
	}

	async findByPagination(paginationDto: PaginationProductsDto) {
		const {
			limit = 10,
			offset = 0,
			gender,
			sizes,
			categories,
			status,
		} = paginationDto || {};

		const products = await this.productRepository.find({
			take: limit,
			skip: offset,
			where: {
				gender,
				sizes: sizes ? ArrayContains(sizes) : null,
				categories: categories ? { idcategory: In(categories) } : null,
				status,
			},
			order: { dateCreated: 'DESC' },
		});

		return products.map(product => ({
			...product,
			images: product.images.map(img => img.url),
		}));
	}

	async findAll(where?: FindOptionsWhere<Product> | FindOptionsWhere<Product>[]) {
		const products = await this.productRepository.find({
			where,
			order: { dateCreated: 'DESC' },
		});

		return products.map(product => ({
			...product,
			images: product.images.map(img => img.url),
		}));
	}

	async findAllByCategory(idcategory: string) {
		const products = await this.productRepository.find({
			where: { categories: { idcategory } },
			order: { dateCreated: 'DESC' },
		});

		return products.map(product => ({
			...product,
			images: product.images.map(img => img.url),
		}));
	}

	async findAllByBrand(idbrand: string) {
		const products = await this.productRepository.find({
			where: { brand: { idbrand } },
			order: { dateCreated: 'DESC' },
		});

		return products.map(product => ({
			...product,
			images: product.images.map(img => img.url),
		}));
	}

	async findAllByFilters(filters: FiltersProductDto) {
		const { categoryID, brandID, providerID } = filters;
		const products = await this.productRepository.find({
			where: {
				categories: categoryID && { idcategory: categoryID },
				brand: brandID && { idbrand: brandID },
				providers: providerID && { idprovider: providerID },
			},
			order: { dateCreated: 'DESC' },
		});

		return products.map(product => ({
			...product,
			images: product.images.map(img => img.url),
		}));
	}

	async findAllByProvider(idprovider: string) {
		const products = await this.productRepository.find({
			where: { providers: { idprovider } },
			order: { dateCreated: 'DESC' },
		});

		return products.map(product => ({
			...product,
			images: product.images.map(img => img.url),
		}));
	}

	async findOne(term: string) {
		let product: Product;

		if (isUUID(term)) {
			product = await this.productRepository.findOneBy({ id: term });
		} else {
			product = await this.productRepository.findOne({
				where: [
					{ title: term.toUpperCase() },
					{ slug: stringToSlug(term) },
				],
			});
		}

		if (!product) throw new NotFoundException(`Product with ${term} not found`);
		return product;
	}

	async findOnePlain(term: string) {
		const { images = [], ...rest } = await this.findOne(term);
		return { ...rest, images: images.map(image => image.url) };
	}

	async update(id: string, updateProductDto: UpdateProductDto, user: User) {
		const { images, ...toUpdate } = updateProductDto;

		const product = await this.productRepository.preload({ id, ...toUpdate });

		if (!product) throw new NotFoundException(`Product with id: ${id} not found`);

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			if (images) {
				await queryRunner.manager.delete(ProductImage, { product: { id } });

				product.images = images.map(image =>
					this.productImageRepository.create({ url: image })
				);
			}
			product.user = user;

			await queryRunner.manager.save(product);

			await queryRunner.commitTransaction();
			await queryRunner.release();

			return this.findOnePlain(id);
		} catch (error) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();
			handleDBErrors(error);
		}
	}

	async remove(id: string) {
		const product = await this.findOne(id);
		await this.productRepository.remove(product);
	}

	async deleteAllProducts() {
		const query = this.productRepository.createQueryBuilder('product');

		try {
			return await query.delete().where({}).execute();
		} catch (error) {
			handleDBErrors(error);
		}
	}
}
