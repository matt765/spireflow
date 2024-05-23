"use client";

import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  BadgeDelta,
  MultiSelect,
  MultiSelectItem,
} from "@tremor/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useTranslateData } from "../../../hooks/useTranslateData";
import { useBackendTranslations } from "../../../hooks/useBackendTranslations";
import { Trader, TradersTableProps } from "./types";
import { Card } from "../../common/Card";

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
      <div className="w-[15rem] sm:w-[20rem]">
        <MultiSelect
          onValueChange={setSelectedNames}
          placeholder={t("selectSalespeople")}
          className="w-[15rem] sm:w-[20rem]"
          placeholderSearch={t("search")}
        >
          {translatedData.map((item) => (
            <MultiSelectItem key={item.name} value={item.name}>
              {item.name}
            </MultiSelectItem>
          ))}
        </MultiSelect>
      </div>
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
