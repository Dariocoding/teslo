import DataTable, { HeaderDataTable } from "@/components/ui/DataTable";
import * as React from "react";
import defaultHeadingProducts from "./heading";
import mapProducts from "./mapProducts";
import RenderIf from "@/components/ui/RenderIf";
import { Brand, Category, Product, Provider } from "@teslo/interfaces";
import { TablePlaceholder } from "@/components/placeholders";
import ButtonsTableProduct from "./ButtonsTable";
import { useActionsTableProducts } from "./useActionsTableProducts";
import ModalDeleteProduct from "./ModalDeleteProduct";
import { Lightbox } from "react-modal-image";
import { imageProduct } from "@/utils";

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

const ModalBarCodes = React.lazy(() => import("../shared/ModalBarCodes"));

const TableProducts: React.FunctionComponent<ITableProductsProps> = (props) => {
  const [isLoadingTable, setIsLoadingTable] = React.useState(false);
  const [showModalBarCodes, setShowModalBarCodes] = React.useState(false);
  const [currentItemsSelected, setCurrentItemsSelected] = React.useState<string[]>([]);
  const [productImageLightBox, setProductImageLightBox] = React.useState<Product>(null);

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
        itemsPerPage={20}
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
            setProductImageLightBox,
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

      <ModalDeleteProduct
        onAcceptDeleteProduct={onAcceptDeleteProduct}
        onCloseModalDelete={onCloseModalDelete}
        showModalDeleteProduct={showModalDeleteProduct}
        product={stateProductDelete}
        isLoading={isLoadingDeleteProduct}
      />

      <RenderIf isTrue={showModalBarCodes}>
        <React.Suspense fallback={<></>}>
          <ModalBarCodes
            products={products.filter((product) => currentItemsSelected.includes(product.id))}
            showModal={showModalBarCodes}
            onClose={() => setShowModalBarCodes(false)}
          />
        </React.Suspense>
      </RenderIf>

      <RenderIf isTrue={productImageLightBox}>
        <Lightbox
          medium={imageProduct(productImageLightBox)}
          large={imageProduct(productImageLightBox)}
          small={imageProduct(productImageLightBox)}
          //@ts-ignore
          onClose={() => setProductImageLightBox(null)}
          alt={productImageLightBox?.title}
        />
      </RenderIf>
    </React.Fragment>
  );
};

export default TableProducts;
