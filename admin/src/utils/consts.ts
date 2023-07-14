import { Product, ValidRol, ValidRoles } from "@teslo/interfaces";
import React from "react";
import { settingsPages } from "@/app/config/config";
import { providerPages } from "@/app/providers/config";
import { billsPages } from "@/app/bills/config";
export const APP_NAME = "Teslo";
export const APP_PHONE = "042105012";
export const APP_EMAIL = "teslo@teslo.com";
export const DAY_DURATION = 86400000;
export const API_URL = import.meta.env.VITE_API_URL;
export const PF = import.meta.env.VITE_API_URL + "files";

export const breakpoints = {
  mobile: 0,
  sm: 640,
  md: 748,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const formatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
  style: "currency",
  currency: "USD",
});

export interface PageProps {
  path: string;
  authoritys: ValidRol[] | "*";
  component: React.MemoExoticComponent<
    React.LazyExoticComponent<React.FunctionComponent<any>>
  >;
  fnPath?(query: string | number): string;
}

export const protectedRoutes = {
  dashboard: {
    path: "/dashboard",
    component: React.memo(React.lazy(() => import("@/app/dashboard"))),
    authoritys: "*",
  } as PageProps,
  users: {
    path: "/users",
    component: React.memo(React.lazy(() => import("@/app/users"))),
    authoritys: [
      ValidRoles.ADMIN,
      ValidRoles.SUPER_USER,
      ValidRoles.SELLER,
      ValidRoles.SUPERVISOR,
    ],
  } as PageProps,
  viewUser: {
    path: "/users/:id",
    component: React.memo(React.lazy(() => import("@/app/users/ViewUser"))),
    fnPath: (id: string) => `/users/${id}`,
    authoritys: [
      ValidRoles.ADMIN,
      ValidRoles.SUPER_USER,
      ValidRoles.SELLER,
      ValidRoles.SUPERVISOR,
    ],
  } as PageProps,
  products: {
    path: "/products",
    component: React.memo(React.lazy(() => import("@/app/products"))),
    authoritys: "*",
  } as PageProps,
  newProduct: {
    path: "/products/new",
    component: React.memo(React.lazy(() => import("@/app/products/new"))),
    authoritys: "*",
  } as PageProps,
  editProduct: {
    path: "/products/edit/:id",
    component: React.memo(React.lazy(() => import("@/app/products/edit"))),
    authoritys: "*",
    fnPath: (id: string) => `/products/edit/${id}`,
  } as PageProps,
  viewProduct: {
    path: "/products/:id",
    component: React.memo(
      React.lazy(() => import("@/app/products/ViewProduct"))
    ),
    fnPath: (query: string) => `/products/${query}`,
    authoritys: "*",
  } as PageProps,
  categories: {
    path: "/categories",
    component: React.memo(React.lazy(() => import("@/app/categories"))),
    authoritys: "*",
  } as PageProps,
  brands: {
    path: "/brands",
    component: React.memo(React.lazy(() => import("@/app/brands"))),
    authoritys: "*",
  } as PageProps,
  viewBrand: {
    fnPath: (query: string | number) => `/brands/${query}`,
    path: "/brands/:id",
    component: React.memo(React.lazy(() => import("@/app/brands/ViewBrand"))),
    authoritys: "*",
  } as PageProps,
  viewCategory: {
    fnPath: (query: string | number) => `/categories/${query}`,
    path: "/categories/:id",
    component: React.memo(
      React.lazy(() => import("@/app/categories/ViewCategory"))
    ),
    authoritys: "*",
  } as PageProps,
  profile: {
    path: "/profile",
    component: React.memo(React.lazy(() => import("@/app/profile"))),
    authoritys: "*",
  } as PageProps,
  orders: {
    path: "/orders",
    component: React.memo(React.lazy(() => import("@/app/orders"))),
    authoritys: "*",
  } as PageProps,
  newOrder: {
    path: "/orders/new",
    component: React.memo(React.lazy(() => import("@/app/orders-new"))),
    authoritys: "*",
  } as PageProps,
  editOrder: {
    path: "/orders/edit/:id",
    component: React.memo(React.lazy(() => import("@/app/orders-edit"))),
    authoritys: [
      ValidRoles.ADMIN,
      ValidRoles.SELLER,
      ValidRoles.SUPERVISOR,
      ValidRoles.SUPER_USER,
    ],
    fnPath: (id: string | number) => `/orders/edit/${id}`,
  } as PageProps,
  invoiceOrder: {
    path: "/orders/:id",
    component: React.memo(React.lazy(() => import("@/app/orders/Invoice"))),
    authoritys: "*",
    fnPath: (id) => `/orders/${id}`,
  } as PageProps,
  ...providerPages,
  ...settingsPages,
  ...billsPages,
};

export const publicRoutes = {
  home: {
    path: "/",
    component: React.memo(React.lazy(() => import("@/app/login"))),
    authoritys: "*",
  } as PageProps,
  recoverPassword: {
    path: "/recover/password/:token/:iduser",
    component: React.memo(React.lazy(() => import("@/app/recover/password"))),
    authoritys: "*",
  } as PageProps,
  verifyEmailSent: {
    path: "/verify/email",
    component: React.memo(React.lazy(() => import("@/app/verify/emailSent"))),
    authoritys: "*",
  } as PageProps,
};

export const validPaths = {
  ...protectedRoutes,
  ...publicRoutes,
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const imageProduct = (product: Product) => {
  if (!product?.images) return "/img/others/box.png";
  return product.images.length
    ? PF + "/product/" + product.images[product.images.length - 1]
    : "/img/others/box.png";
};
