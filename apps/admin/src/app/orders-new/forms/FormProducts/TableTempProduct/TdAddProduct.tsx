import RenderIf from "@/components/ui/RenderIf";
import * as React from "react";
import { FaPlus } from "react-icons/fa";
import { useOrdersFormContext } from "../../FormContainer";
import { useTdAddTempProduct } from "./useTdAddTempProduct";

interface ITdAddProductProps {}

const TdAddProduct: React.FunctionComponent<ITdAddProductProps> = (props) => {
  const {} = props;
  const { addProductToStorage } = useTdAddTempProduct();
  const { values } = useOrdersFormContext();

  return (
    <td className="bg-white px-2 py-3">
      <RenderIf
        isTrue={Boolean(+values.tempProduct?.price * values.tempQty) && values.tempProduct?.stock}
      >
        <span
          onClick={addProductToStorage}
          className="flex item-center justify-center mx-auto gap-1 w-fit rounded-md text-xs text-teal-600 cursor-pointer px-2 py-1 border-teal-600 hover:bg-teal-600 hover:text-white transition"
        >
          <FaPlus className="mt-0.5" /> <span>Agregar</span>
        </span>
      </RenderIf>
    </td>
  );
};

export default TdAddProduct;
