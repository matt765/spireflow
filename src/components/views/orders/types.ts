import { Table } from "@tanstack/react-table";

export interface Order {
  col1: string;
  col2: string;
  col3: string;
  col4: number;
  col5: string;
  col6: string;
  col7: string;
}

export interface OrdersDateRangeProps {
  startDate: string | null;
  setStartDate: (value: string) => void;
  endDate: string | null;
  setEndDate: (value: string) => void;
}

export interface PriceRange {
  min: number;
  max: number;
}

export type FilterValues = string | number | PriceRange | null;

export interface SelectFilters {
  productName: string;
  user: string;
  priceRange: PriceRange;
  deliveryType: string;
  status: string;
}

export interface Filters extends SelectFilters {
  startDate: string | null;
  endDate: string | null;
}

export interface OrdersSelectsProps {
  filters: SelectFilters;
  setFilter: (filterType: keyof Filters, value: FilterValues) => void;
}

export interface OrdersTableProps {
  table: Table<Order>;
  currentPage: number;
  itemsPerPage: number;
}

export interface OrdersPaginationProps {
  itemsPerPage: number;
  currentPage: number;
  totalPage: number;
  setItemsPerPage: (value: number) => void;
  goToPage: (page: number) => void;
  prevPage: () => void;
  nextPage: () => void;
}
