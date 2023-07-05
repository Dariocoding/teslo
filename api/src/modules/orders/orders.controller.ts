import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	HttpStatus,
	ParseIntPipe,
	Query,
	Header,
	StreamableFile,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Auth, GetUser } from "../auth/common/decorators";
import { JwtPayload } from "../auth/interfaces";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Order } from "./entities/order.entity";
import { ValidRoles } from "@teslo/interfaces";
import { FindOrdersByDateDto } from "./dto/find-orders-by-date.dto";
import { ConfigEnterpriseService } from "../config-enterprise/config-enterprise.service";
import { firstValueFrom } from "rxjs";
import { formatDateDDMMYYYY } from "src/common/utils";
import { PDFService } from "@t00nday/nestjs-pdf";
import { FilesService } from "src/files/files.service";
import { base64_encode } from "src/files/common/utils/base64_encode";

@Controller("orders")
@ApiTags("5 - Orders")
export class OrdersController {
	constructor(
		private readonly ordersService: OrdersService,
		private readonly settingsEnterpriseService: ConfigEnterpriseService,
		private readonly pdfService: PDFService,
		private readonly filesService: FilesService
	) {}

	@Post()
	@Auth()
	@ApiResponse({ type: () => Order, status: HttpStatus.CREATED })
	create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: JwtPayload) {
		return this.ordersService.create(createOrderDto, user);
	}

	@Post("/seller")
	@Auth()
	@ApiResponse({ type: () => Order, status: HttpStatus.CREATED })
	createdBySeller(@Body() createOrderDto: CreateOrderDto, @GetUser() user: JwtPayload) {
		return this.ordersService.create(createOrderDto, null, user);
	}

	@Get()
	@Auth()
	@ApiResponse({ type: () => Order, status: HttpStatus.OK, isArray: true })
	findAll(@GetUser() user: JwtPayload, @Query() findOrdersByDateDto: FindOrdersByDateDto) {
		return this.ordersService.findAll(user, findOrdersByDateDto);
	}

	@Get("/all/:userid")
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: () => Order, status: HttpStatus.OK, isArray: true })
	findAllByUserId(@Param("userid") userid: string) {
		return this.ordersService.finAllByUserId(userid);
	}

	@Get("/all-payment-method/:id")
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: () => Order, status: HttpStatus.OK, isArray: true })
	findAllByPaymentMethod(@Param("id", ParseIntPipe) id: number) {
		return this.ordersService.finAllByPaymentMethodId(id);
	}

	@Get(":id")
	@Auth()
	@ApiResponse({ type: () => Order, status: HttpStatus.OK })
	findOne(@Param("id") id: string, @GetUser() user: JwtPayload) {
		return this.ordersService.findOne(+id, user);
	}

	@Put(":id")
	@Auth(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
	@ApiResponse({ type: () => Order, status: HttpStatus.OK })
	update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
		return this.ordersService.update(+id, updateOrderDto);
	}

	@Get("exports/pdf/:id")
	@Header("Content-Type", "image/pdf")
	@Header("Content-Disposition", "attachment; filename=pago.pdf")
	@Auth()
	async exportarPagoPdf(@GetUser() currentUser: JwtPayload, @Param("id") idpago: string) {
		const configuracion = await this.settingsEnterpriseService.find();
		let pago = await this.ordersService.findOne(+idpago, currentUser);
		pago.dateCreated = formatDateDDMMYYYY(pago.dateCreated) as any;
		configuracion.name = configuracion.name?.toUpperCase?.();
		const locationLogo = this.filesService.getLogoEnterpriseImage("light", "streamline");
		const imgSrc = base64_encode(locationLogo);
		pago = {
			...pago,
			detail: pago.detail.map(detail => {
				//@ts-ignore
				detail.totalDetail = detail.total * detail.quantity;
				detail.title = detail.title + (detail.size ? ` (${detail.size})` : "");
				return detail;
			}),
		};

		console.log({ detail: pago.detail });

		const file = await firstValueFrom(
			this.pdfService.toStream("pago", {
				locals: { pago, configuracion, imgSrc },
			})
		);
		return new StreamableFile(file);
	}
}
