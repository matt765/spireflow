import "dotenv/config";
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

import "../../styles/globals.css";
import { inter, nunito } from "../../styles/fonts";
import { Providers } from "../../services/providers";
import { NextIntlClientProvider, useMessages } from "next-intl";
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
    <html lang={locale}>
      <body className={`${inter.className}`}>
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
    "Open-source e-commerce dashboard built with Next.js and TypeScript.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
