import { Module } from '@nestjs/common';

import { AuthModule } from '../modules/auth/auth.module';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from 'src/modules/products/products.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ProductsModule, AuthModule, CategoriesModule],
})
export class SeedModule {}
