import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Quicklycv: Early Access",
  description: "Be one of the first to try Quicklycv",
  openGraph: {
    title: "Quicklycv: Early Access",
    description: "Be one of the first to try Quicklycv",
    url: "https://quicklycv.com",
    siteName: "Quicklycv",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
