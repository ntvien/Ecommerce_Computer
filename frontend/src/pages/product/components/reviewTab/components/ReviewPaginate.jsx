import React, { useState, useEffect } from "react";
import communityApi from "../../../../../apis/community";
import Review from "./review";
import ReactPaginate from "react-paginate";

const itemsPerPage = 3;

const ReviewPaginate = ({ productId, renderTrigger }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(async () => {
    try {
      const res = await communityApi.getReviews({
        product_id: productId,
        page: itemOffset / itemsPerPage,
        size: itemsPerPage,
      });
      setCurrentItems(res.items);
      setTotal(res.total);
    } catch (e) {
      console.log(e);
    }
  }, [itemOffset, itemsPerPage]);
  useEffect(async () => {
    if (itemOffset == 0) {
      const res = await communityApi.getReviews({
        product_id: productId,
        page: 0,
        size: itemsPerPage,
      });
      setCurrentItems(res.items);
      setTotal(res.total);
    }
  }, [renderTrigger]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % total;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="d-flex row justify-content-end">
      <ul className="reviews">
        {currentItems.map((review, index) => (
          <li key={index}>
            <Review review={review} />
          </li>
        ))}{" "}
      </ul>
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={total / itemsPerPage}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link text-dark"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination justify-content-center"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default ReviewPaginate;
