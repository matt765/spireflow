"use client";

import { Grid, Col } from "@tremor/react";

import { HomeSmallCards } from "./HomeSmallCards";
import { RevenueOverTime } from "./RevenueOverTime";
import { Regions } from "./Regions";
import { BestSellingProducts } from "./BestSellingProducts";
import { CustomerSatisfaction } from "./CustomerSatisfaction";
import { HomepageViewProps } from "./types";
import { RevenuePerCountry } from "./RevenuePerCountry";

export const HomepageView = ({ homepageData }: HomepageViewProps) => {
  return (
    <>
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
      <div className="hidden md:flex w-full 1xl:w-full">
        <RevenuePerCountry
          revenuePerCountryData={homepageData.revenuePerCountry}
        />
      </div>
    </>
  );
};
