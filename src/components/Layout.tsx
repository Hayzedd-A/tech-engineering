

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "TechFix Pro - Professional Phone & Gadget Repair",
    template: "%s | TechFix Pro",
  },
  description:
    "Expert phone and gadget repair services with over 10 years of experience. Fast, reliable, and affordable repairs with warranty included.",
  keywords: [
    "phone repair",
    "gadget repair",
    "screen repair",
    "battery replacement",
    "water damage",
    "iPhone repair",
    "Samsung repair",
  ],
  authors: [{ name: "TechFix Pro" }],
  creator: "TechFix Pro",
  publisher: "TechFix Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://techfixpro.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TechFix Pro - Professional Phone & Gadget Repair",
    description:
      "Expert phone and gadget repair services with over 10 years of experience.",
    url: "https://techfixpro.com",
    siteName: "TechFix Pro",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TechFix Pro - Phone Repair Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechFix Pro - Professional Phone & Gadget Repair",
    description:
      "Expert phone and gadget repair services with over 10 years of experience.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
