import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import localFont from "next/font/local";
import ReduxProvider from "./providers/reduxProvider";
import "./globals.scss";
import { notFound } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>
            <AntdRegistry>{children}</AntdRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
