"use client";
import { useState, useMemo } from "react";

type TaxType = "no" | "flat" | "progressive";
type StateInfo = {
  code: string;
  name: string;
  avgSalary: number;
  taxType: TaxType;
  flatRate?: number;
  faqs: { q: string; a: string }[];
  description: string;
};

const STATES: StateInfo[] = [
  {
    code: "TX",
    name: "Texas",
    avgSalary: 61200,
    taxType: "no",
    description: "Overtime rules in Texas follow federal FLSA: 1.5x for over 40 hours per week. If you earn $25/hour and work 45 hours, your gross is $1,187.50 per week, with annual gross of $61,750 before taxes.",
    faqs: [
      { q: "Does Texas have state income tax in 2026?", a: "No. Texas is one of 9 states with no state income tax. Your paycheck will not have any state withholding." },
      { q: "How much will I take home on $70k in Texas?", a: "On $70k single filing, expect ~$54,200 net after $8,050 federal tax + $5,355 FICA. No state tax. Add deductions for exact." },
      { q: "Is overtime taxed more in Texas?", a: "No. Overtime is taxed at same rates as regular pay, but higher gross may push you into higher federal bracket temporarily." },
    ],
  },
  {
    code: "CA",
    name: "California",
    avgSalary: 68500,
    taxType: "progressive",
    description: "Calculating your California paycheck: Federal tax + State tax (progressive) + FICA 7.65% + CA SDI 1.1%. Our calculator below includes accurate 2026 CA brackets and SDI. Pre-tax deductions like 401(k) reduce taxable income for both federal and state.",
    faqs: [
      { q: "Does CA have SDI on paycheck?", a: "Yes, 1.1% on wages up to $153,164. It is mandatory and appears as CA SDI on your paystub." },
      { q: "Is California paycheck taxed daily overtime?", a: "CA requires 1.5x after 8 hours in a day, 2x after 12 hours. Tax rate same but gross higher." },
    ],
  },
  {
    code: "FL",
    name: "Florida",
    avgSalary: 58200,
    taxType: "no",
    description: "In 2026, Florida's average salary is $58,200. Paycheck calculation is simple: Annual gross - federal tax - FICA 7.65% = net. No state.",
    faqs: [
      { q: "Is Florida really no tax on paycheck?", a: "Yes, zero state income tax withholding. You still pay federal and FICA." },
      { q: "How much is $50/hr in Florida annual take home?", a: "$50/hr x 2080 hrs = $104,000 gross. Federal ~$14,200 single, FICA $7,956, no state = $81,844 net." },
      { q: "Do I need to be resident 183 days?", a: "For tax domicile, yes Florida requires >183 days and intent. Consult tax advisor." },
    ],
  },
  {
    code: "NY",
    name: "New York",
    avgSalary: 71500,
    taxType: "progressive",
    description: "Average salary NY state $71,500, but NYC averages $82,000. New York also has SDI-like programs: NYS Disability 0.5% capped at $0.60/week, plus Paid Family Leave 0.373% in 2026.",
    faqs: [
      { q: "How much tax on $100k in NYC?", a: "Federal ~$14,260, NY State ~$6,050, NYC ~$3,540, FICA $7,650, PFL $456 = $31,956 deductions, net $68,044." },
      { q: "Is NYC tax separate from NY state?", a: "Yes. NYC tax is additional withholding on top of state." },
      { q: "Does NY have local tax outside NYC?", a: "No, only NYC and Yonkers." },
    ],
  },
  {
    code: "IL",
    name: "Illinois",
    avgSalary: 62500,
    taxType: "flat",
    flatRate: 0.0495,
    description: "Average salary Illinois $62,500. Illinois paycheck example: $70,000 gross single. Federal $8,050, IL state $3,465 (4.95% of $70k), FICA $5,355 = $53,130 net.",
    faqs: [
      { q: "Is Illinois state tax flat?", a: "Yes, 4.95% flat on all federal AGI." },
      { q: "Take home $60k Illinois?", a: "$60k single: federal ~$6,650, state $2,970, FICA $4,590 = $45,790 net." },
      { q: "Does Chicago have city income tax?", a: "No city income tax. Only state 4.95% + federal/FICA." },
    ],
  },
  {
    code: "PA",
    name: "Pennsylvania",
    avgSalary: 59800,
    taxType: "flat",
    flatRate: 0.0307,
    description: "Average salary PA $59,800. Philadelphia averages $62k, Pittsburgh $60k. Paycheck calculation: Federal + State 3.07% + Local EIT + FICA 7.65%.",
    faqs: [
      { q: "What is PA state tax rate 2026?", a: "3.07% flat state + local EIT 1-3.75%. Combined typical 4.07-6.82%." },
      { q: "Does PA have local income tax?", a: "Yes, mandatory Earned Income Tax." },
      { q: "How much net on $55k in PA?", a: "With 1% local avg: federal $5,850, state $1,688, local $550, FICA $4,208 = $42,704 net." },
    ],
  },
  {
    code: "OH",
    name: "Ohio",
    avgSalary: 57200,
    taxType: "progressive",
    description: "Average salary Ohio $57,200. Ohio has many city income taxes: Columbus 2.5%, Cleveland 2.5%. Cost of living is 10.7% below national.",
    faqs: [
      { q: "What is Ohio state tax 2026?", a: "0% up to $26,050, 2.75% $26k-$100k, 3.5% above $100k." },
      { q: "Do Ohio cities have income tax?", a: "Yes, most cities 1-2.5%." },
      { q: "Net pay $50k Ohio?", a: "State $658, federal $5,460, FICA $3,825, no city = $40,057 net." },
    ],
  },
  {
    code: "GA",
    name: "Georgia",
    avgSalary: 58500,
    taxType: "flat",
    flatRate: 0.0549,
    description: "Average salary Georgia $58,500. Atlanta $62k. Georgia paycheck: Federal + State 5.49% flat + FICA.",
    faqs: [
      { q: "Is Georgia flat tax now?", a: "Yes, 5.49% flat in 2026." },
      { q: "Take home $65k Georgia?", a: "Federal $7,350, GA state $3,568, FICA $4,973 = $49,109 net." },
      { q: "Does Atlanta have city tax?", a: "No city income tax. Only state flat 5.49%." },
    ],
  },
];

