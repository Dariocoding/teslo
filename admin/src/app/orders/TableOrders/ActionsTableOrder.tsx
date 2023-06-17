import AuthorityCheck from "@/components/AuthorityCheck";
import { protectedRoutes } from "@/utils";
import { Order, ValidRoles } from "@teslo/interfaces";
import Dropdown from "@teslo/react-ui/Dropdown";
import DropdownItem from "@teslo/react-ui/Dropdown/DropdownItem";
import * as React from "react";
import { FaPen, FaUser, FaCog, FaFileInvoice } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export interface IActionsTableOrderProps {
  order: Order;
  onClickUpdateOrder: (order: Order) => void;
  onClickViewUser(order: Order): void;
}

const ActionsTableOrder: React.FunctionComponent<IActionsTableOrderProps> = (props) => {
  const { order, onClickUpdateOrder, onClickViewUser } = props;
  const navigate = useNavigate();
  const handleUpdateOrder = () => onClickUpdateOrder(order);
  const handleViewUser = () => onClickViewUser(order);
  return (
    <Dropdown className="btn btn-dark btn-xs" displayButton={<FaCog />} inTable>
      <DropdownItem
        className="py-3 px-3 flex items-center justify-start gap-1"
        onClick={() => navigate(protectedRoutes.invoiceOrder.fnPath(order.idorder))}
      >
        <FaFileInvoice className="text-primary" /> Ver Orden
      </DropdownItem>

      <AuthorityCheck validRoles={[ValidRoles.ADMIN, ValidRoles.SUPER_USER]}>
        <DropdownItem
          className="py-3 px-3 flex items-center justify-start gap-1"
          onClick={handleViewUser}
        >
          <FaUser />
          Ver Usuario
        </DropdownItem>
        <DropdownItem
          className="py-3 px-3 flex items-center justify-start gap-1"
          onClick={handleUpdateOrder}
        >
          <FaPen />
          Editar orden
        </DropdownItem>
      </AuthorityCheck>
    </Dropdown>
  );
};

export default ActionsTableOrder;
