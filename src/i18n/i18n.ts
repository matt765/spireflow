import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { locales } from "./navigation";
import type { Locale } from "./navigation";

type RequestConfig = {
  locale: string;
  messages: Record<string, string>;
};

export default getRequestConfig(
  async ({ requestLocale }): Promise<RequestConfig> => {
    const locale = await requestLocale;

    if (!locale || !locales.includes(locale as Locale)) {
      notFound();
    }

    return {
      locale: locale,
      messages: (await import(`../../messages/${locale}.json`)).default,
    };
  }
);
