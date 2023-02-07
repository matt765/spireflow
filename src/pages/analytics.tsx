import { ColGrid, Col } from "@tremor/react";

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
    <Layout>
      <PageContainer title="Dashboard">
        
        {/* First row */}
        <ColGrid
          numCols={1}
          numColsSm={3}
          numColsMd={3}
          numColsLg={3}
          gapX="gap-x-6"
          gapY="gap-y-6"
        >
          <Col numColSpan={1} numColSpanLg={2}>
            <Analytics1 />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Analytics2 />
          </Col>
        </ColGrid>

        {/* Second row */}
        <ColGrid
          numCols={1}
          numColsSm={2}
          numColsMd={2}
          numColsLg={2}
          gapX="gap-x-6"
          gapY="gap-y-6"
        >
          <Col numColSpan={1} numColSpanLg={1}>
            <Analytics6 />
          </Col>
          <Col numColSpan={1} numColSpanLg={1}>
            <Analytics4 />
          </Col>
          {/* <Col numColSpan={1} numColSpanLg={1}>
            <Analytics5 />
          </Col> */}
        </ColGrid>
      
        {/* Third row */}
        <ColGrid
          numCols={1}
          numColsSm={1}
          numColsMd={1}
          numColsLg={1}
          gapX="gap-x-6"
          gapY="gap-y-6"
        >
          <Col numColSpan={1} numColSpanLg={1}>
           <Analytics8 />
          </Col>
        
        </ColGrid>

        {/* Fourth row */}
        <Analytics10 />
      </PageContainer>
    </Layout>
  );
}
