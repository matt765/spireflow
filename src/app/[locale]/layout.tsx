import "dotenv/config";
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, useMessages } from "next-intl";

import "../../styles/globals.css";
import {
  inter,
  nunito,
  plusJakartaSans,
  publicSans,
  poppins,
} from "../../styles/fonts";
import { Providers } from "../../services/providers";
import { locales } from "../../i18n/navigation";

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={`${poppins.className}`} suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Spireflow",
  description:
    "Open source and free e-commerce dashboard template, written in NextJS and Tailwind",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
