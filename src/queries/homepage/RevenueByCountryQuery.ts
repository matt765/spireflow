import { gql } from "@apollo/client";

export const REVENUE_PER_COUNTRY_QUERY = gql`
  query GetRevenuePerCountry {
    revenuePerCountry {
      name
      price
    }
  }
`;
