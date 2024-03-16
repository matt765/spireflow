import { DeltaType, Color } from "@tremor/react";

export interface BestSellingProduct {
  name: string;
  profit: number;
}

export interface BestSellingProductsProps {
  bestSellingProductsData: BestSellingProduct[];
}

export interface TransformedBestSellingProduct {
  name: string;
  "Profit from last week": number;
}

export interface ProductSatisfaction {
  brandName: string;
  customerSatisfaction: number;
  totalSales: number;
  numberOfOrders: number;
}

export interface CustomerSatisfactionProps {
  customerSatisfactionData: ProductSatisfaction[];
}

export interface HomeSmallCardChartData {
  date: string;
  metric: number;
}

export interface HomeSmallCard {
  title: string;
  metric: string;
  metricPrev: string;
  delta: string;
  deltaType: DeltaType;
  color: Color;
  increased: boolean;
  changeValue: number;
  changeText: string;
  chartData: HomeSmallCardChartData[];
}

export interface HomeSmallCardsProps {
  homeSmallCardsData: HomeSmallCard[];
}

export interface Region {
  name: string;
  region: string;
  sales: number;
  delta: string;
  deltaType: string;
}

export interface RegionsProps {
  regionsData: Region[];
}

export interface Revenue {
  date: string;
  websiteSales: number;
  inStoreSales: number;
}

export interface RevenueOverTimeProps {
  revenueOverTimeData: Revenue[];
}

export interface Trader {
  name: string;
  leads: number;
  sales: string;
  quota: string;
  variance: string;
  region: string;
  status: string;
  deltaType: DeltaType;
}

export interface TradersTableProps {
  tradersTableData: Trader[];
}

interface HomepageData {
  bestSellingProducts: BestSellingProductsProps["bestSellingProductsData"];
  customerSatisfaction: CustomerSatisfactionProps["customerSatisfactionData"];
  homeSmallCards: HomeSmallCardsProps["homeSmallCardsData"];
  regions: RegionsProps["regionsData"];
  revenueOverTime: RevenueOverTimeProps["revenueOverTimeData"];
  traders: TradersTableProps["tradersTableData"];
}

export interface HomepageViewProps {
  homepageData: HomepageData;
}
