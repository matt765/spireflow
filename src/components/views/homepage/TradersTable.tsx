"use client";

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

interface Trader {
  name: string;
  leads: number;
  sales: string;
  quota: string;
  variance: string;
  region: string;
  status: string;
  deltaType: DeltaType;
}

interface TradersTableProps {
  tradersTableData: Trader[];
}

export const TradersTable = ({ tradersTableData }: TradersTableProps) => {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const isSalesPersonSelected = (traderData: Trader) =>
    selectedNames.includes(traderData.name) || selectedNames.length === 0;

  return (
    <Card className="min-h-[30rem]">
      <MultiSelect
        onValueChange={setSelectedNames}
        placeholder="Select Salespeople..."
        className="max-w-xs "
      >
        {tradersTableData.map((item) => (
          <MultiSelectItem key={item.name} value={item.name}>
            {item.name}
          </MultiSelectItem>
        ))}
      </MultiSelect>
      <Table className="mt-6">
        <TableHead>
          <TableRow className="text-primaryText">
            <TableHeaderCell className=" text-secondaryText">
              Name
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-secondaryText">
              Leads
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-secondaryText">
              Sales ($)
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-secondaryText">
              Quota ($)
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-secondaryText">
              Variance
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-secondaryText">
              Region
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-secondaryText">
              Status
            </TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tradersTableData
            .filter((item) => isSalesPersonSelected(item))
            .map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right ">{item.leads}</TableCell>
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
