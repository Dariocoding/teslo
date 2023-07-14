import AuthorityCheck from "@/components/AuthorityCheck";
import { hideLoader, showLoader } from "@/components/ui/Loader";
import { translate } from "@/i18n";
import { protectedRoutes, validPaths } from "@/utils";
import { Order, ValidRoles } from "@teslo/interfaces";
import Dropdown from "@teslo/react-ui/Dropdown";
import DropdownItem from "@teslo/react-ui/Dropdown/DropdownItem";
import RenderIf from "@teslo/react-ui/RenderIf";
import { ordersService } from "@teslo/services";
import * as React from "react";
import { FaPen, FaUser, FaCog, FaFileInvoice, FaFilePdf, FaTimes, FaCheck } from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export interface IActionsTableOrderProps {
  order: Order;
  onClickUpdateOrder: (order: Order) => void;
  onClickViewUser(order: Order): void;
  onCancelOrder: (order: Order) => void;
  onCompleteOrder: (order: Order) => void;
}

const ActionsTableOrder: React.FunctionComponent<IActionsTableOrderProps> = (props) => {
  const { order, onClickUpdateOrder, onClickViewUser, onCancelOrder, onCompleteOrder } = props;
  const navigate = useNavigate();
  const handleQuickUpdateOrder = () => onClickUpdateOrder(order);
  const handleViewUser = () => onClickViewUser(order);
  const handleExportAsPdf = () => GenerarPdf(order.idorder);
  const handleCancelOrder = () => onCancelOrder(order);
  const handleCompletedOrder = () => onCompleteOrder(order);

  const handleUpdateOrder = () => {
    navigate(validPaths.editOrder.fnPath(order.idorder));
  };

  return (
    <Dropdown classNameButton="btn btn-dark btn-xs mr-0 mb-0" displayButton={<FaCog />} inTable>
      <AuthorityCheck
        validRoles={[
          ValidRoles.ADMIN,
          ValidRoles.SUPER_USER,
          ValidRoles.SUPERVISOR,
          ValidRoles.SELLER,
        ]}
      >
        <DropdownItem
          className="flex items-center justify-start gap-1 text-sm"
          onClick={handleQuickUpdateOrder}
        >
          <IoIosFlash className="text-orange-700 text-lg -ml-1" />
          {translate("orders.action.quickEdit")}
        </DropdownItem>

        <AuthorityCheck
          validRoles={[ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR]}
        >
          <DropdownItem
            className="flex items-center justify-start gap-1 text-sm"
            onClick={handleUpdateOrder}
          >
            <FaPen className="text-teal-700 text-xs" />
            {translate("orders.action.editOrder")}
          </DropdownItem>
          <RenderIf isTrue={order.status === "cancelled"}>
            <DropdownItem
              className="flex items-center justify-start gap-1.5 text-sm"
              onClick={handleCompletedOrder}
            >
              <FaCheck className="text-xs text-green-700" />
              {translate("orders.action.completedOrder")}
            </DropdownItem>
          </RenderIf>
        </AuthorityCheck>
        <AuthorityCheck
          validRoles={[
            ValidRoles.ADMIN,
            ValidRoles.SUPER_USER,
            ValidRoles.SUPERVISOR,
            ValidRoles.SELLER,
          ]}
        >
          <RenderIf isTrue={order.status !== "cancelled"}>
            <DropdownItem
              className="flex items-center justify-start gap-1.5 text-sm"
              onClick={handleCancelOrder}
            >
              <FaTimes className="text-xs text-red-700" />
              {translate("orders.action.cancelOrder")}
            </DropdownItem>
          </RenderIf>
        </AuthorityCheck>
      </AuthorityCheck>

      <DropdownItem
        className="flex items-center justify-start gap-1.5 text-sm"
        onClick={handleViewUser}
      >
        <FaUser className="text-xs text-blue-600" />
        {translate("orders.action.viewUser")}
      </DropdownItem>

      <DropdownItem
        className="flex items-center justify-start gap-1.5 text-sm"
        onClick={() => navigate(protectedRoutes.invoiceOrder.fnPath(order.idorder))}
      >
        <FaFileInvoice className="text-primary text-xs text-purple-600" />{" "}
        {translate("orders.action.viewOrder")}
      </DropdownItem>

      <DropdownItem
        className="flex items-center justify-start gap-1.5 text-sm"
        onClick={handleExportAsPdf}
      >
        <FaFilePdf className="text-primary text-xs text-red-600" />{" "}
        {translate("orders.action.exportOrderAsPdf")}
      </DropdownItem>
    </Dropdown>
  );
};

export default ActionsTableOrder;

const GenerarPdf = async (id: number) => {
  try {
    showLoader();
    const response = await ordersService.exportOrderPdf(id, {
      responseType: "blob",
    });
    const urlPDF = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlPDF;
    link.setAttribute("download", `Order-${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};
