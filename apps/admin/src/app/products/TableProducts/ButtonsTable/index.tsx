import * as React from "react";
import { FaFileCsv, FaFileExcel, FaFilePdf, FaPlus } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";
import {
  Brand,
  Category,
  GenerarExcelType,
  GenerarPdfType,
  Product,
  Provider,
  ValidRoles,
} from "@teslo/interfaces";
import classNames from "classnames";
import SelectsTable from "./SelectsTable";
import Dropdown from "@/components/ui/Dropdown";
import DropdownItem from "@/components/ui/Dropdown/DropdownItem";
import RenderIf from "@/components/ui/RenderIf";
import { productsService } from "@teslo/services";
import { hideLoader, showLoader } from "@/components/ui/Loader";
import { formatter } from "@/utils";
import dayjs from "dayjs";
import { useConfigApp } from "@/store";
import { VscJson } from "react-icons/vsc";
import AuthorityCheck from "@/components/AuthorityCheck";

export interface IButtonsTableProductProps {
  onCreateProduct: () => void;
  refetch: () => void;
  categories: Category[];
  providers: Provider[];
  loadingProviders: boolean;
  loadingCategories: boolean;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setIsLoadingTable: (value: boolean) => void;
  brands: Brand[];
  loadingBrands: boolean;
  showSelects?: boolean;
  currenItemsSelected: string[];
  setShowModalBarCodes: React.Dispatch<boolean>;
}

const ButtonsTableProduct: React.FunctionComponent<IButtonsTableProductProps> = (props) => {
  const { onCreateProduct, showSelects = true, currenItemsSelected, setShowModalBarCodes } = props;
  const { colors } = useConfigApp();
  const refetchData = React.useRef<Function>();

  return (
    <div>
      <div className="w-full flex items-center justify-start flex-wrap pb-2 sm:flex-row flex-col sm:mb-0 mb-2">
        <div
          className={classNames(
            "flex items-end justify-start h-max sm:mb-0 mb-2",
            showSelects && "sm:h-[50px]"
          )}
        >
          <AuthorityCheck
            validRoles={[ValidRoles.ADMIN, ValidRoles.SUPERVISOR, ValidRoles.SUPER_USER]}
          >
            <button
              className="btn btn-primary mb-0 btn-xs shadow-none"
              type="button"
              onClick={onCreateProduct}
            >
              <FaPlus />
            </button>
          </AuthorityCheck>
          <button
            type="button"
            className="btn btn-outline-alternative mb-0 btn-xs shadow-none"
            onClick={() => refetchData.current()}
          >
            <AiOutlineReload />
          </button>
        </div>
        <SelectsTable {...props} refetchData={refetchData} />
      </div>
      <RenderIf isTrue={currenItemsSelected.length}>
        <div className="w-full flex items-center justify-start flex-wrap pb-2 sm:flex-row flex-col sm:mb-0 mb-2 mt-3">
          <Dropdown
            classNameButton="btn btn-xs mb-0 btn-danger mr-2 gap-1 shadow-none"
            displayButton={
              <>
                PDF <FaFilePdf />
              </>
            }
            placement="right"
          >
            <DropdownItem onClick={() => handleExportPdfProducts(currenItemsSelected)}>
              Export Products
            </DropdownItem>
            <DropdownItem onClick={() => setShowModalBarCodes(true)}>Export Bar Codes</DropdownItem>
          </Dropdown>

          <button
            type="button"
            onClick={() =>
              handleExportExcelProducts(currenItemsSelected, colors.enableClothesShopping)
            }
            className="btn btn-xs mb-0 btn-success gap-1 shadow-none"
          >
            Excel <FaFileExcel />
          </button>
          <button
            type="button"
            className="btn btn-xs mb-0 btn-info gap-1 shadow-none"
            onClick={() =>
              handleExportExcelProducts(currenItemsSelected, colors.enableClothesShopping, true)
            }
          >
            CSV <FaFileCsv />
          </button>
          <button
            type="button"
            className="btn btn-xs mb-0 btn-alternative gap-1 shadow-none"
            onClick={() => handleExportJsonProducts(currenItemsSelected)}
          >
            JSON <VscJson />
          </button>
        </div>
      </RenderIf>
    </div>
  );
};

export default ButtonsTableProduct;

const handleExportPdfProducts = async (currentItems: string[]) => {
  const products = await productsService.selectProducts(currentItems);
  try {
    showLoader();
    const data: GenerarPdfType = {
      name: "Products - " + dayjs().format("DD/MM/YYYY"),
      headers: ["Title", "Custom Cod.", "Cod.", "Price", "Stock", "Brand", "Categories", "Status"],
      rows: products.data.map((product) => [
        product?.title,
        product?.customCode || "",
        product?.code.toString(),
        product?.price ? formatter.format(product?.price) : "0",
        product?.stock ? product?.stock.toString() : (0).toString(),
        product?.brand?.title || "",
        product?.categories.map((category) => category.title).join(", "),
        product?.status || "",
      ]),
    };
    const { baseFetchPdf } = await import("@/app/config/exportsAppData/utils");
    await baseFetchPdf(data, "Products");
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

const handleExportExcelProducts = async (
  currentItems: string[],
  enableClothesShopping: boolean,
  csv?: boolean
) => {
  const products = await productsService.selectProducts(currentItems);
  try {
    showLoader();
    const data: GenerarExcelType = {
      name: "Products - " + dayjs().format("DD-MM-YYYY"),
      columns: [
        { header: "Title" },
        { header: "custom Cod." },
        { header: "Cod." },
        { header: "Price" },
        { header: "Stock" },
        { header: "Brand" },
        { header: "Categories" },
        { header: "Providers" },
        { header: "Status" },
        { header: "Description" },
      ],

      data: products.data.map((product) =>
        [
          product.title,
          product.customCode || "empty",
          product.code.toString(),
          product.price ? formatter.format(product.price) : "0",
          product.stock ? product.stock.toString() : (0).toString(),
          product.brand.title || "",
          product.categories.map((category) => category.title).join(", "),
          product.providers.map((provider) => provider.name).join(", "),
          product.status || "",
          product.description || "",
          enableClothesShopping ? product.gender : null,
          enableClothesShopping ? product.sizes.map((size) => size).join(", ") : null,
        ].filter((p) => p !== null)
      ),
    };

    if (enableClothesShopping) {
      data.columns.push({ header: "Gender" });
      data.columns.push({ header: "Sizes" });
    }
    const { baseFetchCsv, baseFetchExcel } = await import("@/app/config/exportsAppData/utils");

    if (csv) {
      await baseFetchCsv(data, "Products");
    } else {
      await baseFetchExcel(data, "Products");
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

const handleExportJsonProducts = async (currentItems: string[]) => {
  const products = await productsService.selectProducts(currentItems);
  const { baseExportJson } = await import("@/app/config/exportsAppData/utils");
  baseExportJson(products.data, "Products");
};
