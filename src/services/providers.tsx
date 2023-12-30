"use client";

import { ThemeProvider } from "next-themes";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../layout/Layout";
import { client } from "./apolloClient";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ApolloProvider client={client}>
        <ThemeProvider attribute="class">         
          <Layout>{children}</Layout>
        </ThemeProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
