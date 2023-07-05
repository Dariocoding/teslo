import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Auth, GetUser } from "../auth/common/decorators";
import { User } from "../users/entities/user.entity";
import { TempDetailService } from "./tempDetail.service";
import { CreateTempOrderDto } from "./dto/create-temp-order.dto";
import { UpdateTempOrderDto } from "./dto/update-temp-order.dto";

@Controller("detail-temp-orders")
@ApiTags("5.5 - Orders")
@Auth()
export class TempDetailController {
	constructor(private readonly tempDetailService: TempDetailService) {}

	@Get()
	getDetailsOrders(@GetUser() user: User) {
		return this.tempDetailService.getByUser(user.iduser);
	}

	@Post()
	createTempOrder(@Body() createTempOrderDto: CreateTempOrderDto, @GetUser() userOrder: User) {
		return this.tempDetailService.create(createTempOrderDto, userOrder);
	}

	@Put("/:id")
	updateTempOrder(
		@Body() updateTempOrderDto: UpdateTempOrderDto,
		@Param("id", ParseIntPipe) id: number
	) {
		return this.tempDetailService.update(id, updateTempOrderDto);
	}

	@Delete()
	deleteTempOrders(@GetUser() user: User) {
		return this.tempDetailService.deleteAll(user.iduser);
	}

	@Delete("/:id")
	deleteTempOrder(@GetUser() user: User, @Param("id", ParseIntPipe) id: number) {
		return this.tempDetailService.deleteOne(id, user.iduser);
	}
}
