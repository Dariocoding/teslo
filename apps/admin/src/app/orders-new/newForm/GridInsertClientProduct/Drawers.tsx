import * as React from "react";
import DrawerProducts from "./DrawerProducts";
import DrawerClients from "./DrawerClients";
import { Product } from "@teslo/interfaces";

export interface IDrawersProps {
  showDrawerProducts: boolean;
  setShowDrawerProducts(value: boolean): void;
  showDrawerClient: boolean;
  setShowDrawerClient(value: boolean): void;
  onClickProductDrawer(product: Product): void;
}

const Drawers: React.FunctionComponent<IDrawersProps> = (props) => {
  return (
    <React.Fragment>
      <DrawerProducts {...props} />
      <DrawerClients {...props} />
    </React.Fragment>
  );
};

export default Drawers;
