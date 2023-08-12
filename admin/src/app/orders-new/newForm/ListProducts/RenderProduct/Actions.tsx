import * as React from "react";
import { IRenderProductProps } from ".";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useConfigApp } from "@/store";
import { RenderIf } from "@/components/ui";
import { useOrderFormContext } from "../..";
import { Size } from "@teslo/interfaces";

interface IActionsRenderProductProps extends IRenderProductProps {}

const ActionsRenderProduct: React.FunctionComponent<IActionsRenderProductProps> = (props) => {
  const { product, productOrder } = props;
  const { values, setValues } = useOrderFormContext();
  const { colors } = useConfigApp();

  const onMinus = () => {
    if (product) {
      setValues({
        ...values,
        products: values.products.map((p) => {
          if (p.id === product.id && p.size === product.size) {
            const result = product.qty - 1;
            if (result <= 0) return p;
            p.qty = result;
          }
          return p;
        }),
      });
    }

    if (productOrder) {
      setValues({
        ...values,
        detailOrderProducts: values.detailOrderProducts.map((p) => {
          if (p.id === productOrder.id && p.size === productOrder.size) {
            const result = productOrder.quantity - 1;
            p.quantity = result;
          }
          return p;
        }),
      });
    }
  };

  const onPlus = () => {
    if (product) {
      setValues({
        ...values,
        products: values.products.map((p) => {
          if (p.id === product.id && p.size === product.size) {
            const result = product.qty + 1;
            if (result <= 0 || result > p.product.stock) return p;
            p.qty = result;
          }
          return p;
        }),
      });
    }

    if (productOrder) {
      setValues({
        ...values,
        detailOrderProducts: values.detailOrderProducts.map((p) => {
          if (p.id === productOrder.id && p.size === productOrder.size) {
            const result = productOrder.quantity + 1;
            p.quantity = result;
          }
          return p;
        }),
      });
    }
  };

  const onChangeSize: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (product) {
      setValues({
        ...values,
        products: values.products.map((p) => {
          if (p.id === product.id && p.size === product.size) {
            p.size = e.target.value as Size;
          }
          return p;
        }),
      });
    }

    if (productOrder) {
      setValues({
        ...values,
        detailOrderProducts: values.detailOrderProducts.map((p) => {
          if (p.id === productOrder.id && p.size === productOrder.size) {
            p.size = e.target.value as Size;
          }
          return p;
        }),
      });
    }
  };

  return (
    <div className="flex items-center mt-2 gap-2">
      <div className="flex items-center">
        <div
          onClick={onMinus}
          className="p-2 bg-gray-200 rounded-l-md h-[30px] group hover:bg-gray-300 transition duration-300 cursor-pointer"
        >
          <FaMinus className="text-gray-600 text-xs group-hover:text-black transition duration-300" />
        </div>
        <div className="p-2 bg-gray-100 max-h-max h-[30px] flex items-center">
          {product?.qty || productOrder?.quantity}
        </div>
        <div
          onClick={onPlus}
          className="p-2 bg-gray-200 rounded-r-md h-[30px] group hover:bg-gray-300 transition duration-300 cursor-pointer"
        >
          <FaPlus className="text-gray-600 text-xs group-hover:text-black transition duration-300" />
        </div>
      </div>
      <RenderIf isTrue={colors.enableClothesShopping && (product?.size || productOrder?.size)}>
        <div>
          <select
            className="form-control form-control-sm shadow-none"
            onChange={onChangeSize}
            value={product?.size || productOrder?.size}
          >
            {(product?.product?.sizes || productOrder?.product?.sizes)?.map?.((size) => (
              <option value={size} key={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </RenderIf>
    </div>
  );
};

export default ActionsRenderProduct;
