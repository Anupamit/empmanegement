import React from "react";
import "../Styles/Pagination.css";

const Pagination = ({
  currentPage,
  usersPerPage,
  totalUsers,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => onPageChange(1)}>
        First
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            className={currentPage === pageNumber ? "active" : ""}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      )}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
