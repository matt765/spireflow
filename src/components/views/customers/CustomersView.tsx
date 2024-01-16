"use client";

import { SearchIcon } from "../../../assets/icons/SearchIcon";
import { OutlinedButton } from "../../common/OutlinedButton";
import { Chip } from "../../forms/Chip";
import { Input } from "../../forms/Input";
import { CustomersCountryDropdown } from "./CustomersCountryDropdown";
import { CustomersPagination } from "./CustomersPagination";
import { CustomersSortDropdown } from "./CustomersSortDropdown";
import { CustomersTable } from "./CustomersTable";
import { useCustomers, Customer } from "./useCustomers";

const sortOptions = [
  { value: "col1", label: "First Name" },
  { value: "col2", label: "Last Name" },
  { value: "col3", label: "City" },
  { value: "col4", label: "Country" },
  { value: "col5", label: "Phone" },
  { value: "col6", label: "Total Buys" },
];

interface CustomersViewProps {
  customers: Customer[];
}

export const CustomersView = ({ customers }: CustomersViewProps) => {
  const {
    table,
    searchQuery,
    setSearchQuery,
    setFilter,
    clearFilter,
    currentPage,
    itemsPerPage,
    setItemsPerPage,
    nextPage,
    prevPage,
    goToPage,
    totalPages,
    setSorting,
    sorting,
    filters,
    customersData,
    clearFilters, 
  } = useCustomers(customers);

  const countryOptions = Array.from(
    new Set(customersData?.map((customer) => customer.country))
  );

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between flex-wrap md:flex-wrap w-full">
        <div className="w-full md:w-1/3 lg:w-1/4 relative flex h-10">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers..."
            icon={<SearchIcon />}
          />
        </div>
        <div className="flex gap-6 flex-wrap w-full md:w-auto mt-6 md:mt-0">
          <div className="flex w-full md:w-auto justify-between gap-4 md:gap-4 h-10">
            <CustomersCountryDropdown
              options={countryOptions}
              filterKey="country"
              setFilter={setFilter}
            />
            <CustomersSortDropdown
              options={sortOptions}
              setSorting={setSorting}
              currentSort={sorting[0]?.id || null}
              currentDirection={sorting[0]?.desc || false}
            />
          </div>
        </div>
      </div>
      <div
        className={`flex md:items-start flex-wrap md:flex-nowrap justify-start md:justify-start items-start  flex-col sm:flex-row gap-2 md:gap-0 mt-0 ${
          (filters.country || sorting[0]) && "!mt-6"
        }`}
      >
        {filters.country && (
          <Chip
            label={`Country: ${filters.country}`}
            onDelete={() => clearFilter("country")}
          />
        )}
        {sorting[0] && (
          <Chip
            label={`Sorted by ${
              sortOptions.find((option) => option.value === sorting[0].id)
                ?.label || sorting[0].id
            } ${sorting[0].desc ? "Descending" : "Ascending"}`}
            onDelete={() => setSorting([])}
          />
        )}
      </div>
      <div className="w-full overflow-auto ">
        <CustomersTable table={table} />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center flex-wrap pb-4">
        <div className="w-36 mt-8 mb-0 self-start sm:self-unset">
          <OutlinedButton handleClick={clearFilters} text="Clear Filters" />
        </div>
        <CustomersPagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalPage={totalPages}
          setItemsPerPage={setItemsPerPage}
          goToPage={goToPage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};
