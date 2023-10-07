import { Grid, Col } from "@tremor/react";

import { PageContainer } from "../components/PageContainer";
import { Analytics1 } from "../components/analytics/Analytics1";
import { Analytics2 } from "../components/analytics/Analytics2";
import { Analytics4 } from "../components/analytics/Analytics4";
import { Analytics6 } from "../components/analytics/Analytics6";
import { Analytics10 } from "../components/analytics/Analytics10";
import { Analytics8 } from "../components/analytics/Analytics8";

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
          <Analytics1 />
        </Col>
        <Col numColSpan={1} numColSpanSm={1}>
          <Analytics2 />
        </Col>
      </Grid>
      {/* Second row */}
      <Grid
        numItems={1}
        numItemsSm={2}
        numItemsMd={2}
        numItemsLg={2}
        className="gap-x-6 gap-y-6"
      >
        <Col numColSpan={1} numColSpanLg={1}>
          <Analytics6 />
        </Col>
        <Col numColSpan={1} numColSpanLg={1}>
          <Analytics4 />
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
          <Analytics8 />
        </Col>
      </Grid>

      {/* Fourth row */}
      <Analytics10 />
    </PageContainer>
  );
}
