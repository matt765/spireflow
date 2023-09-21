import { useState } from "react";
import {
  Card,
  Title,
  Text,
  Flex,
  TabList,
  Tab,
  Bold,
  BarList,
  TabGroup,
  TabPanels,
  TabPanel,
} from "@tremor/react";

import { LogoIcon } from "../../assets/icons/LogoIcon";

const categories = [
  { key: "developers", name: "Developers", icon: LogoIcon },
  { key: "analysts", name: "Analysts", icon: LogoIcon },
];

const developerVisits = [
  { name: "/home", value: 652 },
  { name: "/about", value: 134 },
  { name: "/docs", value: 542 },
  { name: "/tempates", value: 234 },
  { name: "/terms", value: 12 },
  { name: "/refund", value: 7 },
];

const analystVisits = [
  { name: "/home", value: 456 },
  { name: "/about", value: 271 },
  { name: "/docs", value: 46 },
  { name: "/templates", value: 191 },
  { name: "/terms", value: 82 },
  { name: "/refund", value: 15 },
];

const visits = {
  developers: developerVisits,
  analysts: analystVisits,
};

const sortData = (data: any[]) => data.sort((a, b) => b.value - a.value);

export const Analytics5 = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].key);

  return (
    <Card className="max-w-md">
      <Title>Page Visits by Audience</Title>
      <TabGroup>
        <TabList className="mt-6">
          {categories.map((category) => (
            <Tab key={category.key} value={category.key} icon={category.icon}>
              {category.name}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {categories.map((category) => (
            <TabPanel key={category.key}>
              {selectedCategory === category.key && (
                <>
                  <Flex className="mt-6">
                    <Text>
                      <Bold>Site</Bold>
                    </Text>
                    <Text>
                      <Bold>Visits</Bold>
                    </Text>
                  </Flex>
                </>
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </Card>
  );
};
