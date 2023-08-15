import HeaderDashboard from "@/layouts/HeaderDashboardLayout";
import { validPaths } from "@/utils";
import * as React from "react";
import { FaPen } from "react-icons/fa";
import FormProduct from "../forms/FormProduct";
import { useFetchCategories } from "@/app/categories/hooks/useFetchCategories";
import { Link, useParams } from "react-router-dom";
import RenderIf from "@/components/ui/RenderIf";
import { useFetchProduct } from "../hooks/useFetchProduct";
import { useFetchBrands } from "@/app/brands/hooks/useFetchBrands";
import TileFormProduct from "../shared/TileFormProduct";
import { useFetchProviders } from "@/app/providers/hooks/useFetchProviders";
import { translate } from "@/i18n";

interface IEditProductPageProps {}

const EditProductPage: React.FunctionComponent<IEditProductPageProps> = (props) => {
  const {} = props;
  const params = useParams();
  const onSuccess = () => {};
  const {
    data: product,
    isFetching: isFetchingProduct,
    error: errorProduct,
    refetch: refetchProduct,
  } = useFetchProduct(params.id);
  const {
    data: categories,
    isFetching: isFetchingCategories,
    error: errorCategories,
    refetch: refetchCategories,
  } = useFetchCategories();
  const {
    data: brands,
    isFetching: isFetchingBrands,
    error: errorBrands,
    refetch: refetchBrands,
  } = useFetchBrands();
  const {
    data: providers,
    isFetching: isFetchingProviders,
    error: errorProviders,
    refetch: refetchProviders,
  } = useFetchProviders();

  const isLoading =
    isFetchingCategories || isFetchingProduct || isFetchingBrands || isFetchingProviders;

  return (
    <HeaderDashboard
      to={validPaths.products.path}
      icon={<FaPen />}
      title={translate("products.edit.title")}
      breadcrumbs={[
        { label: translate("dashboard.title"), to: validPaths.dashboard.path },
        { label: translate("products.title"), to: validPaths.products.path },
        { label: translate("products.edit.title") },
      ]}
    >
      <TileFormProduct
        categories={categories}
        isLoading={isLoading}
        brands={brands}
        errorBrands={errorBrands}
        errorCategories={errorCategories}
        errorProviders={errorProviders}
        refetch={() => {
          refetchBrands();
          refetchCategories();
          refetchProduct();
          refetchProviders();
        }}
      >
        <RenderIf isTrue={Object.keys(product || {}).length}>
          <FormProduct
            onSuccess={onSuccess}
            categories={categories}
            product={product}
            brands={brands}
            providers={providers}
          />
        </RenderIf>
        <RenderIf isTrue={!Object.keys(product || {}).length}>
          <img src="/img/others/error.png" alt="Error" className="w-40 mx-auto mb-4" />

          <h6 className="text-center font-normal">404 Error Product Not Found</h6>
          <div className="mt-4 flex items-center justify-center">
            <Link to={validPaths.products.path} className="btn btn-primary btn-sm w-auto mx-auto">
              {translate("products.title")}
            </Link>
          </div>
        </RenderIf>
      </TileFormProduct>
    </HeaderDashboard>
  );
};

export default EditProductPage;
