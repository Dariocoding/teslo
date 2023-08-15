import classNames from "classnames";
import * as React from "react";
import { FaBookmark } from "react-icons/fa";
import { ShowIf } from "react-rainbow-components";

interface IDiscountProps {
  value: number;
  children?: React.ReactNode;
  className?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const Discount: React.FunctionComponent<IDiscountProps> = (props) => {
  const { value, className, isSelected, onClick } = props;
  return (
    <div
      className={classNames(
        "md:text-base relative text-sm rounded-lg md:py-3 px-6 flex-grow transition shadow-md border-gray-300 border md:h-12 h-10 text-center flex items-center justify-center bg-gray-200",
        className
      )}
      onClick={onClick}
    >
      {props.children}

      <ShowIf isTrue={isSelected}>
        <div className="absolute -top-0.5 left-0 w-full h-full flex justify-start items-start">
          <FaBookmark className="rotate- text-blue-600 text-base ml-2.5 shadow-2xl shadow-teal-600" />
        </div>
        <div className="absolute -top-0.5 left-0 w-full h-full flex justify-end items-start">
          <FaBookmark className="rotate- text-blue-600 text-base mr-2.5 shadow-2xl shadow-teal-600" />
        </div>
      </ShowIf>
    </div>
  );
};

export default Discount;
