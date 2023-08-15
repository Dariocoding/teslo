import { PaymentMethod, StatusOrder } from "@teslo/interfaces";

export interface TotalCountersResponse {
  totalCategories: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
}

export interface FindOrdersByAnioMonthResponse {
  year: number;
  month: string;
  total: string;
  orders: Array<{
    day: number;
    total: number;
    quantity: number;
  }>;
}

export interface BestProductSell {
  id: string;
  title: string;
  slug: string;
  total: number;
  code: number;
  custom_code: string;
  url: string | null;
}

export interface FindOrdersAnioResponse {
  year: number;
  orders: Array<{
    num_month: number;
    sell: number;
  }>;
}

export interface FindPaymentMethodsByYearMonth {
  year: number;
  month: string;
  paymentMethods: (PaymentMethod & { quantity: number; total: number })[];
}

export interface FindStatisticQuery {
  status: StatusOrder;
}

export interface FindBillsByYearAndMonthDto {
  year: number;

  month: string;

  total: string;

  bills: Array<{ day: number; total: string; quantity: number }>;
}

export interface FindBillsByYearDto {
  year: number;
  bills: { num_month: number; sell: number }[];
}
