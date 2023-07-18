import { useFetchOrdersByUser } from "@/app/orders/hooks/useFetchOrdersByUser";
import TableOrders from "@/app/orders/TableOrders";
import * as React from "react";

interface ITableOrdersByUserProps {
  id: string;
}

const TableOrdersByUser: React.FunctionComponent<ITableOrdersByUserProps> = (props) => {
  const { id } = props;
  const { data, setData, refetch, isFetching } = useFetchOrdersByUser(id);
  return (
    <TableOrders
      itemsPerPage={10}
      orders={data}
      setOrders={setData}
      refetch={refetch}
      isFetching={isFetching}
    />
  );
};

export default TableOrdersByUser;
