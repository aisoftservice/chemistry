import {
  copyFileSync,
  existsSync,
  mkdirSync,
  renameSync,
  writeFileSync,
} from 'node:fs';

const outputDirectory = new URL('../dist/client/', import.meta.url);
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
const locales = ['en', 'it', 'de', 'fr', 'ja', 'ko', 'es', 'ar'];

if (!siteUrl) {
  throw new Error(
    'NEXT_PUBLIC_SITE_URL is required to prepare the Pages artifact.',
  );
}

const assetPrefix = new URL(siteUrl).pathname.replace(/^\/+|\/+$/g, '');
if (assetPrefix) {
  const prefixedAssets = new URL(`${assetPrefix}/_next/`, outputDirectory);
  const rootAssets = new URL('_next/', outputDirectory);
  if (existsSync(prefixedAssets)) {
    renameSync(prefixedAssets, rootAssets);
  }
}

for (const locale of locales.filter((value) => value !== 'en')) {
  const localeDirectory = new URL(`${locale}/`, outputDirectory);
  mkdirSync(localeDirectory, { recursive: true });
  copyFileSync(
    new URL(`${locale}.html`, outputDirectory),
    new URL('index.html', localeDirectory),
  );
  copyFileSync(
    new URL(`${locale}.rsc`, outputDirectory),
    new URL('index.rsc', localeDirectory),
  );
}

const sitemapEntries = locales
  .map((locale) => {
    const path = locale === 'en' ? '/' : `/${locale}/`;
    return `  <url><loc>${siteUrl}${path}</loc></url>`;
  })
  .join('\n');

writeFileSync(new URL('.nojekyll', outputDirectory), '');
writeFileSync(
  new URL('robots.txt', outputDirectory),
  `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
);
writeFileSync(
  new URL('sitemap.xml', outputDirectory),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`,
);
