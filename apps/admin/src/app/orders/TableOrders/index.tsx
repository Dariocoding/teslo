import DataTable, { HeaderDataTable } from "@/components/ui/DataTable";
import { hideLoader, showLoader } from "@/components/ui/Loader";
import { useModalStore } from "@/store";
import { Order } from "@teslo/interfaces";
import { ordersService, paymentMethodService } from "@teslo/services";
import * as React from "react";
import defaultHeadingOrders from "./heading";
import mapOrders from "./MapOrders";
import { TablePlaceholder } from "@/components/placeholders";
import ButtonsTableOrders from "./ButtonsTableOrders";
import { useIntl } from "react-intl";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { FindOrdersByDateDto } from "@teslo/services/dist/services/orders-service/interfaces";
import { AxiosResponse } from "axios";

const FormUpdateOrder = React.lazy(() => import("../forms/FormUpdateOrder"));
const ModalViewUser = React.lazy(() => import("./ModalViewUser"));

interface TableOrdersProps {
  heading?: HeaderDataTable[];
  refetch?(): void;
  isFetching: boolean;
  orders: Order[];
  setOrders(orders: Order[]): void;
  showPagination?: boolean;
  showSearch?: boolean;
  buttons?: React.ReactNode;
  showSelects?: boolean;
  fetchOrders?: (params: FindOrdersByDateDto) => Promise<AxiosResponse<Order[], any>>;
  navigateOnChageDateSelect?: boolean;
  itemsPerPage?: number;
}

const TableOrders: React.FunctionComponent<TableOrdersProps> = (props) => {
  const {
    orders,
    isFetching,
    heading = defaultHeadingOrders(),
    setOrders,
    refetch,
    showPagination,
    showSearch,
    buttons,
    showSelects,
    fetchOrders,
    navigateOnChageDateSelect,
    itemsPerPage,
  } = props;

  const { formatMessage: t } = useIntl();
  const [isLoading, setIsLoading] = React.useState(false);
  const setModal = useModalStore((state) => state.setModal);
  const closeModal = useModalStore((state) => state.closeModal);

  async function onClickUpdateOrder(order: Order) {
    function onSuccess(orderUpdated: Order) {
      setOrders(
        orders.map((order) =>
          order.idorder === orderUpdated.idorder ? { ...orderUpdated } : order
        )
      );
      closeModal();
    }

    try {
      showLoader();
      const req = await paymentMethodService.getAll();
      setModal({
        title: t({ id: "orders.edit.title" }),
        size: "lg",
        children: (
          <React.Suspense fallback={<></>}>
            <FormUpdateOrder paymentMethods={req.data} order={order} onSuccess={onSuccess} />
          </React.Suspense>
        ),
      });
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
    }
  }

  function onClickViewUser(order: Order) {
    setModal({
      title: t({ id: "orders.view.order.user" }, { idorder: order.idorder }),
      children: (
        <React.Suspense fallback={<></>}>
          <ModalViewUser user={order.user} />
        </React.Suspense>
      ),
      size: "md",
    });
  }

  const onCancelOrder = async (orderCancelled: Order) => {
    const result = await Swal.fire({
      title: "Confirm to submit",
      text: "Are you sure to do this.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        showLoader();
        await ordersService.updateOrder(orderCancelled.idorder, {
          status: "cancelled",
        });
        setOrders(
          orders.map((order) => ({
            ...order,
            status: order.idorder === orderCancelled.idorder ? "cancelled" : order.status,
          }))
        );
        Swal.fire(t({ id: "orders.cancelled.success" }), "", "success");
      } catch (error) {
        console.log(error);
        Swal.fire(t({ id: "orders.cancelled.error" }), "", "error");
      } finally {
        hideLoader();
      }
    }
  };

  const onCompleteOrder = async (orderCompleted: Order) => {
    const result = await Swal.fire({
      title: "Confirm to submit",
      text: "Are you sure to do this.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        showLoader();
        await ordersService.updateOrder(orderCompleted.idorder, {
          status: "completed",
        });

        setOrders(
          orders.map((order) => ({
            ...order,
            status: order.idorder === orderCompleted.idorder ? "completed" : order.status,
          }))
        );
        Swal.fire(t({ id: "orders.completed.success" }), "", "success");
      } catch (error) {
        console.log(error);
        Swal.fire(t({ id: "orders.completed.error" }), "", "error");
      } finally {
        hideLoader();
      }
    }
  };

  return (
    <DataTable
      itemsPerPage={itemsPerPage || 50}
      placeholder={<TablePlaceholder />}
      buttons={
        <ButtonsTableOrders
          orders={orders}
          setOrders={setOrders}
          buttons={buttons}
          refetch={refetch}
          setIsLoadingTable={setIsLoading}
          showSelects={showSelects}
          fetchOrders={fetchOrders}
          navigateOnChageDateSelect={navigateOnChageDateSelect}
        />
      }
      data={mapOrders({
        orders,
        onClickUpdateOrder,
        onClickViewUser,
        onCancelOrder,
        onCompleteOrder,
      })}
      loading={isFetching || isLoading}
      heading={heading}
      showPagination={showPagination}
      showSearch={showSearch}
      showResponsive={false}
    />
  );
};

export default TableOrders;
