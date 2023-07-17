import * as React from "react";
import InfoDataTile from "./InfoDataTile";
import { translate } from "@/i18n";
import { Actions, baseExportJson, baseFetchCsv, baseFetchExcel, baseFetchPdf } from "./utils";
import { DatePicker } from "react-rainbow-components";
import Checkbox from "@/components/ui/Checkbox";
import RenderIf from "@/components/ui/RenderIf";
import { Bill, GenerarExcelType, GenerarPdfType, Order } from "@teslo/interfaces";
import { billsService, ordersService } from "@teslo/services";
import dayjs from "dayjs";
import { hideLoader, showLoader } from "@/components/ui/Loader";
import { capitalize, formatter } from "@/utils";

interface IExportBillOrdersProps {}

const ExportBillOrders: React.FunctionComponent<IExportBillOrdersProps> = (props) => {
  const {} = props;
  const [exportAllOrders, setExportAllOrders] = React.useState(false);
  const [exportAllBills, setExportAllBills] = React.useState(false);
  const [dateToOrders, setDateToOrders] = React.useState(new Date());
  const [dateFromOrders, setDatFromOrders] = React.useState(new Date());
  const [dateToBills, setDateToBills] = React.useState(new Date());
  const [dateFromBills, setDateFromBills] = React.useState(new Date());

  const actionsOrders: Actions = {
    onClickPdf: async () => {
      showLoader();
      const orders = await getOrders({ dateFromOrders, dateToOrders, exportAllOrders });
      const data: GenerarPdfType = {
        name: "Orders",
        headers: columnsOrders.map((column) => column.header),
        rows: getOrdersMap(orders) as string[][],
      };
      await baseFetchPdf(data, "Orders");
      hideLoader();
    },
    onClickCsv: async () => {
      showLoader();
      const orders = await getOrders({ exportAllOrders, dateFromOrders, dateToOrders });
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
    onClickExcel: async () => {
      showLoader();
      const orders = await getOrders({ exportAllOrders, dateFromOrders, dateToOrders });
      try {
        const data: GenerarExcelType = {
          name: "Orders",
          columns: columnsOrders,
          data: getOrdersMap(orders).pop() as unknown as string[][],
        };

        await baseFetchExcel(data, "Orders");
      } catch (error) {
        console.log(error);
      } finally {
        hideLoader();
      }
    },
    onClickJson: async () => {
      const orders = await getOrders({ exportAllOrders, dateFromOrders, dateToOrders });
      baseExportJson(orders, "Orders");
      hideLoader();
    },
  };

  const actionsBills: Actions = {
    onClickPdf: async () => {
      showLoader();
      const bills = await getBills({ dateFromBills, dateToBills, exportAllBills });
      const data: GenerarPdfType = {
        name: "Bills",
        headers: columnsBills.map((column) => column.header),
        rows: getBillsMap(bills) as string[][],
      };
      await baseFetchPdf(data, "Bills");
      hideLoader();
    },
    onClickCsv: async () => {
      showLoader();
      const bills = await getBills({ exportAllBills, dateFromBills, dateToBills });
      try {
        const data: GenerarExcelType = {
          name: "Bills",
          columns: columnsBills,
          data: getBillsMap(bills, false).pop() as unknown as string[][],
        };

        await baseFetchCsv(data, "Bills");
      } catch (error) {
        console.log(error);
      } finally {
        hideLoader();
      }
    },
    onClickExcel: async () => {
      showLoader();
      const bills = await getBills({ exportAllBills, dateFromBills, dateToBills });
      try {
        const data: GenerarExcelType = {
          name: "Bills",
          columns: columnsBills,
          data: getBillsMap(bills),
        };

        await baseFetchExcel(data, "Bills");
      } catch (error) {
        console.log(error);
      } finally {
        hideLoader();
      }
    },
    onClickJson: async () => {
      const bills = await getBills({ exportAllBills, dateFromBills, dateToBills });
      baseExportJson(bills, "Bills");
      hideLoader();
    },
  };

  return (
    <React.Fragment>
      <div className="flex items-center gap-4 flex-wrap">
        <Checkbox isChecked={exportAllOrders} onChange={setExportAllOrders}>
          <span className="text-sm">Export all Orders</span>
        </Checkbox>
        <Checkbox isChecked={exportAllBills} onChange={setExportAllBills}>
          <span className="text-sm">Export all Bills</span>
        </Checkbox>
      </div>
      <span>
        <InfoDataTile title={translate("orders.title")} {...actionsOrders}>
          <RenderIf isTrue={!exportAllOrders}>
            <div className="flex gap-2 items-start mt-2 pb-3">
              <DatePicker
                value={dateFromOrders}
                placeholder="From"
                borderRadius="semi-square"
                size="small"
                maxDate={new Date()}
                onChange={(date) => setDatFromOrders(date)}
                label={"From"}
                labelAlignment="left"
              />
              <DatePicker
                value={dateToOrders}
                placeholder="From"
                borderRadius="semi-square"
                size="small"
                maxDate={new Date()}
                onChange={(date) => setDateToOrders(date)}
                label={"To"}
                labelAlignment="left"
              />
            </div>
          </RenderIf>
        </InfoDataTile>
      </span>
      <span>
        <InfoDataTile title={translate("bills.title")} {...actionsBills}>
          <RenderIf isTrue={!exportAllBills}>
            <div className="flex gap-2 items-start mt-2 pb-3">
              <DatePicker
                value={dateFromBills}
                placeholder="From"
                borderRadius="semi-square"
                size="small"
                maxDate={new Date()}
                onChange={(date) => setDateFromBills(date)}
                label={"From"}
                labelAlignment="left"
              />
              <DatePicker
                value={dateToBills}
                placeholder="To"
                borderRadius="semi-square"
                size="small"
                maxDate={new Date()}
                onChange={(date) => setDateToBills(date)}
                label={"Start"}
                labelAlignment="left"
              />
            </div>
          </RenderIf>
        </InfoDataTile>
      </span>
    </React.Fragment>
  );
};

export default ExportBillOrders;

const columnsOrders: GenerarExcelType["columns"] = [
  { header: "Customer" },
  { header: "Payment Method" },
  { header: "Reference" },
  { header: "Status" },
  { header: "Date" },
  { header: "Total" },
];

const getOrdersMap = (orders: Order[], calcTotal = true): GenerarExcelType["data"] =>
  [
    ...orders.map((o) => [
      o.user.firstName + " " + o.user.lastName,
      o.paymentMethod.title,
      o.reference,
      capitalize(o.status),
      dayjs(o.dateCreated).format("DD/MM/YYYY HH:mm:ss"),
      formatter.format(o.total),
    ]),
    calcTotal
      ? [
          "",
          "",
          "",
          "",
          "",
          formatter.format(orders.reduce((prev: number, curr: Order) => prev + curr.total, 0)),
        ]
      : null,
  ].filter((o) => o);

interface GetOrders {
  exportAllOrders: boolean;
  dateFromOrders: Date;
  dateToOrders: Date;
}

const getOrders = async (props: GetOrders) => {
  const { dateFromOrders, exportAllOrders, dateToOrders } = props;
  let orders: Order[];
  showLoader();
  try {
    if (exportAllOrders) {
      const req = await ordersService.getOrders();
      orders = req.data;
    } else {
      const req = await ordersService.getOrders({
        from: dateFromOrders,
        to: dateToOrders,
      });
      orders = req.data;
    }
    return orders;
  } catch (error) {
    console.log(error);
    hideLoader();
  }

  return [];
};

const columnsBills: GenerarExcelType["columns"] = [
  { header: "Reference" },
  { header: "Status" },
  { header: "Provider Name" },
  { header: "Subtotal" },
  { header: "Total" },
];

const getBillsMap = (bills: Bill[], calcTotal = true): GenerarExcelType["data"] =>
  [
    ...bills.map((b) => [
      b.reference,
      capitalize(b.status),
      b.provider.name,
      formatter.format(b.subtotal),
      formatter.format(b.total),
    ]),
    calcTotal
      ? [
          "",
          "",
          "",
          formatter.format(bills.reduce((prev: number, curr: Bill) => prev + curr.subtotal, 0)),
          formatter.format(bills.reduce((prev: number, curr: Bill) => prev + curr.total, 0)),
        ]
      : null,
  ].filter((b) => b);

interface GetBills {
  exportAllBills: boolean;
  dateFromBills: Date;
  dateToBills: Date;
}

const getBills = async (props: GetBills) => {
  const { exportAllBills, dateFromBills, dateToBills } = props;

  let bills: Bill[];
  showLoader();
  try {
    if (exportAllBills) {
      const req = await billsService.findBills({});
      bills = req.data;
    } else {
      const req = await billsService.findBills({
        from: dateFromBills,
        to: dateToBills,
      });
      bills = req.data;
    }
    return bills;
  } catch (error) {
    console.log(error);
    hideLoader();
  }

  return [];
};
