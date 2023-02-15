import { Controller, Get, Post, Body, Put, Param, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Auth, GetUser } from '../auth/common/decorators';
import { JwtPayload } from '../auth/interfaces';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { ValidRoles } from '@teslo/interfaces';

@Controller('orders')
@ApiTags('5 - Orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	@Auth()
	@ApiResponse({ type: () => Order, status: HttpStatus.CREATED })
	create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: JwtPayload) {
		return this.ordersService.create(createOrderDto, user);
	}

	@Get()
	@Auth()
	@ApiResponse({ type: () => Order, status: HttpStatus.OK, isArray: true })
	findAll(@GetUser() user: JwtPayload) {
		return this.ordersService.findAll(user);
	}

	@Get('/all/:userid')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: () => Order, status: HttpStatus.OK, isArray: true })
	findAllByUserId(@Param('userid') userid: string) {
		return this.ordersService.finAllByUserId(userid);
	}

	@Get('/all-payment-method/:id')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: () => Order, status: HttpStatus.OK, isArray: true })
	findAllByPaymentMethod(@Param('id', ParseIntPipe) id: number) {
		return this.ordersService.finAllByPaymentMethodId(id);
	}

	@Get(':id')
	@Auth()
	@ApiResponse({ type: () => Order, status: HttpStatus.OK })
	findOne(@Param('id') id: string, @GetUser() user: JwtPayload) {
		return this.ordersService.findOne(+id, user);
	}

	@Put(':id')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: () => Order, status: HttpStatus.OK })
	update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
		return this.ordersService.update(+id, updateOrderDto);
	}
}
