import { DocumentNode } from "graphql";

import { client } from "./apolloClient";
import { ORDERS_QUERY } from "../queries/OrdersQuery";
import { ANALYTICS_QUERY } from "../queries/analytics/AnalyticsQuery";
import { EVENTS_QUERY } from "../queries/EventsQuery";
import { CUSTOMERS_QUERY } from "../queries/CustomersQuery";
import { PRODUCTS_QUERY } from "../queries/ProductsQuery";
import { HOMEPAGE_QUERY } from "../queries/homepage/HomepageQuery";

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

export const getData = async (pageName: string) => {
  const query = QUERY_MAP[pageName];

  if (!query) {
    throw new Error(`Query not found for page: ${pageName}`);
  }

  try {
    const { data } = await client.query({ query });

    switch (pageName) {
      case "homepage":
        return data;
      case "analytics":
        return data;
      default:
        return data[pageName];
    }
  } catch (error) {
    throw new Error(`Error fetching data for page ${pageName}`);
  }
};
