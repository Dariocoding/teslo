import { useCartStore, useConfigApp, useConfigEnterpriseStore } from "@/store";
import * as React from "react";
import { useOrdersFormContext } from "../../FormContainer";
import { DetailOrder, DetailOrderTemp } from "@teslo/interfaces";
import { formatter } from "@/utils";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { useIntl } from "react-intl";
import { translate } from "@/i18n";

interface ITfootTableProductsProps {}

const COLSPANENABLECLOTHES = 6;
const COLSPANDISABLEDCLOTHES = 5;

const TfootTableProducts: React.FunctionComponent<ITfootTableProductsProps> = (props) => {
  const {} = props;
  const { formatMessage: t } = useIntl();
  const { clean } = useCartStore();
  const { configEnterprise } = useConfigEnterpriseStore();
  const { colors } = useConfigApp();
  const { values, setValues } = useOrdersFormContext();
  const colSpan = colors.enableClothesShopping ? COLSPANENABLECLOTHES : COLSPANDISABLEDCLOTHES;

  const subtotalTempProducts = values.products.reduce((prev: number, curr: DetailOrderTemp) => {
    return prev + (curr?.product?.price ?? curr.price) * curr.qty;
  }, 0);
  const subtotalOrderProducts = values.detailOrderProducts.reduce(
    (prev: number, curr: DetailOrder) => {
      return prev + curr.total * curr.quantity;
    },
    0
  );

  const subtotal = subtotalTempProducts + subtotalOrderProducts;

  const IVA = ((subtotal * configEnterprise.iva) / 100).toFixed(2);
  const total = subtotal + parseFloat(IVA);

  const handleCLickClean = async () => {
    const result = await Swal.fire({
      title: t({ id: "orders.form.delete.temporalProducts" }),
      text: t({ id: "app.areYouSureToDoThis" }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      await clean();
      setValues({
        ...values,
        products: [],
        tempProduct: {},
        tempQty: 0,
        searchProduct: "",
      });
    }
  };

  return (
    <tfoot>
      <tr>
        <td colSpan={colSpan} className="text-right font-semibold pl-2 pr-4 py-3">
          {translate("orders.label.subtotal")}:
        </td>
        <td className="text-center">{formatter.format(subtotal || 0)}</td>
      </tr>
      <tr>
        <td colSpan={colSpan} className="text-right font-semibold pl-2 pr-4 py-3">
          I.V.A ({values?.order?.iva || configEnterprise?.iva || 0}%):
        </td>
        <td className="text-center">{formatter.format(+IVA)}</td>
      </tr>
      <tr>
        <td colSpan={colSpan} className="text-right font-semibold pl-2 pr-4 py-3">
          {translate("orders.label.total")}:
        </td>
        <td className="text-center">{formatter.format(+(total || 0))}</td>
      </tr>
      <tr>
        <td colSpan={colSpan + 1} className="px-2 py-3">
          <div className="flex justify-end items-center">
            <button
              onClick={handleCLickClean}
              type="button"
              className="btn btn-outline-danger mb-0 btn-xs gap-1"
            >
              {translate("orders.label.cancelPurchase")} <FaTimes />
            </button>
            <button type="submit" className="btn btn-primary mb-0 btn-xs">
              {translate("orders.label.purchase")}
            </button>
          </div>
        </td>
      </tr>
    </tfoot>
  );
};

export default TfootTableProducts;
