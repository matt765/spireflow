import { useState } from 'react';

import {
    Title,
    Text,
    Card,
    Flex,
    Tab,
    TabList,
    Bold,
    BarList,
} from '@tremor/react';

// import {
//     CodeIcon,
//     TableIcon,
// } from '@heroicons/react/solid';
import { LogoIcon } from "../../assets/icons/LogoIcon";

const categories = [
    { key: 'developers', name: 'Developers', icon: LogoIcon },
    { key: 'analysts', name: 'Analysts', icon: LogoIcon },
];

const developerVisits = [
    { name: '/home', value: 652 },
    { name: '/about', value: 134 },
    { name: '/docs', value: 542 },
    { name: '/tempates', value: 234 },
    { name: '/terms', value: 12 },
    { name: '/refund', value: 7 },
];

const analystVisits = [
    { name: '/home', value: 456 },
    { name: '/about', value: 271 },
    { name: '/docs', value: 46 },
    { name: '/templates', value: 191 },
    { name: '/terms', value: 82 },
    { name: '/refund', value: 15 },
];

const visits: { [key: string]: any } = {
    developers: developerVisits,
    analysts: analystVisits,
};

const sortData = (data: any[]) => data.sort((a, b) => {
    if (a.value < b.value) return 1;
    if (a.value > b.value) return -1;
    return 0;
});

export const Analytics5 = () => {
    const [selectedCategory, setSelectedCategory] = useState(categories[0].key);

    return (
        <Card maxWidth="max-w-md">
            <Title>Page Visits by Audience</Title>
            <TabList
                handleSelect={ (value) => setSelectedCategory(value) }
                defaultValue={ selectedCategory }
                marginTop="mt-6"
            >
                { categories.map((category) => (
                    <Tab
                        key={ category.key }
                        value={ category.key }
                        icon={ category.icon }
                        text={ category.name }
                    />
                )) }
            </TabList>
            <Flex marginTop="mt-6">
                <Text><Bold>Site</Bold></Text>
                <Text><Bold>Visits</Bold></Text>
            </Flex>
            <BarList
                data={ sortData(visits[selectedCategory]) }
                showAnimation={ false }
                marginTop="mt-4"
            />
        </Card>

    );
}