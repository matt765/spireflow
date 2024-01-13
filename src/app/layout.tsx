import "dotenv/config";

import "../styles/globals.css";
import { inter } from "../styles/fonts";
import { Providers } from "../services/providers";
import { Metadata } from "next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'Spireflow',
  description: 'Open-source e-commerce dashboard built with Next.js and TypeScript.',
}