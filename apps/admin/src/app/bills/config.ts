import { PageProps } from "@/utils";
import { ValidRoles } from "@teslo/interfaces";
import React from "react";

export const billsPages = {
  bills: {
    path: "/admin/bills",
    component: React.memo(React.lazy(() => import("@/app/bills"))),
    authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR],
  } as PageProps,
  newBill: {
    path: "/admin/bills/new",
    component: React.memo(React.lazy(() => import("@/app/bills/new"))),
    authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR],
  } as PageProps,
  editBill: {
    path: "/admin/bills/edit/:id",
    component: React.memo(React.lazy(() => import("@/app/bills/edit"))),
    authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR],
    fnPath: (id: string) => `/admin/bills/edit/${id}`,
  } as PageProps,
  viewBill: {
    path: "/admin/bills/:id",
    component: React.memo(React.lazy(() => import("@/app/bills/view"))),
    fnPath: (query: string) => `/admin/bills/${query}`,
    authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR],
  } as PageProps,
};
