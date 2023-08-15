import { Module, Global } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';

@Global()
@Module({
	controllers: [BrandsController],
	providers: [BrandsService],
	imports: [TypeOrmModule.forFeature([Brand])],
	exports: [TypeOrmModule],
})
export class BrandsModule {}
