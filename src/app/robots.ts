import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.socialsecurityguidecalc.com"

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',        // منع أرشفة مسارات البرمجة الخلفية
          '/admin/',      // منع أرشفة لوحات التحكم
          '/search',      // منع أرشفة نتائج البحث الداخلية لتجنب المحتوى المكرر
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}