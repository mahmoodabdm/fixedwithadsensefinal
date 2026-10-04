import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fixedwithadsensefinal.vercel.app'
  
  const routes = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/texas-paycheck-calculator',
    '/california-paycheck-calculator',
    '/florida-paycheck-calculator',
    '/new-york-paycheck-calculator',
    '/illinois-paycheck-calculator',
    '/pennsylvania-paycheck-calculator',
    '/ohio-paycheck-calculator',
    '/georgia-paycheck-calculator',
    '/how-to-calculate-paycheck',
    '/w4-form-guide',
    '/federal-tax-brackets-2026',
    '/overtime-pay-calculator-guide',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
