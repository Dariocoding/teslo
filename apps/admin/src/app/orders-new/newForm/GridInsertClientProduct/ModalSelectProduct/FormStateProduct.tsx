import Label from "@/components/@forms/label";
import { RenderIf } from "@/components/ui";
import { translate } from "@/i18n";
import { OptionsCart, useConfigApp } from "@/store";
import { formatter } from "@/utils";
import { Product, Size } from "@teslo/interfaces";
import classNames from "classnames";
import * as React from "react";
import { FaSave } from "react-icons/fa";
import { NumericFormat } from "react-number-format";

interface IFormStateProductProps {
  product: Product;
  state: OptionsCart;
  setState(value: OptionsCart): void;
  handleAcceptProduct(): void;
  className?: string;
}

const FormStateProduct: React.FunctionComponent<IFormStateProductProps> = (props) => {
  const { product, state, setState, className, handleAcceptProduct } = props;
  const { colors } = useConfigApp();

  return (
    <div className={classNames("flex-grow", className)}>
      <div className={classNames(colors.enableClothesShopping && "grid grid-cols-2 gap-2")}>
        <RenderIf isTrue={colors.enableClothesShopping}>
          <div>
            <Label className="text-xs">{translate("products.label.size")}</Label>

            <select
              name=""
              id=""
              className="form-control sm:p-4 p-2 sm:text-sm text-xs"
              value={state.size}
              onChange={(e) => setState({ ...state, size: e.target.value as Size })}
            >
              {product?.sizes?.map((size) => (
                <option key={size} value={size} className="uppercase">
                  {size}
                </option>
              ))}
            </select>
          </div>
        </RenderIf>
        <div>
          <Label className="text-xs">{translate("orders.label.qty")}</Label>
          <NumericFormat
            allowNegative={false}
            decimalScale={0}
            value={state.qty}
            className="form-control sm:p-4 p-2 sm:text-sm text-xs"
            onValueChange={(e) => setState({ ...state, qty: e.floatValue })}
          />
        </div>
      </div>

      <div>
        <p className="mt-3">
          <strong>Total Price:</strong> {formatter.format((state.qty || 0) * (product?.price || 0))}
        </p>
      </div>

      <button
        type="button"
        onClick={handleAcceptProduct}
        className="mt-4 mb-0 btn btn-primary btn-sm mr-0 gap-2 w-full"
      >
        {translate("app.save")} <FaSave />
      </button>
    </div>
  );
};

export default FormStateProduct;
