import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/modules/products/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { ValidSizes } from "@teslo/interfaces";

@Entity("detail-order")
export class DetailOrder {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id?: number;

  @Column()
  @ApiProperty()
  total?: number;

  @Column({ type: "float", default: 0, nullable: false })
  @ApiProperty()
  quantity?: number;

  @Column({ default: "" })
  @ApiProperty()
  title?: string;

  @Column({ nullable: true })
  @ApiProperty()
  size?: ValidSizes;

  @ManyToOne(() => Product, (product) => product.detailOrders, { eager: true })
  @ApiProperty({ type: () => Product })
  @JoinColumn({ name: "productid" })
  product: Product;

  @ManyToOne(() => Order, (order) => order.detail)
  @ApiProperty()
  @JoinColumn({ name: "orderid" })
  order?: Order;
}
