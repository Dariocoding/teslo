import { ApiProperty } from "@nestjs/swagger";
import { Size } from "@teslo/interfaces";
import { Product } from "src/modules/products/entities";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("detail-temp-order")
export class DetailTempOrder {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.orders)
  userOrder?: User;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, (product) => product.detailTempOrders, { nullable: true })
  product?: Product;

  @ApiProperty()
  @Column({ type: "float" })
  qty: number;

  @ApiProperty()
  @Column({ nullable: true })
  size: Size;

  @ApiProperty()
  @Column({ nullable: true })
  title: string;

  @ApiProperty()
  @Column({ nullable: true, type: "float" })
  price: number;
}
