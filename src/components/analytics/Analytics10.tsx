import {
  Card,
  Title,
  Bold,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanels,
  TabPanel,
  Button,
  Flex,
  BarList,
  Grid,
} from "@tremor/react";

// import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { LogoIcon } from "../../assets/icons/LogoIcon";
import React, { useState } from "react";

const Runners = {
  Chris: "Chris",
  Severin: "Severin",
  Achilleas: "Achilleas",
};

const data = [
  {
    name: "Chris",
    session: [
      { name: "Long runs", value: 56 },
      { name: "Fartlek runs", value: 45 },
      { name: "Recover runs", value: 34 },
      { name: "Runs with Lena", value: 12 },
      { name: "Functional strength", value: 10 },
    ],
    time: [
      { name: "Long runs", value: 120.9 },
      { name: "Fartlek runs", value: 63.6 },
      { name: "Recover runs", value: 41.3 },
      { name: "Runs with Lena", value: 6.2 },
      { name: "Functional strength", value: 6.1 },
    ],
    bpm: [
      { name: "Long runs", value: 162 },
      { name: "Fartlek runs", value: 172 },
      { name: "Recover runs", value: 142 },
      { name: "Runs with Lena", value: 165 },
      { name: "Functional strength", value: 128 },
    ],
    km: [
      { name: "Long runs", value: 1243.45 },
      { name: "Fartlek runs", value: 342.32 },
      { name: "Recover runs", value: 278.12 },
      { name: "Runs with Lena", value: 190.04 },
      { name: "Functional strength", value: 0 },
    ],
  },
  {
    name: "Severin",
    session: [
      { name: "Long runs", value: 32 },
      { name: "Fartlek runs", value: 53 },
      { name: "Recover runs", value: 27 },
      { name: "Runs with Sophia", value: 21 },
      { name: "Functional strength", value: 8 },
    ],
    time: [
      { name: "Long runs", value: 90.5 },
      { name: "Fartlek runs", value: 70.6 },
      { name: "Recover runs", value: 120.7 },
      { name: "Runs with Sophia", value: 20.6 },
      { name: "Functional strength", value: 30.2 },
    ],
    bpm: [
      { name: "Long runs", value: 172 },
      { name: "Fartlek runs", value: 146 },
      { name: "Recover runs", value: 138 },
      { name: "Runs with Sophia", value: 156 },
      { name: "Functional strength", value: 121 },
    ],
    km: [
      { name: "Long runs", value: 1432.75 },
      { name: "Fartlek runs", value: 267.32 },
      { name: "Recover runs", value: 321.92 },
      { name: "Runs with Sophia", value: 210.73 },
      { name: "Functional strength", value: 120.05 },
    ],
  },
  {
    name: "Achilleas",
    session: [
      { name: "Long runs", value: 46 },
      { name: "Fartlek runs", value: 28 },
      { name: "Recover runs", value: 21 },
      { name: "Runs with Lexi", value: 56 },
      { name: "Functional strength", value: 27 },
    ],
    time: [
      { name: "Long runs", value: 110.9 },
      { name: "Fartlek runs", value: 45.6 },
      { name: "Recover runs", value: 32.3 },
      { name: "Runs with Lexi", value: 32.2 },
      { name: "Functional strength", value: 10.5 },
    ],
    bpm: [
      { name: "Long runs", value: 177 },
      { name: "Fartlek runs", value: 158 },
      { name: "Recover runs", value: 132 },
      { name: "Runs with Lexi", value: 155 },
      { name: "Functional strength", value: 134 },
    ],
    km: [
      { name: "Long runs", value: 1103.63 },
      { name: "Fartlek runs", value: 342.32 },
      { name: "Recover runs", value: 278.12 },
      { name: "Runs with Lexi", value: 190.04 },
      { name: "Functional strength", value: 0 },
    ],
  },
];

const valueFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export const Analytics10 = () => {
  const [activeRunner, setActiveRunner] = useState(Runners.Chris);

  const selectedData = data.find((runner) => runner.name === activeRunner);

  return (
    <Card>
      <Title> Activity Overview</Title>

      <TabGroup className="mt-8">
        <TabList variant="solid">
          <Tab>Chris</Tab>
          <Tab>Severin</Tab>
          <Tab>Achilleas</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {data
              .filter((item) => item.name === "Chris")
              .map((item) => (
                <Grid
                  key={item.name}
                  numItemsMd={2}
                  className="gap-x-8 gap-y-2 mt-6"
                >
                  <div>
                    <Text className="mt-8">
                      <Bold>Activity by session (#)</Bold>
                    </Text>
                    <BarList
                      className="mt-4"
                      data={item.session}
                      valueFormatter={valueFormatter}
                    />
                  </div>
                  <div>
                    <Text className="mt-8">
                      <Bold>Activity by time (h)</Bold>
                    </Text>
                    <BarList
                      className="mt-4"
                      data={item.time}
                      valueFormatter={valueFormatter}
                    />
                  </div>
                  <div>
                    <Text className="mt-8">
                      <Bold>Activity by heart rate (bpm)</Bold>
                    </Text>
                    <BarList
                      className="mt-4"
                      data={item.bpm}
                      valueFormatter={valueFormatter}
                    />
                  </div>
                  <div>
                    <Text className="mt-8">
                      <Bold>Activity by distance (km)</Bold>
                    </Text>
                    <BarList
                      className="mt-4"
                      data={item.km}
                      valueFormatter={valueFormatter}
                    />
                  </div>
                </Grid>
              ))}
          </TabPanel>
          <TabPanel>
            {data
              .filter((item) => item.name === "Severin")
              .map((item) => (
                <Grid
                  key={item.name}
                  numItemsMd={2}
                  className="gap-x-8 gap-y-2 mt-6"
                >
                  <div>
                    <Text className="mt-8">
                      <Bold>Activity by session (#)</Bold>
                    </Text>
                    <BarList
                      className="mt-4"
                      data={item.session}
                      valueFormatter={valueFormatter}
                    />
                  </div>
                  <div>
                    <Text className="mt-8">
                      <Bold>Activity by time (h)</Bold>
                    </Text>
                    <BarList
                      className="mt-4"
                      data={item.time}
                      valueFormatter={valueFormatter}
                    />
                  </div>
                  <div>
                    <Text className="mt-8">
                      <Bold>Activity by heart rate (bpm)</Bold>
                    </Text>
                    <BarList
                      className="mt-4"
                      data={item.bpm}
                      valueFormatter={valueFormatter}
                    />
                  </div>
                  <div>
                    <Text className="mt-8">
                      <Bold>Activity by distance (km)</Bold>
                    </Text>
                    <BarList
                      className="mt-4"
                      data={item.km}
                      valueFormatter={valueFormatter}
                    />
                  </div>
                </Grid>
              ))}
          </TabPanel>
          <TabPanel>
            {data
              .filter((item) => item.name === "Achilleas")
              .map((item) => (
                <Grid
                  key={item.name}
                  numItemsMd={2}
                  className="gap-x-8 gap-y-2 mt-6"
                >
                  <div>
                    <Text className="mt-8">
                      <Bold>Activity by session (#)</Bold>
                    </Text>
                    <BarList
                      className="mt-4"
                      data={item.session}
                      valueFormatter={valueFormatter}
                    />
                  </div>
                  <div>
                    <Text className="mt-8">
                      <Bold>Activity by time (h)</Bold>
                    </Text>
                    <BarList
                      className="mt-4"
                      data={item.time}
                      valueFormatter={valueFormatter}
                    />
                  </div>
                  <div>
                    <Text className="mt-8">
                      <Bold>Activity by heart rate (bpm)</Bold>
                    </Text>
                    <BarList
                      className="mt-4"
                      data={item.bpm}
                      valueFormatter={valueFormatter}
                    />
                  </div>
                  <div>
                    <Text className="mt-8">
                      <Bold>Activity by distance (km)</Bold>
                    </Text>
                    <BarList
                      className="mt-4"
                      data={item.km}
                      valueFormatter={valueFormatter}
                    />
                  </div>
                </Grid>
              ))}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
};
