import { gql } from "@apollo/client";

export const TOTAL_PROFIT_PRODUCTS_QUERY = gql`
  query GetTotalProfitProducts {
    totalProfitProducts {
      title
      value
      metric
    }
  }
`;
