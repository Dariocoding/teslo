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
  @Auth()
  @ApiResponse({ type: CounterDashboardDto, status: HttpStatus.OK })
  async findAll(@GetUser() user: JwtPayload) {
    const [totalCategories, totalOrders, totalProducts, totalUsers] = await Promise.all([
      this.dashboardService.countCategories(),
      this.dashboardService.countOrders(user),
      this.dashboardService.countProducts(),
      this.dashboardService.countUsers(user),
    ]);

    return { totalCategories, totalOrders, totalProducts, totalUsers };
  }

  @Get("/getTenUsers")
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR, ValidRoles.SELLER)
  @ApiResponse({ type: User, isArray: true, status: HttpStatus.OK })
  findTenUsers(@GetUser() user: JwtPayload) {
    return this.dashboardService.findTenLastUsers(user);
  }

  @Get("/getTenOrders")
  @Auth()
  @ApiResponse({ type: Order, isArray: true, status: HttpStatus.OK })
  findTenOrders(@GetUser() user: JwtPayload) {
    return this.dashboardService.findTenLastOrders(user);
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

  @Get("findBills/:year/:mes")
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR)
  @ApiResponse({ type: FindOrdersByAnioMonthDto, status: HttpStatus.OK })
  findBillsByMonthAndYear(
    @Param("year") year: string,
    @Param("mes") mes: string,
    @Query() query: FindStatisticQueryDto
  ) {
    return this.dashboardService.findBillsByYearAndMonth(+year, +mes, query);
  }

  @Get("findAllBills/:year")
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR)
  @ApiResponse({ type: FindOrdersByAnioMonthDto, status: HttpStatus.OK })
  findBillsByYear(@Param("year") year: string, @Query() query: FindStatisticQueryDto) {
    return this.dashboardService.findBillsByAnio(+year, query);
  }
}
