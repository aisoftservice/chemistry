import { ArrowRight, Atom, Camera, Check, FlaskConical, Languages, PencilRuler, ScanLine, Sparkles } from 'lucide-react';
import { APP_STORE_URL, DEVELOPER_URL, SITE_URL, sitePath } from '@/lib/site';
import { copy, localeDirection, localePath, uiLabels, type Locale } from '@/lib/i18n';

const featureIcons = [Camera, Sparkles, Atom, PencilRuler];
const toolIcons = [Atom, PencilRuler, FlaskConical, Languages];

const screenshots = [
  { src: sitePath('/chem-homework.webp'), alt: 'Chem AI camera scanner solving a chemistry homework problem' },
  { src: sitePath('/step-by-step.webp'), alt: 'Chem AI showing a detailed step-by-step chemistry solution' },
  { src: sitePath('/organic-structure.webp'), alt: 'Chem AI drawing an organic chemical structure' },
  { src: sitePath('/text-problem.webp'), alt: 'Chem AI answering a typed chemistry question' },
];

const getStructuredData = (locale: Locale) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Chem AI', alternateName: 'Chem AI: Chemistry Solver',
      description: 'Official website for Chem AI, an AI chemistry solver and homework helper for iPhone.',
      publisher: { '@id': `${SITE_URL}/#organization` }, inLanguage: locale, datePublished: '2026-09-10', dateModified: '2026-09-10',
    },
    {
      '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: 'Chemistry AI', url: SITE_URL, logo: `${SITE_URL}/app-icon.webp`,
      sameAs: [DEVELOPER_URL], contactPoint: { '@type': 'ContactPoint', email: 'lens.ai@outlook.com', contactType: 'customer support' },
    },
    {
      '@type': 'WebPage', '@id': `${SITE_URL}${localePath(locale)}#webpage`, url: `${SITE_URL}${localePath(locale)}`, name: copy[locale].metaTitle,
      isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${SITE_URL}/#app` }, author: { '@id': `${SITE_URL}/#organization` },
      datePublished: '2026-09-10', dateModified: '2026-09-10', inLanguage: locale,
    },
    {
      '@type': 'SoftwareApplication', '@id': `${SITE_URL}/#app`, name: 'Chem AI: Chemistry Solver', alternateName: 'Chemistry AI', applicationCategory: 'EducationalApplication', operatingSystem: 'iOS 13.0 or later',
      description: copy[locale].metaDescription,
      url: SITE_URL, sameAs: [APP_STORE_URL], downloadUrl: APP_STORE_URL, image: `${SITE_URL}/app-icon.webp`, author: { '@id': `${SITE_URL}/#organization` },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', ratingCount: '78', bestRating: '5' },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [...copy[locale].features.map((feature) => feature.title), ...copy[locale].tools.map((tool) => tool.title)],
    },
    { '@type': 'FAQPage', '@id': `${SITE_URL}${localePath(locale)}#faq`, url: `${SITE_URL}${localePath(locale)}#faq`, isPartOf: { '@id': `${SITE_URL}${localePath(locale)}#webpage` }, inLanguage: locale, mainEntity: copy[locale].faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
  ],
});

