import { TablePlaceholder } from "@/components/placeholders";
import { RenderIf } from "@/components/ui";
import * as React from "react";
import HeaderFilters from "./HeaderFilters";
import RenderProduct from "./RenderProduct";
import Pagination from "./Pagination";
import { useFetchProducts } from "@/app/products/hooks/useFetchProducts";
import { useFetchCategories } from "@/app/categories/hooks/useFetchCategories";
import { useFetchBrands } from "@/app/brands/hooks/useFetchBrands";
import { Product } from "@teslo/interfaces";
import { getIn } from "formik";
import { IDrawerProductsProps } from ".";

export interface IListProductsProps extends Pick<IDrawerProductsProps, "showPriceTooltip"> {
  sm: boolean;
  onClickProductDrawer(product: Product): void;
}

const ListProducts: React.FunctionComponent<IListProductsProps> = (props) => {
  const { sm, onClickProductDrawer, showPriceTooltip } = props;
  const itemsPerPage = sm ? 6 : 18;
  const [q, setQ] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);
  const [currentItems, setCurrentItems] = React.useState([]);
  const [brandSelected, setBrandSelected] = React.useState("");
  const [categorySelected, setCategorySelected] = React.useState("");
  const { data: products, isLoading: isLoadingProducts } = useFetchProducts();
  const { data: categories, isLoading: isLoadingCategories } = useFetchCategories();
  const { data: brands, isLoading: isLoadingBrands } = useFetchBrands();
  const isLoading = isLoadingBrands || isLoadingCategories || isLoadingProducts;

  React.useEffect(() => {
    const render = () => {
      const endOffset = itemOffset + itemsPerPage;
      const newData = search(products);
      const pageCount = Math.ceil(newData.length / itemsPerPage);
      const currentItems = newData.slice(itemOffset, endOffset);
      const actualPage = pageCount ? page + 1 : 0;
      setCurrentItems(currentItems);
      setPageCount(pageCount);
      if (actualPage > pageCount) {
        const newOffset = ((pageCount - 1) * itemsPerPage) % products.length;
        setItemOffset(newOffset);
        setPage(pageCount - 1);
      }
    };

    render();

    // eslint-disable-next-line
  }, [itemOffset, products, q, brandSelected, categorySelected, sm]);

  const search = (rows: Product[]) => {
    if (brandSelected) {
      rows = rows.filter((p) => p.brand.idbrand === brandSelected);
    }
    if (categorySelected) {
      rows = rows.filter((p) => p.categories.some((c) => c.idcategory === categorySelected));
    }

    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) =>
      columns.some(
        (column) =>
          getIn(row, column)?.toString()?.toLowerCase()?.indexOf(q.toLowerCase().trim()) > -1
      )
    );
  };

  return (
    <React.Fragment>
      <RenderIf isTrue={isLoading}>
        <TablePlaceholder />
      </RenderIf>
      <RenderIf isTrue={!isLoading}>
        <HeaderFilters
          {...{ brands, categories, q, setQ }}
          {...{ setBrandSelected, setCategorySelected, brandSelected, categorySelected }}
        />

        <div className="grid sm:grid-cols-3 gap-2">
          {currentItems.map((p) => (
            <RenderProduct
              key={p.id}
              product={p}
              handleClick={onClickProductDrawer}
              {...{ showPriceTooltip }}
            />
          ))}
        </div>

        <div className="mt-3">
          <Pagination
            {...{ page, pageCount, items: products, itemsPerPage, setPage, setItemOffset }}
          />
        </div>
      </RenderIf>
    </React.Fragment>
  );
};

export default ListProducts;
