import React, { useState } from "react";
import { flexRender } from "@tanstack/react-table";

import { OrderType, OrdersTableProps } from "./types";
import { ArrowDownIcon } from "../../../assets/icons/ArrowDownIcon";
import { ArrowUpIcon } from "../../../assets/icons/ArrowUpIcon";
import { OrderModal } from "./OrderModal";

const columnWidths = {
  col1: "100px",
  col2: "150px",
  col3: "150px",
  col4: "100px",
  col5: "150px",
  col6: "150px",
  col7: "150px",
};

const SortingArrow = ({ isSortedDesc }: { isSortedDesc: boolean }) => {
  return (
    <div className="inline-flex text-mainColor">
      {!isSortedDesc ? (
        <ArrowDownIcon width={18} height={18} />
      ) : (
        <ArrowUpIcon width={18} height={18} />
      )}
    </div>
  );
};

export const OrdersTable = ({
  table,
  currentPage,
  itemsPerPage,
  loading,
}: OrdersTableProps) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const closeOrderModal = () => setIsOrderModalOpen(false);

  return (
    <>
      <table className="w-full mt-6 overflow-scroll min-w-[55rem]">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={
                    header.column.getCanSort()
                      ? "text-secondaryText font-normal text-left text-sm 3xl:text-base pl-4 py-2 3xl:py-3 border cursor-pointer select-none  bg-inputBg bg-inputBg border-inputBorder border-inputBorder"
                      : "text-secondaryText font-medium text-left text-sm 3xl:text-base pl-4 py-2 3xl:py-3 border"
                  }
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    width: columnWidths[header.id as keyof typeof columnWidths],
                    maxWidth:
                      columnWidths[header.id as keyof typeof columnWidths],
                    minWidth:
                      columnWidths[header.id as keyof typeof columnWidths],
                  }}
                >
                  <div className="flex items-center gap-1">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getIsSorted() ? (
                      <SortingArrow
                        isSortedDesc={header.column.getIsSorted() === "desc"}
                      />
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(
              currentPage * itemsPerPage,
              (currentPage + 1) * itemsPerPage
            )
            .map((row) => (
              <tr
                key={row.id}
                onClick={() => {
                  setSelectedOrder(row.original as OrderType);
                  setIsOrderModalOpen(true);
                }}
                className="hover:bg-[rgb(255,255,255,0.03)] cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="text-tableCellText font-medium text-sm 3xl:text-base p-4 py-3 3xl:py-4 border border-inputBorder"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {isOrderModalOpen && (
        <OrderModal
          closeModal={closeOrderModal}
          orderData={selectedOrder as OrderType}
        />
      )}
    </>
  );
};
