import { OrdersDateRangeProps } from "./types";

export const OrdersDateRange = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: OrdersDateRangeProps) => {
  return (
    <div className=" mb-4 flex space-x-4">
      <input
        placeholder="Start Date"
        type="text"
        onFocus={(e) => {
          if (!startDate) {
            e.currentTarget.type = "date";
          }
        }}
        value={startDate ?? ""}
        onChange={(e) => setStartDate(e.target.value)}
        className="border border-gray-300 bg-transparent placeholder-black text-center text-black rounded-md w-44 pr-2 h-10 transition-width"
      />
      <input
        placeholder="End Date"
        type="text"
        onFocus={(e) => {
          if (!endDate) {
            e.currentTarget.type = "date";
          }
        }}
        value={endDate ?? ""}
        onChange={(e) => setEndDate(e.target.value)}
        className="border border-gray-300 bg-transparent placeholder-black text-center text-black rounded-md w-44 pr-2 h-10 transition-width"
      />
    </div>
  );
};
