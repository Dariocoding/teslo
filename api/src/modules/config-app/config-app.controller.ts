import { Controller, Get, Body, Param, Put, Query } from '@nestjs/common';
import { ConfigAppService } from './config-app.service';
import { UpdateConfigAppDto } from './dto/update-config-app.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetConfigAppParams } from './dto/get-config-app-params';
import { Auth, GetUser } from '../auth/common/decorators';
import { User } from '../users/entities/user.entity';

@Controller('config-app')
@ApiTags('Config App')
export class ConfigAppController {
	constructor(private readonly configAppService: ConfigAppService) {}

	@Get()
	find(@Query() query: GetConfigAppParams) {
		return this.configAppService.find(query);
	}

	@Put()
	update(@Body() updateConfigAppDto: UpdateConfigAppDto) {
		return this.configAppService.update(updateConfigAppDto);
	}
}
