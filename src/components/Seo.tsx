import { useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://blackgifttech.com';
const LOGO_URL = 'https://i.ibb.co/1GWbN1WD/blackgiftlogo.png';
const OG_IMAGE = 'https://blackgifttech.com/og-image.jpg'; // 1200×630px recommended
const TWITTER_HANDLE = '@blackgifttech';
const SITE_NAME = 'Blackgift Tech Labs';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  /** Page-specific OG image (1200×630 recommended) */
  ogImage?: string;
  /** 'website' | 'article' | 'profile' etc. */
  ogType?: string;
  /** Locale for og:locale, e.g. 'en_ZW' */
  locale?: string;
  /** Set true on /blog/:slug, /portfolio/:slug etc. */
  isArticle?: boolean;
  /** ISO date string for article:published_time */
  publishedTime?: string;
  /** ISO date string for article:modified_time */
  modifiedTime?: string;
  /** Breadcrumb trail for this page */
  breadcrumbs?: BreadcrumbItem[];
  /** Hreflang alternates: [{ lang: 'en', url: '...' }] */
  alternates?: { lang: string; url: string }[];
  /** 'index,follow' | 'noindex,nofollow' etc. */
  robots?: string;
  /** JSON-LD page type override: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' */
  pageType?: string;
}

function resolveUrl(path?: string): string {
  if (!path) return BASE_URL;
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function Seo({
  title = SITE_NAME,
  description = 'Blackgift Tech Labs is a premier digital agency in Zimbabwe specialising in web development, mobile apps, motion graphics, videography, and innovative branding solutions.',
  canonical,
  keywords = 'digital agency Zimbabwe, tech startup Masvingo, website development, mobile app development, motion graphics, branding, videography',
  ogImage = OG_IMAGE,
  ogType = 'website',
  locale = 'en_ZW',
  isArticle = false,
  publishedTime,
  modifiedTime,
  breadcrumbs,
  alternates = [],
  robots = 'index, follow',
  pageType = 'WebPage',
}: SeoProps) {
  const fullTitle = title === SITE_NAME
    ? SITE_NAME
    : `${title} | ${SITE_NAME}`;

  const location = useLocation();
  const canonicalUrl = resolveUrl(canonical || location.pathname);
  const resolvedOgImage = ogImage.startsWith('http') ? ogImage : resolveUrl(ogImage);

  // ── JSON-LD blocks ────────────────────────────────────────────────
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${BASE_URL}/#organization`,
    name: SITE_NAME,
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    image: resolvedOgImage,
    description,
    foundingDate: '2019',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Masvingo',
      addressRegion: 'Masvingo Province',
      addressCountry: 'ZW',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: 'blackgift00@gmail.com',
        contactType: 'customer service',
        availableLanguage: ['English', 'Shona'],
      },
    ],
    sameAs: [
      // Add your actual social profiles:
      // 'https://www.facebook.com/blackgifttech',
      // 'https://www.instagram.com/blackgifttech',
      // 'https://www.linkedin.com/company/blackgift-tech-labs',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Motion Graphics & Animation' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Videography & Photography' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Identity & Design' } },
      ],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: SITE_NAME,
    description,
    publisher: { '@id': `${BASE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': pageType,
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: fullTitle,
    description,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    inLanguage: locale.replace('_', '-'),
    ...(publishedTime && { datePublished: publishedTime }),
    ...(modifiedTime && { dateModified: modifiedTime }),
    ...(breadcrumbs && breadcrumbs.length > 0 && {
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      },
    }),
  };

  const schemas = [organizationSchema, websiteSchema, webPageSchema];

  return (
    <Helmet>
      {/* ── Core ── */}
      <html lang={locale.split('_')[0]} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Geo / Regional ── */}
      <meta name="geo.region" content="ZW" />
      <meta name="geo.placename" content="Masvingo, Zimbabwe" />
      <meta name="ICBM" content="-20.0722, 30.8322" />

      {/* ── Open Graph ── */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={isArticle ? 'article' : ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={locale} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME} – ${title}`} />

      {/* Article-specific OG */}
      {isArticle && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {isArticle && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* ── Twitter / X Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />
      <meta name="twitter:image:alt" content={`${SITE_NAME} – ${title}`} />

      {/* ── Hreflang alternates ── */}
      {alternates.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      {/* x-default points to canonical */}
      {alternates.length > 0 && (
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      )}

      {/* ── Performance hints ── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://i.ibb.co" />

      {/* ── Theme / PWA ── */}
      <meta name="theme-color" content="#0a0a0a" />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* ── Structured Data (JSON-LD) ── */}
      <script type="application/ld+json">
        {JSON.stringify(schemas)}
      </script>
    </Helmet>
  );
}