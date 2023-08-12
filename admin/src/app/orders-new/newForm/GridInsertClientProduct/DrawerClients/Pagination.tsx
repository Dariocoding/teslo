import * as React from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";

interface IPaginationClientsProps {
  itemsPerPage: number;
  items: any[];
  setItemOffset(newValue: number): void;
  pageCount: number;
  page: number;
  setPage(value: number): void;
}

const PaginationClients: React.FunctionComponent<IPaginationClientsProps> = (props) => {
  const { page, pageCount, setItemOffset, setPage, items, itemsPerPage } = props;

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  return (
    <ReactPaginate
      nextLabel={<FaAngleDoubleRight />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      pageCount={pageCount}
      previousLabel={<FaAngleDoubleLeft />}
      renderOnZeroPageCount={null}
      pageClassName=""
      pageLinkClassName="btn shadow-none sm:block hidden btn-outline-primary btn-xs"
      previousClassName=""
      previousLinkClassName="btn shadow-none btn-primary btn-xs px-2"
      nextClassName=""
      nextLinkClassName="btn shadow-none btn-primary btn-xs px-2"
      breakLabel="..."
      breakClassName="btn shadow-none sm:block hidden btn-xs btn-outline-primary"
      breakLinkClassName=""
      containerClassName="flex justify-center items-center"
      activeClassName=""
      activeLinkClassName="btn shadow-none btn-primary btn-xs"
      forcePage={page}
    />
  );
};

export default PaginationClients;
