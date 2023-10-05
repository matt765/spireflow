import { Grid, Col } from "@tremor/react";

import { PageContainer } from "../components/PageContainer";
import { Dash1 } from "../components/dashboard/Dash1";
import { Dash2 } from "../components/dashboard/Dash2";
import { Dash3 } from "../components/dashboard/Dash3";
import { Dash4 } from "../components/dashboard/Dash4";
import { Dash5 } from "../components/dashboard/Dash5";
import { Dash6 } from "../components/dashboard/Dash6";

export default function Home() {
  return (
    <PageContainer title="Dashboard" className="pt-28 px-4 pb-6">
      {/* First row */}
      <Grid numItems={2} numItemsLg={4} className="gap-x-4 gap-y-6">
        <Dash1 />
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
          <Dash5 />
        </Col>
        <Col numColSpan={1} numColSpanLg={1}>
          <Dash3 />
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
          <Dash4 />
        </Col>
        <Col numColSpan={1} numColSpanLg={2}>
          <Dash2 />
        </Col>
      </Grid>
      {/* Fourth row */}
      <Dash6 />
    </PageContainer>
  );
}
