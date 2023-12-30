import { Grid, Col } from "@tremor/react";

import { PageContainer } from "../components/common/PageContainer";
import { HomeSmallCards } from "../components/views/homepage/HomeSmallCards";
import { CustomerSatisfaction } from "../components/views/homepage/CustomerSatisfaction";
import { Regions } from "../components/views/homepage/Regions";
import { BestSellingProducts } from "../components/views/homepage/BestSellingProducts";
import { RevenueOverTime } from "../components/views/homepage/RevenueOverTime";
import { TradersTable } from "../components/views/homepage/TradersTable";
import { getData } from "../services/getData";

const Home = async () => {
  const homepageData = await getData("homepage");

  return (
    <PageContainer title="Dashboard" className="pt-28 px-4 pb-6" hidePaper>
      {/* First row */}
      <Grid numItems={2} numItemsLg={4} className="gap-x-4 gap-y-6">
        {homepageData?.homeSmallCards && (
          <HomeSmallCards homeSmallCardsData={homepageData.homeSmallCards} />
        )}
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
          {homepageData?.revenueOverTime && (
            <RevenueOverTime
              revenueOverTimeData={homepageData.revenueOverTime}
            />
          )}
        </Col>
        <Col numColSpan={1} numColSpanLg={1}>
          {homepageData?.regions && (
            <Regions regionsData={homepageData.regions} />
          )}
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
          {homepageData?.bestSellingProducts && (
            <BestSellingProducts
              bestSellingProductsData={homepageData.bestSellingProducts}
            />
          )}
        </Col>
        <Col numColSpan={1} numColSpanLg={2}>
          {homepageData?.customerSatisfaction && (
            <CustomerSatisfaction
              customerSatisfactionData={homepageData.customerSatisfaction}
            />
          )}
        </Col>
      </Grid>
      {/* Fourth row */}
      {homepageData?.traders && (
        <TradersTable tradersTableData={homepageData?.traders} />
      )}
    </PageContainer>
  );
};

// All API requests are done during build time on default for demo purposes
// Uncomment those exports to enable dynamic rendering on this page
// export const dynamic = 'force-dynamic'
// export const revalidate = 0

export default Home;
