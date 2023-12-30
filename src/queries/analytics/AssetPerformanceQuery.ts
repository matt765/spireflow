import { gql } from "@apollo/client";

export const ASSETS_QUERY = gql`
  query GetAssets {
    assets {
      name
      industry
      sales
      delta
      deltaType
      status
    }
  }
`;
