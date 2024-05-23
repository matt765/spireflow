import { Table } from "@tanstack/react-table";

export interface CustomerModalProps {
  closeModal: () => void;
  customerData: CustomerColumns;
}

export interface CustomersDropdownProps {
  options: string[];
  filterKey: keyof CustomerFilters;
  setFilter: (key: keyof CustomerFilters, value: string | undefined) => void;
  filters: CustomerFilters;
}

export interface CustomersPaginationProps {
  itemsPerPage: number;
  currentPage: number;
  totalPage: number;
  setItemsPerPage: (count: number) => void;
  goToPage: (page: number) => void;
  prevPage: () => void;
  nextPage: () => void;
}

export interface SortDropdownProps {
  options: { value: string; label: string }[];
  setSorting: (value: Array<{ id: string; desc: boolean }>) => void;
  currentSort: string | null;
  currentDirection: boolean;
}

export interface CustomersTableProps {
  table: Table<CustomerColumns>;
  loading?: boolean;
}

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
