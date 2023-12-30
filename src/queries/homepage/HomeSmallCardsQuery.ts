import { gql } from "@apollo/client";

export const HOME_SMALL_CARDS_QUERY = gql`
  query GetHomeSmallCards {
    homeSmallCards {
      title
      metric
      metricPrev
      delta
      deltaType
      color
      increased
      changeValue
      changeText
      chartData
    }
  }
`;
