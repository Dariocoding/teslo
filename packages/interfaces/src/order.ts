import { Product, Size } from "./product";
import { User } from "./user";

export interface Order {
  idorder?: number;
  reference?: string;
  status?: StatusOrder;
  total?: number;
  dateCreated?: Date;
  detail?: DetailOrder[];
  user?: User;
  paymentMethod?: PaymentMethod;
  iva?: number;
  subtotal?: number;
  userSell?: User;
  discount?: number;
}

export interface OrderDto {
  total?: number;
  customer?: User;
  reference?: string;
  status?: StatusOrder;
  detail?: DetailDto[];
  paymentMethod?: PaymentMethod | string;
  iva?: number;
  subtotal?: number;
  discount?: number;
}

interface DetailDto {
  id?: number;
  total?: number;
  quantity?: number;
  product?: Product;
  size?: Size;
  title?: string;
}

export interface DetailOrder {
  id?: number;
  total?: number;
  quantity?: number;
  title?: string;
  product?: Product;
  order?: Order;
  size?: Size;
}

export type StatusOrder = "pending" | "completed" | "cancelled" | "paid";

export interface PaymentMethod {
  idpaymentmethod?: number;
  title?: string;
  owner?: string;
  phone?: string;
  dni?: string;
  email?: string;
  visible?: boolean;
}

export interface PaymentMethodDto extends Omit<PaymentMethod, "idpaymentmethod"> {}

const dto: PaymentMethodDto = {};
