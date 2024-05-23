"use client";

import { ThemeProvider } from "next-themes";
import { ApolloProvider } from "@apollo/client";

import { Layout } from "../layout/Layout";
import { client } from "./apolloClient";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider
        enableSystem={false}
        attribute="class"
        themes={[
          "charcoal",
          "prismatic",
          "light",
          "dark",
          "oceanic",
          "sapphire",
          "sandstone",
        ]}
        defaultTheme="prismatic"
        disableTransitionOnChange
      >
        <Layout>{children}</Layout>
      </ThemeProvider>
    </ApolloProvider>
  );
}
