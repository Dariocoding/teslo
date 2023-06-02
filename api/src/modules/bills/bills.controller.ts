import { Controller, Get, Post, Body, Put, Param, Delete, Query, HttpStatus } from '@nestjs/common';
import { BillsService } from './bills.service';
import { FindBillsByDateDto } from './dto/find-bills.dto';
import { CreateBillDto, UpdateBillDto } from './dto';
import { Auth } from '../auth/common/decorators';
import { ValidRoles } from '@teslo/interfaces';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Bill } from './entities';

@Controller('bills')
@ApiTags('9 - Bills')
export class BillsController {
	constructor(private readonly billsService: BillsService) {}

	@Post()
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: () => Bill, status: HttpStatus.OK })
	create(@Body() createBillDto: CreateBillDto) {
		return this.billsService.create(createBillDto);
	}

	@Get()
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: () => Bill, status: HttpStatus.OK, isArray: true })
	findAll(@Query() findBillsByDateDto: FindBillsByDateDto) {
		return this.billsService.findAll(findBillsByDateDto);
	}

	@Get(':id')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: () => Bill, status: HttpStatus.OK })
	findOne(@Param('id') id: string) {
		return this.billsService.findOne(+id);
	}

	@Put(':id')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: () => Bill, status: HttpStatus.OK })
	update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
		return this.billsService.update(+id, updateBillDto);
	}

	@Delete(':id')
	@Auth(ValidRoles.SUPER_USER)
	remove(@Param('id') id: string) {
		return this.billsService.remove(+id);
	}
}
