import React from "react";
import { flexRender } from "@tanstack/react-table";

import { OrdersTableProps } from "./types";

export const OrdersTable = ({
  table,
  currentPage,
  itemsPerPage,
}: OrdersTableProps) => {
  return (
    <table className="w-full mt-8">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={
                  header.column.getCanSort()
                    ? "text-gray-700 font-medium text-left pl-4 py-4 border cursor-pointer select-none bg-gray-50"
                    : "text-gray-700 font-medium text-left pl-4 py-4 border"
                }
                onClick={header.column.getToggleSortingHandler()}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {{
                  asc: " 🔼",
                  desc: " 🔽",
                }[header.column.getIsSorted() as string] ?? null}
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="text-gray-500 font-medium p-4 border"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};
