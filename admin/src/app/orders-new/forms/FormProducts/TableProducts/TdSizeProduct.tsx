import RenderIf from "@/components/ui/RenderIf";
import * as React from "react";
import { ITrTempProductProps } from "./TrTempProduct";
import SelectFormik from "@/components/@forms/SelectFormik";
import { useOrdersFormContext } from "../../FormContainer";
import { capitalize } from "@/utils";
import { useConfigApp } from "@/store";
import { DetailOrder } from "@teslo/interfaces";

interface ITdSizeProductProps extends ITrTempProductProps {
  isEditing: boolean;
  detailProduct?: DetailOrder;
}

const TdSizeProduct: React.FunctionComponent<ITdSizeProductProps> = (props) => {
  const { tempP, isEditing, idx, detailProduct } = props;
  const { colors } = useConfigApp();
  const { values } = useOrdersFormContext();
  const inputSizeName = detailProduct
    ? `detailOrderProducts[${idx}].size`
    : `products[${idx}].size`;

  return (
    <RenderIf isTrue={colors.enableClothesShopping}>
      <td className="px-2 py-3 text-center">
        <RenderIf isTrue={!isEditing}>{detailProduct ? detailProduct.size : tempP?.size}</RenderIf>
        <RenderIf isTrue={isEditing}>
          <SelectFormik
            sm
            name={inputSizeName}
            options={
              detailProduct
                ? detailProduct.product.sizes.map?.((size) => ({
                    label: capitalize(size),
                    value: size,
                  }))
                : values.products[idx]?.product.sizes?.map?.((size) => ({
                    label: capitalize(size),
                    value: size,
                  }))
            }
            className="mb-0"
            placeholder="Select Size"
          />
        </RenderIf>
      </td>
    </RenderIf>
  );
};

export default TdSizeProduct;
