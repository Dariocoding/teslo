import { DetailOrder, Order } from "@teslo/interfaces";

export interface Detail extends DetailOrder {}

export interface OrderTable extends Order {
  actions: React.ReactNode;
  fullName: React.ReactNode;
  dateCreatedFormatted: string;
  totalFormatted: string;
  badgeStatus: React.ReactNode;
  sellerFullName: string;
  subtotalFormatted: string;
  ivaFormatted: string;
  discountFormatted: string;
}
