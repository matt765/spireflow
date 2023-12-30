import { gql } from "@apollo/client";

export const CUSTOMER_SATISFACTION_QUERY = gql`
  query GetCustomerSatisfaction {
    customerSatisfaction {
      brandName
      customerSatisfaction
      totalSales
      numberOfOrders
    }
  }
`;
