import { PageProps } from "@/utils";
import { ValidRoles } from "@teslo/interfaces";
import React from "react";

export const providerPages = {
  providers: {
    path: "/admin/providers",
    component: React.memo(React.lazy(() => import("@/app/providers"))),
    authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR],
  } as PageProps,
  viewProvider: {
    path: "/admin/providers/:id",
    component: React.memo(React.lazy(() => import("@/app/providers/ViewProvider"))),
    fnPath: (query: string | number) => `/admin/providers/${query}`,
    authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR],
  } as PageProps,
};
