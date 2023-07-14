import { formatter } from "@/utils";
import { DetailOrder, DetailOrderTemp } from "@teslo/interfaces";
import * as React from "react";
import TdActions from "./TdActions";
import RenderIf from "@teslo/react-ui/RenderIf";
import InputFormik from "@/components/@forms/InputFormik";
import TdSizeProduct from "./TdSizeProduct";
import { useTrTempProduct } from "./useTrTempProduct";

export interface ITrTempProductProps {
  tempP?: DetailOrderTemp;
  idx: number;
  detailProduct?: DetailOrder;
}

const TrTempProduct: React.FunctionComponent<ITrTempProductProps> = (props) => {
  const { tempP, detailProduct } = props;
  const { isEditing, inputPriceQtyName, handleClickDelete, handleClickEdit } =
    useTrTempProduct(props);

  return (
    <tr>
      <td className="px-2 py-3">
        {tempP?.product?.code || detailProduct?.product?.code}{" "}
        {tempP?.product?.customCode || detailProduct?.product?.customCode
          ? `(${tempP?.product?.customCode || detailProduct?.product?.customCode})`
          : null}
      </td>
      <td className="max-w-[130px] whitespace-normal text-xs px-2 py-3">
        {tempP?.product?.title || detailProduct.product?.title}
      </td>
      <TdSizeProduct {...props} isEditing={isEditing} />
      <td className="text-center">
        {/* {tempP?.product?.stock || detailProduct?.product?.stock} */}
      </td>
      <td className="text-center px-2 py-3">
        {detailProduct
          ? formatter.format(detailProduct?.total || 0)
          : formatter.format(tempP?.product?.price || 0)}
      </td>
      <td className="text-center px-2 py-3">
        <RenderIf isTrue={isEditing}>
          <InputFormik
            type="number"
            decimalValues={false}
            name={inputPriceQtyName}
            classNameInput="form-control-sm"
            className="mb-0"
            showError={false}
            showSuccess={false}
          />
        </RenderIf>{" "}
        <RenderIf isTrue={!isEditing}>
          {detailProduct ? detailProduct.quantity : tempP?.qty}
        </RenderIf>
      </td>
      <td className="text-center px-2 py-3">
        {detailProduct &&
          (formatter.format((detailProduct?.quantity || 0) * (detailProduct?.total || 0)) || null)}

        {!detailProduct &&
          (formatter.format((tempP?.qty || 0) * (tempP?.product?.price || 0)) || null)}
      </td>
      <TdActions
        handleClickDelete={handleClickDelete}
        handleClickEdit={handleClickEdit}
        isEditing={isEditing}
      />
    </tr>
  );
};

export default TrTempProduct;
