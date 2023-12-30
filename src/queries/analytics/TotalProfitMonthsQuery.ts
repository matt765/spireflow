import { gql } from "@apollo/client";

export const TOTAL_PROFIT_MONTHS_QUERY = gql`
  query GetTotalProfitMonths {
    totalProfitMonths {
      month
      sales
    }
  }
`;
