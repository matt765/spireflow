import { gql } from "@apollo/client";

export const REVENUE_OVER_TIME_QUERY = gql`
  query GetRevenueOverTime {
    revenueOverTime {
      date
      websiteSales
      inStoreSales
    }
  }
`;
