import { Grid, Col } from "@tremor/react";

import { PageContainer } from "../components/PageContainer";
import { Layout } from "../layout/Layout";
import { Dash1 } from "../components/dashboard/Dash1";
import { Dash2 } from "../components/dashboard/Dash2";
import { Dash3 } from "../components/dashboard/Dash3";
import { Dash4 } from "../components/dashboard/Dash4";
import { Dash5 } from "../components/dashboard/Dash5";
import { Dash6 } from "../components/dashboard/Dash6";
import { Analytics1 } from "../components/analytics/Analytics1";
import { Analytics2 } from "../components/analytics/Analytics2";
import { Analytics4 } from "../components/analytics/Analytics4";
import { Analytics5 } from "../components/analytics/Analytics5";
import { Analytics6 } from "../components/analytics/Analytics6";
import { Analytics10 } from "../components/analytics/Analytics10";
import { Analytics7 } from "../components/analytics/Analytics7";
import { Analytics8 } from "../components/analytics/Analytics8";

export default function Analytics() {
  return (
    <PageContainer title="Dashboard">
      {/* First row */}
      <Grid
        numItems={1}
        numItemsSm={3}
        numItemsMd={3}
        numItemsLg={3}
        className="gap-x-6 gap-y-6"
      >
        <Col numColSpan={1} numColSpanLg={2}>
          <Analytics1 />
        </Col>
        <Col numColSpan={1} numColSpanLg={1}>
          <Analytics2 />
        </Col>
      </Grid>
      {/* Second row */}
      <Grid
        numItems={1}
        numItemsSm={2}
        numItemsMd={2}
        numItemsLg={2}
        className="gap-x-6 gap-y-6 max-h-[35rem]"
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
