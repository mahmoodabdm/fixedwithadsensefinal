
"use client";
import { useState } from "react";
export default function ContactPage() {
  const [form, setForm] = useState({name:"",email:"",message:""});
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-[1240px] mx-auto px-4 lg:px-6 py-8">
      <div className="grid lg:grid-cols-[1fr_340px] gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <h1 className="text-[32px] font-black tracking-tight">Contact Us - abdmazn55@gmail.com - USA Paycheck Calculator Team</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600 max-w-2xl">Have a question about your paycheck calculation? Found a bracket that needs updating? Want to report an ad issue? We reply in 24-48h.</p>
          
          <div className="mt-6 space-y-4 max-w-2xl">
            <input placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[14px]" />
            <input placeholder="Your email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[14px]" />
            <textarea placeholder="How can we help? Include state, salary, and what you saw vs expected for fastest help." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[14px] h-[120px]" />
            <button onClick={()=>{setSent(true); window.location.href=`mailto:abdmazn55@gmail.com?subject=Paycheck Calculator Contact&body=${encodeURIComponent(form.message)}`}} className="w-full bg-slate-900 text-white rounded-xl py-3 text-sm font-bold">Send Message →</button>
            {sent && <div className="text-[13px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl p-3">Your email client should open. If not, email us directly at support@usapaycheckcalculator2026.com. We reply in 24-48h.</div>}
            <div className="text-[11px] text-slate-500">This form uses mailto: to protect privacy - no server storage of your message beyond your email client. See Privacy Policy.</div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 p-5 bg-white">
            <div className="font-bold">Other Ways to Reach Us</div>
            <div className="mt-3 space-y-3 text-[13px] text-slate-600">
              <div><span className="font-semibold text-slate-900">Support Email:</span> support@usapaycheckcalculator2026.com (example) - response 24-48h</div>
              <div><span className="font-semibold text-slate-900">Tax Accuracy Reports:</span> accuracy@usapaycheckcalculator2026.com - for bracket corrections</div>
              <div><span className="font-semibold text-slate-900">Privacy:</span> privacy@usapaycheckcalculator2026.com</div>
              <div><span className="font-semibold text-slate-900">Postal:</span> 123 Congress Ave, Suite 400, Austin, TX 78701 (example placeholder for policy compliance)</div>
            </div>
          </div>
          <div className="rounded-xl bg-slate-900 text-white p-5">
            <div className="font-bold">AdSense & Business</div>
            <div className="mt-2 text-[13px] text-slate-300 leading-relaxed">For advertising, partnerships, or to report ad issues: business@usapaycheckcalculator2026.com. We have 3 AdSense units per page, clearly labeled, above fold, sidebar, below content - compliant with AdSense program policies (no invalid clicks, no placement near nav trick).</div>
          </div>
        </div>
      </div>
    </div>
  )
}
