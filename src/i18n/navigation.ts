import { createNavigation } from "next-intl/navigation";

export const locales = ["en", "pl"] as const;
export const localePrefix = "as-needed";
export const defaultLocale = "en";
export type Locale = (typeof locales)[number];

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  localePrefix,
  defaultLocale,
});
