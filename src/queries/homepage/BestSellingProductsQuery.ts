import { gql } from "@apollo/client";

export const BEST_SELLING_PRODUCTS_QUERY = gql`
  query GetBestSellingProducts {
    bestSellingProducts {
      name
      profit
      revenue
    }
  }
`;
