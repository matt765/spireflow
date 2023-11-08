import { Text } from "@tremor/react";

import { PageContainer } from "../components/common/PageContainer";
import { ScatterChart } from "@tremor/react";

const chartdata = [
  {
    Country: "Argentina",
    Life_expectancy: 76.3,
    GDP: 13467.1236,
    Population: 43417765,
  },
  {
    Country: "Australia",
    Life_expectancy: 82.8,
    GDP: 56554.3876,
    Population: 23789338,
  },
  {
    Country: "Austria",
    Life_expectancy: 81.5,
    GDP: 43665.947,
    Population: 8633169,
  },
  {
    Country: "Brazil",
    Life_expectancy: 75.4,
    GDP: 11024.0342,
    Population: 211049527,
  },
  {
    Country: "Canada",
    Life_expectancy: 82.3,
    GDP: 44974.243,
    Population: 37058856,
  },
  {
    Country: "China",
    Life_expectancy: 76.9,
    GDP: 10746.782,
    Population: 13715000,
  },
  {
    Country: "Denmark",
    Life_expectancy: 80.7,
    GDP: 55675.003,
    Population: 5754356,
  },
  {
    Country: "Egypt",
    Life_expectancy: 71.8,
    GDP: 5744.787,
    Population: 98423595,
  },
  {
    Country: "Finland",
    Life_expectancy: 81.1,
    GDP: 42032.056,
    Population: 552529,
  },
  {
    Country: "Germany",
    Life_expectancy: 81.0,
    GDP: 44680.009,
    Population: 82792351,
  },
  {
    Country: "India",
    Life_expectancy: 69.4,
    GDP: 5191.054,
    Population: 16417754,
  },
  {
    Country: "Japan",
    Life_expectancy: 84.1,
    GDP: 40551.553,
    Population: 126530000,
  },
  {
    Country: "Mexico",
    Life_expectancy: 74.9,
    GDP: 17924.041,
    Population: 127575529,
  },
  {
    Country: "Netherlands",
    Life_expectancy: 81.5,
    GDP: 49088.289,
    Population: 17134872,
  },
  {
    Country: "Russia",
    Life_expectancy: 72.6,
    GDP: 11288.872,
    Population: 144478050,
  },
  {
    Country: "Poland",
    Life_expectancy: 77.5,
    GDP: 29582.345,
    Population: 37887768,
  },
  {
    Country: "Spain",
    Life_expectancy: 83.4,
    GDP: 32290.175,
    Population: 46736776,
  },
  {
    Country: "Greece",
    Life_expectancy: 81.1,
    GDP: 21345.678,
    Population: 10473455,
  },
];

export default function Scatter() {
  return (
    <PageContainer title="Donut">
      <div className="w-full h-full paper max-w-full">
        <div className="single-chart-wrapper">
          <div className="single-chart-title">
            Life expectancy vs. GDP per capita
          </div>
          <Text>As of 2015. Source: Our World in Data </Text>
          <ScatterChart
            className="h-80 mt-6 -ml-2"
            yAxisWidth={50}
            data={chartdata}
            category="Country"
            x="GDP"
            y="Life_expectancy"
            size="Population"
            showOpacity={true}
            minYValue={60}
            valueFormatter={{
              x: (amount) => `$${(amount / 1000).toFixed(1)}K`,
              y: (lifeExp) => `${lifeExp} yrs`,
              size: (population) =>
                `${(population / 1000000).toFixed(1)}M people`,
            }}
            showLegend={false}
          />
        </div>
      </div>
    </PageContainer>
  );
}
