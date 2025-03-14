import { gql } from "@apollo/client";

export const REVENUE_DISTRIBUTION_QUERY = gql`
  query GetRevenueDistribution {
    revenueDistribution {
      category
      inStore
      online
    }
  }
`;
