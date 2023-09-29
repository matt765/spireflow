import { SearchIcon } from "../../assets/icons/SearchIcon";
import { Chip } from "../../components/Chip";
import { customersData } from "./CustomersData";
import { CustomersCountryDropdown } from "./CustomersCountryDropdown";
import { CustomersPagination } from "./CustomersPagination";
import { CustomersSortDropdown } from "./CustomersSortDropdown";
import { CustomersTable } from "./CustomersTable";
import { useCustomers } from "./useCustomers";

const sortOptions = [
  { value: "col1", label: "First Name" },
  { value: "col2", label: "Last Name" },
  { value: "col3", label: "City" },
  { value: "col4", label: "Country" },
  { value: "col5", label: "Phone" },
  { value: "col6", label: "Total Buys" },
];

export const CustomersView = () => {
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
  } = useCustomers();

  const countryOptions = Array.from(
    new Set(customersData.map((customer) => customer.col4))
  );

  return (
    <div className="flex w-full p-10 paper text-lg flex-col">
      <div className="flex justify-between">
        <div className="w-1/4 relative flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers..."
            className="border p-2 w-full rounded-lg form-element-styled pl-10 h-11"
          />
          <div className="stroke-grayIcon dark:stroke-grayIconDark absolute top-[0.8rem] left-3">
            <SearchIcon />
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex items-center justify-center pt-2">
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
      <CustomersTable table={table} />
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
  );
};
