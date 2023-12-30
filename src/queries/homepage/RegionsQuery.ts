import { gql } from "@apollo/client";

export const REGIONS_QUERY = gql`
  query GetRegions {
    regions {
      name
      region
      sales
      delta
      deltaType
    }
  }
`;
