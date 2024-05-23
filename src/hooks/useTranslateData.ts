import { useMemo } from "react";

type Translations = { [key: string]: string };

// This hook takes data object from backend, finds english words and replaces them with translations
// Alternative to this approach is implementing i18 also on backend side, with double tables in database

export const useTranslateData = <T extends Record<string, any>>(
  data: T[],
  translations: Translations
): T[] => {
  const translate = (item: any): any => {
    if (Array.isArray(item)) {
      return item.map((innerItem) => translate(innerItem));
    } else if (item !== null && typeof item === "object") {
      const newItem: Record<string, any> = {};
      Object.keys(item).forEach((key) => {
        const newKey = translations[key] || key;
        newItem[newKey] = translate((item as Record<string, any>)[key]);
      });
      return newItem;
    } else if (typeof item === "string") {
      return Object.entries(translations).reduce((acc, [key, value]) => {
        return acc.replace(new RegExp(`\\b${key}\\b`, "g"), value);
      }, item);
    } else {
      return item;
    }
  };

  return useMemo(
    () => data.map(translate as (item: T) => T),
    [data, translations]
  );
};
