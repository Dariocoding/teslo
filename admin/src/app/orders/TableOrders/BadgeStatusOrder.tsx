import { capitalize } from "@/utils";
import { StatusOrder } from "@teslo/interfaces";
import classNames from "classnames";
import * as React from "react";

interface IBadgeStatusOrderProps {
  status: StatusOrder;
  className?: string;
  full?: boolean;
}

const BadgeStatusOrder: React.FunctionComponent<IBadgeStatusOrderProps> = (props) => {
  const { status, className = "px-4", full = true } = props;
  return (
    <span
      className={classNames(
        "btn btn-xs cursor-default btn-pill select-none",
        status === "cancelled" && "btn-danger",
        status === "completed" && "btn-success",
        status === "pending" && "btn-warning",
        status === "paid" && "btn-info",
        full && "md:w-full w-max max-w-[110px]",
        className
      )}
    >
      {capitalize(status)}
    </span>
  );
};

export default BadgeStatusOrder;
