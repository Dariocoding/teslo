import { Provider } from "@teslo/interfaces";
import * as React from "react";
import { useFetchProductsByProviderId } from "../hooks/useFetchProductsByProviderId";
import TableProducts from "@/app/products/TableProducts";

interface ITableProductsProviderIdProps {
  provider: Provider;
}

const TableProductsProviderId: React.FC<ITableProductsProviderIdProps> = (props) => {
  const { provider } = props;
  const {
    data: products,
    setData,
    isFetching,
    refetch,
  } = useFetchProductsByProviderId(provider.idprovider);

  return (
    <div className="tile">
      <TableProducts
        products={products}
        setProducts={setData}
        isFetching={isFetching}
        refetch={refetch}
        showSelects={false}
      />
    </div>
  );
};

export default TableProductsProviderId;
