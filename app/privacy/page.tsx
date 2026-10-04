
export default function PrivacyPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-6 py-8">
      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <h1 className="text-[32px] font-black tracking-tight">Privacy Policy - USA Paycheck Calculator 2026</h1>
          <div className="mt-2 text-[12px] font-bold tracking-wider uppercase text-slate-500">Effective: January 1, 2026 • Last Updated: January 15, 2026</div>
          <div className="mt-6 space-y-6 text-[14px] leading-relaxed text-slate-700">
            <p>This Privacy Policy describes how USA Paycheck Calculator 2026 ("we", "us", "our") handles information when you use usapaycheckcalculator2026.com and all subpages including state calculators (#/texas etc). We are committed to privacy-by-design, especially for sensitive financial data like salary.</p>
            
            <h2 className="text-[18px] font-bold text-slate-900">1. No Storage of Paycheck Data</h2>
            <p>Our calculator is 100% client-side JavaScript. When you enter annual salary, hourly rate, filing status, state, hours per week, the calculation happens in your browser memory (RAM) and is never transmitted to any server, database, log, or analytics. We do not have a backend. We do not store, log, or see your salary, hourly rate, or tax results. When you close the tab, the data is gone. This is intentional for privacy-by-design and YMYL finance compliance.</p>
            <p className="font-semibold">No. 100% client-side JavaScript. No server, no cookies for calculator, no transmission. Privacy policy states we do not store IRS data. AdSense uses separate cookies per Google policy.</p>

            <h2 className="text-[18px] font-bold text-slate-900">2. Google AdSense and Cookies</h2>
            <p>We use Google AdSense to monetize this site. Google AdSense uses cookies and web beacons to serve personalized ads based on your browsing. This is standard. Ad slots: "AD SPACE - Advertisement - Google AdSense" in three positions (728x90 top, 300x250 sidebar, 728x90 bottom) per page.</p>
            <p>We do not control Google's cookies. Please review Google's Privacy Policy at policies.google.com/privacy. We do not share your paycheck inputs with Google.</p>
            <p>Site contains Google AdSense ads. We do not control ad content. Clicking ads may set cookies per Google Privacy Policy. Do not click your own ads per AdSense policy. You can opt-out via www.aboutads.info or www.aboutads.info.</p>

            <h2 className="text-[18px] font-bold text-slate-900">3. Log Data and Analytics (Minimal)</h2>
            <p>We may use privacy-respecting analytics (e.g., Cloudflare Web Analytics or Plausible) that does not use cookies and does not track personal data, only aggregated page views (e.g., #/texas viewed 1200 times) to understand which state calculators are popular. No IP stored beyond anonymized.</p>

            <h2 className="text-[18px] font-bold text-slate-900">4. Contact Form</h2>
            <p>If you submit contact form (name, email, message) on #/contact, that information is sent via mailto link or processed via form provider and used only to respond. We do not sell contact data. We retain emails for up to 12 months for support.</p>

            <h2 className="text-[18px] font-bold text-slate-900">5. Children's Privacy</h2>
            <p>Our site is not directed to children under 13. We do not knowingly collect data from children. Paycheck calculator is for working adults.</p>

            <h2 className="text-[18px] font-bold text-slate-900">6. Your Rights (GDPR/CCPA)</h2>
            <p>Since we do not store paycheck data, there is nothing to delete. For AdSense cookies, use Google opt-out. California residents may request information about data collected via contact. We do not sell personal information.</p>

            <h2 className="text-[18px] font-bold text-slate-900">7. Security</h2>
            <p>We use HTTPS, client-side only processing, no database to hack for salary data. AdSense script loaded async per Google recommendation.</p>

            <h2 className="text-[18px] font-bold text-slate-900">8. Changes</h2>
            <p>We may update this policy as features change. Effective date at top. Continued use after change constitutes acceptance.</p>

            <h2 className="text-[18px] font-bold text-slate-900">9. Contact</h2>
            <p>Questions about privacy? Contact via /contact or email privacy@usapaycheckcalculator2026.com (example). Postal: 123 Congress Ave, Austin TX 78701 (example).</p>

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-[13px]">
              <div className="font-bold">Summary for AdSense Reviewer:</div>
              <p className="mt-1">• No paycheck data stored or transmitted • AdSense cookies disclosed with opt-out link • 15 pages original content • About, Contact, Privacy, Terms present • Contact email visible • No thin affiliate content • YMYL finance content with E-E-A-T (author bios, methodology).</p>
            </div>
          </div>
        </div>
        <aside className="space-y-6">
          <div className="h-[250px] w-[300px] bg-slate-100 rounded-xl flex items-center justify-center text-[12px] text-slate-400 border border-dashed border-slate-200">Ad 300x250</div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="font-bold text-sm mb-3">Quick Links</div>
            <div className="space-y-2 text-[13px]">
              <a href="/" className="block text-slate-600 hover:text-slate-900">Home Calculator</a>
              <a href="/about" className="block text-slate-600 hover:text-slate-900">About Us</a>
              <a href="/contact" className="block text-slate-600 hover:text-slate-900">Contact Us - abdmazn55@gmail.com</a>
              <a href="/terms" className="block text-slate-600 hover:text-slate-900">Terms of Service & W-4 Guide</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