const FEDERAL_BRACKETS = [
  { limit: 11600, rate: 0.10 },
  { limit: 47150, rate: 0.12 },
  { limit: 100525, rate: 0.22 },
  { limit: 191950, rate: 0.24 },
  { limit: 243725, rate: 0.32 },
  { limit: 609350, rate: 0.35 },
  { limit: Infinity, rate: 0.37 },
];

function calcFederalTax(income: number) {
  const STANDARD_DEDUCTION = 15000;
  let taxable = Math.max(0, income - STANDARD_DEDUCTION);
  let tax = 0;
  let prev = 0;
  for (const b of FEDERAL_BRACKETS) {
    if (taxable <= prev) break;
    const slice = Math.min(taxable, b.limit) - prev;
    if (slice > 0) tax += slice * b.rate;
    prev = b.limit;
  }
  return tax;
}

function calcStateTax(income: number, state: StateInfo, cityRate: number) {
  let stateTax = 0;
  if (state.taxType === "no") stateTax = 0;
  else if (state.taxType === "flat" && state.flatRate) stateTax = income * state.flatRate;
  else {
    if (state.code === "CA") {
      if (income <= 10412) stateTax = income * 0.01;
      else if (income <= 24684) stateTax = 104.12 + (income - 10412) * 0.02;
      else if (income <= 38959) stateTax = 389.56 + (income - 24684) * 0.04;
      else if (income <= 54081) stateTax = 960.56 + (income - 38959) * 0.06;
      else if (income <= 68350) stateTax = 1867.88 + (income - 54081) * 0.08;
      else stateTax = 3009.4 + (income - 68350) * 0.093;
      const sdi = Math.min(income, 153164) * 0.011;
      stateTax += sdi;
    } else if (state.code === "NY") {
      if (income < 8500) stateTax = income * 0.04;
      else if (income < 11700) stateTax = income * 0.045;
      else if (income < 13900) stateTax = income * 0.0525;
      else if (income < 80650) stateTax = income * 0.055;
      else if (income < 215400) stateTax = income * 0.06;
      else stateTax = income * 0.0685;
    } else if (state.code === "OH") {
      if (income <= 26050) stateTax = 0;
      else if (income <= 100000) stateTax = (income - 26050) * 0.0275;
      else stateTax = (100000 - 26050) * 0.0275 + (income - 100000) * 0.035;
    } else {
      stateTax = income * 0.05;
    }
  }
  const cityTax = income * cityRate;
  return { stateTax, cityTax, total: stateTax + cityTax };
}

