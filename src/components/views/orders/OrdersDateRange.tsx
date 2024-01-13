import React, { useEffect } from "react";
import { OrdersDateRangeProps } from "./types";
import { Input } from "../../forms/Input";

export const OrdersDateRange = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: OrdersDateRangeProps) => {
  useEffect(() => {
    if (!startDate) {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      setStartDate(oneYearAgo.toISOString().split("T")[0]);
    }

    if (!endDate) {
      const today = new Date();
      setEndDate(today.toISOString().split("T")[0]);
    }
  }, [startDate, endDate, setStartDate, setEndDate]);

  return (
    <div className="mb-4 flex space-x-4 w-full md:w-[21rem]">
      <Input
        type="date"
        value={startDate ?? ""}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <Input
        type="date"
        value={endDate ?? ""}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </div>
  );
};
