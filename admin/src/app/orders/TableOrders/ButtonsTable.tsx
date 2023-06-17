import { validPaths } from "@/utils";
import { Order } from "@teslo/interfaces";
import RenderIf from "@teslo/react-ui/RenderIf";
import { ordersService } from "@teslo/services";
import dayjs from "dayjs";
import * as React from "react";
import { toast } from "react-hot-toast";
import { AiOutlineReload } from "react-icons/ai";
import { FaPlus, FaSearch } from "react-icons/fa";
import { DatePicker } from "react-rainbow-components";
import { Link, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

interface IButtonsTableOrdersProps {
  refetch?(): void;
  buttons?: React.ReactNode;
  showSelects?: boolean;
  setIsLoadingTable?(isLoading: boolean): void;
  setOrders(orders: Order[]): void;
}

const ButtonsTableOrders: React.FunctionComponent<IButtonsTableOrdersProps> = (props) => {
  const { refetch, buttons, showSelects, setIsLoadingTable, setOrders } = props;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromUrl = searchParams.get("from");
  const toUrl = searchParams.get("to");
  console.log({
    fromUrl,
    toUrl,
  });
  const [from, setFrom] = React.useState<Date>(fromUrl ? new Date(fromUrl) : new Date());
  const [to, setTo] = React.useState<Date>(toUrl ? new Date(new Date(toUrl)) : new Date());

  const fetchData = React.useCallback(async () => {
    try {
      if (dayjs(from).isAfter(dayjs(to)) || dayjs(to).isBefore(dayjs(from))) {
        return toast.error("The date range is invalid");
      }

      setIsLoadingTable(true);
      const orders = await ordersService.getOrders({ from, to });
      setOrders(orders.data);
      navigate({
        pathname: validPaths.orders.path,
        search: createSearchParams({
          from: from.toISOString(),
          to: to.toISOString(),
        }).toString(),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTable(false);
    }
  }, [from, to]);

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
        <div className="flex items-center justify-start flex-wrap w-full sm:w-auto flex-grow gap-4">
          <div className="w-full sm:max-w-[225px]">
            <label
              htmlFor="category-select-products"
              className="text-xs w-full text-start mb-1 font-semibold block"
            >
              From
            </label>
            <div>
              <DatePicker
                value={from}
                placeholder="Select any provider"
                borderRadius="semi-square"
                size="small"
                maxDate={new Date()}
                onChange={(date) => setFrom(date)}
              />
            </div>
          </div>
          <div className="w-full sm:max-w-[225px]">
            <label
              htmlFor="category-select-products"
              className="text-xs w-full text-start mb-1 font-semibold block"
            >
              To
            </label>
            <div>
              <DatePicker
                value={to}
                placeholder="Select any brand"
                borderRadius="semi-square"
                size="small"
                maxDate={new Date()}
                onChange={(date) => setTo(date)}
              />
            </div>
          </div>
          <div className="flex items-end sm:h-[50px]">
            <button className="btn btn-xs btn-success mb-0" type="button" onClick={fetchData}>
              <FaSearch />
            </button>
          </div>
        </div>
      </RenderIf>
    </div>
  );
};

export default ButtonsTableOrders;
