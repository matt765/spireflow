import React, { FocusEvent, useEffect, useRef } from "react";
import { OrdersDateRangeProps } from "./types";

export const OrdersDateRange = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: OrdersDateRangeProps) => {
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);

  const handleBlur = (
    e: FocusEvent<HTMLInputElement>,
    setDate: (value: string) => void,
    date: string | null
  ) => {
    if (!date) {
      e.currentTarget.type = "text";
      setDate("");
    }
  };

  useEffect(() => {
    if (!startDate && startInputRef.current) {
      startInputRef.current.type = "text";
    }
  }, [startDate]);

  useEffect(() => {
    if (!endDate && endInputRef.current) {
      endInputRef.current.type = "text";
    }
  }, [endDate]);

  return (
    <div className="mb-4 flex space-x-4 w-full md:w-auto">
      <input
        ref={startInputRef}
        placeholder="Start Date"
        type="text"
        onFocus={(e) => {
          if (!startDate) {
            e.currentTarget.type = "date";
          }
        }}
        onBlur={(e) => handleBlur(e, setStartDate, startDate)}
        value={startDate ?? ""}
        onChange={(e) => setStartDate(e.target.value)}
        className="transparent text-center rounded-md w-1/2 md:w-44 pr-2 h-10 transition-width form-element-styled"
      />
      <input
        ref={endInputRef}
        placeholder="End Date"
        type="text"
        onFocus={(e) => {
          if (!endDate) {
            e.currentTarget.type = "date";
          }
        }}
        onBlur={(e) => handleBlur(e, setEndDate, endDate)}
        value={endDate ?? ""}
        onChange={(e) => setEndDate(e.target.value)}
        className="text-center rounded-md w-1/2 md:w-44 pr-2 h-10 transition-width form-element-styled"
      />
    </div>
  );
};
