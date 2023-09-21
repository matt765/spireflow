import {
  Card,
  Title,
  Text,
  LineChart,
  TabList,
  Tab,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";

const data = {
  relative: [
    {
      Date: "01.01.2021",
      "Customer Churn": 6.2,
    },
    {
      Date: "02.01.2021",
      "Customer Churn": 5.7,
    },
    {
      Date: "03.01.2021",
      "Customer Churn": 5.8,
    },
    {
      Date: "04.01.2021",
      "Customer Churn": 6.5,
    },
    {
      Date: "05.01.2021",
      "Customer Churn": 6.9,
    },
    {
      Date: "06.01.2021",
      "Customer Churn": 5.4,
    },
    {
      Date: "07.01.2021",
      "Customer Churn": 5.3,
    },
    {
      Date: "08.01.2021",
      "Customer Churn": 6.0,
    },
    {
      Date: "09.01.2021",
      "Customer Churn": 5.5,
    },
    {
      Date: "10.01.2021",
      "Customer Churn": 6.1,
    },
    {
      Date: "11.01.2021",
      "Customer Churn": 5.2,
    },
    {
      Date: "12.01.2021",
      "Customer Churn": 6.3,
    },
    {
      Date: "13.01.2021",
      "Customer Churn": 6.4,
    },
    {
      Date: "14.01.2021",
      "Customer Churn": 5.1,
    },
    {
      Date: "15.01.2021",
      "Customer Churn": 6.7,
    },
    {
      Date: "16.01.2021",
      "Customer Churn": 6.6,
    },
    {
      Date: "17.01.2021",
      "Customer Churn": 6.8,
    },
    {
      Date: "18.01.2021",
      "Customer Churn": 5.6,
    },
    {
      Date: "19.01.2021",
      "Customer Churn": 5.9,
    },
    {
      Date: "20.01.2021",
      "Customer Churn": 6.2,
    },
    {
      Date: "21.01.2021",
      "Customer Churn": 9.1,
    },
    {
      Date: "22.01.2021",
      "Customer Churn": 8.7,
    },
    {
      Date: "23.01.2021",
      "Customer Churn": 8.2,
    },
    {
      Date: "24.01.2021",
      "Customer Churn": 9.8,
    },
    {
      Date: "25.01.2021",
      "Customer Churn": 9.5,
    },
    {
      Date: "26.01.2021",
      "Customer Churn": 8.9,
    },
    {
      Date: "27.01.2021",
      "Customer Churn": 9.3,
    },
    {
      Date: "28.01.2021",
      "Customer Churn": 8.4,
    },
    {
      Date: "29.01.2021",
      "Customer Churn": 9.0,
    },
    {
      Date: "30.01.2021",
      "Customer Churn": 9.2,
    },
    {
      Date: "31.01.2021",
      "Customer Churn": 8.5,
    },

    {
      Date: "01.02.2021",
      "Customer Churn": 8.82,
    },
  ],
  absolute: [
    {
      Date: "01.01.2021",
      "Customer Churn": 57.6,
    },
    {
      Date: "02.01.2021",
      "Customer Churn": 55.68,
    },
    {
      Date: "03.01.2021",
      "Customer Churn": 56.32,
    },
    {
      Date: "04.01.2021",
      "Customer Churn": 58.88,
    },
    {
      Date: "05.01.2021",
      "Customer Churn": 60.16,
    },
    {
      Date: "06.01.2021",
      "Customer Churn": 55.04,
    },
    {
      Date: "07.01.2021",
      "Customer Churn": 54.4,
    },
    {
      Date: "08.01.2021",
      "Customer Churn": 56.96,
    },
    {
      Date: "09.01.2021",
      "Customer Churn": 55.68,
    },
    {
      Date: "10.01.2021",
      "Customer Churn": 58.24,
    },
    {
      Date: "11.01.2021",
      "Customer Churn": 53.76,
    },
    {
      Date: "12.01.2021",
      "Customer Churn": 58.88,
    },
    {
      Date: "13.01.2021",
      "Customer Churn": 59.52,
    },
    {
      Date: "14.01.2021",
      "Customer Churn": 53.12,
    },
    {
      Date: "15.01.2021",
      "Customer Churn": 60.8,
    },
    {
      Date: "16.01.2021",
      "Customer Churn": 60.16,
    },
    {
      Date: "17.01.2021",
      "Customer Churn": 61.44,
    },
    {
      Date: "18.01.2021",
      "Customer Churn": 55.68,
    },
    {
      Date: "19.01.2021",
      "Customer Churn": 56.32,
    },
    {
      Date: "20.01.2021",
      "Customer Churn": 57.6,
    },
    {
      Date: "21.01.2021",
      "Customer Churn": 73.6,
    },
    {
      Date: "22.01.2021",
      "Customer Churn": 72.32,
    },
    {
      Date: "23.01.2021",
      "Customer Churn": 71.04,
    },
    {
      Date: "24.01.2021",
      "Customer Churn": 75.52,
    },
    {
      Date: "25.01.2021",
      "Customer Churn": 75.2,
    },
    {
      Date: "26.01.2021",
      "Customer Churn": 72.96,
    },
    {
      Date: "27.01.2021",
      "Customer Churn": 74.24,
    },
    {
      Date: "28.01.2021",
      "Customer Churn": 71.68,
    },
    {
      Date: "29.01.2021",
      "Customer Churn": 73.6,
    },
    {
      Date: "30.01.2021",
      "Customer Churn": 74.24,
    },
    {
      Date: "31.01.2021",
      "Customer Churn": 72.32,
    },
    {
      Date: "01.02.2021",
      "Customer Churn": 69.12,
    },
  ],
};

const valueFormatterRelative = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}%`;

const valueFormatterAbsolute = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export const Dash2 = () => {
  return (
    <Card className="h-full">
      <TabGroup>
        <div className="block sm:flex sm:justify-between">
          <div>
            <Title>Churn Rate</Title>
            <Text>Lost customers per day</Text>
          </div>
          <div className="mt-4 sm:mt-0">
            <TabList variant="solid">
              <Tab>relative</Tab>
              <Tab>absolute</Tab>
            </TabList>
          </div>
        </div>
        <TabPanels>
          <TabPanel>
            <LineChart
              className="mt-8 h-80"
              data={data.relative}
              index="Date"
              categories={["Customer Churn"]}
              colors={["blue"]}
              showLegend={false}
              valueFormatter={valueFormatterRelative}
              yAxisWidth={40}
            />
          </TabPanel>
          <TabPanel>
            <LineChart
              className="mt-8 h-80"
              data={data.absolute}
              index="Date"
              categories={["Customer Churn"]}
              colors={["blue"]}
              showLegend={false}
              valueFormatter={valueFormatterAbsolute}
              yAxisWidth={40}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
};
