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

export interface OverviewMonthData {
  name: string;
  phones: number;
  tablets: number;
  laptops: number;
}

export interface YearOverviewProps {
  yearOverviewData: OverviewMonthData[];
}

interface AnalyticsData {
  assets: AssetPerformanceProps["assetPerformanceData"];
  monthPerformance: PerformanceProps["performanceData"];
  todaySales: TodaySalesProps["todaySalesData"];
  totalProfitProducts: TotalProfitProps["totalProfitProducts"];
  totalProfitMonths: TotalProfitProps["totalProfitSales"];
  yearOverview: YearOverviewProps["yearOverviewData"];
  marketMetrics: MarketMetricsProps["marketMetricsData"];
  revenueDistribution: RevenueDistributionProps["revenueDistributionData"];
}

export interface AnalyticsViewProps {
  analyticsData: AnalyticsData;
}

export interface MetricPoint {
  metric: string;
  phones: number;
  laptops: number;
  maxValue: number;
}

export interface MarketMetricsProps {
  marketMetricsData: MetricPoint[];
}

export interface MarketMetricsTooltipProps {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number; color?: string }>;
  label?: string;
}

export interface RevenueData {
  category: string;
  inStore: number;
  online: number;
}

export interface RevenueDistributionProps {
  revenueDistributionData: RevenueData[];
}

export interface RevenueTooltipPayloadItem {
  name?: string;
  value?: number;
  color?: string;
  dataKey?: string;
}
export interface RevenueDistributionTooltipProps {
  active?: boolean;
  payload?: RevenueTooltipPayloadItem[];
  label?: string;
}
