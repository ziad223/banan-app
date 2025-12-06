// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../src/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Banan App - نظام متكامل",
  description: "نظام SaaS شامل لإدارة المحاسبة والمخزون والمبيعات",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}