// app/layout.tsx
import type { Metadata } from "next";
import "../globals.css";
import { Outfit, Syne } from "next/font/google";
import DashboardLayout from "@/components/portfolios";

const geistSans = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Syne({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SS Media Portfolio",
  description: "Your Growth, Your Goal - Professional Media Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-transparent`}
      >
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
