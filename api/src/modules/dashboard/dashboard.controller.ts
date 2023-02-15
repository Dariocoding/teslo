import { Controller, Get, Param, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidRoles } from '@teslo/interfaces';
import { Auth } from '../auth/common/decorators';
import { Order } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity';
import { DashboardService } from './dashboard.service';
import {
	CounterDashboardDto,
	FindOrdersAnioDto,
	FindOrdersByAnioMonthDto,
	findPaymentMethodsOrders,
} from './dto';

@Controller('dashboard')
@ApiTags('0 - Dashboard')
export class DashboardController {
	constructor(private readonly dashboardService: DashboardService) {}

	@Get('/counters')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: CounterDashboardDto, status: HttpStatus.OK })
	async findAll() {
		const [totalCategories, totalOrders, totalProducts, totalUsers] = await Promise.all(
			[
				this.dashboardService.countCategories(),
				this.dashboardService.countOrders(),
				this.dashboardService.countProducts(),
				this.dashboardService.countUsers(),
			]
		);

		return { totalCategories, totalOrders, totalProducts, totalUsers };
	}

	@Get('/getTenUsers')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: User, isArray: true, status: HttpStatus.OK })
	findTenUsers() {
		return this.dashboardService.findTenLastUsers();
	}

	@Get('/getTenOrders')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: Order, isArray: true, status: HttpStatus.OK })
	findTenOrders() {
		return this.dashboardService.findTenLastOrders();
	}

	@Get('findPaymentMethods/:year/:mes')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: () => findPaymentMethodsOrders, status: HttpStatus.OK })
	findPaymentMethodsByYearMonth(@Param('year') year: string, @Param('mes') mes: string) {
		return this.dashboardService.findPaymentMethodsOrders(+year, +mes);
	}

	@Get('findOrders/:year/:mes')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: FindOrdersByAnioMonthDto, status: HttpStatus.OK })
	findOrdersByMonthAndYear(@Param('year') year: string, @Param('mes') mes: string) {
		return this.dashboardService.findOrdersByYearAndMonth(+year, +mes);
	}

	@Get('findAllOrders/:year')
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: FindOrdersAnioDto, status: HttpStatus.OK })
	findVentasAnioCohorteActual(@Param('year') year: string) {
		return this.dashboardService.findOrdersByAnio(+year);
	}
}
