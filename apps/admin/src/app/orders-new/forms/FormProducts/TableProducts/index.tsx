import * as React from "react";
import HeadingTable from "../HeadingTable";
import { useOrdersFormContext } from "../../FormContainer";
import TrTempProduct from "./TrTempProduct";
import RenderIf from "@/components/ui/RenderIf";
import TfootTableProducts from "./TFootTableProducts";

interface ITableProductsProps {}

const TableProducts: React.FunctionComponent<ITableProductsProps> = (props) => {
  const {} = props;
  const { values } = useOrdersFormContext();

  return (
    <table className="table" id="tableProducts">
      <HeadingTable />
      <tbody>
        {values.products.map((product, idx) => (
          <TrTempProduct tempP={product} key={idx} idx={idx} />
        ))}
        {values.detailOrderProducts.map((product, idx) => (
          <TrTempProduct detailProduct={product} key={idx} idx={idx} />
        ))}
      </tbody>
      <RenderIf isTrue={values.products.length || values.detailOrderProducts.length}>
        <TfootTableProducts />
      </RenderIf>
    </table>
  );
};

export default TableProducts;
