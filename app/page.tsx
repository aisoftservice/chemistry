import type { Metadata } from 'next';
import { LandingPage } from '@/components/landing-page';
import { copy, locales, localePath } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: copy.en.metaTitle,
  description: copy.en.metaDescription,
  alternates: {
    canonical: SITE_URL,
    languages: Object.fromEntries([
      ['x-default', SITE_URL],
      ...locales.map((locale) => [locale, `${SITE_URL}${localePath(locale)}`]),
    ]),
  },
};

export default function Home() {
  return <LandingPage locale="en" />;
}
