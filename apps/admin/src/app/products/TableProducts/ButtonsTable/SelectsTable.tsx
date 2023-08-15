import RenderIf from "@/components/ui/RenderIf";
import * as React from "react";
import SelectTableProduct from "./SelectTableProduct";
import { IButtonsTableProductProps } from ".";
import { translate } from "@/i18n";
import { ARRSIZES } from "@teslo/interfaces";
import { useConfigApp } from "@/store";
import { useButtonTable } from "./useButtonTable";

interface ISelectsTableProps extends IButtonsTableProductProps {
  refetchData: React.MutableRefObject<Function>;
}

const SelectsTable: React.FunctionComponent<ISelectsTableProps> = (props) => {
  const {
    showSelects = true,
    loadingBrands,
    loadingCategories,
    loadingProviders,
    categories,
    brands,
    providers,
  } = props;

  const { colors } = useConfigApp();

  const {
    onChangeCategorySelect,
    category,
    refetchData,
    provider,
    onChangeBrandSelect,
    onChangeProviderSelect,
    brand,
    currentSize,
    onChangeCurrentSize,
  } = useButtonTable(props);

  React.useEffect(() => {
    props.refetchData.current = refetchData;
  }, [refetchData]);

  return (
    <RenderIf isTrue={showSelects}>
      <div className="flex items-center justify-start flex-wrap w-full sm:w-auto flex-grow gap-4">
        <SelectTableProduct
          id="category-select-products"
          title={translate("products.label.categories")}
          loading={loadingCategories}
          value={{
            label: category?.title,
            value: category?.idcategory,
          }}
          options={categories?.map((c) => ({
            label: c.title,
            value: c.idcategory,
          }))}
          placeholder={translate("products.placeholder.categories")}
          context={category}
          onChange={onChangeCategorySelect}
        />
        <SelectTableProduct
          id="provider-select-products"
          title={translate("products.label.providers")}
          loading={loadingProviders}
          value={{
            label: provider?.name,
            value: provider?.idprovider,
          }}
          options={providers?.map((p) => ({
            label: p.name,
            value: p.idprovider,
          }))}
          placeholder={translate("products.placeholder.providers")}
          context={provider}
          onChange={onChangeProviderSelect}
        />

        <SelectTableProduct
          id="brand-select-products"
          title={translate("products.label.brand")}
          loading={loadingBrands}
          value={{
            label: brand?.title,
            value: brand?.idbrand,
          }}
          options={brands?.map((b) => ({
            label: b.title,
            value: b.idbrand,
          }))}
          placeholder={translate("products.placeholder.brand")}
          context={brand}
          onChange={onChangeBrandSelect}
        />

        <RenderIf isTrue={colors.enableClothesShopping}>
          <SelectTableProduct
            id="sizes-select-products"
            title={translate("products.label.sizes")}
            loading={false}
            value={{
              label: currentSize,
              value: currentSize,
            }}
            options={ARRSIZES.map((value) => ({
              value: value,
              label: value,
            }))}
            placeholder={translate("products.placeholder.sizes")}
            context={currentSize}
            onChange={onChangeCurrentSize}
            customSize="sm:max-w-[225px]"
          />
        </RenderIf>
      </div>
    </RenderIf>
  );
};

export default SelectsTable;
