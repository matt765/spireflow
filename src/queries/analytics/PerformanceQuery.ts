import { gql } from "@apollo/client";

export const PERFORMANCE_QUERY = gql`
  query GetPerformance {
    monthPerformance {
      month
      sales
      profit
    }
  }
`;
