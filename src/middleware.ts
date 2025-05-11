import type { NextFetchEvent, NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";

import { locales, localePrefix, defaultLocale } from "./i18n/navigation";

const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection: false,
});

const isPublicRoute = createRouteMatcher([
  "/login(.*)",
  "/register(.*)",
  "/:locale/login(.*)",
  "/:locale/register(.*)",
]);

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  // Check if Clerk environment variables are present
  const hasClerkEnvs =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.CLERK_SECRET_KEY;

  // If Clerk envs are missing, skip Clerk middleware and just handle i18n
  if (!hasClerkEnvs) {
    return handleI18nRouting(request);
  }

  return clerkMiddleware(async (auth, req) => {
    // Uncomment this code if you want to protect all routes except the public ones
    // I commented it out for demo purposes

    // if (!isPublicRoute(req)) {
    //   const locale = req.nextUrl.pathname.match(/^\/([a-z]{2})\//)?.at(1) || "";
    //   const signInUrl = new URL(`/${locale ? locale + "/" : ""}login`, req.url);
    //   await auth.protect({
    //     unauthenticatedUrl: signInUrl.toString(),
    //   });
    // }

    return handleI18nRouting(request);
  })(request, event);
}

export const config = {
  matcher: "/((?!_next|_vercel|api|trpc|.*\\..*).*)",
};
