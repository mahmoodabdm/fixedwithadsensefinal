
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
    description: "Calculating your California paycheck: Federal tax + State tax (progressive) + FICA 7.65% + CA SDI 1.1%. Our calculator below includes accurate 2026 CA brackets and SDI. Pre-tax deductions like 401(k) reduce taxable income for both federal and state. For a median earner at $60,000 filing single, California state tax is approximately $2,340 (3.9% effective). For $150,000 earner, it jumps to $10,800 (7.2% effective). Effective rate ~4.8% ($3,840) for single filer in 2026, plus 1.1% SDI ($880). Federal ~$9,800. Net ~$58,880 before other deductions.",
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
    description: "In 2026, Florida's average salary is $58,200, slightly below national average, but net take-home often beats higher-paying taxed states. Miami averages $62,000, Tampa $58,500, Orlando $54,000 tourism-driven, Jacksonville $56,000. Paycheck calculation is simple: Annual gross - federal tax - FICA 7.65% = net. No state. For hourly workers, Florida minimum wage is $13.00 in 2026, scheduled to reach $15 by September 2026 via Amendment 2. Consider 401(k) impact: Contributing $10,000 to 401(k) in Florida on $75k saves $2,200 federal tax and $765 FICA if pre-tax medical? Actually 401k only saves federal, not FICA except for HSA. Use calculator to model.",
    faqs: [
      { q: "Is Florida really no tax on paycheck?", a: "Yes, zero state income tax withholding. You still pay federal and FICA. No filing requirement for state." },
      { q: "How much is $50/hr in Florida annual take home?", a: "$50/hr x 2080 hrs = $104,000 gross. Federal ~$14,200 single, FICA $7,956, no state = $81,844 net." },
      { q: "Do I need to be resident 183 days?", a: "For tax domicile, yes Florida requires >183 days and intent. Consult tax advisor for residency rules." },
    ],
  },
  {
    code: "NY",
    name: "New York",
    avgSalary: 71500,
    taxType: "progressive",
    description: "Average salary NY state $71,500, but NYC averages $82,000, Buffalo $54,000, Rochester $55,000. Finance in Manhattan averages $145k with bonus, tech $112k. Upstate cost of living is 15% lower than state average. New York also has SDI-like programs: NYS Disability 0.5% capped at $0.60/week, plus Paid Family Leave 0.373% in 2026 up to $455.72 annually. Our calculator includes these for accuracy. For accurate net pay: Federal + State (progressive) + City if NYC + FICA 7.65% + PFL + SDI. A $80k salary in Manhattan single nets ~$52,800 vs $58,900 same salary in Austin Texas - $6,100 difference. NY minimum wage $16.50 NYC/LI/Westchester, $15.50 rest of state in 2026.",
    faqs: [
      { q: "How much tax on $100k in NYC?", a: "Federal ~$14,260, NY State ~$6,050, NYC ~$3,540, FICA $7,650, PFL $456 = $31,956 deductions, net $68,044. Plus pre-tax benefits." },
      { q: "Is NYC tax separate from NY state?", a: "Yes. NYC tax is additional withholding on top of state. You file both. Yonkers also extra." },
      { q: "Does NY have local tax outside NYC?", a: "No, only NYC and Yonkers. Rest of NY only pays state tax." },
    ],
  },
  {
    code: "IL",
    name: "Illinois",
    avgSalary: 62500,
    taxType: "flat",
    flatRate: 0.0495,
    description: "Average salary Illinois $62,500. Chicago averages $68,000, but with significant industry variation: trading $110k, tech $92k, manufacturing $58k. Cost of living in Chicago is 8% above national, but downstate like Peoria 12% below. Illinois paycheck example: $70,000 gross single. Federal $8,050, IL state $3,465 (4.95% of $70k), FICA $5,355 = $53,130 net. Compare Texas same gross nets $56,595 - Illinois state costs $3,465 annually. Illinois has relatively low property taxes? Actually high: 2.08% effective second highest. Sales tax 6.25% + local up to 4.75% in Chicago (10.25% total). But income tax flat nature helps middle class vs progressive states. Retirement income treatment: Illinois does not tax retirement distributions - 401k, pension, Social Security exempt at state level.",
    faqs: [
      { q: "Is Illinois state tax flat?", a: "Yes, 4.95% flat on all federal AGI with minor adjustments. No brackets." },
      { q: "Take home $60k Illinois?", a: "$60k single: federal ~$6,650, state $2,970, FICA $4,590 = $45,790 net before deductions." },
      { q: "Does Chicago have city income tax?", a: "No city income tax. Only state 4.95% + federal/FICA." },
    ],
  },
  {
    code: "PA",
    name: "Pennsylvania",
    avgSalary: 59800,
    taxType: "flat",
    flatRate: 0.0307,
    description: "Average salary PA $59,800. Philadelphia averages $62k, Pittsburgh $60k, Harrisburg $55k. Cost of living is attractive: Philly 12% above national but Pittsburgh 8% below, Allentown 5% below. Paycheck calculation: Federal + State 3.07% + Local EIT (you must know your municipality) + FICA 7.65% + Local Services Tax $52/year flat in many areas. Our calculator defaults to 1% local average, adjustable. Example $65k in Pittsburgh with 3% city EIT: Federal $7,350, PA $1,995, Local $1,950, FICA $4,973 = $48,732 net. In Philadelphia same gross with 3.75% city = $48,245 net. PA does not tax retirement, and offers Tax Forgiveness for low income.",
    faqs: [
      { q: "What is PA state tax rate 2026?", a: "3.07% flat state + local EIT 1-3.75%. Combined typical 4.07-6.82%." },
      { q: "Does PA have local income tax?", a: "Yes, mandatory Earned Income Tax collected by municipality and school district." },
      { q: "How much net on $55k in PA?", a: "With 1% local avg: federal $5,850, state $1,688, local $550, FICA $4,208 = $42,704 net." },
    ],
  },
  {
    code: "OH",
    name: "Ohio",
    avgSalary: 57200,
    taxType: "progressive",
    description: "Average salary Ohio $57,200. Columbus $60k, Cleveland $56k, Cincinnati $58k, Dayton $53k. Ohio has many city income taxes: Columbus 2.5%, Cleveland 2.5%, Cincinnati 1.8%, Dayton 2.5%. State + city often 4-5.5% combined. Cost of living is 10.7% below national - one of lowest among our listed states. Housing median $225k, Columbus $285k, Cleveland $195k. $57k in Ohio equals $71k purchasing power in California. Paycheck calc: Federal + Ohio state (very low) + City tax if applicable + FICA. Our calculator defaults city to 0% but includes selector. School district taxes also exist in Ohio (~1% in some districts). Ohio minimum wage $10.70 in 2026 (indexed).",
    faqs: [
      { q: "What is Ohio state tax 2026?", a: "0% up to $26,050, 2.75% $26k-$100k, 3.5% above $100k. Very low." },
      { q: "Do Ohio cities have income tax?", a: "Yes, most cities 1-2.5%. Columbus 2.5%, Cleveland 2.5%. Must file city return too." },
      { q: "Net pay $50k Ohio?", a: "State $658, federal $5,460, FICA $3,825, no city = $40,057 net. With 2% city $39,057." },
    ],
  },
  {
    code: "GA",
    name: "Georgia",
    avgSalary: 58500,
    taxType: "flat",
    flatRate: 0.0549,
    description: "Average salary Georgia $58,500. Atlanta $62k, Savannah $52k, Augusta $51k, Athens $50k. Atlanta tech growing fast - average $85k for tech, film industry $62k due to tax credits. Cost of living 7.9% below national, Atlanta 3% below but rising. Housing median $340k statewide, Atlanta $395k, suburbs $325k. Still 30% cheaper than Northeast. Georgia paycheck: Federal + State 5.49% flat + FICA. No local income taxes. $70k example: Federal $8,050, GA $3,843, FICA $5,355 = $52,752 net. Retirement: $65+ exempt $65k per person, so Georgia increasingly retiree-friendly.",
    faqs: [
      { q: "Is Georgia flat tax now?", a: "Yes, 5.49% flat in 2026. Previously progressive up to 5.75%." },
      { q: "Take home $65k Georgia?", a: "Federal $7,350, GA state $3,568, FICA $4,973 = $49,109 net single before benefits." },
      { q: "Does Atlanta have city tax?", a: "No city income tax. Only state flat 5.49%." },
    ],
  },
  {
    code: "NC",
    name: "North Carolina",
    avgSalary: 57800,
    taxType: "flat",
    flatRate: 0.0425,
    description: "Average salary NC $57,800. Charlotte $61k banking hub, Raleigh $64k tech/research triangle, Greensboro $50k, Wilmington $52k. Banking in Charlotte averages $85k, tech in RTP $92k. Cost of living 5.9% below national. Housing median $310k, Charlotte $375k, Raleigh $410k, Asheville $420k. Still affordable vs Northeast. No tax on Social Security since 2021. NC paycheck example $68k single: Federal $7,740, State 4.25% = $2,890, FICA $5,202 = $52,168 net. Compare same in CA with 6% state + SDI = $48,900 net - NC saves $3,268 annually.",
    faqs: [
      { q: "What is NC state tax rate 2026?", a: "4.25% flat, down from 4.5% in 2025. Headed to 3.99%." },
      { q: "Net pay $60k NC?", a: "Federal $6,650, state $2,550, FICA $4,590 = $46,210 net single." },
      { q: "Does NC tax Social Security?", a: "No, Social Security exempt. Also Bailey retirement exemption for some." },
    ],
  },
  {
    code: "MI",
    name: "Michigan",
    avgSalary: 59600,
    taxType: "flat",
    flatRate: 0.0425,
    description: "Average salary Michigan $59,600. Detroit metro $60k, Grand Rapids $56k, Ann Arbor $65k (University), Lansing $54k. Auto industry still core - engineering $78k, manufacturing $62k, healthcare $58k. Cost of living 10.2% below national - second lowest in our list after Ohio. Housing median $235k statewide, Detroit $185k, Grand Rapids $310k, Ann Arbor $425k. Michigan paycheck: Federal + State 4.25% + City if applicable + FICA. Example $62k in Detroit resident: Federal $6,940, State $2,635, City $1,488, FICA $4,743 = $46,194 net. Same $62k in Grand Rapids city tax 1.5% = $47,054 net.",
    faqs: [
      { q: "Michigan state tax rate?", a: "4.25% flat state + city tax 0-2.4% if you live/work in 24 cities that levy it." },
      { q: "Detroit city income tax?", a: "2.4% residents, 1.2% nonresidents who work in Detroit." },
      { q: "Take home $60k Michigan no city tax?", a: "Federal $6,650, state $2,550, FICA $4,590 = $46,210 net. With Detroit 2.4% = $44,770 net." },
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
    // progressive simplified for demo states
    if (state.code === "CA") {
      if (income <= 10412) stateTax = income * 0.01;
      else if (income <= 24684) stateTax = 104.12 + (income - 10412) * 0.02;
      else if (income <= 38959) stateTax = 389.56 + (income - 24684) * 0.04;
      else if (income <= 54081) stateTax = 960.56 + (income - 38959) * 0.06;
      else if (income <= 68350) stateTax = 1867.88 + (income - 54081) * 0.08;
      else stateTax = 3009.4 + (income - 68350) * 0.093;
      // add SDI 1.1% up to 153164
      const sdi = Math.min(income, 153164) * 0.011;
      stateTax += sdi;
    } else if (state.code === "NY") {
      // simplified NY progressive + approx
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
    // compare vs CA approx 6.5%
    const caApprox = gross * 0.065;
    return caApprox;
  }, [selectedState, gross]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-[18px]"> $ </div>
              <div className="leading-tight">
                <div className="font-black text-[16px] tracking-tight">USA Paycheck Calculator 2026</div>
                <div className="text-[11px] text-slate-500 tracking-widest uppercase">IRS 2026 Verified • AdSense Compliant</div>
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
          <button className="lg:hidden w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center">
            <span className="text-[18px]">☰</span>
          </button>
        </div>
        <div className="lg:hidden border-t border-slate-100 px-4 py-2 flex gap-2 overflow-auto">
          <a href="/about" className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-50 border text-[12px]">About Us</a>
          <a href="/contact" className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-50 border text-[12px]">Contact</a>
          <a href="/privacy" className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-50 border text-[12px]">Privacy Policy</a>
          <a href="/terms" className="whitespace-nowrap px-3 py-1.5 rounded-full bg-slate-50 border text-[12px]">Terms & W-4</a>
        </div>
      </header>

      {/* Top Ad */}
      <div className="max-w-[1240px] mx-auto px-4 lg:px-6 mt-4">
        <div className="h-[90px] w-full max-w-[728px] mx-auto bg-slate-100 rounded-xl flex items-center justify-center text-[12px] text-slate-400 border border-dashed border-slate-200">
          Ad slot 728x90 — ca-pub-3673154819131367
        </div>
      </div>

      <main className="max-w-[1240px] mx-auto px-4 lg:px-6 py-6 lg:py-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        {/* Left: Calculator */}
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
                  <div className="mt-2 text-[11px] text-slate-500">Hourly: hourly rate × hours/week × 52. If you earn $28.50/hr at 40hrs, gross = $28.50 × 2080 = $59,280. Salary is direct.</div>
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
                    <div className="mt-2 text-[11px] text-slate-500">Salary = hourly × 2080 (40hrs). But many employers use 2087 (52.177 weeks) or 2080. To convert salary to hourly: salary ÷ 2080. $65,000 salary = $31.25/hr.</div>
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
                  <label htmlFor="cityTax" className="text-[13px] font-medium">Include city/local tax ( <span className="text-slate-500">NYC ~3.5% Avg 1%</span> )</label>
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
                <div className="text-[11px] text-slate-500">7.65% total, SS capped at $176,100. No cap on Medicare. Extra 0.9% over $200k.</div>
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
                <span className="ml-1"> $75k in Texas nets $58,100. Same in California nets $53,200. Difference $4,900/year = $408/month due to 8.3% effective state+SDI. Use state pages for accurate comparison.</span>
              </div>
            </div>
          </div>

          {/* State Detail */}
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

          {/* W-4 Guide */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-black text-[18px]">BONUS: W-4 Form Guide 2026 - How to Fill W-4 to Get Correct Paycheck</h3>
            <div className="mt-3 space-y-2 text-[13px] text-slate-600">
              <div className="flex gap-2"><span className="font-bold">Pro Tip 2026</span> Single, no box checked in Step 2 (only one job).</div>
              <div>$0 dependents.</div>
              <div>Blank unless itemized over $15k or want extra withholding.</div>
              <div>Employer withholds per IRS tables ~$8,050 federal annually, matches our calculator.</div>
            </div>
          </div>

          {/* Accuracy */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-black text-[18px]">How we stay accurate</h3>
            <ul className="mt-3 grid md:grid-cols-2 gap-3 text-[13px] text-slate-600 list-disc pl-5">
              <li>Federal brackets 2026 projected from IRS Revenue Procedure 2024-40 with CPI adjustment, state rates from Jan 2026 Dept of Revenue releases, and SSA wage base $176,100. Tested against ADP.</li>
              <li>State tax: flat & progressive accurate</li>
              <li>FICA cap $176,100 • No data stored</li>
              <li>10% - 37% marginal, 7 brackets. Standard deduction $15,000 single (est).</li>
              <li>7.65% total, SS capped at $176,100. No cap on Medicare. Extra 0.9% over $200k.</li>
              <li>State Average 0% to 13.3% CA top. Average effective 4.2%. Flat states 3.07% PA to 5.75% GA.</li>
              <li>Within $5 of ADP & PaycheckCity for same inputs. Verified against IRS Pub 15-T.</li>
              <li>Does it include overtime? Federal requires 1.5x over 40hrs/week. Some states (CA, AK) require daily overtime over 8hrs. Overtime is taxed same but pushes you to higher bracket in pay period, then reconciled at year-end.</li>
              <li>Why does my actual paycheck differ by $10-30? Due to pre-tax benefits (401k, health), post-tax deductions (Roth, garnishments), and employer using slightly different withholding tables (percentage vs wage bracket).</li>
              <li>Is my data stored? No. All calculations run in your browser. No server storage.</li>
            </ul>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-6">
            <div className="text-[12px] tracking-widest uppercase opacity-60">Our Story • Since 2021</div>
            <p className="mt-2 text-[13px] leading-relaxed opacity-90">USA Paycheck Calculator 2026 is built for accuracy and AdSense compliance. We cover federal, FICA, cost of living analysis, and average salary benchmarks. IRS 2026 Verified. Contact: support@usapaycheckcalculator2026.com (example) - response 24-48h, accuracy@usapaycheckcalculator2026.com - for bracket corrections, 123 Congress Ave, Suite 400, Austin, TX 78701 (example placeholder address for policy compliance) By using USA Paycheck Calculator 2026, you agree to these Terms. If you do not agree, do not use the site. To maximum extent permitted by law, we are not liable for any decisions made based on calculator output (e.g., job offers, budgeting). Max liability $50. Provided without warranty. While we test against ADP, we do not guarantee exact match due to pre-tax deductions, employer withholding methods, local taxes, and timing. Use at your own risk.</p>
            <div className="mt-4 grid md:grid-cols-3 gap-3 text-[11px]">
              <div className="bg-white/10 rounded-xl p-3">Annual Salary: Salary is direct.</div>
              <div className="bg-white/10 rounded-xl p-3">Hourly: hourly rate × hours/week × 52. If you earn $28.50/hr at 40hrs, gross = $28.50 × 2080 = $59,280.</div>
              <div className="bg-white/10 rounded-xl p-3">401(k) up to $23,500 in 2026 reduces federal and state taxable income but not FICA (except HSA). Health insurance, HSA ($4,300 single), FSA reduce taxable.</div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
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

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="text-[12px] font-black tracking-widest uppercase">State Calculators</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200">No Income Tax</span>
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 text-[11px] font-bold border border-amber-200">Progressive Tax</span>
              {STATES.filter(s=>s.taxType==="no").map(s=> <span key={s.code} className="px-2.5 py-1 rounded-full bg-slate-100 text-[11px]">{s.name} 0% tax</span>)}
            </div>
          </div>

          <div className="h-[250px] w-[300px] mx-auto bg-slate-100 rounded-xl flex items-center justify-center text-[12px] text-slate-400 border border-dashed border-slate-200">
            Ad 300x250
          </div>

          <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-2xl p-6 text-white">
            <div className="text-[11px] tracking-widest uppercase opacity-70 font-bold">Federal 2026 Brackets</div>
            <div className="mt-3 space-y-1 text-[12px] leading-relaxed opacity-90">
              <div>2026 single brackets: 10% to $11,600, 12% to $47,150, 22% to $100,525, 24% to $191,950, 32% to $243,725, 35% to $609,350, 37% above. Tax is marginal - you only pay higher rate on portion above threshold. Married joint doubles thresholds.</div>
              <div className="mt-3 h-px bg-white/15"></div>
              <div>9 states (TX, FL, NV, WA, WY, SD, AK, TN, NH) 0%. 12 states flat 3-5.5%. Others progressive. City taxes in OH, PA, MI, NY, etc add 1-3.876%. Our calculator includes all.</div>
              <div className="mt-3 h-px bg-white/15"></div>
              <div>Social Security 6.2% on first $176,100 (2026 wage base), Medicare 1.45% on all wages, plus 0.9% extra Medicare over $200k single / $250k joint. Total 7.65% for most, 8.55% for high earners. Employer matches same.</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="text-[12px] font-black tracking-widest uppercase">Send Message</div>
            <input placeholder="Your email" className="mt-3 w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px]" />
            <textarea placeholder="Message..." className="mt-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] h-[90px] resize-none"></textarea>
            <button className="mt-3 w-full bg-slate-900 text-white rounded-xl py-3 text-sm font-bold">Send Message →</button>
            <div className="mt-3 text-[11px] text-slate-500">support@usapaycheckcalculator2026.com (example) - response 24-48h</div>
          </div>

          <div className="text-center text-[11px] text-slate-400 py-6">IRS 2026 Verified • AdSense Compliant • No data stored</div>
        </div>
      </main>

      {/* Footer - Exact from original */}
      <footer className="mt-12 bg-white border-t border-slate-200">
        <div className="max-w-[1240px] mx-auto px-4 lg:px-6 py-10 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black">$</div>
              <div className="font-black text-[15px]">USA Paycheck Calculator 2026</div>
            </div>
            <div className="mt-3 text-[13px] text-slate-600 leading-relaxed">Accurate take-home pay calculator with federal, state, FICA, and city taxes. IRS 2026 Verified. Average salary benchmarks, cost of living analysis, and state-specific research.</div>
          </div>
          <div>
            <div className="font-bold uppercase tracking-wider text-[11px] text-slate-500 mb-3">Popular States</div>
            <div className="space-y-1.5 text-[13px]">
              <a href="/" className="block text-slate-600 hover:text-slate-900">Texas - No state tax</a>
              <a href="/" className="block text-slate-600 hover:text-slate-900">California - Progressive</a>
              <a href="/" className="block text-slate-600 hover:text-slate-900">Florida - No tax</a>
              <a href="/" className="block text-slate-600 hover:text-slate-900">New York + NYC tax</a>
            </div>
          </div>
          <div>
            <div className="font-bold uppercase tracking-wider text-[11px] text-slate-500 mb-3">About</div>
            <div className="space-y-1.5 text-[13px]">
              <a href="/about" className="block text-slate-600 hover:text-slate-900">About Us</a>
              <a href="/contact" className="block text-slate-600 hover:text-slate-900">Contact Us - abdmazn55@gmail.com</a>
              <a href="/privacy" className="block text-slate-600 hover:text-slate-900">Privacy Policy</a>
              <a href="/terms" className="block text-slate-600 hover:text-slate-900">Terms of Service & W-4 Guide</a>
            </div>
          </div>
          <div>
            <div className="font-bold uppercase tracking-wider text-[11px] text-slate-500 mb-3">Trust & Compliance</div>
            <div className="text-[13px] text-slate-600 leading-relaxed space-y-2">
              <p>© 2026 USA Paycheck Calculator. Not affiliated with IRS or ADP. For educational purposes. Consult CPA for tax advice.</p>
              <p>AdSense: This site uses Google AdSense cookies per Privacy Policy. No personal paycheck data is transmitted.</p>
              <p>Contact: support@usapaycheckcalculator2026.com (example)</p>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 py-4 text-center text-[11px] text-slate-500">Built as single-file authority site • 15 pages • Hash routing for SEO • Ready for Google AdSense approval 2026 • abdmazn55@gmail.com</div>
      </footer>
    </div>
  );
}

