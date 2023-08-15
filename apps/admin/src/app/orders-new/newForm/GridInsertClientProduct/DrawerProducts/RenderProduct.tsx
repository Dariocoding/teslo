import { Tooltip } from "@/components/ui";
import { formatter, imageProduct } from "@/utils";
import { Product } from "@teslo/interfaces";
import * as React from "react";
import { IListProductsProps } from "./ListProducts";

interface IRenderProductProps extends Pick<IListProductsProps, "showPriceTooltip"> {
  product: Product;
  handleClick(p: Product): void;
}

const RenderProduct: React.FunctionComponent<IRenderProductProps> = (props) => {
  const { product, handleClick, showPriceTooltip = true } = props;

  if (!showPriceTooltip) {
    <ProductBlock {...{ product, onClick: () => handleClick(product) }} />;
  }

  return (
    <Tooltip
      message={formatter.format(product.price)}
      className="block h-full"
      onClick={() => handleClick(product)}
    >
      <ProductBlock product={product} />
    </Tooltip>
  );
};

export default RenderProduct;

interface IProductBlockProps {
  product: Product;
  onClick?(): void;
}

const ProductBlock: React.FunctionComponent<IProductBlockProps> = ({ product, onClick }) => (
  <div
    onClick={onClick}
    className="border border-gray-300 rounded-lg p-2 transition hover:bg-gray-200 cursor-pointer flex items-center gap-x-3"
  >
    <div className="flex items-center justify-center">
      <img
        src={imageProduct(product)}
        alt={product.title}
        className="max-w-[40px] max-h-[40px] rounded-full object-cover"
      />
    </div>
    <p className="leading-[0.85rem] text-sm">
      {product.title} <span className="text-xs">({product.stock})</span>
    </p>
  </div>
);
