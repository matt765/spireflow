import { Grid, Col } from "@tremor/react";

import { PageContainer } from "../components/common/PageContainer";
import { HomeSmallCards } from "../components/views/dashboard/HomeSmallCards";
import { CustomerSatisfaction } from "../components/views/dashboard/CustomerSatisfaction";
import { Regions } from "../components/views/dashboard/Regions";
import { BestSellingProducts } from "../components/views/dashboard/BestSellingProducts";
import { RevenueOverTime } from "../components/views/dashboard/RevenueOverTime";
import { TradersTable } from "../components/views/dashboard/TradersTable";

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
