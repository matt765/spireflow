"use client"

import { client } from "../services/apolloClient";
import { ORDERS_QUERY } from "../queries/OrdersQuery";
import { DocumentNode } from "graphql";
import { ANALYTICS_QUERY } from "../queries/analytics/AnalyticsQuery";
import { EVENTS_QUERY } from "../queries/EventsQuery";
import { CUSTOMERS_QUERY } from "../queries/CustomersQuery";
import { PRODUCTS_QUERY } from "../queries/ProductsQuery";
import { HOMEPAGE_QUERY } from "../queries/homepage/HomepageQuery";

import { useState, useEffect } from "react";
import { useAppStore } from "../store/appStore";

interface QueryMap {
  [key: string]: DocumentNode;
}

const QUERY_MAP: QueryMap = {
  analytics: ANALYTICS_QUERY,
  events: EVENTS_QUERY,
  customers: CUSTOMERS_QUERY,
  homepage: HOMEPAGE_QUERY,
  orders: ORDERS_QUERY,
  products: PRODUCTS_QUERY,
};

export const useGetData = (pageName: string) => {
  const [data, setData] = useState(null);
  const setLoading = useAppStore((state) => state.setLoading);

  useEffect(() => {
    const fetchData = async () => {
      const query = QUERY_MAP[pageName];

      if (!query) {
        console.error(`Query not found for page: ${pageName}`);
        return;
      }

      setLoading(true);
      try {
        const { data: fetchedData } = await client.query({ query });
        console.log(fetchedData);
        setData(
          pageName === "homepage" || pageName === "analytics"
            ? fetchedData
            : fetchedData[pageName]
        );
      } catch (error) {
        console.error(`Error fetching data for page ${pageName}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageName, setLoading]);

  return data;
};
