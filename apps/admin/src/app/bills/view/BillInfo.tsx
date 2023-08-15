import { Bill, ValidStatusOrder } from "@teslo/interfaces";
import * as React from "react";
import EnterpriseInfo from "../shared/EnterpriseInfo";
import TableBillProducts from "./TableBillProducts";
import dayjs from "dayjs";
import BadgeStatusOrder from "@/app/orders/TableOrders/BadgeStatusOrder";
import { Link } from "react-router-dom";
import { validPaths } from "@/utils";
import { FaEdit, FaFilePdf } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";
import RenderIf from "@/components/ui/RenderIf";
import { billsService } from "@teslo/services";
import Swal from "sweetalert2";
import { useIntl } from "react-intl";

interface IBillInfoProps {
  bill: Bill;
  setBill: (bill: Bill) => void;
}

const BillInfo: React.FC<IBillInfoProps> = (props) => {
  const { bill, setBill } = props;
  const { formatMessage: t } = useIntl();

  const onCancelBill = () => {
    Swal.fire({
      title: t({ id: "bills.delete.youSure" }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const req = await billsService.updateBill(bill.idbill, {
          status: ValidStatusOrder.CANCELED,
        });
        setBill({ ...req.data });
        Swal.fire(t({ id: "app.canceled" }), t({ id: "bills.delete.success" }), "success");
      }
    });
  };

  return (
    <div className="tile p-0 max-w-[900px] mx-auto">
      <div className="p-4 border-b border-gray-200">
        <EnterpriseInfo />
      </div>
      <div className="p-4">
        <div className="mb-6">
          <h6 className="font-semibold text-lg">
            <div className="flex items-center">
              <span className="text-xl">{t({ id: "bills.single" })}</span>{" "}
              <BadgeStatusOrder
                full={false}
                status={bill.status}
                className="px-2 py-0.5 rounded-md text-[10px] mb-0 ml-1.5"
              />
            </div>
          </h6>
          <div className="flex lg:items-center items-start justify-start lg:justify-between lg:mt-1 print:justify-between print:flex-row lg:flex-row flex-col">
            <div className="text-xs">
              <strong>ID:</strong> {bill.idbill}
            </div>
            <div className="text-xs">
              <strong>{t({ id: "bills.label.reference" })}:</strong>{" "}
              {bill.reference || "No reference"}
            </div>
          </div>

          <div className="flex lg:items-center items-start justify-start lg:justify-between lg:mt-1 print:justify-between print:flex-row lg:flex-row flex-col">
            <div className="text-xs">
              <strong>{t({ id: "bills.label.dateCreated" })}:</strong>{" "}
              {dayjs(bill.dateCreated).format("DD/MM/YYYY HH:mm")}
            </div>
            <div className="text-xs">
              <strong>{t({ id: "bills.label.dateUpdated" })}:</strong>{" "}
              {dayjs(bill.dateUpdated).format("DD/MM/YYYY HH:mm")}
            </div>
          </div>
        </div>
        <div>
          <h6 className="font-semibold text-lg">Provider</h6>
          <div className="flex items-start justify-start lg:gap-1 mt-1 flex-col print:flex-row print:flex-wrap print:justify-between">
            <div className="flex print:justify-between print:flex-row lg:items-center items-start justify-start lg:justify-between w-full lg:flex-row flex-col text-xs">
              <div>
                <strong>{t({ id: "providers.label.name" })}:</strong> {bill?.provider?.name}
              </div>
              <div>
                <strong>{t({ id: "providers.label.email" })}:</strong> {bill?.provider?.email}
              </div>
            </div>

            <div className="flex print:justify-between print:flex-row lg:items-center items-start justify-start lg:justify-between w-full lg:flex-row flex-col text-xs">
              <div>
                <strong>{t({ id: "providers.label.phone1" })}:</strong> {bill?.provider?.phone1}
              </div>
              <div>
                <strong>{t({ id: "providers.label.phone2" })}:</strong> {bill?.provider?.phone2}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <TableBillProducts bill={bill} />
        </div>

        <div className="mt-4 print:hidden">
          <div className="flex items-center justify-between gap-x-1">
            <Link
              to={validPaths.editBill.fnPath(bill.idbill)}
              className="btn btn-primary btn-sm w-full"
            >
              {t({ id: "app.edit" })} <FaEdit className="ml-1" />
            </Link>
            <button
              type="button"
              disabled={bill.status === ValidStatusOrder.CANCELED}
              onClick={onCancelBill}
              className="btn btn-danger btn-sm w-full mr-0"
            >
              {t({ id: "app.delete" })}
              <TiCancel className="ml-1" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full btn btn-warning btn-xs lg:flex hidden"
          >
            {t({ id: "app.exportPdf" })} <FaFilePdf className="ml-1" />
          </button>
        </div>

        <RenderIf isTrue={bill.description}>
          <div className="mt-4 print:hidden">
            <div>
              <h6 className="font-semibold text-lg">{t({ id: "bills.label.description" })}</h6>
              <p className="text-xs">{bill.description}</p>
            </div>
          </div>
        </RenderIf>
      </div>
    </div>
  );
};

export default BillInfo;
