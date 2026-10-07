import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fixedwithadsensefinal.vercel.app'
  
  const pages = [
    { path: '', priority: 1, freq: 'daily' as const },
    { path: '/how-to-calculate-paycheck', priority: 0.9, freq: 'weekly' as const },
    { path: '/federal-tax-brackets-2026', priority: 0.9, freq: 'weekly' as const },
    { path: '/w4-form-guide', priority: 0.9, freq: 'weekly' as const },
    { path: '/overtime-pay-calculator-guide', priority: 0.9, freq: 'weekly' as const },
    { path: '/texas-paycheck-calculator', priority: 0.8, freq: 'weekly' as const },
    { path: '/california-paycheck-calculator', priority: 0.8, freq: 'weekly' as const },
    { path: '/florida-paycheck-calculator', priority: 0.8, freq: 'weekly' as const },
    { path: '/new-york-paycheck-calculator', priority: 0.8, freq: 'weekly' as const },
    { path: '/illinois-paycheck-calculator', priority: 0.8, freq: 'weekly' as const },
    { path: '/pennsylvania-paycheck-calculator', priority: 0.8, freq: 'weekly' as const },
    { path: '/ohio-paycheck-calculator', priority: 0.8, freq: 'weekly' as const },
    { path: '/georgia-paycheck-calculator', priority: 0.8, freq: 'weekly' as const },
    { path: '/about', priority: 0.5, freq: 'monthly' as const },
    { path: '/contact', priority: 0.5, freq: 'monthly' as const },
    { path: '/privacy', priority: 0.3, freq: 'yearly' as const },
    { path: '/terms', priority: 0.3, freq: 'yearly' as const },
    { path: '/disclaimer', priority: 0.3, freq: 'yearly' as const },
  ]

  return pages.map((p) => ({
    url: `${baseUrl}${p.path}`,
    lastModified: new Date('2026-01-15'),
    changeFrequency: p.freq,
    priority: p.priority,
  }))
}
