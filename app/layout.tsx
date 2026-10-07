
import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "USA Paycheck Calculator 2026 - Accurate Take-Home Pay Calculator",
  description: "Calculate your exact take-home pay for 2026 with federal, state, FICA, and city taxes. IRS 2026 Verified.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3673154819131367" crossOrigin="anonymous"></script>
      </head>
      <body className="min-h-screen bg-[#f8fafc] text-slate-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
