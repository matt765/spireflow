import { gql } from "@apollo/client";

export const ANALYTICS_QUERY = gql`
  query GetAnalyticsData {
    assets {
      name
      industry
      sales
      delta
      deltaType
      status
    }
    monthPerformance {
      month
      sales
      profit
    }
    revenuePerCountry {
      name
      price
    }
    todaySales {
      hour
      today
      average
      yesterday
    }
    totalProfitProducts {
      title
      value
      metric
    }
    totalProfitMonths {
      month
      sales
    }
    yearOverview {
      name
      sales
      revenue
      unitsSold
      returns
    }
  }
`;
