import classNames from "classnames";
import * as React from "react";
import { BsFileTextFill } from "react-icons/bs";
import styled from "styled-components";
import { useOrdersFormContext } from ".";
import ToolTip from "@/components/ui/Tooltip";
import { translate } from "@/i18n";

interface IReferenceOverFormProps {}

const ReferenceOverForm: React.FunctionComponent<IReferenceOverFormProps> = (props) => {
  const {} = props;
  const { values, setValues } = useOrdersFormContext();
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="absolute bottom-6 -left-[10.5rem] transition-all hover:left-0 duration-500 ease-in-out overflow-hidden">
      <div className="flex items-center cursor-pointer justify-end text-white">
        <div
          className={classNames(
            "py-[0.45rem] text-xs overflow-hidden transition-width content-text bg-slate-700"
          )}
        >
          <div className="px-2">
            <input
              autoComplete="off"
              name="tempReference"
              onChange={onChange}
              type="text"
              value={values.tempReference}
              className="form-control form-control-sm text-right py-0 px-2 rounded-sm text-gray-50 bg-slate-900 border-slate-600 focus:border-slate-500 max-w-[150px]"
            />
          </div>
        </div>
        <span
          className={classNames(
            "flex items-center gap-1 pl-2 pr-2.5 py-2 bg-slate-900 rounded-r-lg icon whitespace-nowrap"
          )}
        >
          <BsFileTextFill /> <span className="text-xs">{translate("orders.label.reference")}</span>
        </span>
      </div>
    </div>
  );
};

export default ReferenceOverForm;
