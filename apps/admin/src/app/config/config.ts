import { PageProps } from "@/utils";
import { ValidRoles } from "@teslo/interfaces";
import React from "react";

export const settingsPages = {
  settings: {
    path: "/admin/settings",
    component: React.memo(React.lazy(() => import("@/app/config"))),
    authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR],
  } as PageProps,
  paymentMethods: {
    path: "/admin/settings/payment-methods",
    component: React.memo(React.lazy(() => import("@/app/config/PaymenMethods"))),
    authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR],
  } as PageProps,
  imagesEnterpriseConfig: {
    path: "/admin/settings/images-enterprise",
    component: React.memo(React.lazy(() => import("@/app/config/imagesEnterprise"))),
    authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
  } as PageProps,
  colorsAdmin: {
    path: "/admin/settings/colors-admin",
    component: React.memo(React.lazy(() => import("@/app/config/colors"))),
    authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR],
  } as PageProps,
  appData: {
    path: "/admin/settings/app-data",
    component: React.memo(React.lazy(() => import("@/app/config/appData"))),
    authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
  } as PageProps,
  exportsAppData: {
    path: "/admin/settings/exports-app-data",
    component: React.memo(React.lazy(() => import("@/app/config/exportsAppData"))),
    authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR],
  } as PageProps,
};
