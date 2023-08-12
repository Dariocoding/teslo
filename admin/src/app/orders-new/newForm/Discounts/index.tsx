import * as React from "react";
import Discount from "./Discount";
import { FaPercent } from "react-icons/fa";
import classNames from "classnames";
import { useOrderFormContext } from "..";
import { translate } from "@/i18n";

interface IDiscountsProps {
  className?: string;
}

const discountsAvailable = [0, 5, 10, 15, 20];

const Discounts: React.FunctionComponent<IDiscountsProps> = (props) => {
  const { className } = props;
  const { values, setValues } = useOrderFormContext();

  const handleClickDiscount = (discount: number) => {
    setValues({ ...values, discount });
  };

  return (
    <div className={classNames(className)}>
      <Discount value={0} className="font-bold">
        <div className="flex gap-1 items-center text-xs">
          <span>
            <FaPercent />
          </span>
          <span className="text-sm">{translate("orders.label.discount")}:</span>
        </div>
      </Discount>
      {discountsAvailable.map((discount) => (
        <Discount
          isSelected={values.discount === discount}
          value={discount}
          key={discount}
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => handleClickDiscount(discount)}
        >
          {discount} %
        </Discount>
      ))}
      {/*       <Discount value={null} className="cursor-pointer hover:bg-gray-100">
        ...
      </Discount> */}
    </div>
  );
};

export default Discounts;
