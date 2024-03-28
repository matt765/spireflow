import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./i18n/navigation";
import { sessionOptions } from "./services/ironSessionConfig";

interface SessionData {
  isLoggedIn: boolean;
}

// Define your protected routes
const protectedRoutes = [
  "/pl",
  "/orders",
  "pl/orders",
  "customers",
  "pl/customers",
  "/products",
  "/pl/products",
  "/analytics",
  "/pl/analytics",
  "/calendar",
  "/pl/calendar",
  "/area",
  "/pl/area",
  "/bars",
  "/pl/bars",
  "/scatter",
  "/pl/scatter",
  "/line",
  "/pl/line",
];

export async function middleware(req: NextRequest) {
  // Middleware for protected routes is disabled for demo purposes
  // Uncomment the following code to enable it

  // if (
  //   req.nextUrl.pathname === "/" ||
  //   req.nextUrl.pathname === "/pl" ||
  //   protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  // ) {
  //   console.log(
  //     "[Middleware] Accessing protected route:",
  //     req.nextUrl.pathname
  //   );

  //   const session = (await getIronSession(
  //     cookies(),
  //     sessionOptions
  //   )) as unknown as SessionData;
  //   console.log("[Middleware] Session state:", session);

  //   if (!session.isLoggedIn) {
  //     console.log(
  //       "[Middleware] Redirecting to login due to lack of authentication."
  //     );
  //     const url = req.nextUrl.clone();
  //     url.pathname = "/login";
  //     return NextResponse.redirect(url);
  //   }
  // }

  const i18nResponse = createMiddleware({
    localePrefix,
    locales,
    defaultLocale: "en",
    localeDetection: false,
  })(req);

  if (i18nResponse instanceof NextResponse) {
    return i18nResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(pl|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
