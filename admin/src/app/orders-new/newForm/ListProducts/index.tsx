import * as React from "react";
import { useOrderFormContext } from "..";
import RenderProduct from "./RenderProduct";
import FooterListProducts from "./Footer";
import { ShowIf } from "react-rainbow-components";

interface IListProductsProps {}

const ListProducts: React.FunctionComponent<IListProductsProps> = (props) => {
  const {} = props;
  const { values } = useOrderFormContext();

  return (
    <ShowIf isTrue={Boolean(values.products.length) || Boolean(values.detailOrderProducts.length)}>
      <div className="tile p-3">
        <div className="flex flex-col items-start gap-3 text-sm">
          {values.products.map((product) => (
            <RenderProduct product={product} key={product.id} />
          ))}
          {values.detailOrderProducts.map((orderProduct) => (
            <RenderProduct productOrder={orderProduct} key={orderProduct.id} />
          ))}
        </div>
        <FooterListProducts />
      </div>
    </ShowIf>
  );
};

export default ListProducts;
