import { gql } from "@apollo/client";

export const MARKET_METRICS_QUERY = gql`
  query GetMarketMetrics {
    marketMetrics {
      metric
      phones
      laptops
      maxValue
    }
  }
`;
