import { PaymentMethod } from "@teslo/interfaces";
import classNames from "classnames";
import * as React from "react";
import { useOrderFormContext } from "..";
import { FaBookmark } from "react-icons/fa";
import { ShowIf } from "react-rainbow-components";

interface IActionOrderProps {
  paymentMethod?: PaymentMethod;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}

const ActionOrder: React.FunctionComponent<IActionOrderProps> = (props) => {
  const { className, paymentMethod, onClick, selected } = props;

  const { values, setValues } = useOrderFormContext();

  const handleClick = () => {
    if (!paymentMethod) return;
    setValues({ ...values, paymentMethod });
  };

  return (
    <div
      className={classNames(
        className,
        "rounded-lg text-sm py-4 sm:py-6 sm:px-8 px-4 overflow-hidden shadow-md flex-grow transition duration-300 md:h-12 h-10 text-center flex items-center justify-center"
      )}
      onClick={onClick || handleClick}
    >
      {props.children}

      <ShowIf isTrue={selected}>
        <div className="absolute -top-0.5 left-0 w-full h-full flex justify-start items-start">
          <FaBookmark className="rotate- text-white text-base ml-2.5 shadow-2xl shadow-teal-600" />
        </div>
        <div className="absolute -top-0.5 left-0 w-full h-full flex justify-end items-start">
          <FaBookmark className="rotate- text-white text-base mr-2.5 shadow-2xl shadow-teal-600" />
        </div>
      </ShowIf>
    </div>
  );
};

export default ActionOrder;
