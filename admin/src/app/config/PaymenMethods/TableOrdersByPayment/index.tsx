import { useFetchOrdersByPayment } from "@/app/orders/hooks/useFetchOrdersByPayment";
import TableOrders from "@/app/orders/TableOrders";
import useFirstLoad from "@/utils/hooks/useFirstLoad";
import { ordersService } from "@teslo/services";
import * as React from "react";
import { FaTimes } from "react-icons/fa";
interface ITableOrdersByPaymentProps {
  id: number;
  setId(id: number): void;
}

const TableOrdersByPayment: React.FunctionComponent<ITableOrdersByPaymentProps> = (props) => {
  const { id, setId } = props;
  const firstLoad = useFirstLoad();
  const { refetch, data, setData, isFetching } = useFetchOrdersByPayment(id);

  React.useEffect(() => {
    if (id && !firstLoad) refetch();
  }, [id]);

  return (
    <div className="tile">
      <TableOrders
        orders={data}
        setOrders={setData}
        refetch={refetch}
        isFetching={isFetching}
        showSelects
        buttons={
          <button type="button" onClick={() => setId(null)} className="btn btn-xs btn-danger mb-0">
            <FaTimes />
          </button>
        }
        fetchOrders={(params) => ordersService.getOrdersByPaymentMethod(id, params)}
        navigateOnChageDateSelect={false}
      />
    </div>
  );
};

export default TableOrdersByPayment;
