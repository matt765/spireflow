import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./i18n/navigation";

export default createMiddleware({
  // A list of all locales that are supported
  localePrefix,
  locales,
  // Used when no locale matches
  defaultLocale: "en",
  localeDetection: false,
});


export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(pl|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};