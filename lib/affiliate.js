// Central affiliate destination resolver. No component may build or alter affiliate URLs itself.
// Category / collection URLs are the exact strings supplied in Section 1 (never rewritten).
// Raw destinations are resolved only on the server, inside app/api/out/[slug]/route.js.

import { PRODUCTS } from './manifest.js';
import { DEFAULT_SLUG, isValidSlug } from './outbound.js';

export const TRACKING_PARAM = { name: 'ref', value: 'kfjtocxz' };
export const ALLOWED_HOSTS = ['www.letbricks.com'];

export const DEFAULT_AFFILIATE_URL = 'https://www.letbricks.com/?ref=kfjtocxz';

// COLLECTION_DEEP_LINKS_MAPPING / PRODUCT_DEEP_LINKS_MAPPING — exact, unmodified.
export const CATEGORY_LINKS = Object.freeze({
  'moc-sets': 'https://www.letbricks.com/moc-sets/?ref=kfjtocxz',
  'best-seller': 'https://www.letbricks.com/product-category/best-seller/?ref=kfjtocxz',
  'military-bricks': 'https://www.letbricks.com/military-bricks-moc-sets/?ref=kfjtocxz',
  'new-moc': 'https://www.letbricks.com/product-category/flash-deals/new-moc/?ref=kfjtocxz',
  'flash-deals':
    'https://www.letbricks.com/product-category/flash-deals/mass-production-best-quality-moc-blocks-sets/?ref=kfjtocxz',
  'all-products': 'https://www.letbricks.com/?ref=kfjtocxz',
});

export const STATUS = Object.freeze({
  MAPPING_PROVIDED: 'MAPPING_PROVIDED',
  MAPPING_DERIVED: 'MAPPING_DERIVED',
  URL_SYNTAX_VALID: 'URL_SYNTAX_VALID',
  INVALID_INPUT: 'INVALID_INPUT',
  BLOCKED_MISSING_AFFILIATE_URL: 'BLOCKED_MISSING_AFFILIATE_URL',
  BLOCKED_AMBIGUOUS_MAPPING: 'BLOCKED_AMBIGUOUS_MAPPING',
});

/** Returns true only for https URLs on an allowed merchant host. */
export function isSafeMerchantUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' && ALLOWED_HOSTS.includes(u.hostname);
  } catch {
    return false;
  }
}

/**
 * Product pages are observed merchant URLs (see lib/manifest.js evidence). The only change
 * made is appending the explicitly supplied tracking parameter when it is absent; existing
 * query parameters and fragments are preserved and the identifier is never duplicated.
 */
export function withTracking(url) {
  const u = new URL(url);
  if (u.searchParams.get(TRACKING_PARAM.name) === TRACKING_PARAM.value) return u.toString();
  if (u.searchParams.has(TRACKING_PARAM.name)) return null; // conflicting ref — fail safely
  u.searchParams.append(TRACKING_PARAM.name, TRACKING_PARAM.value);
  return u.toString();
}

export function resolveDefault() {
  return isSafeMerchantUrl(DEFAULT_AFFILIATE_URL)
    ? { href: DEFAULT_AFFILIATE_URL, status: STATUS.MAPPING_PROVIDED, key: DEFAULT_SLUG }
    : { href: null, status: STATUS.BLOCKED_MISSING_AFFILIATE_URL, key: DEFAULT_SLUG };
}

export function resolveCategory(key) {
  if (!Object.hasOwn(CATEGORY_LINKS, key)) return { href: null, status: STATUS.BLOCKED_AMBIGUOUS_MAPPING, key };
  const href = CATEGORY_LINKS[key];
  if (!isSafeMerchantUrl(href)) return { href: null, status: STATUS.INVALID_INPUT, key };
  return { href, status: STATUS.MAPPING_PROVIDED, key };
}

export function resolveProduct(product) {
  const key = product?.id ?? 'unknown-product';
  if (!product?.sourceUrl || !isSafeMerchantUrl(product.sourceUrl)) {
    return { href: null, status: STATUS.INVALID_INPUT, key };
  }
  const href = withTracking(product.sourceUrl);
  if (!href) return { href: null, status: STATUS.BLOCKED_AMBIGUOUS_MAPPING, key };
  return { href, status: STATUS.MAPPING_DERIVED, key };
}

/**
 * Resolves an /api/out/<slug> request. Slugs are exact matches only (no fuzzy matching):
 * the default slug, a category key, or a product id. Anything else is BLOCKED_AMBIGUOUS_MAPPING.
 */
export function resolveBySlug(slug) {
  if (!isValidSlug(slug)) return { href: null, status: STATUS.INVALID_INPUT, key: String(slug) };
  if (slug === DEFAULT_SLUG) return resolveDefault();
  if (Object.hasOwn(CATEGORY_LINKS, slug)) return resolveCategory(slug);
  const product = PRODUCTS.find((p) => p.id === slug);
  if (product) return resolveProduct(product);
  return { href: null, status: STATUS.BLOCKED_AMBIGUOUS_MAPPING, key: slug };
}

/** Every slug that must resolve (used by validation and tests). */
export function allOutboundSlugs() {
  return [DEFAULT_SLUG, ...Object.keys(CATEGORY_LINKS), ...PRODUCTS.map((p) => p.id)];
}
