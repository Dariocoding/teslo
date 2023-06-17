import { useFetchOrdersByPayment } from "@/app/orders/hooks/useFetchOrdersByPayment";
import TableOrders from "@/app/orders/TableOrders";
import * as React from "react";
import { FaTimes } from "react-icons/fa";
interface ITableOrdersByPaymentProps {
  id: number;
  setId(id: number): void;
}

const TableOrdersByPayment: React.FunctionComponent<ITableOrdersByPaymentProps> = (props) => {
  const { id, setId } = props;
  const { refetch, data, setData, isFetching } = useFetchOrdersByPayment(id);

  React.useEffect(() => {
    if (id) refetch();
  }, [id]);

  return (
    <div className="tile">
      <TableOrders
        orders={data}
        setOrders={setData}
        refetch={refetch}
        isFetching={isFetching}
        buttons={
          <button type="button" onClick={() => setId(null)} className="btn btn-xs btn-danger">
            <FaTimes />
          </button>
        }
      />
    </div>
  );
};

export default TableOrdersByPayment;
