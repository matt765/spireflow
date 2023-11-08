import { Grid, Col } from "@tremor/react";

import { PageContainer } from "../components/common/PageContainer";
import { HomeSmallCards } from "../components/dashboard/HomeSmallCards";
import { CustomerSatisfaction } from "../components/dashboard/CustomerSatisfaction";
import { Regions } from "../components/dashboard/Regions";
import { BestSellingProducts } from "../components/dashboard/BestSellingProducts";
import { RevenueOverTime } from "../components/dashboard/RevenueOverTime";
import { TradersTable } from "../components/dashboard/TradersTable";

export default function Home() {
  return (
    <PageContainer title="Dashboard" className="pt-28 px-4 pb-6">
      {/* First row */}
      <Grid numItems={2} numItemsLg={4} className="gap-x-4 gap-y-6">
        <HomeSmallCards />
      </Grid>

      {/* Second row */}
      <Grid
        numItems={1}
        numItemsSm={2}
        numItemsMd={2}
        numItemsLg={3}
        className="gap-x-6 gap-y-6"
      >
        <Col numColSpan={1} numColSpanLg={2}>
          <RevenueOverTime />
        </Col>
        <Col numColSpan={1} numColSpanLg={1}>
          <Regions />
        </Col>
      </Grid>

      {/* Third row */}
      <Grid
        numItems={1}
        numItemsSm={2}
        numItemsMd={2}
        numItemsLg={3}
        className="gap-x-6 gap-y-6"
      >
        <Col numColSpan={1} numColSpanLg={1}>
          <BestSellingProducts />
        </Col>
        <Col numColSpan={1} numColSpanLg={2}>
          <CustomerSatisfaction />
        </Col>
      </Grid>
      {/* Fourth row */}
      <TradersTable />
    </PageContainer>
  );
}
