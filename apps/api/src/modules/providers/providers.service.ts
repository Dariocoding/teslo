import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { DataSource, Repository } from 'typeorm';
import { handleDBErrors, stringToSlug } from 'src/common/utils';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class ProvidersService {
	constructor(
		@InjectRepository(Provider)
		private providerRepository: Repository<Provider>,
		private readonly dataSource: DataSource
	) {}

	async create(createProviderDto: CreateProviderDto) {
		try {
			const provider = this.providerRepository.create({
				...createProviderDto,
			});

			await this.providerRepository.save(provider);

			return provider;
		} catch (error) {
			handleDBErrors(error);
		}
	}

	async findByPagination(paginationDto: PaginationDto) {
		const { limit = 10, offset = 0 } = paginationDto || {};

		const providers = await this.providerRepository.find({
			take: limit,
			skip: offset,
		});

		return providers;
	}

	findAll() {
		return this.providerRepository.find({ order: { dateCreated: 'DESC' } });
	}

	async findOne(term: string) {
		let provider: Provider;

		if (isUUID(term)) {
			provider = await this.providerRepository.findOneBy({ idprovider: term });
		} else {
			provider = await this.providerRepository.findOne({
				where: [
					{ name: term.toUpperCase() },
					{ slug: stringToSlug(term as string) },
				],
			});
		}

		if (!provider) {
			throw new NotFoundException(`Provider with ${term} not found`);
		}
		return provider;
	}

	async update(idprovider: string, updateProviderDto: UpdateProviderDto) {
		const provider = await this.providerRepository.preload({
			idprovider,
			...updateProviderDto,
			slug: stringToSlug(updateProviderDto.name),
		});

		if (!provider)
			throw new NotFoundException(`Provider with id: ${idprovider} not found`);

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			await queryRunner.manager.save(provider);
			await queryRunner.commitTransaction();
			await queryRunner.release();
			return await this.findOne(idprovider);
		} catch (error) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();
			handleDBErrors(error);
		}
	}

	async remove(idprovider: string) {
		const query = this.providerRepository.createQueryBuilder('providers');

		try {
			return await query.delete().where({ idprovider }).execute();
		} catch (error) {
			handleDBErrors(error);
		}
	}
}
