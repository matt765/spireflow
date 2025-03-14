"use client";

import { Grid, Col } from "@tremor/react";

import { AssetPerformance } from "./AssetPerformance";
import { TodaySales } from "./TodaySales";
import { TotalProfit } from "./TotalProfit";
import { Performance } from "./Performance";
import { YearOverview } from "./YearOverview";
import { AnalyticsViewProps } from "./types";
import { MarketMetrics } from "./MarketMetrics";
import { RevenueDistribution } from "./RevenueDistribution";

export const AnalyticsView = ({ analyticsData }: AnalyticsViewProps) => {
  return (
    <>
      {/* First row */}
      <Grid
        numItems={1}
        numItemsSm={1}
        numItemsMd={2}
        numItemsLg={3}
        className="gap-x-6 gap-y-6"
      >
        <Col numColSpan={1} numColSpanSm={1} numColSpanLg={2}>
          {analyticsData?.assets && (
            <AssetPerformance assetPerformanceData={analyticsData.assets} />
          )}
        </Col>
        <Col numColSpan={1} numColSpanSm={1}>
          {analyticsData?.todaySales && (
            <TodaySales todaySalesData={analyticsData.todaySales} />
          )}
        </Col>
      </Grid>
      {/* Second row */}
      <div className="w-full flex flex-col 1xl:flex-row justify-between gap-6">
        <div className="w-full 1xl:w-1/3">
          {analyticsData?.totalProfitProducts &&
            analyticsData?.totalProfitMonths && (
              <TotalProfit
                totalProfitProducts={analyticsData.totalProfitProducts}
                totalProfitSales={analyticsData.totalProfitMonths}
              />
            )}
        </div>
        <div className="hidden md:flex w-full 1xl:w-2/3">
          {analyticsData?.monthPerformance && (
            <Performance performanceData={analyticsData.monthPerformance} />
          )}
        </div>
      </div>
      {/* Third row */}
      {analyticsData?.yearOverview && (
        <YearOverview yearOverviewData={analyticsData.yearOverview} />
      )}
      {/* Fourth row */}
      <Grid
        numItems={1}
        numItemsSm={1}
        numItemsMd={2}
        numItemsLg={2}
        className="gap-x-6 gap-y-6"
      >
        <Col numColSpan={1} numColSpanSm={1} numColSpanLg={1}>
          {analyticsData?.marketMetrics && (
            <MarketMetrics marketMetricsData={analyticsData.marketMetrics} />
          )}
        </Col>
        <Col numColSpan={1} numColSpanSm={1}>
          {analyticsData?.revenueDistribution && (
            <RevenueDistribution
              revenueDistributionData={analyticsData.revenueDistribution}
            />
          )}
        </Col>
      </Grid>
    </>
  );
};
