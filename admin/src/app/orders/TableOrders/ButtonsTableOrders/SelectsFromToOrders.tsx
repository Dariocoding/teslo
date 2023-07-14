import { translate } from "@/i18n";
import * as React from "react";
import { FaSearch } from "react-icons/fa";
import { DatePicker } from "react-rainbow-components";

interface ISelectOrdersFromToProps {
  to: Date;
  setTo: (to: Date) => void;
  from: Date;
  setFrom: (from: Date) => void;
  fetchData: () => void;
}

const SelectOrdersFromTo: React.FunctionComponent<ISelectOrdersFromToProps> = (props) => {
  const { to, setFrom, setTo, from, fetchData } = props;

  return (
    <div className="flex items-center justify-start flex-wrap w-full sm:w-auto flex-grow gap-4">
      <div className="w-full sm:max-w-[225px]">
        <label
          htmlFor="category-select-products"
          className="text-xs w-full text-start mb-1 font-semibold block"
        >
          {translate("app.from")}
        </label>
        <div>
          <DatePicker
            value={from}
            placeholder="From"
            borderRadius="semi-square"
            size="small"
            maxDate={new Date()}
            onChange={(date) => setFrom(date)}
          />
        </div>
      </div>
      <div className="w-full sm:max-w-[225px]">
        <label
          htmlFor="category-select-products"
          className="text-xs w-full text-start mb-1 font-semibold block"
        >
          {translate("app.from")}
        </label>
        <div>
          <DatePicker
            value={to}
            placeholder="To"
            borderRadius="semi-square"
            size="small"
            maxDate={new Date()}
            onChange={(date) => setTo(date)}
          />
        </div>
      </div>
      <div className="flex items-end sm:h-[50px]">
        <button className="btn btn-xs btn-success mb-0" type="button" onClick={fetchData}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SelectOrdersFromTo;
