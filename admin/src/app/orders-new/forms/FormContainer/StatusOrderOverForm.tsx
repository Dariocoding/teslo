import * as React from "react";
import { useOrdersFormContext } from ".";
import { libOrdersStatus } from "@/app/orders/TableOrders/BadgeStatusOrder";
import classNames from "classnames";
import { FaCheckCircle } from "react-icons/fa";
import { ARRSTATUSORDER, ValidStatusOrder } from "@teslo/interfaces";
import styled from "styled-components";
import RenderIf from "@/components/ui/RenderIf";
import { RiMoneyDollarCircleFill, RiGitRepositoryFill } from "react-icons/ri";

interface IStatusOrderOverFormProps {}

const StatusOrderOverForm: React.FunctionComponent<IStatusOrderOverFormProps> = (props) => {
  const {} = props;
  const [showStatuses, setShowStatuses] = React.useState(false);
  const { values, setValues } = useOrdersFormContext();
  const { status } = values;

  let background: string;

  if (values.status === "completed") {
    background = "bg-teal-600";
  } else if (values.status === "paid") {
    background = "bg-sky-600";
  } else if (values.status === "pending") {
    background = "bg-orange-700";
  }

  if (values.status === "cancelled") return null;

  return (
    <StyledDiv
      className="absolute bottom-6 right-0 overflow-hidden z-[5]"
      onMouseLeave={() => setShowStatuses(false)}
    >
      <div
        className={classNames(
          "overflow-hidden transition-all list-statuses",
          !showStatuses && "max-h-[0%] w-[0%] h-[0%]",
          showStatuses && "max-h-[100%] w-[100%] h-[100%]"
        )}
      >
        <div
          className={classNames(
            "bg-white flex flex-col items-start mb-3 mr-4 rounded-b-sm rounded-lg shadow text-start text-xs"
          )}
        >
          {ARRSTATUSORDER.filter((status) => status !== ValidStatusOrder.CANCELED).map(
            (status, idx) => (
              <div
                className={classNames(
                  "hover:bg-blue-600 hover:text-white cursor-pointer transition p-2 w-full font-bold",
                  ARRSTATUSORDER.length === idx + 1 && "rounded-b-sm",
                  idx === 0 && "rounded-t-lg",
                  values.status === status && "bg-blue-600 text-white"
                )}
                key={status}
                onClick={() => setValues({ ...values, status })}
              >
                {libOrdersStatus()[status]}
              </div>
            )
          )}
        </div>
      </div>
      <div
        className="flex items-center justify-end text-white container-status"
        onClick={() => setShowStatuses(!showStatuses)}
      >
        <span
          className={classNames(
            "rounded-full icon cursor-pointer inline-block rotate-180 px-2 py-2 rounded-l-none container-icon",
            background
          )}
        >
          <RenderIf isTrue={values.status === "completed"}>
            <FaCheckCircle className="rotate-180" />
          </RenderIf>

          <RenderIf isTrue={values.status === "paid"}>
            <RiMoneyDollarCircleFill className="rotate-180" />
          </RenderIf>

          <RenderIf isTrue={values.status === "pending"}>
            <RiGitRepositoryFill className="rotate-180" />
          </RenderIf>
        </span>
        <div
          className={classNames(
            "py-2 text-xs overflow-hidden transition-width content-text",
            background
          )}
        >
          {libOrdersStatus()[status]}
        </div>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  .content-text {
    width: 0%;
  }

  .content-text,
  .container-icon {
    transition: width 0.5s cubic-bezier(0.17, 0.67, 1, 0.2),
      padding-left 0.5s cubic-bezier(0.17, 0.67, 1, 0.2),
      padding-right 0.5s cubic-bezier(0.17, 0.67, 1, 0.2),
      background 0.25s cubic-bezier(0.17, 0.67, 1, 0.2);
  }

  .icon:hover + .content-text,
  .content-text:hover,
  .list-statuses:hover + .container-status .content-text,
  .content-text:hover,
  .icon:hover + .content-text {
    width: 100%;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    cursor: pointer;
  }
`;

export default StatusOrderOverForm;
