import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidRoles, ValidStatusOrder } from "@teslo/interfaces";
import { formatDateYYYYMMDD, getDaysInMonth, MONTHS } from "src/common/utils";
import { Connection, FindOperator, Not, Repository } from "typeorm";
import { Category } from "../categories/entities/category.entity";
import { Order } from "../orders/entities/order.entity";
import { Product } from "../products/entities";
import { User } from "../users/entities/user.entity";
import { FindOrdersAnioDto, FindOrdersByAnioMonthDto, FindStatisticQueryDto } from "./dto";
import { JwtPayload } from "../auth/interfaces";

@Injectable()
export class DashboardService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,

		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,

		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,

		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>,

		private connection: Connection
	) {}

	countUsers() {
		return this.userRepository.count({
			where: { isDeleted: Not(true) as FindOperator<true> },
		});
	}

	countOrders() {
		return this.orderRepository.count();
	}

	countProducts() {
		return this.productRepository.count();
	}

	countCategories() {
		return this.categoryRepository.count();
	}

	findTenLastUsers() {
		return this.userRepository.find({
			take: 10,
			where: { isDeleted: Not(true) as FindOperator<true> },
			order: { dateCreated: "DESC" },
		});
	}

	findTenLastOrders() {
		return this.orderRepository.find({
			order: { idorder: "DESC" },
			relations: { user: true },
		});
	}

	async findPaymentMethodsOrders(
		year: number,
		month: number,
		user: JwtPayload,
		query: FindStatisticQueryDto
	) {
		const { status = "completed" } = query;
		const SELECTINNERJOIN = `SELECT  
		tp.* ,COUNT(p.idpaymentmethod) AS quantity,
		SUM(p.total) AS total FROM orders p 
	INNER JOIN "payment-methods" tp
	ON p.idpaymentmethod = tp.idpaymentmethod `;
		let WHERE = `WHERE EXTRACT(MONTH FROM p.date_created) = ${month}
	AND EXTRACT(YEAR FROM p.date_created) = ${year} AND p.status = '${status}' `;
		const GROUP = "GROUP BY p.idpaymentmethod, tp.idpaymentmethod";

		if (user.roles?.includes?.(ValidRoles.USER)) {
			WHERE += `AND p.user_order = ${user.iduser} `;
		} else if (user.roles?.includes?.(ValidRoles.SELLER)) {
			WHERE += `AND p.user_sell = ${user.iduser}`;
		}

		const months = MONTHS();
		const paymentMethods = await this.connection.query(SELECTINNERJOIN + WHERE + GROUP);
		return { year, month: months[month - 1], paymentMethods };
	}

	async findOrdersByYearAndMonth(
		year: number,
		month: number,
		user: JwtPayload,
		query: FindStatisticQueryDto
	): Promise<FindOrdersByAnioMonthDto> {
		const { status = "completed" } = query;
		const dias = getDaysInMonth(year, month);
		let totalOrdersMonth = 0;
		let n_day = 1;
		let arrOrdersMonth = [];

		for (let i = 0; i < dias; i++) {
			const date = new Date(year, month - 1, n_day);
			const dateOrder = formatDateYYYYMMDD(date);
			let query = `SELECT count(idorder) AS quantity, SUM(total) AS total FROM orders `;
			query += `WHERE DATE(date_created) = '${dateOrder}' AND status = '${status}'`;
			if (user.roles?.includes?.(ValidRoles.USER)) {
				query += `AND user_order = ${user.iduser} `;
			} else if (user.roles?.includes?.(ValidRoles.SELLER)) {
				query += `AND user_sell = ${user.iduser}`;
			}

			const orderDay = await this.connection.query(query);

			orderDay[0].day = n_day;
			orderDay[0].total = !orderDay[0].total ? 0 : orderDay[0].total;
			totalOrdersMonth += orderDay[0].total;
			arrOrdersMonth.push(orderDay[0]);
			n_day++;
		}
		const meses = MONTHS();

		return {
			year,
			month: meses[month - 1],
			total: totalOrdersMonth.toFixed(2),
			orders: arrOrdersMonth,
		};
	}

	async findOrdersByAnio(
		year: number,
		user: JwtPayload,
		query: FindStatisticQueryDto
	): Promise<FindOrdersAnioDto> {
		const { status = "completed" } = query;
		let arrMOrders = [];
		for (let i = 1; i <= 12; i++) {
			const arrData = { num_month: i, sell: 0 };
			let query = `SELECT SUM(total) AS total FROM orders `;
			query += `WHERE EXTRACT(MONTH FROM date_created) = ${i} AND EXTRACT(YEAR FROM date_created) = ${year} `;
			query += `AND status = '${status}' `;
			if (user.roles?.includes?.(ValidRoles.USER)) {
				query += `AND user_order = ${user.iduser} `;
			} else if (user.roles?.includes?.(ValidRoles.SELLER)) {
				query += `AND user_sell = ${user.iduser}`;
			}
			query += `GROUP BY EXTRACT(MONTH FROM date_created)`;
			const request = await this.connection.query(query);

			if (request[0]) arrData.sell = request[0].total;
			arrMOrders.push(arrData);
		}

		return { year, orders: arrMOrders };
	}
}
