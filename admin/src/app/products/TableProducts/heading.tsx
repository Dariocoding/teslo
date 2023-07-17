import { translate } from "@/i18n";
import { useConfigApp } from "@/store";
import { Product } from "@teslo/interfaces";
import Checkbox from "@/components/ui/Checkbox";
import { HeaderDataTable } from "@/components/ui/DataTable";

interface UseDefaultHeadingProducts {
  currentItemsSelected: string[];
  setCurrentItemsSelected: (items: string[]) => void;
}

const useDefaultHeadingProducts = (propsHook: UseDefaultHeadingProducts): HeaderDataTable[] => {
  const { colors } = useConfigApp();
  const { enableClothesShopping } = colors;

  const arr: HeaderDataTable[] = [
    {
      field: "checkSelected",
      title: (props) => <CheckBoxSelectAllProducts {...props} {...propsHook} />,
      center: true,
    },

    { title: translate("products.label.image"), field: "image", center: true },
    { title: translate("products.label.name"), field: "titleFormatted" },
    enableClothesShopping ? null : null,
    {
      title: translate("products.label.price"),
      field: "priceFormatted",
      center: true,
    },
    { title: translate("products.label.stock"), field: "stock", center: true },
    {
      title: translate("products.label.categories"),
      field: "categoriesFormatted",
      center: true,
    },
    {
      title: translate("products.label.brand"),
      field: "brand.title",
      center: true,
    },
    {
      title: translate("products.label.providers"),
      field: "providersFormatted",
      center: true,
    },
    {
      title: translate("products.label.status"),
      field: "status",
      center: true,
    },
    {
      title: translate("products.label.actions"),
      field: "actions",
      center: true,
    },
  ];

  const arrClothesShopping = [
    {
      title: translate("products.label.gender"),
      field: "gender",
      center: true,
    },
    {
      title: translate("products.label.sizes"),
      field: "sizesFormatted",
      center: true,
    },
  ];

  // insert array arrlclothesShopping into position 3
  if (enableClothesShopping) {
    arr.splice(3, 0, ...arrClothesShopping);
  }

  return arr.filter((arr) => arr);
};

export default useDefaultHeadingProducts;

interface ICheckBoxSelectAllProductProps extends UseDefaultHeadingProducts {
  currentItems: Product[];
}

const CheckBoxSelectAllProducts = (props: ICheckBoxSelectAllProductProps) => {
  const { currentItems, currentItemsSelected, setCurrentItemsSelected } = props;

  const isSelected = currentItemsSelected.length === currentItems.length;

  const handleSelectAll = () => {
    if (isSelected) {
      setCurrentItemsSelected([]);
    } else {
      setCurrentItemsSelected(currentItems.map((item) => item.id));
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Checkbox isChecked={isSelected} onChange={handleSelectAll} enableMarginRight={false} />
    </div>
  );
};
