import { gql } from "@apollo/client";

export const YEAR_OVERVIEW_QUERY = gql`
  query GetYearOverview {
    yearOverview {
      name
      phones
      tablets
      laptops
    }
  }
`;
