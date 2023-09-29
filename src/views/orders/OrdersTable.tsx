import React from "react";
import { flexRender } from "@tanstack/react-table";

import { OrdersTableProps } from "./types";

const columnWidths = {
  col1: '100px', 
  col2: '150px',
  col3: '150px',
  col4: '100px',
  col5: '150px',
  col6: '150px',
  col7: '150px',
};

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
                    ? "text-secondaryText dark:text-secondaryTextDark font-normal text-left text-base pl-4 py-3 border cursor-pointer select-none  bg-inputBg dark:bg-inputBgDark border-inputBorder dark:border-inputBorderDark"
                    : "text-secondaryText dark:text-secondaryTextDark font-medium text-left pl-4 py-3 border"
                }
                onClick={header.column.getToggleSortingHandler()}
                style={{ width: columnWidths[header.id as keyof typeof columnWidths] }}

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
                  className="text-primaryText dark:text-primaryTextDark font-medium text-base p-4 border  border-inputBorder dark:border-inputBorderDark"
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
