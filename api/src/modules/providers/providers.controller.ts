import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpStatus,
	ParseUUIDPipe,
	Put,
} from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Auth } from '../auth/common/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidRoles } from '@teslo/interfaces';
import { Provider } from './entities/provider.entity';

@Controller('providers')
@ApiTags('8 - Providers')
export class ProvidersController {
	constructor(private readonly providersService: ProvidersService) {}

	@Post()
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
	@ApiResponse({ status: HttpStatus.CREATED, type: Provider, isArray: false })
	create(@Body() createProviderDto: CreateProviderDto) {
		return this.providersService.create(createProviderDto);
	}

	@Get()
	@ApiResponse({ status: HttpStatus.OK, type: Provider, isArray: true })
	findAll() {
		return this.providersService.findAll();
	}

	@Get(':term')
	@ApiResponse({ status: HttpStatus.OK, type: Provider, isArray: false })
	findOne(@Param('term') term: string) {
		return this.providersService.findOne(term);
	}

	@Put(':idprovider')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ status: HttpStatus.OK, type: Provider, isArray: false })
	update(
		@Param('idprovider', ParseUUIDPipe) idprovider: string,
		@Body() updateCategoryDto: UpdateProviderDto
	) {
		return this.providersService.update(idprovider, updateCategoryDto);
	}

	@Delete(':idprovider')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	remove(@Param('idprovider', ParseUUIDPipe) idprovider: string) {
		return this.providersService.remove(idprovider);
	}
}
