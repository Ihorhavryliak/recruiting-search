import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";



type PaginatedItemsType = {
  setPage: (page: number) => void
  total_count: number
  items: any
}

export const  PaginatedItems: React.FC<PaginatedItemsType>  =  React.memo((props) => {
  let {total_count} = props;
  let itemsPerPage =  30
  if (total_count > 1000) {
    total_count = 1000 - 30;
  }
  const {setPage} = props;
  const [pageCount, setPageCount] = useState(0);

  const [urlPage, setUrlPage] = useSearchParams('');

  const urlPages = urlPage.get('page')

  useEffect(() => {
    setPageCount(Math.ceil(total_count / itemsPerPage));
  }, [ itemsPerPage, total_count]);

  const handlePageClick = (event: any) => {
    setPage(event.selected + 1);
    setUrlPage({page: event.selected + 1})
  };

  return (
    <>
      <ReactPaginate
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< "
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={undefined}
      />
    </>
  );
})
