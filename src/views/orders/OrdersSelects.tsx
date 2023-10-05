import React, { ChangeEvent } from "react";
import { ordersData } from "./OrdersData";
import { OrdersSelectsProps } from "./types";
import { Select } from "../../components/Select";

export const OrderSelects: React.FC<OrdersSelectsProps> = ({
  filters,
  setFilter,
}) => {
  const selectsConfig = [
    {
      value: filters.productName,
      setFilterKey: "productName",
      placeholder: "All Products",
      options: Array.from(new Set(ordersData.map((item) => item.col2))),
    },
    {
      value: filters.user,
      setFilterKey: "user",
      placeholder: "All Users",
      options: Array.from(new Set(ordersData.map((item) => item.col3))),
    },
    {
      value:
        filters.priceRange.min === 0 && filters.priceRange.max === 5000
          ? ""
          : `${filters.priceRange.min}-${filters.priceRange.max}`,
      setFilterKey: "priceRange",
      placeholder: "Any Price",
      options: ["0-5000", "0-100", "100-500", "500-1000", "1000-5000"],
      specialHandler: (e: ChangeEvent<HTMLSelectElement>) => {
        const [min, max] = e.target.value.split("-").map(Number);
        setFilter("priceRange", { min, max });
      },
    },
    {
      value: filters.deliveryType,
      setFilterKey: "deliveryType",
      placeholder: "Any Delivery Type",
      options: Array.from(new Set(ordersData.map((item) => item.col5))),
    },
    {
      value: filters.status,
      setFilterKey: "status",
      placeholder: "Any Status",
      options: Array.from(new Set(ordersData.map((item) => item.col7))),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full md:gap-4">
      {selectsConfig.map(
        (
          { value, setFilterKey, placeholder, options, specialHandler },
          index
        ) => (
          <div key={index} className="w-full md:w-1/3 mb-4">
            <Select
              value={value}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                if (specialHandler) {
                  specialHandler(e);
                } else {
                  setFilter(
                    setFilterKey as keyof typeof filters,
                    e.target.value
                  );
                }
              }}
              placeholder={placeholder}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        )
      )}
    </div>
  );
};