function AppStoreButton({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const t = copy[locale];
  return (
    <a className={`app-store-button ${compact ? 'app-store-button--compact' : ''}`} href={APP_STORE_URL} target="_blank" rel="noreferrer" aria-label="Download Chem AI on the App Store" title="Download Chem AI on the App Store">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.7 12.8c0-2.8 2.3-4.1 2.4-4.2a5 5 0 0 0-3.9-2.1c-1.7-.2-3.2 1-4 1-1 0-2.4-1-3.9-1-2 0-3.9 1.2-5 3.1-2.1 3.7-.5 9.2 1.5 12.2 1 1.5 2.2 3.1 3.8 3 1.5-.1 2.1-1 3.9-1s2.3 1 3.9 1c1.6 0 2.7-1.5 3.7-3a13.4 13.4 0 0 0 1.7-3.5 5.5 5.5 0 0 1-4.1-5.5ZM16.1 4.7A5.5 5.5 0 0 0 17.4.8a5.6 5.6 0 0 0-3.7 1.9 5.2 5.2 0 0 0-1.3 3.8 4.7 4.7 0 0 0 3.7-1.8Z" /></svg>
      <span><small>{t.downloadOn}</small>{t.appStore}</span>
    </a>
  );
}

export function LandingPage({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale];
  const labels = uiLabels[locale];
  const structuredData = getStructuredData(locale);
  return (
    <main lang={locale} dir={localeDirection(locale)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label={t.homeTitle} title={t.homeTitle}><img src={sitePath('/app-icon.webp')} alt="Chem AI app icon" title="Chem AI app icon" width="42" height="42" /><span>CHEM AI</span></a>
        <div className="nav-links"><a href="#features">{t.nav[0]}</a><a href="#how-it-works">{t.nav[1]}</a><a href="#faq">{t.nav[2]}</a></div>
        <div className="nav-actions">
          <details className="language-menu"><summary aria-label="Select language">{locale.toUpperCase()}</summary><div>{Object.entries(copy).map(([code, item]) => <a key={code} href={sitePath(localePath(code as Locale))} hrefLang={code} aria-current={code === locale ? 'page' : undefined}>{item.language}</a>)}</div></details>
          <a className="nav-cta" href={APP_STORE_URL} target="_blank" rel="noreferrer" title={t.getApp}>{t.getApp} <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="orb orb-one" /><div className="orb orb-two" />
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span /> {t.heroEyebrow}</div>
            <h1>{t.heroTitle}<br /><em>{t.heroAccent}</em></h1>
            <p className="hero-lede">{t.heroLede}</p>
            <div className="hero-actions"><AppStoreButton locale={locale} /><a className="text-link" href="#how-it-works">{t.seeHow} <ArrowRight size={17} aria-hidden="true" /></a></div>
            <div className="trust-row" aria-label="App Store rating and availability">
              <div><strong>4.7</strong><span className="stars">★★★★★</span><small>78 {t.ratings}</small></div><i />
              <div><strong>18+</strong><small>{t.languages}</small></div><i />
              <div><strong>{t.free}</strong><small>{t.freeNote}</small></div>
            </div>
            <p className="source-note"><cite><a href={APP_STORE_URL} target="_blank" rel="noreferrer">{t.source}</a></cite></p>
          </div>
          <div className="hero-visual" aria-label="Chem AI app preview">
            <div className="formula formula-one">C₆H₁₂O₆</div><div className="formula formula-two">H₂SO₄</div>
            <div className="molecule"><span /><span /><span /><span /></div>
            <div className="phone phone-back"><img src={sitePath('/step-by-step.webp')} alt="Step-by-step chemistry solution in Chem AI" title="Chem AI step-by-step solution" /></div>
            <div className="phone phone-front"><img src={sitePath('/chem-homework.webp')} alt="Chemistry homework scanner in Chem AI" title="Chem AI homework scanner" /></div>
            <div className="floating-card scan-card"><ScanLine size={20} aria-hidden="true" /><span><small>{labels.scanComplete}</small>{labels.problemRecognized}</span><Check size={17} aria-hidden="true" /></div>
            <div className="floating-card answer-card"><Sparkles size={19} aria-hidden="true" /><span><small>{labels.aiAnswer}</small>{labels.readyInSeconds}</span></div>
          </div>
        </div>
        <div className="hero-bottom-note"><span>{labels.trustedWorldwide}</span><i /></div>
      </section>

      <section className="feature-section" id="features">
        <div className="section-intro">
          <div className="eyebrow eyebrow-dark"><span /> {t.featureEyebrow}</div>
          <h2>{t.featureTitle}<br /><em>{t.featureAccent}</em></h2>
          <p>{t.featureIntro}</p>
        </div>
        <div className="feature-grid">
          {t.features.map(({ title, copy: cardCopy }, index) => { const Icon = featureIcons[index]; return <article className="feature-card" key={title}><div className="feature-head"><span className="feature-icon"><Icon size={23} /></span><b>0{index + 1}</b></div><h3>{title}</h3><p>{cardCopy}</p></article>; })}
        </div>
      </section>

      <section className="workflow-section" id="how-it-works">
        <div className="workflow-copy">
          <div className="eyebrow"><span /> {t.workflowEyebrow}</div><h2>{t.workflowTitle}<br /><em>{t.workflowAccent}</em></h2>
          <p>{t.workflowIntro}</p>
          <ol className="steps">
            {t.steps.map((step, index) => <li key={step.title}><b>{index + 1}</b><span><strong>{step.title}</strong><small>{step.copy}</small></span></li>)}
          </ol><AppStoreButton locale={locale} compact />
        </div>
        <div className="screenshot-stage">
          {screenshots.map((shot, index) => <figure key={shot.src} className={`shot shot-${index + 1}`}><img src={shot.src} alt={shot.alt} title={shot.alt} loading={index > 1 ? 'lazy' : undefined} /></figure>)}
        </div>
      </section>

      <section className="toolkit-section" id="about">
        <div className="toolkit-copy"><div className="eyebrow eyebrow-dark"><span /> {t.toolkitEyebrow}</div><h2>{t.toolkitTitle}<br /><em>{t.toolkitAccent}</em></h2><p className="toolkit-intro">{t.toolkitIntro}</p></div>
        <div className="tool-list">
          {t.tools.map((tool, index) => { const Icon = toolIcons[index]; return <article key={tool.title}><Icon /><div><h3>{tool.title}</h3><p>{tool.copy}</p></div></article>; })}
        </div>
      </section>

      <figure className="app-store-proof">
        <blockquote>{t.proofQuote}</blockquote>
        <figcaption><cite><a href={APP_STORE_URL} target="_blank" rel="noreferrer">{t.proofCaption}</a></cite></figcaption>
      </figure>

      <section className="faq-section" id="faq">
        <div className="faq-heading"><div className="eyebrow eyebrow-dark"><span /> {t.faqEyebrow}</div><h2>{t.faqTitle}<br /><em>{t.faqAccent}</em></h2></div>
        <div className="faq-list">{t.faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary><h3>{faq.question}</h3><i>+</i></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      <section className="final-cta">
        <div className="cta-mark"><img src={sitePath('/app-icon.webp')} alt="Chem AI app icon" title="Chem AI: Chemistry Solver" width="92" height="92" /></div>
        <div className="eyebrow"><span /> {t.ctaEyebrow}</div><h2>{t.ctaTitle}<br /><em>{t.ctaAccent}</em></h2>
        <p>{t.ctaCopy}</p><AppStoreButton locale={locale} />
      </section>

      <footer>
        <a className="brand footer-brand" href="#top" title="Back to Chem AI home"><img src={sitePath('/app-icon.webp')} alt="Chem AI app icon" title="Chem AI app icon" width="36" height="36" /><span>CHEM AI</span></a>
        <p>{t.footerCopy}</p>
        <div className="footer-links"><a href="#about">{t.about}</a><a href="mailto:lens.ai@outlook.com">{t.contact}</a><a href="https://kksoftservice.github.io/chemistry_ai/en/policy.html" target="_blank" rel="noreferrer">{t.privacy}</a><a href="https://kksoftservice.github.io/chemistry_ai/en/support.html" target="_blank" rel="noreferrer">{t.terms}</a><a href={APP_STORE_URL} target="_blank" rel="noreferrer">App Store</a></div>
        <small>{labels.copyright}</small>
      </footer>
      <div className="mobile-cta"><span><img src={sitePath('/app-icon.webp')} alt="Chem AI app icon" title="Chem AI app icon" width="42" height="42" /><b>{t.getApp}<small>{t.freeNote} · App Store</small></b></span><a href={APP_STORE_URL} target="_blank" rel="noreferrer">{t.download}</a></div>
    </main>
  );
}
