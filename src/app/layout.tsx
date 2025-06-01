import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechFix Pro - Professional Phone & Gadget Repair",
  description:
    "Expert phone and gadget repair services. We also sell quality refurbished devices. Fast, reliable, and affordable repairs with warranty.",
  keywords:
    "phone repair, gadget repair, screen replacement, battery replacement, iPhone repair, Samsung repair",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
