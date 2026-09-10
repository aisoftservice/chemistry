import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { locales, localePath } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${SITE_URL}${localePath(locale)}`,
    lastModified: new Date('2026-09-10'),
    changeFrequency: 'monthly',
    priority: locale === 'en' ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(locales.map((language) => [language, `${SITE_URL}${localePath(language)}`])),
    },
  }));
}
