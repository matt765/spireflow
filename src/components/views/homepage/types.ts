import { DeltaType, Color } from "@tremor/react";

export interface BestSellingProduct {
  name: string;
  profit: number;
  revenue: number;
}

export interface BestSellingProductsProps {
  bestSellingProductsData: BestSellingProduct[];
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

interface HomepageData {
  bestSellingProducts: BestSellingProductsProps["bestSellingProductsData"];
  customerSatisfaction: CustomerSatisfactionProps["customerSatisfactionData"];
  homeSmallCards: HomeSmallCardsProps["homeSmallCardsData"];
  regions: RegionsProps["regionsData"];
  revenueOverTime: RevenueOverTimeProps["revenueOverTimeData"];
  revenuePerCountry: RevenuePerCountryProps["revenuePerCountryData"];
}

export interface HomepageViewProps {
  homepageData: HomepageData;
}

export interface Country {
  name: string;
  price: number;
}

export interface RevenuePerCountryProps {
  revenuePerCountryData: Country[];
}
