import classNames from "classnames";
import * as React from "react";
import Select from "react-tailwindcss-select";
import { Options, SelectValue } from "react-tailwindcss-select/dist/components/type";

interface ISelectTableProductProps {
  loading: boolean;
  value: SelectValue;
  options: Options;
  onChange: (value: SelectValue) => void;
  context: any;
  title: React.ReactNode;
  id: string;
  placeholder: string;
  customSize?: string;
}

const SelectTableProduct: React.FunctionComponent<ISelectTableProductProps> = (props) => {
  const {
    value,
    loading,
    options,
    onChange,
    context,
    id,
    placeholder,
    title,
    customSize = "sm:max-w-[250px]",
  } = props;

  return (
    <div className={classNames("w-full", customSize)}>
      <label htmlFor={id} className="text-xs w-full text-start mb-1 font-semibold block">
        {title}
      </label>
      <div>
        <Select
          isClearable={Boolean(context)}
          onChange={onChange}
          options={options}
          primaryColor={""}
          value={context && value}
          onSearchInputChange={() => null}
          loading={loading}
          placeholder={placeholder}
          noOptionsMessage={placeholder}
        />
      </div>
    </div>
  );
};

export default SelectTableProduct;
