import DataTable, { HeaderDataTable } from "@/components/ui/DataTable";
import RenderIf from "@/components/ui/RenderIf";
import { PaymentMethod, ValidRoles } from "@teslo/interfaces";
import { paymentMethodService } from "@teslo/services";
import classNames from "classnames";
import * as React from "react";
import { AiOutlineReload } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import FormPaymentMethod from "../Forms/FormPaymentMethod";
import { useFetchPaymentMethods } from "../hooks/useFetchPaymentMethods";
import defaultHeadingPaymentMethods from "./heading";
import mapPaymentMethods from "./mapPaymentMethods";
import { TablePlaceholder } from "@/components/placeholders";
import { useIntl } from "react-intl";
import ActionsPaymentMethods from "./ActionsPaymentMethods";
import ContainerFormPaymentMethod from "./ContainerFormPaymentMethod";
import AuthorityCheck from "@/components/AuthorityCheck";

interface ITablePaymentMethodsProps {
  heading?: HeaderDataTable[];
  setSelected: React.Dispatch<number>;
}

const ModalDeletePaymentMethod = React.lazy(() => import("./ModalDeletePaymentMethod"));

const TablePaymentMethods: React.FunctionComponent<ITablePaymentMethodsProps> = (props) => {
  const { heading = defaultHeadingPaymentMethods(), setSelected } = props;
  const { formatMessage } = useIntl();
  const [stateForm, setStateForm] = React.useState<"create" | "update">("create");
  const [tempPaymentMethod, setTempPaymentMethod] = React.useState<PaymentMethod>(null);
  const [showDeletePaymentMethod, setShowDeletePaymentMethod] = React.useState(false);
  const [isLoadingDeletePaymentMethod, setIsLoadingDeletePaymentMethod] = React.useState(false);
  const [tempPaymentMethodDelete, setTempPaymentMethodDelete] = React.useState<PaymentMethod>(null);

  const { isFetching, data: paymentMethods, setData, refetch } = useFetchPaymentMethods();

  function onSuccessForm(paymentMethod: PaymentMethod) {
    if (stateForm === "create") {
      setData([paymentMethod, ...paymentMethods]);
    } else if (stateForm === "update") {
      setData(
        paymentMethods.map((p) =>
          p.idpaymentmethod === paymentMethod.idpaymentmethod ? { ...paymentMethod } : p
        )
      );
    }
  }

  function deletePaymentMethod(paymentMethod: PaymentMethod) {
    setShowDeletePaymentMethod(true);
    setTempPaymentMethodDelete(paymentMethod);
  }

  function onCloseModalDelete() {
    setShowDeletePaymentMethod(false);
    setTempPaymentMethodDelete(null);
  }

  async function onAcceptModaDelete() {
    try {
      setIsLoadingDeletePaymentMethod(true);
      await paymentMethodService.deleteOne(tempPaymentMethodDelete.idpaymentmethod);
      setData(
        paymentMethods.filter((p) => p.idpaymentmethod !== tempPaymentMethodDelete.idpaymentmethod)
      );
      onCloseModalDelete();
      const messageSuccess = formatMessage({ id: "paymentMethods.deleted.success" });
      toast.success(messageSuccess);
    } catch (error) {
      console.log(error);
      const messageError = formatMessage({ id: "paymentMethods.deleted.error" });
      toast.error(error.response.data.message || messageError);
    } finally {
      setIsLoadingDeletePaymentMethod(false);
    }
  }

  function updatePaymentMethod(paymentMethod: PaymentMethod) {
    setTempPaymentMethod(paymentMethod);
    setStateForm("update");
  }

  function createPaymentMethod() {
    setTempPaymentMethod(null);
    setStateForm("create");
  }

  function setViewOrdersByPaymentMethod(paymentMethod: PaymentMethod) {
    setSelected(paymentMethod.idpaymentmethod);
  }

  return (
    <div className="grid lg:grid-cols-5 gap-4">
      <div className="lg:col-span-3 overflow-x-auto">
        <div className="tile">
          <DataTable
            placeholder={<TablePlaceholder />}
            buttons={
              <AuthorityCheck
                validRoles={[ValidRoles.ADMIN, ValidRoles.SUPER_USER, ValidRoles.SUPERVISOR]}
              >
                <div className="flex items-center justify-start">
                  <button className="btn btn-primary btn-xs" onClick={createPaymentMethod}>
                    <FaPlus />
                  </button>
                  <button className="btn btn-outline-alternative btn-xs" onClick={() => refetch()}>
                    <AiOutlineReload />
                  </button>
                </div>
              </AuthorityCheck>
            }
            loading={isFetching}
            data={paymentMethods.map((paymentMethod) => ({
              ...paymentMethod,
              actions: (
                <ActionsPaymentMethods
                  paymentMethod={paymentMethod}
                  deletePaymentMethod={deletePaymentMethod}
                  setViewOrdersByPaymentMethod={setViewOrdersByPaymentMethod}
                  updatePaymentMethod={updatePaymentMethod}
                />
              ),
            }))}
            heading={heading}
          />
        </div>
      </div>

      <ContainerFormPaymentMethod
        status={stateForm}
        onSuccessForm={onSuccessForm}
        tempPaymentMethod={tempPaymentMethod}
      />

      <RenderIf isTrue={showDeletePaymentMethod}>
        <ModalDeletePaymentMethod
          onAcceptDeletePaymentMethod={onAcceptModaDelete}
          onCloseModalDelete={onCloseModalDelete}
          isLoading={isLoadingDeletePaymentMethod}
          showModalDeletePaymentMethod={showDeletePaymentMethod}
          paymentMethod={tempPaymentMethodDelete}
        />
      </RenderIf>
    </div>
  );
};

export default TablePaymentMethods;
