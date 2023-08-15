import InputFormik from "@/components/@forms/InputFormik";
import { BillDto } from "@teslo/interfaces";
import { useFormikContext } from "formik";
import * as React from "react";
import GridDetail from "./GridDetail";

interface IProductsBillFormProps {}

const ProductsBillForm: React.FunctionComponent<IProductsBillFormProps> = (props) => {
  const {} = props;
  const { values } = useFormikContext<BillDto>();
  return (
    <div>
      <div className="flex flex-col items-start gap-4">
        {values.details.map((detail, idx) => (
          <GridDetail detail={detail} idx={idx} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default ProductsBillForm;
