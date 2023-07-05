import AuthorityCheck from "@/components/AuthorityCheck";
import { hideLoader, showLoader } from "@/components/ui/Loader";
import { translate } from "@/i18n";
import { protectedRoutes } from "@/utils";
import { Order, ValidRoles } from "@teslo/interfaces";
import Dropdown from "@teslo/react-ui/Dropdown";
import DropdownItem from "@teslo/react-ui/Dropdown/DropdownItem";
import { ordersService } from "@teslo/services";
import * as React from "react";
import { FaPen, FaUser, FaCog, FaFileInvoice, FaFilePdf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export interface IActionsTableOrderProps {
	order: Order;
	onClickUpdateOrder: (order: Order) => void;
	onClickViewUser(order: Order): void;
}

const ActionsTableOrder: React.FunctionComponent<IActionsTableOrderProps> = props => {
	const { order, onClickUpdateOrder, onClickViewUser } = props;
	const navigate = useNavigate();
	const handleUpdateOrder = () => onClickUpdateOrder(order);
	const handleViewUser = () => onClickViewUser(order);
	const handleExportAsPdf = () => {
		GenerarPdf(order.idorder);
	};

	return (
		<Dropdown classNameButton="btn btn-dark btn-xs mr-0 mb-0" displayButton={<FaCog />} inTable>
			<DropdownItem
				className="flex items-center justify-start gap-1 text-sm"
				onClick={handleExportAsPdf}
			>
				<FaFilePdf className="text-primary text-xs text-red-600" />{" "}
				{translate("orders.action.exportOrderAsPdf")}
			</DropdownItem>

			<DropdownItem
				className="flex items-center justify-start gap-1 text-sm"
				onClick={() => navigate(protectedRoutes.invoiceOrder.fnPath(order.idorder))}
			>
				<FaFileInvoice className="text-primary text-xs text-purple-600" />{" "}
				{translate("orders.action.viewOrder")}
			</DropdownItem>

			<AuthorityCheck validRoles={[ValidRoles.ADMIN, ValidRoles.SUPER_USER]}>
				<DropdownItem
					className="flex items-center justify-start gap-1 text-sm"
					onClick={handleViewUser}
				>
					<FaUser className="text-xs text-blue-600" />
					{translate("orders.action.viewUser")}
				</DropdownItem>
				<DropdownItem
					className="flex items-center justify-start gap-1 text-sm"
					onClick={handleUpdateOrder}
				>
					<FaPen className="text-xs text-green-700" />
					{translate("orders.action.editOrder")}
				</DropdownItem>
			</AuthorityCheck>
		</Dropdown>
	);
};

export default ActionsTableOrder;

const GenerarPdf = async (id: number) => {
	try {
		showLoader();
		const response = await ordersService.exportOrderPdf(id, { responseType: "blob" });
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
