import TableProducts from "@/app/products/TableProducts";
import { Brand } from "@teslo/interfaces";
import * as React from "react";
import { useFetchProductsByBrandId } from "../hooks/useFetchProductsByBrand";

interface ITableProductsByBrandIdProps {
  brand: Brand;
}

const TableProductsByBrandId: React.FC<ITableProductsByBrandIdProps> = (props) => {
  const { brand } = props;
  const { data: products, setData, isFetching, refetch } = useFetchProductsByBrandId(brand.idbrand);

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

export default TableProductsByBrandId;
