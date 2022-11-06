import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";


export const  PaginatedItems: React.FC<PaginatedItemsType>  =  React.memo((props) => {
  let {total_count} = props;
  const {setCurrentPage} = props;
  const {currentPage} = props;
  let itemsPerPage =  30
  if (total_count > 1000) {
    total_count = 1000;
  }

  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setPageCount(Math.ceil(total_count / itemsPerPage));
  }, [ itemsPerPage, total_count]);

  const page = (current: any) => {
    setCurrentPage(current.pageNumber.selected );
  };
  
  return (
    <>
      <ReactPaginate
           forcePage = {currentPage}
        nextLabel=" >"
        onPageChange={(pageNumber) => {  page({ pageNumber }); }}
        pageRangeDisplayed={0}
        marginPagesDisplayed={3}
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



type PaginatedItemsType = {

  total_count: number
  items: any
  setCurrentPage: (num: number) => void
  currentPage: number
}