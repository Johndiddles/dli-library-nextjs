import React from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

const ClientSidePagination = ({
  pagination,
  setPagination,
  pageStart,
  pageEnd,
}) => {
  const handleNext = () => {
    if (pagination?.page === pagination?.pages) {
      return;
    }

    if (pagination?.listLength > pageEnd) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handlePrev = () => {
    if (pagination?.page === 1) {
      return;
    }

    setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  return (
    <div className="text-gray-500 text-sm uppercase py-4 flex justify-end gap-10 items-center">
      <div>
        {`Result ${pageStart} - ${pageEnd} of ${pagination?.listLength}`}
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handlePrev}
          className={`text-2xl ${
            pagination?.page === 1
              ? "text-gray-200"
              : "text-gray-500 hover:text-green-600"
          }`}
          disabled={pagination?.page === 1}
        >
          <BsCaretLeftFill />
        </button>
        <span className="text-sm capitalize bg-gray-700 text-gray-100 py-1 px-3 rounded">
          {pagination?.page}
        </span>
        <button
          onClick={handleNext}
          className={`text-2xl ${
            pagination?.page === pagination?.pages
              ? "text-gray-200"
              : "text-gray-500 hover:text-green-600"
          }`}
          disabled={pagination?.page === pagination?.pages}
        >
          <BsCaretRightFill />
        </button>
      </div>
    </div>
  );
};

export default ClientSidePagination;
