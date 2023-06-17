import TableProducts from "@/app/products/TableProducts";
import { Category } from "@teslo/interfaces";
import * as React from "react";
import { useFetchProductsByCategoryId } from "../hooks/useFetchProductsByCategoryId";

interface ITableProductsByCategoryIdProps {
  category: Category;
}

const TableProductsByCategoryId: React.FC<ITableProductsByCategoryIdProps> = (props) => {
  const { category } = props;
  const {
    data: products,
    setData,
    isFetching,
    refetch,
  } = useFetchProductsByCategoryId(category.idcategory);

  return (
    <div className="tile">
      <TableProducts
        products={products}
        setProducts={setData}
        isFetching={isFetching}
        refetch={refetch}
      />
    </div>
  );
};

export default TableProductsByCategoryId;
