import { translate } from "@/i18n";
import * as React from "react";
import { FaCashRegister, FaTrash } from "react-icons/fa";
import { useOrderFormContext } from "..";
import { RenderIf } from "@/components/ui";
import Swal from "sweetalert2";
import { useCartStore } from "@/store";
import classNames from "classnames";
import { useIntl } from "react-intl";

interface IActionsOrderProps {
  className?: string;
}

const ActionsOrder: React.FunctionComponent<IActionsOrderProps> = (props) => {
  const { className } = props;
  const { formatMessage: t } = useIntl();
  const { values, setValues, submitForm } = useOrderFormContext();
  const { clean } = useCartStore();
  const handleCLickClean = async () => {
    const result = await Swal.fire({
      title: t({ id: "orders.form.delete.temporalProducts" }),
      text: t({ id: "app.areYouSureToDoThis" }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      await clean();
      setValues({
        ...values,
        products: [],
      });
    }
  };

  return (
    <div className={className}>
      <RenderIf isTrue={!values.order}>
        <div className="w-full max-w-[50%]">
          <button
            type="button"
            onClick={handleCLickClean}
            className="btn w-full btn-danger gap-2.5 btn-sm"
          >
            <FaTrash /> {translate("app.delete")}
          </button>
        </div>
      </RenderIf>
      <div className={classNames("w-full", !values.order && "max-w-[50%]")}>
        <button
          className="btn btn-success gap-2.5 btn-sm w-full"
          type="button"
          onClick={submitForm}
        >
          <FaCashRegister /> {translate("app.pay")}
        </button>
      </div>
    </div>
  );
};

export default ActionsOrder;
