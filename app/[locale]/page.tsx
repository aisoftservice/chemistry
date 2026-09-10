import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LandingPage } from '@/components/landing-page';
import { copy, locales, localePath, type Locale } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.filter((locale) => locale !== 'en').map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale) || rawLocale === 'en') return {};
  const locale = rawLocale as Locale;
  const t = copy[locale];
  const canonical = `${SITE_URL}${localePath(locale)}`;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical,
      languages: Object.fromEntries([
        ['x-default', SITE_URL],
        ...locales.map((language) => [language, `${SITE_URL}${localePath(language)}`]),
      ]),
    },
    openGraph: { title: t.metaTitle, description: t.metaDescription, url: canonical, locale },
    twitter: { title: t.metaTitle, description: t.metaDescription },
  };
}

export default async function LocalizedPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale) || rawLocale === 'en') notFound();
  return <LandingPage locale={rawLocale as Locale} />;
}
