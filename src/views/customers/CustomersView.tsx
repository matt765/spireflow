import { Chip } from "../../components/Chip";
import { customersData } from "./CustomersData";
import { CustomersDropdown } from "./CustomersDropdown";
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
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search customers..."
          className="mb-4 px-3 py-2 border rounded"
        />
        <div className="flex gap-6">
          <div className="flex items-center justify-center">
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
          <CustomersDropdown
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
