"use client";

import { ThemeProvider } from "next-themes";
import { ApolloProvider } from "@apollo/client";

import { Layout } from "../layout/Layout";
import { client } from "./apolloClient";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider
        enableSystem={false}
        attribute="class"
        themes={["snowlight", "midnight", "charcoal", "obsidian"]}
        defaultTheme="obsidian"
        disableTransitionOnChange
      >
        <Layout>{children}</Layout>
      </ThemeProvider>
    </ApolloProvider>
  );
};
