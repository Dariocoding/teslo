import { RenderIf } from "@/components/ui";
import { PaymentMethod } from "@teslo/interfaces";
import classNames from "classnames";
import * as React from "react";
import { BsFillTriangleFill } from "react-icons/bs";
import { useOrderFormContext } from "..";
import { ShowIf } from "react-rainbow-components";
import { BiTargetLock } from "react-icons/bi";
import { GiTargetShot } from "react-icons/gi";
import { FaBookmark } from "react-icons/fa";

interface IPaymentMethodBadgeProps {
  paymentMethod?: PaymentMethod;
  children?: React.ReactNode;
  className?: string;
  classNameBg?: string;
  selectedPaymentMethod?: PaymentMethod;
  onClick?: () => void;
}

const PaymentMethodBadge: React.FunctionComponent<IPaymentMethodBadgeProps> = (props) => {
  const { className, classNameBg, selectedPaymentMethod, paymentMethod, onClick } = props;
  const isSelected =
    selectedPaymentMethod &&
    selectedPaymentMethod?.idpaymentmethod === paymentMethod?.idpaymentmethod;

  const { values, setValues } = useOrderFormContext();

  const handleClick = () => {
    if (!paymentMethod) return;
    setValues({ ...values, paymentMethod });
  };

  return (
    <div
      className={classNames(
        "rounded-lg text-sm py-4 sm:py-6 sm:px-8 px-4 overflow-hidden shadow-md flex-grow transition duration-300 text-white md:h-12 h-10 text-center flex items-center justify-center ",
        !isSelected && className,
        !isSelected && (classNameBg || "bg-teal-600"),
        isSelected && "relative bg-blue-700 cursor-pointer font-bold uppercase"
      )}
      onClick={onClick || handleClick}
    >
      {props.children}

      <ShowIf isTrue={isSelected}>
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

export default PaymentMethodBadge;
