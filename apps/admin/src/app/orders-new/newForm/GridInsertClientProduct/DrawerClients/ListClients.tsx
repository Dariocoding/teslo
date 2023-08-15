import { TablePlaceholder } from "@/components/placeholders";
import { RenderIf } from "@/components/ui";
import * as React from "react";
import HeaderFilters from "./HeaderFilters";
import RenderUser from "./RenderUser";
import PaginationClients from "./Pagination";
import { useFetcUsers } from "@/app/users/hooks/useFetchUsers";
import { useOrderFormContext } from "../..";
import { User } from "@teslo/interfaces";
import { getIn } from "formik";
import { UseQueryResult } from "@tanstack/react-query";

interface IListClientsProps {
  sm: boolean;
  setShowDrawerClient(value: boolean): void;
  refFetchUsers: React.MutableRefObject<
    UseQueryResult<User[], unknown> & {
      setData: React.Dispatch<React.SetStateAction<User[]>>;
      isLoading: boolean;
    }
  >;
}

const ListClients: React.FunctionComponent<IListClientsProps> = (props) => {
  const { sm, setShowDrawerClient, refFetchUsers } = props;
  const fetchUsers = useFetcUsers();
  const { data: users, isLoading } = fetchUsers;
  const { values, setValues } = useOrderFormContext();
  const itemsPerPage = sm ? 5 : 12;
  const [q, setQ] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);
  const [currentItems, setCurrentItems] = React.useState<User[]>([]);

  React.useEffect(() => {
    const render = () => {
      const endOffset = itemOffset + itemsPerPage;
      const newData = search(users);
      const pageCount = Math.ceil(newData.length / itemsPerPage);
      const currentItems = newData.slice(itemOffset, endOffset);
      const actualPage = pageCount ? page + 1 : 0;
      setCurrentItems(currentItems);
      setPageCount(pageCount);
      if (actualPage > pageCount) {
        const newOffset = ((pageCount - 1) * itemsPerPage) % users.length;
        setItemOffset(newOffset);
        setPage(pageCount - 1);
      }
    };

    render();

    // eslint-disable-next-line
  }, [itemOffset, users, q, sm]);

  React.useEffect(() => {
    refFetchUsers.current = fetchUsers;
  }, [refFetchUsers, fetchUsers]);

  const search = (rows: User[]) => {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) =>
      columns.some(
        (column) =>
          getIn(row, column)?.toString()?.toLowerCase()?.indexOf(q.toLowerCase().trim()) > -1
      )
    );
  };

  const onClickUser = (user: User) => {
    setValues({ ...values, user });
    setShowDrawerClient(false);
  };

  return (
    <React.Fragment>
      <RenderIf isTrue={isLoading}>
        <TablePlaceholder />
      </RenderIf>
      <RenderIf isTrue={!isLoading}>
        <HeaderFilters {...{ q, setQ }} />

        <div className="grid min-[750px]:grid-cols-2 gap-1.5">
          {currentItems.map((user) => (
            <RenderUser key={user.iduser} {...{ user, onClickUser }} />
          ))}
        </div>

        <div className="mt-3">
          <PaginationClients
            {...{ page, pageCount, items: users, itemsPerPage, setPage, setItemOffset }}
          />
        </div>
      </RenderIf>
    </React.Fragment>
  );
};

export default ListClients;
