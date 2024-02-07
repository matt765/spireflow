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
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useTranslateData } from "../../../hooks/useTranslateData";
import { useBackendTranslations } from "../../../hooks/useBackendTranslations";

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
  const t = useTranslations("homepage.tradersTable");

  const isSalesPersonSelected = (traderData: Trader) =>
    selectedNames.includes(traderData.name) || selectedNames.length === 0;

  const backendTranslations = useBackendTranslations("homepage.tradersTable");
  const translatedData = useTranslateData(
    tradersTableData,
    backendTranslations
  );

  return (
    <Card className="min-h-[30rem]">
      <MultiSelect
        onValueChange={setSelectedNames}
        placeholder={t("selectSalespeople")}
        className="max-w-xs "
        placeholderSearch={t("search")}
      >
        {translatedData.map((item) => (
          <MultiSelectItem key={item.name} value={item.name}>
            {item.name}
          </MultiSelectItem>
        ))}
      </MultiSelect>
      <Table className="mt-6">
        <TableHead>
          <TableRow className="text-primaryText">
            <TableHeaderCell className=" text-secondaryText">
              {t("name")}
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-secondaryText">
              {t("leads")}
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-secondaryText">
              {t("sales")} ($)
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-secondaryText">
              {t("quota")} ($)
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-secondaryText">
              {t("variance")}
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-secondaryText">
              {t("region")}
            </TableHeaderCell>
            <TableHeaderCell className="text-right text-secondaryText">
              {t("status")}
            </TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {translatedData
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
