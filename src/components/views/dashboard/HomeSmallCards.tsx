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

const chartData = [
  // Data for Daily Sales (Last 3 weeks)
  [
    { date: "08.10.23", Metric: 445 },
    { date: "11.10.23", Metric: 743 },
    { date: "14.10.23", Metric: 488 },
    { date: "17.10.23", Metric: 788 },
    { date: "20.10.23", Metric: 1488 },
    { date: "23.10.23", Metric: 2088 },
    { date: "26.10.23", Metric: 1188 },
    { date: "29.10.23", Metric: 420 },
    { date: "01.11.23", Metric: 650 },
  ],
  // Data for Monthly Product Profit (Total profit for the last month across specific days)
  [
    { date: "02.10.23", Metric: 2850 },
    { date: "06.10.23", Metric: 4150 },
    { date: "10.10.23", Metric: 2350 },
    { date: "14.10.23", Metric: 1950 },
    { date: "18.10.23", Metric: 3150 },
    { date: "22.10.23", Metric: 2550 },
    { date: "26.10.23", Metric: 4350 },
    { date: "30.10.23", Metric: 3450 },
    { date: "01.11.23", Metric: 4850 },
  ],
  // Data for Traffic (Yesterday segmented every few hours)
  [
    { date: "26.10.23 00:00", Metric: 3100 },
    { date: "26.10.23 03:00", Metric: 3900 },
    { date: "26.10.23 06:00", Metric: 2700 },
    { date: "26.10.23 09:00", Metric: 4300 },
    { date: "26.10.23 12:00", Metric: 4500 },
    { date: "26.10.23 15:00", Metric: 1800 },
    { date: "26.10.23 18:00", Metric: 2600 },
    { date: "26.10.23 21:00", Metric: 3200 },
    { date: "26.10.23 23:59", Metric: 2300 },
  ],
  // Data for Customers (Last month's data)
  [
    { date: "02.10.23", Metric: 1050 },
    { date: "06.10.23", Metric: 1780 },
    { date: "10.10.23", Metric: 890 },
    { date: "14.10.23", Metric: 1520 },
    { date: "18.10.23", Metric: 980 },
    { date: "22.10.23", Metric: 1210 },
    { date: "26.10.23", Metric: 440 },
    { date: "30.10.23", Metric: 730 },
    { date: "01.11.23", Metric: 1390 },
]

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
    title: "Traffic",
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

export const HomeSmallCards = () => {
  return (
    <>
      {categories.map((item, index) => {
        const chartArray = chartData[index];
        return (
          <Card key={`${item.title}-${index}`} className="h-46 sm:h-28 lg:h-32">
            <div className="flex small-box max-[420px]:-ml-3 flex-col sm:flex-row">
              <div className="flex flex-col  w-full sm:w-1/2 gap-1 pl-1 sm:pl-0">
                <div className="flex flex-row lg:flex-col">
                  <div className="text-[#a3aed0] font-medium text-md sm:text-lg lg:text-sm tracking-tight flex sm:block items-center lg:mr-0 mr-2 mb-1">
                    {item.title}
                  </div>
                  <div className="text-md sm:text-lg xl:text-xl font-medium text-primaryText dark:text-primaryTextDark flex">
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

              <div className="w-full sm:w-1/2 sm:pl-3 ml-2 2xl:ml-0 sm:flex mt-4 sm:mt-0 pr-2 sm:pr-0">
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
    index={Object.keys(chartData[0])[0]}
    categories={["Metric"]}
    colors={[color]}
    showLegend={false}
    className="h-16"
    showTooltip={false}
    showXAxis={false}
    showYAxis={false}
  />
);
