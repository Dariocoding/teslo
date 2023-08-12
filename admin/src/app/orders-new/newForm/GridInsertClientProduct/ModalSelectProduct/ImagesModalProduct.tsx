import { RenderIf } from "@/components/ui";
import { PF } from "@/utils";
import { Product } from "@teslo/interfaces";
import * as React from "react";

interface IImagesModalProductProps {
  product: Product;
  className?: string;
}

const ImagesModalProduct: React.FunctionComponent<IImagesModalProductProps> = (props) => {
  const { product, className } = props;
  return (
    <div className={className}>
      <RenderIf isTrue={!product?.images?.length}>
        <img
          src={"/img/others/box.png" /* imageProduct(product) */}
          className="max-w-[100px] mx-auto rounded-lg"
          alt={product?.title}
        />
      </RenderIf>
      <RenderIf isTrue={product?.images?.length}>
        <div className="grid grid-cols-2 gap-2">
          {product?.images?.map?.((img, idx) => (
            <div key={idx}>
              <img
                src={PF + "/product/" + img}
                alt={product?.title}
                className="rounded-lg mx-auto"
              />
            </div>
          ))}
        </div>
      </RenderIf>
    </div>
  );
};

export default ImagesModalProduct;
