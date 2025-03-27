"use client";
import React from "react";

interface BaseTooltipProps {
  title: string;
  children: React.ReactNode;
}

export const BaseTooltip: React.FC<BaseTooltipProps> = ({
  title,
  children,
}) => (
  <div className="bg-primaryBg dark:bg-primaryBgDark border border-mainBorder dark:border-mainBorderDark shadow-sm rounded-md text-sm">
    <div className="text-sm text-primaryText border-b border-mainBorder dark:border-mainBorderDark w-full px-4 py-3 mb-2">
      {title}
    </div>
    <div className="p-1"> {children}</div>
  </div>
);
