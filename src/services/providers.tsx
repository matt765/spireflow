"use client";

import { ThemeProvider } from "next-themes";
import { ApolloProvider } from "@apollo/client";
import { ClerkProvider } from "@clerk/nextjs";

import { Layout } from "../layout/Layout";
import { client } from "./apolloClient";

export const THEMES_ARRAY = ["snowlight", "midnight", "charcoal", "obsidian"];

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ApolloProvider client={client}>
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          themes={THEMES_ARRAY}
          defaultTheme="obsidian"
          disableTransitionOnChange
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </ApolloProvider>
    </ClerkProvider>
  );
};
