import { useEffect, useMemo, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useTable } from "../../../hooks/useTable";
import Image from "next/image";

const columnHelper = createColumnHelper<CustomerColumns>();

const customerColumns = [
  columnHelper.accessor("col0", {
    header: () => "Photo",
    enableSorting: false,
    cell: ({ row }: { row: { original: CustomerColumns } }) => (
      <Image
        src={row.original.col0}
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
    cell: ({ row }: { row: { original: CustomerColumns } }) =>
      row.original.col6.toString(),
  }),
];

export type CustomerFilters = {
  country?: string;
};
export interface CustomerColumns {
  col0: string; // Avatar
  col1: string; // First Name
  col2: string; // Last Name
  col3: string; // City
  col4: string; // Country
  col5: string; // Phone
  col6: number; // Total Buys
}
export interface Customer {
  photo: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  phone: string;
  totalBuys: number;
}

export const useCustomers = (customers: Customer[]) => {
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
  const [customersData, setCustomersData] = useState<Customer[]>();

  useEffect(() => {
    if (customers) {
      const mappedData = customers.map((customer) => ({
        photo: customer.photo,
        firstName: customer.firstName,
        lastName: customer.lastName,
        city: customer.city,
        country: customer.country,
        phone: customer.phone,
        totalBuys: customer.totalBuys,
      }));
      setCustomersData(mappedData);
    }
  }, [customers]);

  const filteredData = useMemo(() => {
    let data = customersData;
    setCurrentPage(0);
    if (searchQuery) {
      data = data?.filter((customer) =>
        Object.values(customer).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (filters.country) {
      data = data?.filter((customer) => customer.country === filters.country);
    }

    return data;
  }, [searchQuery, filters, customersData]);

  const sortedAndFilteredData = useMemo(() => {
    let data = (filteredData ?? []).map((customer) => ({
      col0: customer.photo,
      col1: customer.firstName,
      col2: customer.lastName,
      col3: customer.city,
      col4: customer.country,
      col5: customer.phone,
      col6: customer.totalBuys,
    }));

    sorting.forEach(({ id, desc }) => {
      data.sort((a, b) => {
        const aValue = a[id as keyof CustomerColumns];
        const bValue = b[id as keyof CustomerColumns];

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

  const totalPages = Math.ceil((filteredData?.length ?? 0) / itemsPerPage);

  const clearFilters = () => {
    setSorting([]);
    setSearchQuery("");
    setCurrentPage(0);
    clearFilter("country");
    setFilter("country", undefined);
  };

  const table = useReactTable({
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
    customersData,
    clearFilters,
  };
};
