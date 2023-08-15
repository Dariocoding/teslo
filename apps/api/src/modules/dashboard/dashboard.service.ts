import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidRol, ValidRoles, ValidStatusOrder } from "@teslo/interfaces";
import { formatDateYYYYMMDD, getDaysInMonth, MONTHS } from "src/common/utils";
import {
  ArrayContains,
  Between,
  Connection,
  FindOperator,
  FindOptionsWhere,
  Not,
  Repository,
} from "typeorm";
import { Category } from "../categories/entities/category.entity";
import { Order } from "../orders/entities/order.entity";
import { Product } from "../products/entities";
import { User } from "../users/entities/user.entity";
import { FindOrdersAnioDto, FindOrdersByAnioMonthDto, FindStatisticQueryDto } from "./dto";
import { JwtPayload } from "../auth/interfaces";
import { FindBillsByYearAndMonthDto, FindBillsByYearDto } from "./dto/FindBillsByYearMonth.dto";

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1);
}

function getLastDayOfMonth(year: number, month: number) {
  return new Date(year, month + 1, 0);
}

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

  countUsers(user: JwtPayload) {
    let whereUserRoles: FindOptionsWhere<User> = {};
    if (user.roles?.includes(ValidRoles.SELLER)) {
      whereUserRoles.roles = ArrayContains<ValidRol>([ValidRoles.USER]);
    }

    return this.userRepository.count({
      where: { ...whereUserRoles },
    });
  }

  countOrders(userJWT: JwtPayload) {
    const whereUser = this.getQueryUser(userJWT);
    return this.orderRepository.count({
      where: {
        ...whereUser,
        dateCreated: Between(
          getFirstDayOfMonth(new Date().getFullYear(), new Date().getMonth()),
          getLastDayOfMonth(new Date().getFullYear(), new Date().getMonth())
        ),
      },
    });
  }

  countProducts() {
    return this.productRepository.count();
  }

  countCategories() {
    return this.categoryRepository.count();
  }

  findTenLastUsers(user: JwtPayload) {
    let whereUser: FindOptionsWhere<User> = {};
    if (user.roles.includes(ValidRoles.SELLER)) {
      whereUser.roles = ArrayContains([ValidRoles.USER]);
    }

    return this.userRepository.find({
      take: 10,
      where: { ...whereUser },
      order: { dateCreated: "DESC" },
    });
  }

  findTenLastOrders(userJWT: JwtPayload) {
    const whereUser = this.getQueryUser(userJWT);
    return this.orderRepository.find({
      where: { ...whereUser },
      order: { idorder: "DESC" },
      relations: { user: true },
      take: 10,
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
    let WHERE = `WHERE EXTRACT(MONTH FROM p.date_created) = ${month} AND EXTRACT(YEAR FROM p.date_created) = ${year} AND p.status = '${status}' `;
    const GROUP = "GROUP BY p.idpaymentmethod, tp.idpaymentmethod";

    if (user.roles?.includes?.(ValidRoles.USER)) {
      WHERE += `AND p.user_order = '${user.iduser}' `;
    } else if (user.roles?.includes?.(ValidRoles.SELLER)) {
      WHERE += `AND p.user_sell = '${user.iduser}' `;
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
        query += `AND user_order = '${user.iduser}' `;
      } else if (user.roles?.includes?.(ValidRoles.SELLER)) {
        query += `AND user_sell = '${user.iduser}' `;
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
        query += `AND user_order = '${user.iduser}' `;
      } else if (user.roles?.includes?.(ValidRoles.SELLER)) {
        query += `AND user_sell = '${user.iduser}' `;
      }
      query += `GROUP BY EXTRACT(MONTH FROM date_created)`;
      const request = await this.connection.query(query);

      if (request[0]) arrData.sell = request[0].total;
      arrMOrders.push(arrData);
    }

    return { year, orders: arrMOrders };
  }

  async findBillsByYearAndMonth(
    year: number,
    month: number,
    query: FindStatisticQueryDto
  ): Promise<FindBillsByYearAndMonthDto> {
    const { status = "completed" } = query;
    const dias = getDaysInMonth(year, month);
    let totalOrdersMonth = 0;
    let n_day = 1;
    let arrOrdersMonth = [];

    for (let i = 0; i < dias; i++) {
      const date = new Date(year, month - 1, n_day);
      const dateOrder = formatDateYYYYMMDD(date);
      let query = `SELECT count(idbill) AS quantity, SUM(total) AS total FROM bill `;
      query += `WHERE DATE(date_created) = '${dateOrder}' AND status = '${status}'`;
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
      bills: arrOrdersMonth,
    };
  }

  async findBillsByAnio(year: number, query: FindStatisticQueryDto): Promise<FindBillsByYearDto> {
    const { status = "completed" } = query;
    let arrMOrders = [];
    for (let i = 1; i <= 12; i++) {
      const arrData = { num_month: i, sell: 0 };
      let query = `SELECT SUM(total) AS total FROM bill `;
      query += `WHERE EXTRACT(MONTH FROM date_created) = ${i} AND EXTRACT(YEAR FROM date_created) = ${year} `;
      query += `AND status = '${status}' `;
      query += `GROUP BY EXTRACT(MONTH FROM date_created)`;
      const request = await this.connection.query(query);
      if (request[0]) arrData.sell = request[0].total;
      arrMOrders.push(arrData);
    }
    return { year, bills: arrMOrders };
  }

  async getBestProductSellers() {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);

    const SQL = `SELECT product.id, product.title, product.slug, product.stock, product.custom_code,
    SUM(dtorder.total * dtorder.quantity) as total, product.code,
    SUM(dtorder.quantity) as totalQty
    FROM products product
    INNER JOIN product_images as pr_images ON pr_images.productid = product.id
    INNER JOIN public."detail-order" dtorder ON product.id = dtorder.productid
    INNER JOIN orders o ON o.idorder = dtorder.orderid
    WHERE o.date_created BETWEEN '${start.toISOString()}' AND '${today.toISOString()}'
    GROUP BY product.id
    ORDER BY total DESC
    LIMIT 5`;

    const products = await this.connection.query(SQL);
    return products;
  }

  private getQueryUser(userJWT: JwtPayload) {
    let where: FindOptionsWhere<Order>;
    if (userJWT?.roles?.includes?.(ValidRoles.USER)) {
      where = { user: { iduser: userJWT.iduser } };
    } else if (userJWT?.roles?.includes?.(ValidRoles.SELLER)) {
      where = { userSell: { iduser: userJWT.iduser } };
    }
    return where || {};
  }
}
