import type { Metadata } from "next";
import { Montserrat, Space_Grotesk, Syne } from "next/font/google";

import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["900"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Ahmed Badry Portfolio",
  description: "Personal portfolio for Ahmed Badry, UI/UX Designer."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${spaceGrotesk.variable} ${montserrat.variable} font-body`}
      >
        {children}
      </body>
    </html>
  );
}
