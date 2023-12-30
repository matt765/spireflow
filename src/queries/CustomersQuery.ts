import { gql } from "@apollo/client";

export const CUSTOMERS_QUERY = gql`
  query GetCustomers {
    customers {
      photo
      firstName
      lastName
      city
      country
      phone
      totalBuys
    }
  }
`;
