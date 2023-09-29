import React from "react";
import { Table, flexRender } from "@tanstack/react-table";
import { Customer } from "./types";

export interface CustomersTableProps {
  table: Table<Customer>;
}

const columnWidths = {
  col0: '50px',
  col1: '150px', 
  col2: '150px',
  col3: '150px',
  col4: '100px',
  col5: '150px',
  col6: '150px',

};

export const CustomersTable = ({ table }: CustomersTableProps) => {
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
                    : "text-secondaryText dark:text-secondaryTextDark font-normal text-left text-base pl-4 py-3 border cursor-pointer select-none  bg-inputBg dark:bg-inputBgDark border-inputBorder dark:border-inputBorderDark"
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
        {table.getRowModel().rows.map((row) => (
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
