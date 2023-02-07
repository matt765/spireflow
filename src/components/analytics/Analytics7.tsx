import {
  Card,
  Text,
  Footer,
  Flex,
  ButtonInline,
  Metric,
  CategoryBar,
  BadgeDelta,
  ColGrid,
} from "@tremor/react";

// import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { LogoIcon } from "../../assets/icons/LogoIcon";
const categories = [
  {
    title: "Sales",
    metric: "$ 456,000",
  },
  {
    title: "Transactions",
    metric: "89,123",
  },
  {
    title: "Merchants",
    metric: "22",
  },
  {
    title: "Orders",
    metric: "678",
  },
];

export const Analytics7 = () => {
  return (
    <Card maxWidth="max-w-xl">
      <Card shadow={false}>
        <Flex>
          <Text truncate={true}>Overall Performance Score</Text>
          <BadgeDelta text="13.1%" deltaType="moderateIncrease" />
        </Flex>
        <Flex
          justifyContent="justify-start"
          alignItems="items-baseline"
          spaceX="space-x-1"
        >
          <Metric>65</Metric>
          <Text>/100</Text>
        </Flex>
        <CategoryBar
          categoryPercentageValues={[10, 25, 45, 20]}
          colors={["emerald", "yellow", "orange", "red"]}
          percentageValue={65}
          tooltip="65%"
          marginTop="mt-2"
        />
      </Card>
      <ColGrid numColsSm={2} gapX="gap-x-4" gapY="gap-y-4" marginTop="mt-4">
        {categories.map((item) => (
          <Card key={item.title} shadow={false}>
            <Metric marginTop="mt-2" truncate={true}>
              {item.metric}
            </Metric>
            <Text>{item.title}</Text>
          </Card>
        ))}
      </ColGrid>
      <Footer>
        <ButtonInline
          size="sm"
          text="View details"
          icon={LogoIcon}
          iconPosition="right"
        />
      </Footer>
    </Card>
  );
};
