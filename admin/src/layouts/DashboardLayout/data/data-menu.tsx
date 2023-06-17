import { validPaths } from "@/utils";
import { ValidRol, ValidRoles } from "@teslo/interfaces";
import React from "react";
import {
  FaBoxes,
  FaHome,
  FaUsers,
  FaStore,
  FaCogs,
  FaPeopleCarry,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import VerticalMenuIcon, { IVerticalMenuIconProps } from "../VerticalMenu/VerticalMenuIcon";
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
    permissions: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
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
      { title: () => translate("sidebar.products"), path: validPaths.products.path },
      { title: () => translate("sidebar.categories"), path: validPaths.categories.path },
      { title: () => translate("sidebar.brands"), path: validPaths.brands.path },
      { title: () => translate("sidebar.providers"), path: validPaths.providers.path },
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
      { title: () => translate("sidebar.orders"), path: validPaths.orders.path },
      { title: () => translate("sidebar.newOrder"), path: validPaths.newOrder.path },
    ],
  },

  {
    title: () => translate("sidebar.bills"),
    Icon: (props) => (
      <VerticalMenuIcon {...props}>
        <FaFileInvoiceDollar />
      </VerticalMenuIcon>
    ),
    permissions: "*",
    subNav: [
      { title: () => translate("sidebar.bills"), path: validPaths.bills.path },
      { title: () => translate("sidebar.newBill"), path: validPaths.newBill.path },
    ],
  },

  {
    title: () => translate("sidebar.settings"),
    Icon: (props) => (
      <VerticalMenuIcon {...props}>
        <FaCogs />
      </VerticalMenuIcon>
    ),
    permissions: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
    path: validPaths.settings.path,
  },
];

export default MenuItems;
