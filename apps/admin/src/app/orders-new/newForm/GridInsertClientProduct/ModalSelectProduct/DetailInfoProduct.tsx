import { RenderIf } from "@/components/ui";
import { translate } from "@/i18n";
import { formatter, validPaths } from "@/utils";
import { Product } from "@teslo/interfaces";
import * as React from "react";
import { Link } from "react-router-dom";

interface IDetailInfoProductProps {
  product: Product;
  className?: string;
}

const DetailInfoProduct: React.FunctionComponent<IDetailInfoProductProps> = (props) => {
  const { product, className } = props;
  return (
    <div className={className}>
      <h6 className="text-xl">
        {product?.title} ({formatter.format(product?.price || 0)})
      </h6>{" "}
      <RenderIf isTrue={product?.status}>
        <p className="text-xs mt-0.5 sm:block hidden">{product?.status}</p>
      </RenderIf>
      <div className="flex flex-col items-start gap-2.5 mt-3 text-sm">
        <span>
          <strong>{translate("products.label.stock")}: </strong> {product?.stock}
        </span>

        <p>
          <span className="font-bold">{translate("products.label.sizes")}:</span>{" "}
          {product?.sizes?.join?.(", ")}
        </p>

        <RenderIf isTrue={product?.categories?.length}>
          <span className="flex items-center gap-x-1">
            <span className="font-bold">{translate("products.label.categories")}:</span>{" "}
            <ul className="flex items-center gap-1 flex-wrap">
              {product?.categories?.map?.((category) => (
                <li key={category.idcategory}>
                  <Link
                    to={validPaths.viewCategory.fnPath(category.idcategory)}
                    className="link-table"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </span>
        </RenderIf>

        <RenderIf isTrue={product?.brand}>
          <span className="flex items-center gap-x-1">
            <span className="font-bold">{translate("products.label.brand")}:</span>{" "}
            <ul>
              <li>
                <Link
                  to={validPaths.viewCategory.fnPath(product?.brand?.idbrand)}
                  className="link-table"
                >
                  {product?.brand?.title}
                </Link>
              </li>
            </ul>
          </span>
        </RenderIf>
      </div>
    </div>
  );
};

export default DetailInfoProduct;
