// import GithubFillIcon from 'remixicon-react/GithubFillIcon';
// import YoutubeFillIcon from 'remixicon-react/YoutubeFillIcon';
// import GoogleFillIcon from 'remixicon-react/GoogleFillIcon';
// import RedditFillIcon from 'remixicon-react/RedditFillIcon';
// import TwitterFillIcon from 'remixicon-react/TwitterFillIcon';
// import NpmjsFillIcon from 'remixicon-react/NpmjsFillIcon';
// import MediumFillIcon from 'remixicon-react/MediumFillIcon';
// import MailFillIcon from 'remixicon-react/MailFillIcon';
import { LogoIcon } from "../../assets/icons/LogoIcon";
import {
  Title,
  Text,
  Card,
  Flex,
  Dropdown,
  DropdownItem,
  Bold,
  BarList,
} from "@tremor/react";

import { JSXElementConstructor, useEffect, useState } from "react";

const categories = [
  { key: "all", name: "All" },
  { key: "socials", name: "Socials" },
  { key: "blogs", name: "Blogs" },
  { key: "devTools", name: "Dev Tools" },
  { key: "organic", name: "Organic" },
];

interface VisitsData {
  name: string;
  value: number;
  category: string;
  icon: JSXElementConstructor<any>;
}

const visits: VisitsData[] = [
  {
    name: "Google",
    value: 456,
    category: "organic",
    icon: LogoIcon,
  },
  {
    name: "GitHub",
    value: 271,
    category: "devTools",
    icon: LogoIcon,
  },
  {
    name: "Twitter",
    value: 191,
    category: "socials",
    icon: LogoIcon,
  },
  {
    name: "Reddit",
    value: 185,
    category: "socials",
    icon: LogoIcon,
  },
  {
    name: "NPM",
    value: 179,
    category: "devTools",
    icon: LogoIcon,
  },
  {
    name: "Youtube",
    value: 91,
    category: "socials",
    icon: LogoIcon,
  },
  {
    name: "Medium",
    value: 42,
    category: "blogs",
    icon: LogoIcon,
  },
  {
    name: "DEV.to",
    value: 21,
    category: "blogs",
    icon: LogoIcon,
  },
  {
    name: "Medium",
    value: 42,
    category: "blogs",
    icon: LogoIcon,
  },
];

const filterByCategory = (category: string, data: VisitsData[]) =>
  category === "all" ? data : data.filter((item) => item.category === category);

export const Analytics4 = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredData, setFilteredData] = useState(visits);

  useEffect(() => {
    setFilteredData(filterByCategory(selectedCategory, visits));
  }, [selectedCategory]);

  return (
    <Card maxWidth="max-w-full">
      <div className="min-h-[505px]">
        <Flex spaceX="space-x-8">
          <Title>Sources</Title>
          <Dropdown
            handleSelect={(value) => setSelectedCategory(value)}
            placeholder="Source Selection"
            maxWidth="max-w-xs"
          >
            {categories.map((category) => (
              <div className="mb-4" key={category.key}>
                <DropdownItem value={category.key} text={category.name} />
              </div>
            ))}
          </Dropdown>
        </Flex>
        <Flex marginTop="mt-8">
          <Text>
            <Bold>Source</Bold>
          </Text>
          <Text>
            <Bold>Visits</Bold>
          </Text>
        </Flex>
        <BarList data={filteredData} showAnimation={false} marginTop="mt-4" />
      </div>
    </Card>
  );
};
