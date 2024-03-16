import { DeltaType, Color } from "@tremor/react";

export interface Asset {
  name: string;
  industry: string;
  sales: number;
  delta: number;
  deltaType: DeltaType;
  status: Color;
}

export interface AssetPerformanceProps {
  assetPerformanceData: Asset[];
}

export interface MonthPerformance {
  month: string;
  sales: number;
  profit: number;
}

export interface PerformanceProps {
  performanceData: MonthPerformance[];
}

export interface Country {
  name: string;
  price: number;
}

export interface RevenuePerCountryProps {
  revenuePerCountryData: Country[];
}

export interface TodaySalesDataUnit {
  hour: string;
  today: number;
  average: number;
  yesterday: number;
}

export interface TodaySalesProps {
  todaySalesData: TodaySalesDataUnit[];
}

export interface ProductProfit {
  title: string;
  value: number;
  metric: string;
}

export interface TotalMonthProfit {
  month: string;
  sales: number;
}

export interface TotalProfitProps {
  totalProfitProducts: ProductProfit[];
  totalProfitSales: TotalMonthProfit[];
}

export interface SingleProductData {
  name: string;
  value: number;
}

export interface OverviewCategoryData {
  name: string;
  sales: SingleProductData[];
  revenue: SingleProductData[];
  unitsSold: SingleProductData[];
  returns: SingleProductData[];
}

export interface YearOverviewProps {
  yearOverviewData: OverviewCategoryData[];
}

interface AnalyticsData {
  assets: AssetPerformanceProps["assetPerformanceData"];
  monthPerformance: PerformanceProps["performanceData"];
  revenuePerCountry: RevenuePerCountryProps["revenuePerCountryData"];
  todaySales: TodaySalesProps["todaySalesData"];
  totalProfitProducts: TotalProfitProps["totalProfitProducts"];
  totalProfitMonths: TotalProfitProps["totalProfitSales"];
  yearOverview: YearOverviewProps["yearOverviewData"];
}

export interface AnalyticsViewProps {
  analyticsData: AnalyticsData;
}
