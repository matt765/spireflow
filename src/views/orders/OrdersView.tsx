import { useOrders } from "./useOrders";
import { OrdersDateRange } from "./OrdersDateRange";
import { OrderSelects } from "./OrdersSelects";
import { OrdersTable } from "./OrdersTable";
import { OrdersPagination } from "./OrdersPagination";

export const OrdersView = () => {
  const {
    table,
    searchQuery,
    setSearchQuery,
    getFilter,
    setFilter,
    filtersForSelectFields,
    nextPage,
    prevPage,
    goToPage,
    totalPage,
    currentPage,
    setItemsPerPage,
    itemsPerPage,  
    setCurrentPage,
    resetFilters,
  } = useOrders();

  return (
    <div className="flex w-full p-10 paper text-lg flex-col">
      <div className="w-full flex justify-between">
        <div className="w-1/3 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(0);
            }}
            placeholder="Search..."
            className="border p-2 w-full bg-white"
          />
        </div>
        <OrdersDateRange
          startDate={getFilter("startDate") as string | null}
          setStartDate={(value) => setFilter("startDate", value)}
          endDate={getFilter("endDate") as string | null}
          setEndDate={(value) => setFilter("endDate", value)}
        />
      </div>
      <div className="flex w-full gap-4">
        <OrderSelects filters={filtersForSelectFields} setFilter={setFilter} />
      </div>
      <OrdersTable
        table={table}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
      <div className="flex justify-between">
        <button
          onClick={resetFilters}
          className="mt-6 bg-white py-2 px-6 rounded-lg hover:bg-gray-100 border border-slate-400 text-gray-500 font-medium"
        >
          Clear Filters
        </button>
        <OrdersPagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalPage={totalPage}
          setItemsPerPage={setItemsPerPage}
          goToPage={goToPage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};
