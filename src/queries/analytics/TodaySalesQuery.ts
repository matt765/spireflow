import { gql } from "@apollo/client";

export const TODAY_SALES_QUERY = gql`
  query GetTodaySales {
    todaySales {
      hour
      today
      average
      yesterday
    }
  }
`;
