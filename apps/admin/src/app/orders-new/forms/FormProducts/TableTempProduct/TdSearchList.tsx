import { useSearchProduct } from "@/app/orders-new/hooks/useSearchProduct";
import InputFormik from "@/components/@forms/InputFormik";
import SearchList from "@/components/@forms/SearchList";
import * as React from "react";

interface ITdSearchListProps {}

const TdSearchList: React.FunctionComponent<ITdSearchListProps> = (props) => {
  const {} = props;
  const searchProduct = useSearchProduct();
  return (
    <td className="bg-white w-[130px] px-2 py-3">
      <SearchList
        {...searchProduct}
        classNameContainer="min-w-[300px] search-list-products"
        results={searchProduct.listProducts.map((product) => ({
          label: product.title,
          value: product.id,
        }))}
      >
        <InputFormik
          name="searchProduct"
          classNameInput="form-control-sm"
          className="max-w-[130px] mb-0"
          showSuccess={false}
          showError={false}
          autoComplete="off"
        />
      </SearchList>
    </td>
  );
};

export default TdSearchList;
