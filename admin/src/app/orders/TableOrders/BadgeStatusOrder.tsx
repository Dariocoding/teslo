import { translate } from "@/i18n";
import { capitalize } from "@/utils";
import { StatusOrder } from "@teslo/interfaces";
import classNames from "classnames";
import * as React from "react";

interface IBadgeStatusOrderProps {
  status: StatusOrder;
  className?: string;
  full?: boolean;
}

export const libOrdersStatus = () => ({
  cancelled: translate("orders.status.cancelled"),
  completed: translate("orders.status.completed"),
  pending: translate("orders.status.pending"),
  paid: translate("orders.status.paid"),
});

const BadgeStatusOrder: React.FunctionComponent<IBadgeStatusOrderProps> = (props) => {
  const { status, className = "px-4", full = true } = props;

  return (
    <span
      className={classNames(
        "btn btn-xs cursor-default btn-pill select-none print:shadow-none",
        status === "cancelled" && "btn-danger",
        status === "completed" && "btn-success",
        status === "pending" && "btn-warning",
        status === "paid" && "btn-info",
        full && "md:w-full w-max max-w-[110px]",
        className
      )}
    >
      {libOrdersStatus()[status] || capitalize(status)}
    </span>
  );
};

export default BadgeStatusOrder;
