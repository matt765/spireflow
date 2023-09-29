import {
  Card,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  BadgeDelta,
  DeltaType,
  MultiSelect,
  MultiSelectItem,
  } from "@tremor/react";
import { useState } from "react";

type SalesPerson = {
  name: string;
  leads: number;
  sales: string;
  quota: string;
  variance: string;
  region: string;
  status: string;
  deltaType: DeltaType;
};

const salesPeople: SalesPerson[] = [
  {
    name: "Peter Doe",
    leads: 45,
    sales: "1,000,000",
    quota: "1,200,000",
    variance: "low",
    region: "Region A",
    status: "overperforming",
    deltaType: "moderateIncrease",
  },
  {
    name: "Lena Whitehouse",
    leads: 35,
    sales: "900,000",
    quota: "1,000,000",
    variance: "low",
    region: "Region B",
    status: "average",
    deltaType: "unchanged",
  },
  {
    name: "Phil Less",
    leads: 52,
    sales: "930,000",
    quota: "1,000,000",
    variance: "medium",
    region: "Region C",
    status: "underperforming",
    deltaType: "moderateDecrease",
  },
  {
    name: "John Camper",
    leads: 22,
    sales: "390,000",
    quota: "250,000",
    variance: "low",
    region: "Region A",
    status: "overperforming",
    deltaType: "increase",
  },
  {
    name: "Max Balmoore",
    leads: 49,
    sales: "860,000",
    quota: "750,000",
    variance: "low",
    region: "Region B",
    status: "overperforming",
    deltaType: "increase",
  },
  {
    name: "Peter Moore",
    leads: 82,
    sales: "1,460,000",
    quota: "1,500,000",
    variance: "low",
    region: "Region A",
    status: "average",
    deltaType: "unchanged",
  },
  {
    name: "Joe Sachs",
    leads: 49,
    sales: "1,230,000",
    quota: "1,800,000",
    variance: "medium",
    region: "Region B",
    status: "underperforming",
    deltaType: "moderateDecrease",
  },
];

export const Dash6 = () => {
const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const isSalesPersonSelected = (salesPerson: SalesPerson) =>
    selectedNames.includes(salesPerson.name) || selectedNames.length === 0;

  return (
    <Card className="min-h-[30rem]">
      <MultiSelect
        onValueChange={setSelectedNames}
        placeholder="Select Salespeople..."
        className="max-w-xs "
      >
        {salesPeople.map((item) => (
          <MultiSelectItem key={item.name} value={item.name}>
            {item.name}
          </MultiSelectItem>
        ))}
      </MultiSelect>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell className="text-right">Leads</TableHeaderCell>
            <TableHeaderCell className="text-right">Sales ($)</TableHeaderCell>
            <TableHeaderCell className="text-right">Quota ($)</TableHeaderCell>
            <TableHeaderCell className="text-right">Variance</TableHeaderCell>
            <TableHeaderCell className="text-right">Region</TableHeaderCell>
            <TableHeaderCell className="text-right">Status</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {salesPeople
            .filter((item) => isSalesPersonSelected(item))
            .map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{item.leads}</TableCell>
                <TableCell className="text-right">{item.sales}</TableCell>
                <TableCell className="text-right">{item.quota}</TableCell>
                <TableCell className="text-right">{item.variance}</TableCell>
                <TableCell className="text-right">{item.region}</TableCell>
                <TableCell className="text-right">
                  <BadgeDelta deltaType={item.deltaType} size="xs">
                    {item.status}
                  </BadgeDelta>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
};
