import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { ProductImage } from ".";
import { User } from "src/modules/users/entities/user.entity";
import { stringToSlug } from "src/common/utils/string-to-slug";
import { Category } from "src/modules/categories/entities/category.entity";
import { DetailOrder } from "src/modules/orders/entities/detail.order.entity";
import { Gender, Size, ARRSIZES, StatusProduct } from "@teslo/interfaces";
import { Brand } from "src/modules/brands/entities/brand.entity";
import { Provider } from "src/modules/providers/entities/provider.entity";
import { DetailBill } from "src/modules/bills/entities";
import { DetailTempOrder } from "src/modules/orders/entities/detailTemp.order.entity";

@Entity({ name: "products" })
export class Product {
  @ApiProperty({
    example: "cd533345-f1f3-48c9-a62e-7dc2da50c8f8",
    description: "Product ID",
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @ApiProperty()
  @Column({ nullable: true, unique: true, default: null })
  customCode: string;

  @ApiProperty()
  @Column()
  @Generated("increment")
  code: number;

  @ApiProperty({
    example: "T-Shirt Teslo",
    description: "Product Title",
    uniqueItems: true,
  })
  @Column("text", {
    unique: true,
  })
  title?: string;

  @ApiProperty({})
  @Column("text", {
    unique: true,
  })
  slug?: string;

  @ApiProperty({
    example: 0,
    description: "Product price",
  })
  @Column("float", {
    default: 0,
  })
  price?: number;

  @ApiProperty({
    example: "Anim reprehenderit nulla in anim mollit minim irure commodo.",
    description: "Product description",
    default: null,
  })
  @Column({
    type: "text",
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    example: 10,
    description: "Product stock",
    default: 0,
  })
  @Column("int", {
    default: 0,
  })
  stock?: number;

  @ApiProperty({
    example: ARRSIZES,
    description: "Product sizes",
  })
  @Column("text", { array: true })
  sizes?: Size[];

  @ApiProperty({
    example: "women",
    description: "Product gender",
  })
  @Column("text", { nullable: true })
  gender?: Gender;

  @ApiProperty()
  @ManyToMany(() => Category, (category) => category.products, {
    eager: true,
    onDelete: "CASCADE",
  })
  categories: Category[];

  @ApiProperty()
  @ManyToOne(() => Brand, (brand) => brand.products, { eager: true })
  brand?: Brand;

  @ApiProperty()
  @ManyToMany(() => Provider, (provider) => provider.products, {
    onDelete: "CASCADE",
  })
  providers: Provider[];

  // images
  @ApiProperty()
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: string[] | ProductImage[];

  @ApiProperty()
  @Column({ nullable: true, default: "" })
  status?: StatusProduct;

  @ManyToOne(() => User, (user) => user.product)
  user?: User;

  @OneToMany(() => DetailOrder, (detail) => detail.product)
  detailOrders?: DetailOrder;

  @OneToMany(() => DetailOrder, (detail) => detail.product, { cascade: true, onDelete: "CASCADE" })
  detailTempOrders?: DetailTempOrder;

  @OneToMany(() => DetailBill, (detail) => detail.product)
  detailBills?: DetailBill;

  @CreateDateColumn({
    name: "date_created",
  })
  dateCreated?: Date;

  @BeforeInsert()
  checkSlugInsert?() {
    if (!this.slug) {
      this.slug = this.title;
    }

    if (this.slug) {
      this.slug = stringToSlug(this.slug);
    }
  }

  @BeforeUpdate()
  checkSlugUpdate?() {
    if (this.slug) {
      this.slug = stringToSlug(this.slug);
    }
  }
}
