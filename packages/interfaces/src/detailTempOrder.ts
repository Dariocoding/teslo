import { User } from "./user";
import { Product, Size } from "./product";

export interface DetailOrderTempDto {
  product: Product;
  qty: number;
  size?: Size;
  title?: string;
  price?: number;
}

export interface DetailOrderTemp {
  id: number;
  userOrder?: User;
  product?: Product;
  qty: number;
  size?: Size;
  title?: string;
  price?: number;
}
