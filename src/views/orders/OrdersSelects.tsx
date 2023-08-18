import React from "react";

import { ordersData } from "./OrdersData";
import { OrdersSelectsProps } from "./types";

export const OrderSelects = ({ filters, setFilter }: OrdersSelectsProps) => {
  return (
    <div className="flex w-full gap-4">
      <div className="w-1/3 mb-4">
        <select
          value={filters.productName}
          onChange={(e) => setFilter("productName", e.target.value)}
          className="border p-2 w-full bg-white"
        >
          <option value="">All Products</option>
          {Array.from(new Set(ordersData.map((item) => item.col2))).map(
            (productName) => (
              <option key={productName} value={productName}>
                {productName}
              </option>
            )
          )}
        </select>
      </div>
      <div className="w-1/3 mb-4">
        <select
          value={filters.user}
          onChange={(e) => setFilter("user", e.target.value)}
          className="border p-2 w-full bg-white"
        >
          <option value="">All Users</option>
          {Array.from(new Set(ordersData.map((item) => item.col3))).map(
            (user) => (
              <option key={user} value={user}>
                {user}
              </option>
            )
          )}
        </select>
      </div>
      <div className="w-1/3 mb-4">
        <select
          value={`${filters.priceRange.min}-${filters.priceRange.max}`}
          onChange={(e) => {
            const [min, max] = e.target.value.split("-").map(Number);
            setFilter("priceRange", { min, max });
          }}
          className="border p-2 w-full bg-white"
        >
          <option value="0-5000">Any Price</option>
          <option value="0-100">0-100</option>
          <option value="100-500">100-500</option>
          <option value="500-1000">500-1000</option>
          <option value="1000-5000">1000+</option>
        </select>
      </div>
      <div className="w-1/3 mb-4">
        <select
          value={filters.deliveryType}
          onChange={(e) => setFilter("deliveryType", e.target.value)}
          className="border p-2 w-full bg-white"
        >
          <option value="">Any Delivery Type</option>
          {Array.from(new Set(ordersData.map((item) => item.col5))).map(
            (deliveryType) => (
              <option key={deliveryType} value={deliveryType}>
                {deliveryType}
              </option>
            )
          )}
        </select>
      </div>
      <div className="w-1/3 mb-4">
        <select
          value={filters.status}
          onChange={(e) => setFilter("status", e.target.value)}
          className="border p-2 w-full bg-white"
        >
          <option value="">Any Status</option>
          {Array.from(new Set(ordersData.map((item) => item.col7))).map(
            (status) => (
              <option key={status} value={status}>
                {status}
              </option>
            )
          )}
        </select>
      </div>
    </div>
  );
};
