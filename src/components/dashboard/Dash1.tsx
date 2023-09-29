import {
  Card,
  Metric,
  Text,
  Flex,
  BadgeDelta,
  DeltaType,
  BarChart,
  Color,
} from "@tremor/react";

const chartData: {}[][] = [
  [
    {
      "Number of threatened species": 445,
    },
    {
      "Number of threatened species": 743,
    },
    {
      "Number of threatened species": 488,
    },
    {
      "Number of threatened species": 788,
    },
    {
      "Number of threatened species": 1488,
    },
    {
      "Number of threatened species": 2088,
    },
    {
      "Number of threatened species": 1188,
    },
    {
      "Number of threatened species": 1445,
    },
    {
      "Number of threatened species": 743,
    },
  ],
  [
    {
      "Number of threatened species": 145,
    },
    {
      "Number of threatened species": 343,
    },
    {
      "Number of threatened species": 988,
    },
    {
      "Number of threatened species": 788,
    },
    {
      "Number of threatened species": 488,
    },
    {
      "Number of threatened species": 288,
    },
    {
      "Number of threatened species": 188,
    },
    {
      "Number of threatened species": 144,
    },
    {
      "Number of threatened species": 443,
    },
  ],
  [
    {
      "Number of threatened species": 45,
    },
    {
      "Number of threatened species": 143,
    },
    {
      "Number of threatened species": 488,
    },
    {
      "Number of threatened species": 588,
    },
    {
      "Number of threatened species": 188,
    },
    {
      "Number of threatened species": 188,
    },
    {
      "Number of threatened species": 688,
    },
    {
      "Number of threatened species": 145,
    },
    {
      "Number of threatened species": 243,
    },
  ],
  [
    {
      "Number of threatened species": 545,
    },
    {
      "Number of threatened species": 643,
    },
    {
      "Number of threatened species": 488,
    },
    {
      "Number of threatened species": 188,
    },
    {
      "Number of threatened species": 488,
    },
    {
      "Number of threatened species": 208,
    },
    {
      "Number of threatened species": 188,
    },
    {
      "Number of threatened species": 445,
    },
    {
      "Number of threatened species": 743,
    },
  ],
];

const categories: {
  title: string;
  metric: string;
  metricPrev: string;
  delta: string;
  deltaType: DeltaType;
  color: Color;
  increased: boolean;
  changeValue: number;
  changeText: string;
}[] = [
  {
    title: "Sales",
    metric: "$12,699",
    metricPrev: "$ 9,456",
    delta: "34.3%",
    deltaType: "moderateIncrease",
    color: "purple",
    increased: true,
    changeValue: 12.5,
    changeText: "Last 3 weeks",
  },
  {
    title: "Profit",
    metric: "$40,598",
    metricPrev: "$ 45,564",
    delta: "10.9%",
    deltaType: "moderateDecrease",
    color: "cyan",
    increased: true,
    changeValue: 36.5,
    changeText: "Last month",
  },
  {
    title: "Customers",
    metric: "1,072",
    metricPrev: "856",
    delta: "25.3%",
    deltaType: "moderateIncrease",
    color: "purple",
    increased: false,
    changeValue: 5.4,
    changeText: "Yesterday",
  },
  {
    title: "Customers",
    metric: "1,072",
    metricPrev: "856",
    delta: "25.3%",
    deltaType: "moderateIncrease",
    color: "cyan",
    increased: true,
    changeValue: 22.7,
    changeText: "Last week",
  },
];

export const Dash1 = () => {
  return (
    <>
      {categories.map((item, index) => {
        const chartArray = chartData[index];
        return (
          <Card key={`${item.title}-${index}`} className="h-32">
            <div className="flex small-box max-[420px]:-ml-3">
              <div className="flex flex-col  w-1/2 gap-1">
                <div className="flex flex-row lg:flex-col">
                  <div className="text-[#a3aed0] font-medium text-lg lg:text-sm tracking-tight flex sm:block items-center lg:mr-0 mr-2 mb-1">
                    {item.title}
                  </div>
                  <div className="text-lg xl:text-xl font-medium text-primaryText dark:text-primaryTextDark flex">
                    {item.metric}
                  </div>
                </div>

                <div className="flex">
                  {item.increased ? (
                    <div className="text-xs text-green-600">
                      +{item.changeValue}%
                    </div>
                  ) : (
                    <div className="text-xs text-red-500">
                      -{item.changeValue}%
                    </div>
                  )}

                  <div className="flex lg:hidden xl:flex text-xs text-gray-400 ml-1 whitespace-nowrap">
                    {item.changeText}
                  </div>
                </div>
              </div>

              <div className="w-1/2 pl-3 ml-2 2xl:ml-0 sm:flex hidden">
                <Chart chartData={chartArray} color={item.color} />
              </div>
            </div>
          </Card>
        );
      })}
    </>
  );
};

interface ChartProps {
  color: Color;
  chartData: {}[];
}

const Chart = ({ color, chartData }: ChartProps) => (
  <BarChart
    data={chartData}
    index="name"
    categories={["Number of threatened species"]}
    colors={[color]}
    showLegend={false}
    className="h-16"
    showTooltip={false}
    showXAxis={false}
    showYAxis={false}
  />
);
