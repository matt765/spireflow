import "../styles/globals.css";
import "dotenv/config";

import { inter } from '../styles/fonts';
import { Providers } from "../services/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>     
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
