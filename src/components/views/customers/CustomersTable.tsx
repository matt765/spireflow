import React, { useState } from "react";
import { flexRender } from "@tanstack/react-table";

import { ArrowDownIcon } from "../../../assets/icons/ArrowDownIcon";
import { ArrowUpIcon } from "../../../assets/icons/ArrowUpIcon";
import { CustomerModal } from "./CustomerModal";
import { CustomerColumns, CustomersTableProps } from "./types";

const columnWidths = {
  col0: "7%",
  col1: "14%",
  col2: "14%",
  col3: "17%",
  col4: "15%",
  col5: "19%",
  col6: "15%",
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

export const CustomersTable = ({ table }: CustomersTableProps) => {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerColumns | null>(null);

  // if (loading) {
  //   return (
  //     <div className="w-full min-h-[50vh] flex justify-center items-center">
  //       <Loader />
  //     </div>
  //   );
  // }

  const closeCustomerModal = () => setIsCustomerModalOpen(false);

  return (
    <>
      <table className="w-full mt-8 min-w-[58rem] customersTable">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={
                    header.column.getCanSort()
                      ? "text-secondaryText font-normal text-left text-sm 3xl:text-base pl-4 py-3 3xl:py-3 border cursor-pointer select-none  bg-inputBg  border-inputBorder "
                      : "text-secondaryText font-normal text-center text-sm 3xl:text-base pl-3 2xl:pl-5 py-3 3xl:py-3 border cursor-pointer select-none  bg-inputBg border-inputBorder"
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
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => {
                setSelectedCustomer(row.original as CustomerColumns);
                setIsCustomerModalOpen(true);
              }}
              className="hover:bg-[rgb(255,255,255,0.03)] cursor-pointer"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="text-tableCellText text-primaryText font-medium text-sm 3xl:text-base p-4 py-2 3xl:py-4 border border-inputBorder"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {isCustomerModalOpen && (
        <CustomerModal
          closeModal={closeCustomerModal}
          customerData={selectedCustomer as CustomerColumns}
        />
      )}
    </>
  );
};
