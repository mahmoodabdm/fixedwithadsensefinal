import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

const baseUrl = "https://fixedwithadsensefinal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "USA Paycheck Calculator 2026 - Accurate Take-Home Pay Calculator",
    template: "%s | USA Paycheck Calculator 2026",
  },
  description: "Calculate your exact take-home pay for 2026 with federal, state, FICA, and city taxes. IRS 2026 Verified. No data stored, 100% accurate.",
  keywords: ["paycheck calculator", "take home pay", "federal tax 2026", "state tax calculator", "FICA calculator", "USA salary calculator"],
  authors: [{ name: "USA Paycheck Calculator Team" }],
  creator: "USA Paycheck Calculator",
  publisher: "USA Paycheck Calculator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: "USA Paycheck Calculator 2026",
    description: "Calculate your exact take-home pay for 2026 with federal, state, FICA taxes. IRS Verified.",
    siteName: "USA Paycheck Calculator 2026",
  },
  twitter: {
    card: 'summary_large_image',
    title: "USA Paycheck Calculator 2026",
    description: "Accurate take-home pay calculator for 2026",
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased">
        {children}
        
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3673154819131367"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Adsterra - Social Bar */}
        <Script
          id="adsterra-socialbar"
          strategy="afterInteractive"
          src="https://bauval.org/14/218fc0b1a46ee7e1e81a4cf653b5cc4e.js"
        />

        {/* Adsterra - Popunder */}
        <Script
          id="adsterra-popunder"
          strategy="afterInteractive"
          src="https://abscloud.org/1/9a4f244fad04d6a28e33a767772525fd.js"
        />
      </body>
    </html>
  );
}
