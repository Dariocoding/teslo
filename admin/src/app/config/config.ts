import { PageProps } from "@/utils";
import { ValidRoles } from "@teslo/interfaces";
import React from "react";

export const settingsPages = {
	settings: {
		path: "/settings",
		component: React.memo(React.lazy(() => import("@/app/config"))),
		authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR],
	} as PageProps,
	paymentMethods: {
		path: "/settings/payment-methods",
		component: React.memo(React.lazy(() => import("@/app/config/PaymenMethods"))),
		authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR],
	} as PageProps,
	imagesEnterpriseConfig: {
		path: "/settings/images-enterprise",
		component: React.memo(React.lazy(() => import("@/app/config/imagesEnterprise"))),
		authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
	} as PageProps,
	colorsAdmin: {
		path: "/settings/colors-admin",
		component: React.memo(React.lazy(() => import("@/app/config/colors"))),
		authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR],
	} as PageProps,
	appData: {
		path: "/settings/app-data",
		component: React.memo(React.lazy(() => import("@/app/config/appData"))),
		authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
	} as PageProps,
	exportsAppData: {
		path: "/settings/exports-app-data",
		component: React.memo(React.lazy(() => import("@/app/config/exportsAppData"))),
		authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR],
	} as PageProps,
};
