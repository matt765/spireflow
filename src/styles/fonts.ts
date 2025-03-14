import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Nunito } from "next/font/google";
import { Public_Sans } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const publicSans = Public_Sans({ subsets: ["latin"] });

export const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const nunito = Nunito({
  weight: "700",
  subsets: ["latin"],
});
