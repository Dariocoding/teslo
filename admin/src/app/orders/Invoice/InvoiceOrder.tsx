import Logo from "@/layouts/Logo";
import { useConfigEnterpriseStore } from "@/store";
import { APP_EMAIL, APP_NAME, APP_PHONE, capitalize, formatter, PF } from "@/utils";
import { Order } from "@teslo/interfaces";
import RenderIf from "@/components/ui/RenderIf";
import dayjs from "dayjs";
import * as React from "react";
import { FaPrint } from "react-icons/fa";
import TableInvoiceOrder from "./TableInvoiceOrder";
import { translate } from "@/i18n";
import { libOrdersStatus } from "../TableOrders/BadgeStatusOrder";

interface IInvoiceOrderProps {
  order: Order;
}

const InvoiceOrder: React.FunctionComponent<IInvoiceOrderProps> = (props) => {
  const { order } = props;
  const { configEnterprise } = useConfigEnterpriseStore();
  const { user } = order;
  return (
    <div className="tile">
      <section id="sPedido" className="text-xs">
        <div className="flex items-center">
          <div>
            <Logo type="streamline" />
          </div>

          <div className="text-right w-full">
            <strong>{translate("orders.label.dateCreated")}: </strong>
            {dayjs(order.dateCreated).format("DD/MM/YYYY")}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-8 mb-12">
          <div>
            {translate("settings.enterPriseData.title")}:
            <address className="mt-1">
              <RenderIf isTrue={configEnterprise.name}>
                <strong className="mb-2">{configEnterprise.name}</strong>
                <br />
              </RenderIf>
              <RenderIf isTrue={configEnterprise.phone}>
                <strong>{translate("users.label.phone")}: </strong> {configEnterprise.phone}
                <br />
              </RenderIf>

              <RenderIf isTrue={configEnterprise.email}>
                <strong>{translate("users.label.email")}: </strong> {APP_EMAIL}
                <br />
              </RenderIf>

              <a target="_blank" rel="noreferrer" href={"#!"}>
                {window.location.origin}
              </a>
            </address>
          </div>
          <div>
            {translate("users.customer")}:
            <address className="mt-1">
              <strong>
                {user.firstName} {user.lastName}
              </strong>
              <br />
              <b>{translate("users.label.phone")}:</b> {user.phone} <br />
              <b>{translate("users.label.email")}:</b> {user.email} <br />
            </address>
          </div>
          <div>
            <b>{translate("orders.single")} #</b> {order.idorder} <br />
            <b>{translate("orders.label.reference")}:</b> {order.reference}
            <br />
            <b>{translate("orders.label.status")}:</b>{" "}
            {libOrdersStatus()[order.status] || capitalize(order.status)} <br />
            <b>{translate("orders.label.total")}:</b> {formatter.format(order.total)}
            <br />
            {/* <b>Tipo Pago:</b> {tipopago.nombre} */}
            <br />
          </div>
        </div>

        <TableInvoiceOrder order={order} />

        <div className="print:hidden mt-2">
          <div className="text-right">
            <button className="btn btn-primary btn-xs" onClick={() => window.print()}>
              <FaPrint className="mr-1.5" /> {translate("app.print")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvoiceOrder;
