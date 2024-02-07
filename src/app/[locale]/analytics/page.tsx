import { Grid, Col } from "@tremor/react";

import { PageWrapper } from "../../../components/common/PageWrapper";
import { AssetPerformance } from "../../../components/views/analytics/AssetPerformance";
import { TodaySales } from "../../../components/views/analytics/TodaySales";
import { RevenuePerCountry } from "../../../components/views/analytics/RevenuePerCountry";
import { TotalProfit } from "../../../components/views/analytics/TotalProfit";
import { YearOverview } from "../../../components/views/analytics/YearOverview";
import { Performance } from "../../../components/views/analytics/Performance";
import { getData } from "../../../services/getData";

const Analytics = async () => {
  const analyticsData = await getData("analytics");

  return (
    <PageWrapper className="px-4 pt-28 pb-4 xl:p-0" hidePaper>
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
          {analyticsData?.revenuePerCountry && (
            <RevenuePerCountry
              revenuePerCountryData={analyticsData.revenuePerCountry}
            />
          )}
        </div>
      </div>
      {/* Third row */}
      <Grid
        numItems={1}
        numItemsSm={1}
        numItemsMd={1}
        numItemsLg={1}
        className="gap-x-6 gap-y-6"
      >
        <Col numColSpan={1} numColSpanLg={1}>
          {analyticsData?.monthPerformance && (
            <Performance performanceData={analyticsData.monthPerformance} />
          )}
        </Col>
      </Grid>
      {/* Fourth row */}
      {analyticsData?.yearOverview && (
        <YearOverview yearOverviewData={analyticsData.yearOverview} />
      )}
    </PageWrapper>
  );
};

export default Analytics;
