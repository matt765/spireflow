import { useMemo } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Customer } from "./types";
import { customersData } from "./CustomersData";
import { useTable } from "../../../hooks/useTable";
import Image from "next/image";

const columnHelper = createColumnHelper<Customer>();

const customerColumns = [
  columnHelper.accessor("col0", {
    header: () => "Photo",
    enableSorting: false,
    cell: ({ row }: { row: { original: Customer } }) => (
      <Image
        src={row.original.col0.src}
        alt="User Profile"
        width={50}
        height={50}
      />
    ),
  }),
  columnHelper.accessor("col1", {
    header: () => "First Name",
  }),
  columnHelper.accessor("col2", {
    header: () => "Last Name",
  }),
  columnHelper.accessor("col3", {
    header: () => "City",
  }),
  columnHelper.accessor("col4", {
    header: () => "Country",
  }),
  columnHelper.accessor("col5", {
    header: () => "Phone",
  }),
  columnHelper.accessor("col6", {
    header: () => "Total Buys",
    cell: ({ row }: { row: { original: Customer } }) =>
      row.original.col6.toString(),
  }),
];

export type CustomerFilters = {
  country?: string;
};

export const useCustomers = () => {
  const {
    sorting,
    setSorting,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    nextPage,
    prevPage,
    goToPage,
    filters,
    clearFilter,
    setFilter,
  } = useTable<CustomerFilters>({});

  const filteredData = useMemo(() => {
    let data = customersData;
    setCurrentPage(0);
    if (searchQuery) {
      data = data.filter((customer) =>
        Object.values(customer).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (filters.country) {
      data = data.filter((customer) => customer.col4 === filters.country);
    }

    return data;
  }, [searchQuery, filters]);

  const sortedAndFilteredData = useMemo(() => {
    let data = [...filteredData];

    sorting.forEach(({ id, desc }) => {
      data.sort((a, b) => {
        const aValue = a[id as keyof Customer];
        const bValue = b[id as keyof Customer];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return desc ? bValue - aValue : aValue - bValue;
        }
        return desc
          ? String(bValue).localeCompare(String(aValue))
          : String(aValue).localeCompare(String(bValue));
      });
    });

    return data;
  }, [filteredData, sorting]);

  const paginatedData = useMemo(() => {
    const startIdx = currentPage * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return sortedAndFilteredData.slice(startIdx, endIdx);
  }, [sortedAndFilteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const table = useReactTable<Customer>({
    columns: customerColumns,
    data: paginatedData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  return {
    table,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    nextPage,
    prevPage,
    goToPage,
    setSorting,
    totalPages,
    setFilter,
    clearFilter,
    sorting,
    filters,
  };
};
