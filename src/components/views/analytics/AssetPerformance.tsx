import {
  Col,
  DeltaBar,
  DonutChart,
  Flex,
  List,
  ListItem,
  Text,
  Title,
  Bold,
  Grid,
} from "@tremor/react";
import { useTranslations } from "next-intl";

import { AssetPerformanceProps } from "./types";
import { Card } from "../../common/Card";

export const AssetPerformance = ({
  assetPerformanceData,
}: AssetPerformanceProps) => {
  const t = useTranslations("analytics.assetPerformance");

  const valueFormatter = (number: number) =>
    `${Intl.NumberFormat("us").format(number).toString()} $`;

  return (
    <Card className="assetPerformanceCard h-full" id="assetPerformance">
      <div>
        <Flex className="space-x-4" justifyContent="start" alignItems="center">
          <Title>{t("title")}</Title>
        </Flex>
      </div>
      <Grid numItemsLg={3} className="mt-8 gap-x-10 gap-y-10">
        <Flex>
          <DonutChart
            data={assetPerformanceData}
            category="sales"
            variant="donut"
            valueFormatter={valueFormatter}
            className="h-52"
          />
        </Flex>
        <Col numColSpan={1} numColSpanLg={2}>
          <Flex className="block sm:hidden lg:block">
            <Text>
              <Bold>+/-% {t("sinceTransaction")} </Bold>
            </Text>
          </Flex>
          <div className="sm:max-h-32 lg:max-h-full overflow-auto pr-2">
            <List className="mt-2">
              {assetPerformanceData.map((asset) => (
                <ListItem key={asset.name}>
                  <Text> {asset.name} </Text>
                  <div>
                    <Flex justifyContent="end" className="space-x-4">
                      <Text color={asset.status} className="ml-2">
                        {asset.delta}%{" "}
                      </Text>
                      <div className="w-44">
                        <DeltaBar
                          value={asset.delta}
                          isIncreasePositive={true}
                          tooltip=""
                        />
                      </div>
                    </Flex>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
        </Col>
      </Grid>
    </Card>
  );
};
