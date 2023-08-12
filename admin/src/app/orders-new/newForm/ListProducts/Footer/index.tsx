import * as React from "react";
import Swal from "sweetalert2";
import { useIntl } from "react-intl";
import { useCartStore, useConfigApp, useConfigEnterpriseStore } from "@/store";
import { DetailOrder, DetailOrderTemp } from "@teslo/interfaces";
import { useOrderFormContext } from "../..";
import { translate } from "@/i18n";
import { formatter } from "@/utils";
import { RenderIf } from "@/components/ui";

interface IFooterListProductsProps {}

const FooterListProducts: React.FunctionComponent<IFooterListProductsProps> = (props) => {
  const {} = props;
  const { values } = useOrderFormContext();
  const { configEnterprise } = useConfigEnterpriseStore();

  const subtotalTempProducts = values.products.reduce(
    (prev: number, curr: DetailOrderTemp) => prev + (curr?.product?.price ?? curr.price) * curr.qty,
    0
  );
  const subtotalOrderProducts = values.detailOrderProducts.reduce(
    (prev: number, curr: DetailOrder) => prev + curr.total * curr.quantity,
    0
  );

  const totalDiscount = values.discount ? values.discount / 100 : 0;
  const subtotal = subtotalTempProducts + subtotalOrderProducts;

  const IVA = ((subtotal * configEnterprise.iva) / 100).toFixed(2);
  let total = subtotal + parseFloat(IVA);
  total = totalDiscount ? total - totalDiscount * total : total;

  if (total === 0) return null;

  return (
    <div className="mt-4">
      <table className="table">
        <tfoot>
          <tr>
            <td className="text-right w-full font-semibold pl-2 pr-4 py-3 text-base">
              {translate("orders.label.subtotal")}:
            </td>
            <td className="text-center text-base font-semibold">
              {formatter.format(subtotal || 0)}
            </td>
          </tr>
          <tr>
            <td className="text-right font-semibold pl-2 pr-4 py-3 text-base">
              I.V.A ({values?.order?.iva || configEnterprise?.iva || 0}%):
            </td>
            <td className="text-center text-base font-semibold">{formatter.format(+IVA)}</td>
          </tr>
          <RenderIf isTrue={values.discount}>
            <tr>
              <td className="text-right font-semibold pl-2 pr-4 py-3 text-base">
                {translate("orders.label.discount")}:
              </td>
              <td className="text-center text-base font-semibold">{values.discount} %</td>
            </tr>
          </RenderIf>
          <tr>
            <td className="text-right font-semibold pl-2 pr-4 py-3 text-base">
              {translate("orders.label.total")}:
            </td>
            <td className="text-center text-base font-semibold">
              {formatter.format(+(total || 0))}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default FooterListProducts;

{
  /* <tfoot>
<tr>
  <td  className="text-right font-semibold pl-2 pr-4 py-3">
    {translate("orders.label.subtotal")}:
  </td>
  <td className="text-center text-base">{formatter.format(subtotal || 0)}</td>
</tr>
<tr>
  <td  className="text-right font-semibold pl-2 pr-4 py-3">
    I.V.A ({values?.order?.iva || configEnterprise?.iva || 0}%):
  </td>
  <td className="text-center text-base"></td>
</tr>
<tr>
  <td  className="text-right font-semibold pl-2 pr-4 py-3">
    {translate("orders.label.total")}:
  </td>
  <td className="text-center text-base">{formatter.format(+(total || 0))}</td>
</tr>
<tr>
  <td colSpan={5 + 1} className="px-2 py-3">
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
</tfoot> */
}
