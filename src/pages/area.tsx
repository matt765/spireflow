import { ColGrid, Col } from "@tremor/react";

import { PageContainer } from "../components/PageContainer";
import { Layout } from "../layout/Layout";
import { Dash1 } from "../components/dashboard/Dash1";
import { Dash2 } from "../components/dashboard/Dash2";
import { Dash3 } from "../components/dashboard/Dash3";
import { Dash4 } from "../components/dashboard/Dash4";
import { Dash5 } from "../components/dashboard/Dash5";
import { Dash6 } from "../components/dashboard/Dash6";

export default function Area() {
  return (
    <PageContainer title="Dashboard">
      {/* First row */}
      <ColGrid numColsSm={2} numColsLg={4} gapX="gap-x-6" gapY="gap-y-6">
        <Dash1 />
      </ColGrid>

      {/* Second row */}
      <ColGrid
        numCols={1}
        numColsSm={3}
        numColsMd={3}
        numColsLg={3}
        gapX="gap-x-6"
        gapY="gap-y-6"
      >
        <Col numColSpan={1} numColSpanLg={2}>
          <Dash5 />
        </Col>
        <Col numColSpan={1} numColSpanLg={1}>
          <Dash3 />
        </Col>
      </ColGrid>

      {/* Third row */}
      <ColGrid
        numCols={1}
        numColsSm={3}
        numColsMd={3}
        numColsLg={3}
        gapX="gap-x-6"
        gapY="gap-y-6"
      >
        <Col numColSpan={1} numColSpanLg={1}>
          <Dash4 />
        </Col>
        <Col numColSpan={1} numColSpanLg={2}>
          <Dash2 />
        </Col>
      </ColGrid>

      {/* Fourth row */}
      <Dash6 />
    </PageContainer>
  );
}
