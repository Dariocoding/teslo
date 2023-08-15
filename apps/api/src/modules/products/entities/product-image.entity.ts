import { ApiProperty } from "@nestjs/swagger";
import { Product } from ".";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "product_images" })
export class ProductImage {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column("text")
  @ApiProperty()
  url: string;

  @ApiProperty()
  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "productid" })
  product: Product;
}
