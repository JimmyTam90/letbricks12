// Dependency-free link audit: node scripts/validate-links.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import {
  CATEGORY_LINKS,
  DEFAULT_AFFILIATE_URL,
  TRACKING_PARAM,
  isSafeMerchantUrl,
  resolveBySlug,
  allOutboundSlugs,
} from '../lib/affiliate.js';
import { outPath, isValidSlug } from '../lib/outbound.js';
import { PRODUCTS, CATEGORIES, validateManifest } from '../lib/manifest.js';

const errors = [];
const fail = (m) => errors.push(m);

// 1. Section 1 mappings must be unchanged (strict slug accuracy).
const EXPECTED = {
  'moc-sets': 'https://www.letbricks.com/moc-sets/?ref=kfjtocxz',
  'best-seller': 'https://www.letbricks.com/product-category/best-seller/?ref=kfjtocxz',
  'military-bricks': 'https://www.letbricks.com/military-bricks-moc-sets/?ref=kfjtocxz',
  'new-moc': 'https://www.letbricks.com/product-category/flash-deals/new-moc/?ref=kfjtocxz',
  'flash-deals':
    'https://www.letbricks.com/product-category/flash-deals/mass-production-best-quality-moc-blocks-sets/?ref=kfjtocxz',
  'all-products': 'https://www.letbricks.com/?ref=kfjtocxz',
};
for (const [k, v] of Object.entries(EXPECTED)) {
  if (CATEGORY_LINKS[k] !== v) fail(`category link ${k} differs from Section 1`);
}
if (DEFAULT_AFFILIATE_URL !== 'https://www.letbricks.com/?ref=kfjtocxz') fail('default affiliate URL changed');

// 2. Every outbound slug resolves through the redirect resolver, once, with exactly one ref parameter.
const slugs = allOutboundSlugs();
if (new Set(slugs).size !== slugs.length) fail('outbound slug collision');
for (const s of slugs) {
  if (!isValidSlug(s)) fail(`slug ${s} is not a clean lowercase-hyphen slug`);
  const d = resolveBySlug(s);
  if (!d.href || !isSafeMerchantUrl(d.href)) {
    fail(`slug ${s} has no safe destination`);
    continue;
  }
  const u = new URL(d.href);
  if (u.searchParams.getAll(TRACKING_PARAM.name).length !== 1 || u.searchParams.get('ref') !== TRACKING_PARAM.value) {
    fail(`slug ${s}: tracking parameter missing or duplicated`);
  }
}
for (const p of PRODUCTS) {
  if (resolveBySlug(p.id).href && new URL(resolveBySlug(p.id).href).pathname !== new URL(p.sourceUrl).pathname) {
    fail(`product ${p.id}: merchant path was modified`);
  }
}
for (const c of CATEGORIES) if (!outPath(c.id)) fail(`category ${c.id} has no internal path`);
errors.push(...validateManifest());

// 3. Source scan: no merchant/affiliate URL in components or pages, every outbound anchor via AffiliateLink,
//    no placeholder hrefs, no JS navigation.
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.next') continue;
    const p = join(dir, name);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
}
for (const file of [...walk('app'), ...walk('components')].filter((f) => /\.(js|jsx)$/.test(f))) {
  const src = readFileSync(file, 'utf8');
  if (/letbricks\.com\/[^\s'"`]*ref=/.test(src)) fail(`${file}: hard-coded affiliate URL`);
  if (/href=["']#["']/.test(src)) fail(`${file}: placeholder href`);
  if (/router\.(push|replace)|window\.open|window\.location/.test(src)) fail(`${file}: JS navigation`);
  if (/href=\{?["'`]https?:\/\//.test(src)) fail(`${file}: raw external href`);
}
const anchor = readFileSync('components/AffiliateLink.js', 'utf8');
if (!anchor.includes('target="_blank"') || !anchor.includes('rel="noopener noreferrer"')) {
  fail('AffiliateLink is missing target/rel');
}
if (!anchor.includes('outPath(slug)')) fail('AffiliateLink does not use the internal outbound path');

// 4. Heading structure: one h1 per page template.
const h1 = (f) => (readFileSync(f, 'utf8').match(/<h1[\s>]/g) || []).length;
if (h1('components/Hero.js') !== 1) fail('Hero must contain exactly one h1');
if (h1('components/LegalPage.js') !== 1) fail('LegalPage must contain exactly one h1');

// 5. Duplicate component extensions.
const stems = new Map();
for (const f of walk('components').concat(walk('app')).filter((x) => /\.(js|jsx|ts|tsx)$/.test(x))) {
  const stem = f.replace(/\.(js|jsx|ts|tsx)$/, '');
  if (stems.has(stem)) fail(`duplicate extension: ${f} and ${stems.get(stem)}`);
  stems.set(stem, f);
}

if (errors.length) {
  console.error('validate:links FAILED');
  for (const e of errors) console.error(' -', e);
  process.exit(1);
}
console.log(`validate:links OK — ${slugs.length} outbound slugs (${CATEGORIES.length} categories, ${PRODUCTS.length} products, 1 default) all resolve`);
