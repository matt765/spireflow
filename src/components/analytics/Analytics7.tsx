import {
  Card,
  Text,
  Flex,
  Metric,
  CategoryBar,
  BadgeDelta,
  Grid,
  Button,
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
    <Card className="max-w-xl">
      <Card>
        <Flex>
          <Text>Overall Performance Score</Text>
          <BadgeDelta deltaType="moderateIncrease">13.1%</BadgeDelta>
        </Flex>
        <Flex
          justifyContent="start"
          alignItems="baseline"
          className="space-x-1"
        >
          <Metric>65</Metric>
          <Text>/100</Text>
        </Flex>
        <CategoryBar
          values={[10, 25, 45, 20]}
          colors={["emerald", "yellow", "orange", "red"]}
          markerValue={65}
          tooltip="65%"
          className="mt-2"
        />
      </Card>
      <Grid numItemsSm={2} className="gap-x-4 gap-y-4 mt-4">
        {categories.map((item) => (
          <Card key={item.title}>
            <Metric className="mt-2">{item.metric}</Metric>
            <Text>{item.title}</Text>
          </Card>
        ))}
      </Grid>

      <Button size="sm" icon={LogoIcon} iconPosition="right">
        View details
      </Button>
    </Card>
  );
};
