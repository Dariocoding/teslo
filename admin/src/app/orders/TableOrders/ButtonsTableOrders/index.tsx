import { translate } from "@/i18n";
import { validPaths } from "@/utils";
import { Order } from "@teslo/interfaces";
import RenderIf from "@teslo/react-ui/RenderIf";
import { ordersService } from "@teslo/services";
import dayjs from "dayjs";
import * as React from "react";
import { toast } from "react-hot-toast";
import { AiOutlineReload } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Link, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import SelectOrdersFromTo from "./SelectsFromToOrders";
import { AxiosResponse } from "axios";
import { FindOrdersByDateDto } from "@teslo/services/dist/services/orders-service/interfaces";

interface IButtonsTableOrdersProps {
  refetch?(): void;
  buttons?: React.ReactNode;
  showSelects?: boolean;
  setIsLoadingTable?(isLoading: boolean): void;
  setOrders(orders: Order[]): void;
  fetchOrders?: (params: FindOrdersByDateDto) => Promise<AxiosResponse<Order[], any>>;
  navigateOnChageDateSelect?: boolean;
}

const ButtonsTableOrders: React.FunctionComponent<IButtonsTableOrdersProps> = (props) => {
  const {
    refetch,
    buttons,
    showSelects,
    setIsLoadingTable,
    setOrders,
    fetchOrders = ordersService.getOrders,
    navigateOnChageDateSelect = true,
  } = props;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromUrl = searchParams.get("from");
  const toUrl = searchParams.get("to");
  const [from, setFrom] = React.useState<Date>(fromUrl ? new Date(fromUrl) : new Date());
  const [to, setTo] = React.useState<Date>(toUrl ? new Date(new Date(toUrl)) : new Date());

  const fetchData = React.useCallback(async () => {
    try {
      if (dayjs(from).isAfter(dayjs(to)) || dayjs(to).isBefore(dayjs(from))) {
        return toast.error("The date range is invalid");
      }

      setIsLoadingTable(true);
      const orders = await fetchOrders({ from, to });
      setOrders(orders.data);
      if (navigateOnChageDateSelect) {
        navigate({
          pathname: validPaths.orders.path,
          search: createSearchParams({
            from: from.toISOString(),
            to: to.toISOString(),
          }).toString(),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTable(false);
    }
  }, [from, to, navigateOnChageDateSelect, fetchOrders]);

  return (
    <div className="w-full flex items-center justify-start flex-wrap pb-2 sm:flex-row flex-col sm:mb-0 mb-2">
      <div className="flex items-end justify-start sm:h-[50px] sm:mb-0 mb-2">
        <Link to={validPaths.newOrder.path} className="btn btn-primary btn-xs mb-0">
          <FaPlus />
        </Link>
        <RenderIf isTrue={refetch}>
          <button className="btn btn-alternative btn-xs mb-0" onClick={fetchData}>
            <AiOutlineReload />
          </button>
        </RenderIf>
        {buttons}
      </div>
      <RenderIf isTrue={showSelects}>
        <SelectOrdersFromTo
          to={to}
          setFrom={setFrom}
          setTo={setTo}
          fetchData={fetchData}
          from={from}
        />
      </RenderIf>
    </div>
  );
};

export default ButtonsTableOrders;
