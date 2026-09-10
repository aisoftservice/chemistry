import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SITE_URL } from '@/lib/site';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Chem AI — AI Chemistry Solver & Homework Helper for iPhone',
  description: 'Scan chemistry homework and get clear, step-by-step answers with Chem AI. Explore the periodic table, draw structures, and calculate molar mass on iPhone.',
  keywords: ['chemistry solver', 'chemistry homework helper', 'chemistry scanner', 'molar mass calculator'],
  applicationName: 'Chem AI: Chemistry Solver', category: 'education', alternates: { canonical: SITE_URL },
  appleWebApp: { capable: true, title: 'Chem AI' }, icons: { icon: [{ url: `${SITE_URL}/favicon.svg`, type: 'image/svg+xml' }], apple: `${SITE_URL}/app-icon.webp` },
  openGraph: { type: 'website', siteName: 'Chem AI', url: SITE_URL, title: 'Chem AI — Complex chemistry. Clear answers.', description: 'Scan chemistry problems and learn from clear, step-by-step AI explanations on iPhone.' },
  twitter: { card: 'summary', title: 'Chem AI — AI Chemistry Solver for iPhone', description: 'Scan chemistry problems and get clear, step-by-step explanations.' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#07130f' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WHV83P2EHG"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WHV83P2EHG');
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
