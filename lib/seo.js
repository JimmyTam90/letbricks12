import { SITE, canonicalUrl } from './config.js';
import { FEATURED_PRODUCT } from './manifest.js';

export const SITE_TITLE = 'PrimeGearLab × Letbricks: Custom MOC Building Block Sets';
export const SITE_DESCRIPTION =
  'Browse custom MOC building block sets from Letbricks: naval battles, palaces, stealth bombers and helicopters, with designers, piece counts and prices.';

// Social preview image is always the primary featured product photo — never the logo or favicon.
export const SOCIAL_IMAGE = {
  url: FEATURED_PRODUCT.image.src,
  alt: FEATURED_PRODUCT.image.alt,
};

export function pageMetadata({ path, title, description = SITE_DESCRIPTION }) {
  const fullTitle = title ?? SITE_TITLE;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: canonicalUrl(path) },
    openGraph: {
      type: 'website',
      url: canonicalUrl(path),
      siteName: SITE.brandName,
      locale: 'en_US',
      title: fullTitle,
      description,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}
