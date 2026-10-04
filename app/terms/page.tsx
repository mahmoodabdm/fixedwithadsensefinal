
export default function TermsPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-6 py-8">
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h1 className="text-[32px] font-black tracking-tight">Terms of Service & W-4 Guide 2026</h1>
        <div className="mt-6 space-y-6 text-[14px] leading-relaxed text-slate-700">
          <p>By using USA Paycheck Calculator 2026, you agree to these Terms. If you do not agree, do not use the site.</p>
          
          <h2 className="text-[18px] font-bold">1. Educational Purpose Only</h2>
          <p>© 2026 USA Paycheck Calculator. Not affiliated with IRS or ADP. For educational purposes. Consult CPA for tax advice. While we test against ADP, we do not guarantee exact match due to pre-tax deductions, employer withholding methods, local taxes, and timing. Use at your own risk.</p>

          <h2 className="text-[18px] font-bold">2. Limitation of Liability</h2>
          <p>To maximum extent permitted by law, we are not liable for any decisions made based on calculator output (e.g., job offers, budgeting). Max liability $50. Provided without warranty.</p>

          <h2 className="text-[18px] font-bold">3. AdSense Disclosure</h2>
          <p>Site contains Google AdSense ads. We do not control ad content. Clicking ads may set cookies per Google Privacy Policy. Do not click your own ads per AdSense policy.</p>

          <div className="h-px bg-slate-200 my-8"></div>
          <h2 className="text-[22px] font-black tracking-tight flex items-center gap-2">BONUS: W-4 Form Guide 2026 - How to Fill W-4 to Get Correct Paycheck</h2>
          <p>Your W-4 directly controls federal withholding - the biggest deduction after FICA. A wrong W-4 means $2,000-5,000 over/under withholding per year. Here is how to fill it correctly in 2026, based on IRS final W-4 2025 (expected same for 2026).</p>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-xl border border-slate-200 p-5 bg-slate-50">
              <div className="font-bold">Step 1: Personal Information</div>
              <div className="mt-2 text-[13px]">Single, no box checked in Step 2 (only one job). $0 dependents. Blank unless itemized over $15k or want extra withholding. Employer withholds per IRS tables ~$8,050 federal annually, matches our calculator.</div>
            </div>
            <div className="rounded-xl border border-slate-200 p-5 bg-slate-50">
              <div className="font-bold">Step 2: Multiple Jobs</div>
              <div className="mt-2 text-[13px]">Check box only if you have 2 jobs or spouse works. Otherwise leave blank to avoid over-withholding.</div>
            </div>
            <div className="rounded-xl border border-slate-200 p-5 bg-slate-50">
              <div className="font-bold">Step 3: Dependents</div>
              <div className="mt-2 text-[13px]">$0 if no kids. $2000 per child under 17, $500 other dependents. Reduces withholding.</div>
            </div>
            <div className="rounded-xl border border-slate-200 p-5 bg-slate-50">
              <div className="font-bold">Step 4: Other Adjustments</div>
              <div className="mt-2 text-[13px]">4(a) extra income, 4(b) deductions, 4(c) extra withholding. Leave blank unless you want to adjust.</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-[13px]">
            <strong>Disclaimer:</strong> W-4 guidance is educational per IRS instructions. For personal tax advice, consult CPA. IRS forms at irs.gov. Last updated Jan 2026.
          </div>

          <p className="text-[12px] text-slate-500">Built as single-file authority site • 15 pages • Hash routing for SEO • Ready for Google AdSense approval 2026 • Contact: abdmazn55@gmail.com</p>
        </div>
      </div>
    </div>
  )
}
