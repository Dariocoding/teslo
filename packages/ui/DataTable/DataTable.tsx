import classNames from "classnames";
import { getIn } from "formik";
import * as React from "react";
import RenderIf from "../RenderIf";
import { HeaderDataTable } from "./interfaces";
import PaginatedItems from "./Pagination";
import SearchDataTable from "./Search";
import { useMedia } from "../hooks";

interface IDataTableProps {
  heading: HeaderDataTable[];
  data: any[];
  loading?: boolean;
  showSearch?: boolean;
  showPagination?: boolean;
  buttons?: React.ReactNode;
  placeholder: React.ReactNode;
  showResponsive?: boolean;
}

const itemsPerPage = 10;

const DataTable: React.FunctionComponent<IDataTableProps> = (props) => {
  const { data, loading, showPagination = true, heading, showResponsive = true } = props;
  const md = useMedia("(max-width: 768px)");
  const [q, setQ] = React.useState("");
  const [currentItems, setCurrentItems] = React.useState(data);
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const newData = search(data);
    const pageCount = Math.ceil(newData.length / itemsPerPage);
    const currentItems = newData.slice(itemOffset, endOffset);
    const actualPage = pageCount ? page + 1 : 0;
    setCurrentItems(currentItems);
    setPageCount(pageCount);
    if (actualPage > pageCount) {
      const newOffset = ((pageCount - 1) * itemsPerPage) % data.length;
      setItemOffset(newOffset);
      setPage(pageCount - 1);
    }

    // eslint-disable-next-line
  }, [itemOffset, itemsPerPage, data, q]);

  function search(rows: any[]) {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) =>
      columns.some(
        (column) =>
          getIn(row, column)?.toString()?.toLowerCase()?.indexOf(q.toLowerCase().trim()) > -1
      )
    );
  }

  return (
    <div>
      <SearchDataTable q={q} setQ={setQ} {...props} />
      <RenderIf isTrue={loading}>{props.placeholder}</RenderIf>
      <RenderIf isTrue={!loading && !md}>
        <div className={classNames(showResponsive ? "table-responsive" : "overflow-x-auto")}>
          <table className="table">
            <thead>
              <tr>
                {heading.map((h) => (
                  <th key={h.field} className={classNames(h.center && "text-center")}>
                    {h.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, key) => (
                <tr key={key}>
                  {heading.map((h, key) => (
                    <td key={key} className={classNames(h.center && "text-center")}>
                      {getIn(item, h.field)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </RenderIf>
      <RenderIf isTrue={!loading && md}>
        <div>
          {currentItems.map((item, key) => (
            <span key={key}>
              {heading.map((h, key) => (
                <div key={key} className="py-1 my-1">
                  <span className="font-bold text-xs">{h.title}:</span>{" "}
                  <span className="text-xs">{getIn(item, h.field)}</span>
                </div>
              ))}
              <hr />
            </span>
          ))}
        </div>
      </RenderIf>
      <RenderIf isTrue={!loading && showPagination}>
        <div className="flex lg:justify-between justify-center lg:flex-row flex-col mt-4">
          <small className="lg:mb-0 mb-2 lg:inline block text-center">
            <span className="font-bold">Total Records:</span> {Object.keys(data).length}
          </small>
          <PaginatedItems
            pageCount={pageCount}
            setItemOffset={setItemOffset}
            items={data}
            itemsPerPage={itemsPerPage}
            page={page}
            setPage={setPage}
          />
        </div>
      </RenderIf>
    </div>
  );
};

export default DataTable;
