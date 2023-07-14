import { validPaths } from "@/utils";
import { ValidRol, ValidRoles } from "@teslo/interfaces";
import React from "react";
import {
  FaBoxes,
  FaHome,
  FaUsers,
  FaStore,
  FaCogs,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import VerticalMenuIcon, {
  IVerticalMenuIconProps,
} from "../VerticalMenu/VerticalMenuIcon";
import { translate } from "@/i18n";

export interface IMenuItem {
  title: () => string;
  path?: string;
  pathTreeView?: string;
  Icon: React.FunctionComponent<IVerticalMenuIconProps>;
  permissions: ValidRol[] | "*";
  subNav?: SubNavItem[];
}

export interface SubNavItem {
  title: () => string;
  path: string;
  permissions: ValidRol[] | "*";
}

const MenuItems: IMenuItem[] = [
  {
    title: () => translate("sidebar.dashboard"),
    path: validPaths.dashboard.path,
    Icon: (props) => (
      <VerticalMenuIcon {...props}>
        <FaHome />
      </VerticalMenuIcon>
    ),
    permissions: "*",
  },
  {
    title: () => translate("sidebar.users"),
    Icon: (props) => (
      <VerticalMenuIcon {...props}>
        <FaUsers />
      </VerticalMenuIcon>
    ),
    permissions: [
      ValidRoles.ADMIN,
      ValidRoles.SUPER_USER,
      ValidRoles.SUPERVISOR,
      ValidRoles.SELLER,
    ],
    path: validPaths.users.path,
  },

  {
    title: () => translate("sidebar.products"),
    Icon: (props) => (
      <VerticalMenuIcon {...props}>
        <FaBoxes />
      </VerticalMenuIcon>
    ),
    permissions: "*",
    subNav: [
      {
        title: () => translate("sidebar.products"),
        path: validPaths.products.path,
        permissions: "*",
      },
      {
        title: () => translate("sidebar.categories"),
        path: validPaths.categories.path,
        permissions: "*",
      },
      {
        title: () => translate("sidebar.brands"),
        path: validPaths.brands.path,
        permissions: "*",
      },
      {
        title: () => translate("sidebar.providers"),
        path: validPaths.providers.path,
        permissions: [
          ValidRoles.ADMIN,
          ValidRoles.SUPERVISOR,
          ValidRoles.SUPER_USER,
        ],
      },
    ],
  },

  {
    title: () => translate("sidebar.orders"),
    Icon: (props) => (
      <VerticalMenuIcon {...props}>
        <FaStore />
      </VerticalMenuIcon>
    ),
    permissions: "*",
    subNav: [
      {
        title: () => translate("sidebar.orders"),
        path: validPaths.orders.path,
        permissions: "*",
      },
      {
        title: () => translate("sidebar.newOrder"),
        path: validPaths.newOrder.path,
        permissions: "*",
      },
    ],
  },

  {
    title: () => translate("sidebar.bills"),
    Icon: (props) => (
      <VerticalMenuIcon {...props}>
        <FaFileInvoiceDollar />
      </VerticalMenuIcon>
    ),
    permissions: [
      ValidRoles.ADMIN,
      ValidRoles.SUPERVISOR,
      ValidRoles.SUPER_USER,
    ],
    subNav: [
      {
        title: () => translate("sidebar.bills"),
        path: validPaths.bills.path,
        permissions: "*",
      },
      {
        title: () => translate("sidebar.newBill"),
        path: validPaths.newBill.path,
        permissions: "*",
      },
    ],
  },

  {
    title: () => translate("sidebar.settings"),
    Icon: (props) => (
      <VerticalMenuIcon {...props}>
        <FaCogs />
      </VerticalMenuIcon>
    ),
    permissions: [
      ValidRoles.ADMIN,
      ValidRoles.SUPER_USER,
      ValidRoles.SUPERVISOR,
    ],
    path: validPaths.settings.path,
  },
];

export default MenuItems;
