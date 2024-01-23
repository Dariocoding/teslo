import { translate } from "@/i18n";
import * as React from "react";
import { FaBox, FaSearch, FaUser } from "react-icons/fa";
import { useSearchUserByDni } from "../../hooks/useSearchUserByDni";
import { useSearchProduct } from "../../hooks/useSearchProduct";
import SearchList from "@/components/@forms/SearchList";
import { Product } from "@teslo/interfaces";

interface ISuperInputsOrdersProps {
  toggleDrawerCustomer(): void;
  toggleDrawerProducts(): void;
  setTempProduct(product: Product): void;
}

const SuperInputsOrders: React.FunctionComponent<ISuperInputsOrdersProps> = (props) => {
  const { toggleDrawerCustomer, toggleDrawerProducts, setTempProduct } = props;
  const { termCustomer, setTermCustomer } = useSearchUserByDni({});
  const onSuccess = (product: Product) => {
    setTempProduct(product);
  };
  const searchProduct = useSearchProduct({ onSuccess });
  const { listProducts, termProduct, setTermProduct } = searchProduct;

  return (
    <React.Fragment>
      <div className="flex items-center relative">
        <span className="text-xs py-2 pl-2.5 pr-2 rounded-l-lg shadow border border-gray-300 bg-gray-200 flex-grow h-[38px] sm:h-[34px] flex items-center justify-center">
          <FaUser />
        </span>
        <input
          className="form-control form-control-sm pr-9 rounded-l-none"
          placeholder={translate("users.customer")}
          value={termCustomer}
          onChange={(e) => setTermCustomer(e.target.value)}
        />
        <span className="top-2 right-3 absolute cursor-pointer" onClick={toggleDrawerCustomer}>
          <FaSearch className="text-gray-400 transition hover:text-gray-900" />
        </span>
      </div>
      <SearchList
        {...searchProduct}
        classNameContainer="min-w-[300px] search-list-products"
        results={listProducts.map((product) => ({
          label: `${product.title} - (${product.code})`,
          value: product.id,
        }))}
      >
        <div className="flex items-center relative">
          <span className="text-xs py-2 pl-2.5 pr-2 rounded-l-lg shadow border border-gray-300 bg-gray-200 flex-grow h-[38px] sm:h-[34px] flex items-center justify-center">
            <FaBox />
          </span>

          <input
            className="form-control form-control-sm rounded-l-none pr-9"
            placeholder={translate("products.single")}
            value={termProduct}
            onChange={(e) => setTermProduct(e.target.value)}
          />

          <span className="top-2 right-3 absolute cursor-pointer" onClick={toggleDrawerProducts}>
            <FaSearch className="text-gray-400 transition hover:text-gray-900" />
          </span>
        </div>
      </SearchList>
    </React.Fragment>
  );
};

export default SuperInputsOrders;
