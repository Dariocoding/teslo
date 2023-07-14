import DataTable, { HeaderDataTable } from "@teslo/react-ui/DataTable";
import * as React from "react";
import defaultHeadingProducts from "./heading";
import mapProducts from "./mapProducts";
import RenderIf from "@teslo/react-ui/RenderIf";
import { Brand, Category, Product, Provider } from "@teslo/interfaces";
import { TablePlaceholder } from "@/components/placeholders";
import ButtonsTableProduct from "./ButtonsTable";
import { useActionsTableProducts } from "./useActionsTableProducts";

export interface ITableProductsProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isFetching: boolean;
  refetch(): void;
  heading?: HeaderDataTable[];
  providers?: Provider[];
  categories?: Category[];
  loadingProviders?: boolean;
  loadingCategories?: boolean;
  brands?: Brand[];
  loadingBrands?: boolean;
  showSelects?: boolean;
}

const ModalDeleteProduct = React.lazy(() => import("./ModalDeleteProduct"));
const ModalBarCodes = React.lazy(() => import("../shared/ModalBarCodes"));

const TableProducts: React.FunctionComponent<ITableProductsProps> = (props) => {
  const [isLoadingTable, setIsLoadingTable] = React.useState(false);
  const [showModalBarCodes, setShowModalBarCodes] = React.useState(false);
  const [currentItemsSelected, setCurrentItemsSelected] = React.useState<string[]>([]);

  const {
    products,
    setProducts,
    isFetching,
    refetch,
    heading,
    providers,
    categories,
    loadingCategories,
    loadingProviders,
    brands,
    loadingBrands,
    showSelects,
  } = props;

  const {
    onCreateProduct,
    onDeleteProduct,
    onQuickEditProduct,
    onUpdateProduct,
    showModalDeleteProduct,
    onAcceptDeleteProduct,
    onCloseModalDelete,
    stateProductDelete,
    isLoadingDeleteProduct,
    onViewBarCode,
  } = useActionsTableProducts(props);

  return (
    <React.Fragment>
      <DataTable
        onChangePage={() => setCurrentItemsSelected([])}
        render={(products) =>
          mapProducts({
            products,
            onDeleteProduct,
            onUpdateProduct,
            onQuickEditProduct,
            onViewBarCode,
            currentItemsSelected,
            setCurrentItemsSelected,
          })
        }
        placeholder={<TablePlaceholder />}
        buttons={
          <ButtonsTableProduct
            categories={categories}
            providers={providers}
            refetch={refetch}
            onCreateProduct={onCreateProduct}
            loadingCategories={loadingCategories}
            loadingProviders={loadingProviders}
            setProducts={setProducts}
            setIsLoadingTable={setIsLoadingTable}
            brands={brands}
            loadingBrands={loadingBrands}
            showSelects={showSelects}
            currenItemsSelected={currentItemsSelected}
            setShowModalBarCodes={setShowModalBarCodes}
          />
        }
        data={products}
        heading={
          heading ||
          defaultHeadingProducts({
            currentItemsSelected,
            setCurrentItemsSelected,
          })
        }
        loading={isFetching || isLoadingTable}
        showResponsive={false}
      />
      <RenderIf isTrue={showModalDeleteProduct}>
        <React.Suspense fallback={<></>}>
          <ModalDeleteProduct
            onAcceptDeleteProduct={onAcceptDeleteProduct}
            onCloseModalDelete={onCloseModalDelete}
            showModalDeleteProduct={showModalDeleteProduct}
            product={stateProductDelete}
            isLoading={isLoadingDeleteProduct}
          />
        </React.Suspense>
      </RenderIf>
      <RenderIf isTrue={showModalBarCodes}>
        <React.Suspense fallback={<></>}>
          <ModalBarCodes
            products={products.filter((product) => currentItemsSelected.includes(product.id))}
            showModal={showModalBarCodes}
            onClose={() => setShowModalBarCodes(false)}
          />
        </React.Suspense>
      </RenderIf>
    </React.Fragment>
  );
};

export default TableProducts;
