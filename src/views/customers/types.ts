import { StaticImageData } from "next/image";

export interface Customer {
  col0: StaticImageData; // Avatar
  col1: string; // First Name
  col2: string; // Last Name
  col3: string; // City
  col4: string; // Country
  col5: string; // Phone
  col6: number; // Total Buys
}
