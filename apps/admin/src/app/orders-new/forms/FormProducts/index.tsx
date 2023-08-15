import classNames from "classnames";
import * as React from "react";
import TableTempProduct from "./TableTempProduct";
import TableProducts from "./TableProducts";
import { PaymentMethod } from "@teslo/interfaces";
import HeadingTile from "./HeadingTile";

interface IFormProductsProps {
  classNameContainer?: string;
  title?: string;
  paymentMethods: PaymentMethod[];
}

const FormProducts: React.FunctionComponent<IFormProductsProps> = (props) => {
  const { classNameContainer, title = "Venta", paymentMethods } = props;

  return (
    <div className={classNames("tile", classNameContainer)}>
      <div className="flex flex-wrap items-center justify-between mb-3">
        <HeadingTile paymentMethods={paymentMethods} title={title} />
      </div>

      <TableTempProduct />
      <TableProducts />
    </div>
  );
};

export default FormProducts;
