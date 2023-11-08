import { Grid, Col } from "@tremor/react";

import { PageContainer } from "../components/common/PageContainer";
import { AssetPerformance } from "../components/analytics/AssetPerformance";
import { TodaySales } from "../components/analytics/TodaySales";
import { RevenuePerCountry } from "../components/analytics/RevenuePerCountry";
import { TotalProfit } from "../components/analytics/TotalProfit";
import { YearOverview } from "../components/analytics/YearOverview";
import { Performance } from "../components/analytics/Performance";

export default function Analytics() {
  return (
    <PageContainer title="Dashboard" className="px-4 pt-28 pb-4 xl:p-0">
      {/* First row */}
      <Grid
        numItems={1}
        numItemsSm={2}
        numItemsMd={2}
        numItemsLg={3}
        className="gap-x-6 gap-y-6"
      >
        <Col numColSpan={1} numColSpanSm={1} numColSpanLg={2}>
          <AssetPerformance />
        </Col>
        <Col numColSpan={1} numColSpanSm={1}>
          <TodaySales />
        </Col>
      </Grid>
      {/* Second row */}
      <Grid
        numItems={1}
        numItemsSm={2}
        numItemsMd={2}
        numItemsLg={3}
        className="gap-x-6 gap-y-6"
      >
        <Col numColSpan={1} numColSpanLg={1}>
          <TotalProfit />
        </Col>
        <Col numColSpan={1} numColSpanLg={2}>
          <RevenuePerCountry />
        </Col>
      </Grid>

      {/* Third row */}
      <Grid
        numItems={1}
        numItemsSm={1}
        numItemsMd={1}
        numItemsLg={1}
        className="gap-x-6 gap-y-6"
      >
        <Col numColSpan={1} numColSpanLg={1}>
          <Performance />
        </Col>
      </Grid>

      {/* Fourth row */}
      <YearOverview />
    </PageContainer>
  );
}