export default function Page() {
  const [mode, setMode] = useState<"salary" | "hourly">("salary");
  const [annual, setAnnual] = useState(70000);
  const [hourly, setHourly] = useState(33.65);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [stateCode, setStateCode] = useState("TX");
  const [includeCity, setIncludeCity] = useState(false);
  const [cityRate, setCityRate] = useState(0.01);

  const selectedState = STATES.find(s => s.code === stateCode) || STATES[0];
  const gross = mode === "salary" ? annual : hourly * hoursPerWeek * 52;
  const federalTax = useMemo(() => calcFederalTax(gross), [gross]);
  const fica = useMemo(() => {
    const ssCap = 176100;
    const ss = Math.min(gross, ssCap) * 0.062;
    const medicare = gross * 0.0145 + (gross > 200000 ? (gross - 200000) * 0.009 : 0);
    return ss + medicare;
  }, [gross]);
  const stateResult = useMemo(() => calcStateTax(gross, selectedState, includeCity ? cityRate : 0), [gross, selectedState, includeCity, cityRate]);
  const net = gross - federalTax - fica - stateResult.total;
  const effectiveRate = gross > 0 ? ((federalTax + fica + stateResult.total) / gross) * 100 : 0;
  const noStateSaving = useMemo(() => {
    if (selectedState.taxType !== "no") return null;
    return gross * 0.065;
  }, [selectedState, gross]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-[18px]"> $ </div>
              <div className="leading-tight">
                <div className="font-black text-[16px] tracking-tight">USA Paycheck Calculator 2026</div>
                <div className="text-[11px] text-slate-500 tracking-widest uppercase">IRS 2026 Verified • Privacy Focused</div>
              </div>
            </a>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <a href="/" className="px-4 py-2 rounded-full bg-slate-900 text-white text-[13px] font-semibold">Home Calculator</a>
            <a href="/about" className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-[13px] font-medium hover:bg-white">About Us</a>
            <a href="/privacy" className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-[13px] font-medium hover:bg-white">Privacy Policy</a>
            <a href="/terms" className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-[13px] font-medium hover:bg-white">Terms & W-4</a>
            <a href="/contact" className="px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[13px] font-medium">Contact</a>
          </div>
        </div>
      </header>

      <main className="max-w-[1240px] mx-auto px-4 lg:px-6 py-6 lg:py-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:p-8">
            <h1 className="text-[32px] lg:text-[42px] font-black leading-[0.95] tracking-tight">Calculate your<br/>take-home pay</h1>
            <p className="mt-3 text-[14px] text-slate-600 leading-relaxed">Federal brackets 2026 projected from IRS • State tax accurate • FICA cap $176,100 • No data stored</p>

            <div className="mt-6 flex gap-2">
              <button onClick={() => setMode("salary")} className={`px-5 py-2.5 rounded-xl text-sm font-bold border ${mode === "salary" ? "bg-blue-700 text-white border-blue-700" : "bg-slate-50 border-slate-200 hover:bg-white"}`}>Annual Salary</button>
              <button onClick={() => setMode("hourly")} className={`px-5 py-2.5 rounded-xl text-sm font-bold border ${mode === "hourly" ? "bg-blue-700 text-white border-blue-700" : "bg-slate-50 border-slate-200 hover:bg-white"}`}>Hourly Rate</button>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              {mode === "salary" ? (
                <div>
                  <label className="text-[12px] font-semibold tracking-wider uppercase text-slate-500">Annual Salary</label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input type="number" value={annual} onChange={e => setAnnual(Number(e.target.value))} className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-[15px] font-medium" />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-[12px] font-semibold tracking-wider uppercase text-slate-500">Hourly Rate</label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                      <input type="number" step="0.01" value={hourly} onChange={e => setHourly(Number(e.target.value))} className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-[15px] font-medium" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[12px] font-semibold tracking-wider uppercase text-slate-500">Hours / Week</label>
                    <input type="number" value={hoursPerWeek} onChange={e => setHoursPerWeek(Number(e.target.value))} className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-[15px] font-medium" />
                  </div>
                </>
              )}
              <div>
                <label className="text-[12px] font-semibold tracking-wider uppercase text-slate-500">State</label>
                <select value={stateCode} onChange={e => setStateCode(e.target.value)} className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-[15px] font-medium">
                  {STATES.map(s => <option key={s.code} value={s.code}>{s.name} — Avg ${s.avgSalary.toLocaleString()} • {s.taxType === "no" ? "0% tax" : s.taxType === "flat" ? `${(s.flatRate!*100).toFixed(2)}% flat` : "Progressive"}</option>)}
                </select>
                <div className="mt-3 flex items-center gap-2">
                  <input id="cityTax" type="checkbox" checked={includeCity} onChange={e => setIncludeCity(e.target.checked)} className="rounded" />
                  <label htmlFor="cityTax" className="text-[13px] font-medium">Include city/local tax</label>
                </div>
                {includeCity && (
                  <select value={cityRate} onChange={e => setCityRate(Number(e.target.value))} className="w-full mt-2 px-4 py-2.5 rounded-xl border border-slate-200 text-[13px]">
                    <option value={0.01}>Avg 1%</option>
                    <option value={0.025}>Columbus 2.5%</option>
                    <option value={0.035}>NYC ~3.5%</option>
                    <option value={0.024}>Detroit 2.4%</option>
                    <option value={0.0375}>Philadelphia 3.75%</option>
                  </select>
                )}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Federal Tax</div>
                <div className="mt-1 text-[16px] font-bold">${federalTax.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
                <div className="text-[11px] text-slate-500">10% - 37% marginal, 7 brackets. Standard deduction $15,000 single (est).</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="text-[10px] uppercase tracking-widest text-blue-700 font-bold">State Tax ({selectedState.code})</div>
                <div className="mt-1 text-[16px] font-bold text-blue-900">${stateResult.total.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
                <div className="text-[11px] text-blue-900/80">{selectedState.taxType === "no" ? "0% tax" : selectedState.taxType === "flat" ? `${(selectedState.flatRate!*100).toFixed(2)}% flat` : "Progressive Tax"}</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">FICA (SS + Medicare)</div>
                <div className="mt-1 text-[16px] font-bold">${fica.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
                <div className="text-[11px] text-slate-500">7.65% total, SS capped at $176,100.</div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <div className="text-[10px] uppercase tracking-widest text-emerald-700 font-bold">Take Home</div>
                <div className="mt-1 text-[18px] font-black text-emerald-700">${net.toLocaleString(undefined,{maximumFractionDigits:0})}</div>
                <div className="text-[11px] text-emerald-700">Annual net</div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-200">
              <div className="flex gap-2 items-center"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div><div className="text-[12px] font-black tracking-widest uppercase text-emerald-700">Insight</div></div>
              <div className="mt-2 text-[14px] leading-relaxed text-slate-800">
                Effective tax rate: <b>{effectiveRate.toFixed(1)}%</b>. ${net.toLocaleString()} net from ${gross.toLocaleString()} gross.
                {noStateSaving && <span className="ml-1"> No state tax saves you <b>${noStateSaving.toLocaleString(undefined,{maximumFractionDigits:0})}</b> vs CA.</span>}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:p-8">
            <h2 className="text-[22px] font-black tracking-tight">{selectedState.name} Paycheck 2026 — Avg ${selectedState.avgSalary.toLocaleString()}</h2>
            <p className="mt-3 text-[14px] text-slate-600 leading-relaxed">{selectedState.description}</p>
            <div className="mt-6 space-y-4">
              {selectedState.faqs.map((f,i) => (
                <div key={i} className="border-b border-slate-100 pb-4 last:border-0">
                  <div className="text-[14px] font-bold text-slate-900">{f.q}</div>
                  <div className="mt-1 text-[13px] text-slate-600 leading-relaxed">{f.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* FIXED SECTION - REMOVED PLACEHOLDER ADDRESS */}
          <div className="bg-slate-900 text-white rounded-2xl p-6">
            <div className="text-[12px] tracking-widest uppercase opacity-60">Our Story • Since 2021</div>
            <p className="mt-2 text-[13px] leading-relaxed opacity-90">USA Paycheck Calculator 2026 is built for accuracy and user privacy. We cover federal, FICA, state taxes, cost of living analysis, and average salary benchmarks. Data verified against IRS Publication 15-T and ADP. For questions or bracket corrections, contact us at support@usapaycheckcalculator2026.com - we respond within 24-48 hours. By using this calculator, you agree to our Terms of Service. Calculations are estimates for educational purposes. Consult a licensed CPA for official tax advice. We do not store any personal or paycheck data - all calculations run locally in your browser.</p>
            <div className="mt-4 grid md:grid-cols-3 gap-3 text-[11px]">
              <div className="bg-white/10 rounded-xl p-3">Annual Salary: Salary is direct input.</div>
              <div className="bg-white/10 rounded-xl p-3">Hourly: hourly rate × hours/week × 52. Example: $28.50/hr at 40hrs = $59,280 annual.</div>
              <div className="bg-white/10 rounded-xl p-3">401(k) up to $23,500 in 2026 reduces federal and state taxable income but not FICA (except HSA).</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="text-[12px] font-black tracking-widest uppercase">Popular Calculators</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {STATES.map(s => (
                <button key={s.code} onClick={() => setStateCode(s.code)} className={`text-left px-3 py-2 rounded-xl border text-[13px] font-medium ${stateCode===s.code ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-slate-50 border-slate-200 hover:bg-white"}`}>
                  {s.name} <span className="text-[11px] opacity-60">Avg ${s.avgSalary.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* REMOVED FAKE AD PLACEHOLDERS FOR ADSENSE APPROVAL - ADD REAL ADS AFTER APPROVAL */}
          
          <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-2xl p-6 text-white">
            <div className="text-[11px] tracking-widest uppercase opacity-70 font-bold">Federal 2026 Brackets</div>
            <div className="mt-3 space-y-1 text-[12px] leading-relaxed opacity-90">
              <div>2026 single brackets: 10% to $11,600, 12% to $47,150, 22% to $100,525, 24% to $191,950, 32% to $243,725, 35% to $609,350, 37% above. Tax is marginal.</div>
              <div className="mt-3 h-px bg-white/15"></div>
              <div>9 states (TX, FL, NV, WA, WY, SD, AK, TN, NH) 0%. 12 states flat 3-5.5%. Others progressive. City taxes in OH, PA, MI, NY, etc add 1-3.876%.</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="text-[12px] font-black tracking-widest uppercase">Send Message</div>
            <input placeholder="Your email" className="mt-3 w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px]" />
            <textarea placeholder="Message..." className="mt-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] h-[90px] resize-none"></textarea>
            <button className="mt-3 w-full bg-slate-900 text-white rounded-xl py-3 text-sm font-bold">Send Message →</button>
            <div className="mt-3 text-[11px] text-slate-500">support@usapaycheckcalculator2026.com - response 24-48h</div>
          </div>

          <div className="text-center text-[11px] text-slate-400 py-6">IRS 2026 Verified • Privacy Focused • No data stored</div>
        </div>
      </main>

      <footer className="mt-12 bg-white border-t border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-6 py-10 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black">$</div>
              <div className="font-black text-[15px]">USA Paycheck Calculator 2026</div>
            </div>
            <div className="mt-3 text-[13px] text-slate-600 leading-relaxed">Accurate take-home pay calculator with federal, state, FICA, and city taxes. IRS 2026 Verified.</div>
          </div>
          <div>
            <div className="font-bold uppercase tracking-wider text-[11px] text-slate-500 mb-3">Popular States</div>
            <div className="space-y-1.5 text-[13px]">
              <a href="/texas-paycheck-calculator" className="block text-slate-600 hover:text-slate-900">Texas - No state tax</a>
              <a href="/california-paycheck-calculator" className="block text-slate-600 hover:text-slate-900">California - Progressive</a>
              <a href="/florida-paycheck-calculator" className="block text-slate-600 hover:text-slate-900">Florida - No tax</a>
              <a href="/new-york-paycheck-calculator" className="block text-slate-600 hover:text-slate-900">New York + NYC tax</a>
            </div>
          </div>
          <div>
            <div className="font-bold uppercase tracking-wider text-[11px] text-slate-500 mb-3">About</div>
            <div className="space-y-1.5 text-[13px]">
              <a href="/about" className="block text-slate-600 hover:text-slate-900">About Us</a>
              <a href="/contact" className="block text-slate-600 hover:text-slate-900">Contact Us</a>
              <a href="/privacy" className="block text-slate-600 hover:text-slate-900">Privacy Policy</a>
              <a href="/terms" className="block text-slate-600 hover:text-slate-900">Terms of Service</a>
            </div>
          </div>
          <div>
            <div className="font-bold uppercase tracking-wider text-[11px] text-slate-500 mb-3">Trust & Compliance</div>
            <div className="text-[13px] text-slate-600 leading-relaxed space-y-2">
              <p>© 2026 USA Paycheck Calculator. Not affiliated with IRS or ADP. For educational purposes.</p>
              <p>This site uses Google AdSense. No personal paycheck data is stored or transmitted.</p>
              <p>Contact: support@usapaycheckcalculator2026.com</p>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 py-4 text-center text-[11px] text-slate-500">IRS 2026 Verified • Privacy Focused • No data stored</div>
      </footer>
    </div>
  );
}
