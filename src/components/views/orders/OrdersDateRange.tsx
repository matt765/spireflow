import React, { useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { OrdersDateRangeProps } from "./types";
import { CalendarIcon } from "../../../assets/icons/CalendarIcon";

export const OrdersDateRange = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: OrdersDateRangeProps) => {
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

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

  // Convert string to Date object for DatePicker `selected` prop
  const startDateObj = startDate ? new Date(startDate) : null;
  const endDateObj = endDate ? new Date(endDate) : null;

  // Handle Date change and convert back to ISO string format
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date ? date.toISOString().split("T")[0] : null);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date ? date.toISOString().split("T")[0] : null);
  };

  return (
    <div className="mb-4 flex space-x-4 w-full md:w-[20rem]">
      <div className="flex relative">
        <DatePicker
          ref={startDatePickerRef}
          selected={startDateObj}
          onChange={handleStartDateChange}
          className="max-w-[9.5rem] min-w-[9.5rem] p-2 text-sm 1xl:text-base bg-inputBg dark:bg-inputBgDark  hover:dark:bg-inputBgHoverDark hover:bg-InputBgHover w-full h-full border rounded-md border-inputBorder dark:border-inputBorderDark  text-primaryText placeholder-secondaryText dark:placeholder-secondaryTextDark dark:text-primaryTextDark hover:dark:border-inputBorderHoverDark hover:border-inputBorderHover transition"
        />
        <div
          // @ts-ignore
          onClick={() => startDatePickerRef.current.setOpen(true)}
          className="absolute right-2 top-3 stroke-gray-400 fill-gray-400 text-gray-400 dark:text-gray-400 hover:stroke-secondaryText dark:hover:stroke-secondaryTextDark cursor-pointer"
        >
          <CalendarIcon />
        </div>
      </div>
      <div className="flex relative">
        <DatePicker
          ref={endDatePickerRef}
          selected={endDateObj}
          onChange={handleEndDateChange}
          className="max-w-[9.5rem] min-w-[9.5rem] p-2 text-sm 1xl:text-base bg-inputBg dark:bg-inputBgDark  hover:dark:bg-inputBgHoverDark hover:bg-InputBgHover w-full h-full border rounded-md border-inputBorder dark:border-inputBorderDark  text-primaryText placeholder-secondaryText dark:placeholder-secondaryTextDark dark:text-primaryTextDark hover:dark:border-inputBorderHoverDark hover:border-inputBorderHover transition"
        />
        <div
          // @ts-ignore
          onClick={() => endDatePickerRef.current.setOpen(true)}
          className="absolute right-2 top-3 stroke-gray-400 fill-gray-400 text-gray-400 dark:text-gray-400 hover:stroke-secondaryText dark:hover:stroke-secondaryTextDark cursor-pointer"
        >
          <CalendarIcon />
        </div>
      </div>
    </div>
  );
};
