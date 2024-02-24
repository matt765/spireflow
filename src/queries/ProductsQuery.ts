import { gql } from "@apollo/client";

export const PRODUCTS_QUERY = gql`
  query GetProducts {
    products {
      productId
      name
      price
      type
      image
      parameters
      metrics
    }
  }
`;
