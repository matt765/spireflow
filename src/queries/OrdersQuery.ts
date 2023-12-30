import { gql } from "@apollo/client";

export const ORDERS_QUERY = gql`
  query GetOrders {
    orders {
      orderId
      productName
      user
      price
      deliveryType
      date
      status
    }
  }
`;
