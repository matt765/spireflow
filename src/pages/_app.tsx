import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextComponentType } from "next";
import { useEffect } from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "dotenv/config";
import Head from "next/head";

import { Inter, DM_Sans, Poppins, Exo } from "@next/font/google";
import "@fontsource/exo";
import "@fontsource/nunito-sans"; // Defaults to weight 400.
import "@fontsource/jost"; // Defaults to weight 400.

import { useLoginStore } from "../store/loginStore";
import { Layout } from "../layout/Layout";

const inter = Inter({
  weight: "400",
});
const dmSans = DM_Sans({
  weight: "400",
});
const poppins = Poppins({
  weight: "400",
});
const exo = Exo({
  weight: "400",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & {
  Component: NextComponentType;
  pageProps: { session: Session | null };
}) {
  const { initializeUser } = useLoginStore();

  useEffect(() => {
    initializeUser();
  }, []);

  return (
    <SessionProvider session={session}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <style jsx global>
        {`
          :root {
            --inter-font: ${inter.style.fontFamily};
            --dmSans-font: ${dmSans.style.fontFamily};
          }
          html {
            font-family: Inter;
          }
        `}
      </style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
