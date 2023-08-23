import { useMemo } from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";

import { ordersData } from "./OrdersData";
import {
  FilterValues,
  Filters,
  Order,
  PriceRange,
  SelectFilters,
} from "./types";
import { useTable } from "../../hooks/useTable";

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor("col1", {
    header: () => "ID",
  }),
  columnHelper.accessor("col2", {
    header: () => "Product name",
  }),
  columnHelper.accessor("col3", {
    header: () => "User",
  }),
  columnHelper.accessor("col4", {
    header: () => "Price",
    cell: ({ row }) => `$${row.original.col4.toFixed(2)}`,
  }),
  columnHelper.accessor("col5", {
    header: () => "Delivery type",
  }),
  columnHelper.accessor("col6", {
    header: () => "Date",
  }),
  columnHelper.accessor("col7", {
    header: () => "Status",
  }),
];

export const useOrders = () => {
  const initialFilters = {
    startDate: null,
    endDate: null,
    productName: "",
    user: "",
    priceRange: { min: 0, max: 5000 },
    deliveryType: "",
    status: "",
  };

  const {
    sorting,
    setSorting,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    filters,
    setFilters,
    resetFilters,
    nextPage,
    prevPage,
    goToPage,
  } = useTable(initialFilters);

  const setFilter = (filterType: keyof Filters, value: FilterValues) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
    setCurrentPage(0); // Reset the currentPage whenever a filter changes
  };
  const getFilter = (filterType: keyof Filters): FilterValues => {
    const value = filters[filterType];

    if (filterType === "startDate" || filterType === "endDate") {
      // Ensure the returned type for startDate and endDate is always either a string or null
      return typeof value === "string" || value === null ? value : null;
    }

    return value;
  };

  const toSelectFilters = (filters: Filters): SelectFilters => {
    return {
      productName:
        typeof filters.productName === "string" ? filters.productName : "",
      user: typeof filters.user === "string" ? filters.user : "",
      priceRange: filters.priceRange as PriceRange,
      deliveryType:
        typeof filters.deliveryType === "string" ? filters.deliveryType : "",
      status: typeof filters.status === "string" ? filters.status : "",
    };
  };

  const filteredData = useMemo(() => {
    let result = ordersData;

    // Filtering the data based on search input
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      result = result.filter((order) =>
        Object.values(order).some((value) =>
          String(value).toLowerCase().includes(lowercasedQuery)
        )
      );
    }

    // Filtering the data based on date range
    const startDate = getFilter("startDate");
    if (startDate) {
      result = result.filter((order) => order.col6 >= startDate);
    }

    const endDate = getFilter("endDate");
    if (endDate) {
      result = result.filter((order) => order.col6 <= endDate);
    }

    // Filtering data based on product name
    if (getFilter("productName")) {
      result = result.filter(
        (order) => order.col2 === getFilter("productName")
      );
    }

    // Filtering data based on user
    if (getFilter("user")) {
      result = result.filter((order) => order.col3 === getFilter("user"));
    }

    // Filtering data based on price range
    const priceRange = getFilter("priceRange");
    if (
      typeof priceRange === "object" &&
      priceRange !== null &&
      (priceRange.min || priceRange.max)
    ) {
      result = result.filter(
        (order) => order.col4 >= priceRange.min && order.col4 <= priceRange.max
      );
    }

    // Filtering data based on delivery type
    if (getFilter("deliveryType")) {
      result = result.filter(
        (order) => order.col5 === getFilter("deliveryType")
      );
    }

    // Filtering data based on status
    if (getFilter("status")) {
      result = result.filter((order) => order.col7 === getFilter("status"));
    }

    return result;
  }, [searchQuery, filters]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return {
    table,
    searchQuery,
    setSearchQuery,
    getFilter,
    setFilter,
    filtersForSelectFields: toSelectFilters(filters),
    toSelectFilters,
    nextPage,
    prevPage,
    goToPage,
    totalPage: Math.ceil(filteredData.length / itemsPerPage),
    currentPage,
    setItemsPerPage,
    itemsPerPage,
    setCurrentPage,
    resetFilters,
  };
};
