import { PageProps } from "@/utils";
import { ValidRoles } from "@teslo/interfaces";
import React from "react";

export const billsPages = {
	bills: {
		path: "/bills",
		component: React.memo(React.lazy(() => import("@/app/bills"))),
		authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
	} as PageProps,
	newBill: {
		path: "/bills/new",
		component: React.memo(React.lazy(() => import("@/app/bills/new"))),
		authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
	} as PageProps,
	editBill: {
		path: "/bills/edit/:id",
		component: React.memo(React.lazy(() => import("@/app/bills/edit"))),
		authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
		fnPath: (id: string) => `/bills/edit/${id}`,
	} as PageProps,
	viewBill: {
		path: "/bills/:id",
		component: React.memo(React.lazy(() => import("@/app/bills/view"))),
		fnPath: (query: string) => `/bills/${query}`,
		authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
	} as PageProps,
};
