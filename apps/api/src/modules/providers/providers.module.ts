import { Module, Global } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';

@Global()
@Module({
	controllers: [ProvidersController],
	providers: [ProvidersService],
	imports: [TypeOrmModule.forFeature([Provider])],
	exports: [TypeOrmModule],
})
export class ProvidersModule {}
