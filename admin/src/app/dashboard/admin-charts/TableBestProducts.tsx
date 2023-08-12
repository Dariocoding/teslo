import ActionsProducts from "@/app/products/TableProducts/ActionsProducts";
import { TablePlaceholder } from "@/components/placeholders";
import { DataTable, RenderIf } from "@/components/ui";
import { translate } from "@/i18n";
import { PF, formatter, validPaths } from "@/utils";
import { BestProductSell } from "@teslo/services";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

interface ITableBestProductsProps {
  bestProducts: BestProductSell[];
}

const TableBestProducts: React.FunctionComponent<ITableBestProductsProps> = (props) => {
  const { bestProducts } = props;
  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-3">
        <h6>{translate("dashboard.mostSelledProduct")}</h6>
      </div>
      <div>
        <DataTable
          showResponsive={false}
          data={bestProducts}
          heading={[
            { title: translate("products.label.name"), field: "titleFormatted" },
            { title: translate("products.label.stock"), field: "stock", center: true },
            { title: translate("orders.label.total"), field: "totalFormatted", center: true },
            { title: translate("orders.label.actions"), field: "actions", center: true },
          ]}
          placeholder={<TablePlaceholder />}
          showPagination={false}
          showSearch={false}
          render={(products) =>
            products.map((p) => ({
              ...p,

              titleFormatted: (
                <div className="flex justify-start items-center sm:max-w-[250px] w-full gap-2">
                  <img
                    src={p.url ? PF + "/product/" + p.url : "/img/others/box.png"}
                    className={"lg:w-16 w-24 rounded-md mx-auto"}
                    loading={"lazy"}
                  />
                  <div className="flex flex-col whitespace-pre-wrap w-full">
                    <div className="text-sm mb-1">
                      <Link to={validPaths.viewProduct.fnPath(p.slug)} className="link-table">
                        {p.title}
                      </Link>
                    </div>
                    <RenderIf isTrue={p.custom_code}>
                      <div className="text-xs font-bold mb-1">{p.custom_code}</div>
                    </RenderIf>
                    <div className="text-xs">{p.code}</div>
                  </div>
                </div>
              ),
              totalFormatted: formatter.format(p.total),
              actions: (
                <ActionsProducts
                  product={p}
                  onUpdateProduct={() => navigate(validPaths.editProduct.fnPath(p.slug))}
                  showButtonCartProduct={false}
                />
              ),
            }))
          }
        />
      </div>
    </div>
  );
};
export default TableBestProducts;

/* if (!product?.images) return "/img/others/box.png";
return product?.images?.length
  ? PF + "/product/" + product?.images[product?.images?.length - 1]
  : "/img/others/box.png"; */

/* {
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
    field: "brandFormatted",
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
  }, */
