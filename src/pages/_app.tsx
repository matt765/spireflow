import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@tremor/react/dist/esm/tremor.css";
import { Inter, DM_Sans, Poppins, Exo } from "@next/font/google";
import { Layout } from "../layout/Layout";
import "@fontsource/exo"; 
import "@fontsource/nunito-sans"; // Defaults to weight 400.
import "@fontsource/jost"; // Defaults to weight 400.
import Head from "next/head";
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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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

      <Component {...pageProps} />
    </>
  );
}
