import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tilt Dashboard | Manage Your Affiliate Programs",
  description:
    "A SaaS affiliate management dashboard for tracking campaigns, clicks, conversions, and payouts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#f8fafc] text-slate-900 antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
