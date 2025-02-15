import React from "react";
import Pagination from "react-responsive-pagination";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const PaginationComponent = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="d-flex justify-content-center mt-4">
      <Pagination
        total={totalPages}
        current={currentPage}
        onPageChange={onPageChange}
        maxWidth={4}
        className="pagination"
      />
    </div>
  );
};

PaginationComponent.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationComponent;
