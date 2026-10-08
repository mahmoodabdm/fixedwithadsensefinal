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
  description: "Calculate your exact take-home pay for 2026 with federal, state, FICA, and city taxes. IRS 2026 Verified.",
  keywords: ["paycheck calculator", "take home pay", "federal tax 2026"],
  authors: [{ name: "USA Paycheck Calculator Team" }],
  creator: "USA Paycheck Calculator",
  publisher: "USA Paycheck Calculator",
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: "USA Paycheck Calculator 2026",
    description: "Calculate your exact take-home pay for 2026",
    siteName: "USA Paycheck Calculator 2026",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased">
        {children}
        
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3673154819131367"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        {/* Adsterra - حطيتها كـ HTML عادي حتى تظهر بالتليفون */}
        <script dangerouslySetInnerHTML={{__html: `
          var s1 = document.createElement('script');
          s1.src = 'https://bauval.org/14/218fc0b1a46ee7e1e81a4cf653b5cc4e';
          document.body.appendChild(s1);
          
          var s2 = document.createElement('script');
          s2.src = 'https://abscloud.org/1/9a4f244fad04d6a28e33a767772525fd';
          document.body.appendChild(s2);
        `}} />
      </body>
    </html>
  );
}
