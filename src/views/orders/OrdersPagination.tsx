import React from "react";

import { OrdersPaginationProps } from "./types";

export const OrdersPagination = ({
  itemsPerPage,
  currentPage,
  totalPage,
  setItemsPerPage,
  goToPage,
  prevPage,
  nextPage,
}: OrdersPaginationProps) => (
  <div className="flex items-center mt-4 gap-4 justify-end">
    <select
      value={itemsPerPage}
      onChange={(e) => {
        setItemsPerPage(Number(e.target.value));
      }}
      className="ml-4 border p-1 bg-white mr-4 cursor-pointer"
    >
      <option value={10}>10</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>
    <button onClick={() => goToPage(0)} disabled={currentPage === 0}>
      &lt;&lt; {/* << */}
    </button>
    <button onClick={() => prevPage()} disabled={currentPage === 0}>
      &lt; {/* < */}
    </button>
    {Array.from(Array(totalPage).keys())
      .slice(Math.max(0, currentPage - 2), currentPage + 3)
      .map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={currentPage === page ? "bg-gray-300" : undefined}
          disabled={currentPage === page}
        >
          {page + 1}
        </button>
      ))}
    <button onClick={() => nextPage()} disabled={currentPage === totalPage - 1}>
      &gt; {/* > */}
    </button>
    <button
      onClick={() => goToPage(totalPage - 1)}
      disabled={currentPage === totalPage - 1}
    >
      &gt;&gt; {/* >> */}
    </button>
  </div>
);
