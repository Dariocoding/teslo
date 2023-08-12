import { translate } from "@/i18n";
import { firstDayOfMonth, validPaths } from "@/utils";
import { GenerarExcelType, GenerarPdfType, Order } from "@teslo/interfaces";
import RenderIf from "@/components/ui/RenderIf";
import { ordersService } from "@teslo/services";
import dayjs from "dayjs";
import * as React from "react";
import { toast } from "react-hot-toast";
import { AiOutlineReload } from "react-icons/ai";
import { FaFileCsv, FaFileExcel, FaFilePdf, FaPlus } from "react-icons/fa";
import { Link, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import SelectOrdersFromTo from "./SelectsFromToOrders";
import { AxiosResponse } from "axios";
import { FindOrdersByDateDto } from "@teslo/services/dist/services/orders-service/interfaces";
import classNames from "classnames";
import { VscJson } from "react-icons/vsc";
import { hideLoader, showLoader } from "@/components/ui/Loader";
import {
  baseExportJson,
  baseFetchCsv,
  baseFetchExcel,
  baseFetchPdf,
} from "@/app/config/exportsAppData/utils";
import { columnsOrders, getOrdersMap } from "@/app/config/exportsAppData/ExportsBillOrders";

interface IButtonsTableOrdersProps {
  refetch?(): void;
  buttons?: React.ReactNode;
  showSelects?: boolean;
  setIsLoadingTable?(isLoading: boolean): void;
  setOrders(orders: Order[]): void;
  fetchOrders?: (params: FindOrdersByDateDto) => Promise<AxiosResponse<Order[], any>>;
  navigateOnChageDateSelect?: boolean;
  orders: Order[];
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
    orders,
  } = props;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromUrl = searchParams.get("from");
  const toUrl = searchParams.get("to");
  const [from, setFrom] = React.useState<Date>(fromUrl ? new Date(fromUrl) : firstDayOfMonth());
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
    <div>
      <div className="w-full flex items-center justify-start flex-wrap pb-2 sm:flex-row flex-col mb-2">
        <div
          className={classNames(
            "flex items-end justify-start sm:mb-0 mb-2",
            showSelects && "sm:h-[50px]"
          )}
        >
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

      <RenderIf isTrue={orders.length}>
        <div className="w-full flex items-center justify-start flex-wrap pb-2 sm:mb-0 mb-2 mt-3">
          <button
            type="button"
            className="btn btn-xs mb-0 btn-danger mr-2 gap-1 shadow-none"
            onClick={() => actionsOrders.onClickPdf(orders)}
          >
            PDF <FaFilePdf />
          </button>
          <button
            type="button"
            onClick={() => actionsOrders.onClickExcel(orders)}
            className="btn btn-xs mb-0 btn-success gap-1 shadow-none"
          >
            Excel <FaFileExcel />
          </button>
          <button
            type="button"
            className="btn btn-xs mb-0 btn-info gap-1 shadow-none"
            onClick={() => actionsOrders.onClickCsv(orders)}
          >
            CSV <FaFileCsv />
          </button>
          <button
            type="button"
            className="btn btn-xs mb-0 btn-alternative gap-1 shadow-none"
            onClick={() => actionsOrders.onClickJson(orders)}
          >
            JSON <VscJson />
          </button>
        </div>
      </RenderIf>
    </div>
  );
};

export default ButtonsTableOrders;

const actionsOrders = {
  onClickPdf: async (orders: Order[]) => {
    showLoader();
    const data: GenerarPdfType = {
      name: "Orders",
      headers: columnsOrders.map((column) => column.header),
      rows: getOrdersMap(orders) as string[][],
    };
    await baseFetchPdf(data, "Orders");
    hideLoader();
  },
  onClickCsv: async (orders: Order[]) => {
    showLoader();
    try {
      const data: GenerarExcelType = {
        name: "Orders",
        columns: columnsOrders,
        data: getOrdersMap(orders, false),
      };

      await baseFetchCsv(data, "Orders");
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
    }
  },
  onClickExcel: async (orders: Order[]) => {
    showLoader();
    try {
      const data: GenerarExcelType = {
        name: "Orders",
        columns: columnsOrders,
        data: getOrdersMap(orders),
      };

      await baseFetchExcel(data, "Orders");
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
    }
  },
  onClickJson: async (orders: Order[]) => {
    baseExportJson(orders, "Orders");
  },
};
