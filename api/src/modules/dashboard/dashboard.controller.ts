import { Controller, Get, Param, HttpStatus, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ValidRoles } from "@teslo/interfaces";
import { Auth, GetUser } from "../auth/common/decorators";
import { Order } from "../orders/entities/order.entity";
import { User } from "../users/entities/user.entity";
import { DashboardService } from "./dashboard.service";
import {
	CounterDashboardDto,
	FindOrdersAnioDto,
	FindOrdersByAnioMonthDto,
	FindStatisticQueryDto,
	findPaymentMethodsOrders,
} from "./dto";
import { JwtPayload } from "../auth/interfaces";

@Controller("dashboard")
@ApiTags("0 - Dashboard")
export class DashboardController {
	constructor(private readonly dashboardService: DashboardService) {}

	@Get("/counters")
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: CounterDashboardDto, status: HttpStatus.OK })
	async findAll() {
		const [totalCategories, totalOrders, totalProducts, totalUsers] = await Promise.all([
			this.dashboardService.countCategories(),
			this.dashboardService.countOrders(),
			this.dashboardService.countProducts(),
			this.dashboardService.countUsers(),
		]);

		return { totalCategories, totalOrders, totalProducts, totalUsers };
	}

	@Get("/getTenUsers")
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: User, isArray: true, status: HttpStatus.OK })
	findTenUsers() {
		return this.dashboardService.findTenLastUsers();
	}

	@Get("/getTenOrders")
	@Auth()
	@ApiResponse({ type: Order, isArray: true, status: HttpStatus.OK })
	findTenOrders() {
		return this.dashboardService.findTenLastOrders();
	}

	@Get("findPaymentMethods/:year/:mes")
	@Auth()
	@ApiResponse({ type: () => findPaymentMethodsOrders, status: HttpStatus.OK })
	findPaymentMethodsByYearMonth(
		@Param("year") year: string,
		@Param("mes") mes: string,
		@GetUser() user: JwtPayload,
		@Query() query: FindStatisticQueryDto
	) {
		return this.dashboardService.findPaymentMethodsOrders(+year, +mes, user, query);
	}

	@Get("findOrders/:year/:mes")
	@Auth()
	@ApiResponse({ type: FindOrdersByAnioMonthDto, status: HttpStatus.OK })
	findOrdersByMonthAndYear(
		@Param("year") year: string,
		@Param("mes") mes: string,
		@GetUser() user: JwtPayload,
		@Query() query: FindStatisticQueryDto
	) {
		return this.dashboardService.findOrdersByYearAndMonth(+year, +mes, user, query);
	}

	@Get("findAllOrders/:year")
	@Auth()
	@ApiResponse({ type: FindOrdersAnioDto, status: HttpStatus.OK })
	findVentasAnioCohorteActual(
		@Param("year") year: string,
		@GetUser() user: JwtPayload,
		@Query() query: FindStatisticQueryDto
	) {
		return this.dashboardService.findOrdersByAnio(+year, user, query);
	}
}
