import { gql } from "@apollo/client";

export const TRADERS_TABLE_QUERY = gql`
  query GetTradersTable {
    traders {
      name
      leads
      sales
      quota
      variance
      region
      status
      deltaType
    }
  }
`;
