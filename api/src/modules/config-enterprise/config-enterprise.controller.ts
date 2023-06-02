import { Controller, Get, Body, Put, Param, Delete } from '@nestjs/common';
import { ConfigEnterpriseService } from './config-enterprise.service';
import { UpdateConfigEnterpriseDto } from './dto/update-config-enterprise.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('config-enterprise')
@ApiTags('Config Enterprise')
export class ConfigEnterpriseController {
	constructor(private readonly configEnterpriseService: ConfigEnterpriseService) {}

	@Get()
	find() {
		return this.configEnterpriseService.find();
	}

	@Put()
	update(@Body() updateConfigEnterpriseDto: UpdateConfigEnterpriseDto) {
		return this.configEnterpriseService.update(updateConfigEnterpriseDto);
	}
}
