import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import {
  resolveCategory,
  resolveDefault,
  resolveProduct,
  resolveBySlug,
  allOutboundSlugs,
  withTracking,
  isSafeMerchantUrl,
  STATUS,
} from '../lib/affiliate.js';
import { outPath, isValidSlug, DEFAULT_SLUG } from '../lib/outbound.js';
import { PRODUCTS, CATEGORIES, FEATURED_PRODUCT, validateManifest } from '../lib/manifest.js';
import { assetPath, canonicalUrl, LOGO } from '../lib/config.js';
import { SOCIAL_IMAGE } from '../lib/seo.js';

const walk = (dir, out = []) => {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
};

test('category links are returned exactly as supplied', () => {
  assert.equal(
    resolveCategory('flash-deals').href,
    'https://www.letbricks.com/product-category/flash-deals/mass-production-best-quality-moc-blocks-sets/?ref=kfjtocxz',
  );
  assert.equal(resolveCategory('military-bricks').href, 'https://www.letbricks.com/military-bricks-moc-sets/?ref=kfjtocxz');
});

test('unknown category fails safely with no href', () => {
  const r = resolveCategory('does-not-exist');
  assert.equal(r.href, null);
  assert.equal(r.status, STATUS.BLOCKED_AMBIGUOUS_MAPPING);
  assert.equal(resolveCategory('constructor').href, null);
});

test('default destination is the supplied affiliate URL', () => {
  assert.equal(resolveDefault().href, 'https://www.letbricks.com/?ref=kfjtocxz');
  assert.equal(resolveBySlug(DEFAULT_SLUG).href, 'https://www.letbricks.com/?ref=kfjtocxz');
});

test('product URLs keep their path and gain exactly one ref', () => {
  for (const p of PRODUCTS) {
    const href = resolveProduct(p).href;
    assert.ok(href.endsWith('?ref=kfjtocxz'), p.id);
    assert.equal(new URL(href).pathname, new URL(p.sourceUrl).pathname);
  }
});

test('withTracking never duplicates or overwrites an identifier', () => {
  assert.equal(withTracking('https://www.letbricks.com/x/?ref=kfjtocxz'), 'https://www.letbricks.com/x/?ref=kfjtocxz');
  assert.equal(withTracking('https://www.letbricks.com/x/?ref=someoneelse'), null);
  assert.equal(withTracking('https://www.letbricks.com/x/?a=1#top'), 'https://www.letbricks.com/x/?a=1&ref=kfjtocxz#top');
});

test('unsafe protocols and foreign hosts are rejected', () => {
  assert.equal(isSafeMerchantUrl('javascript:alert(1)'), false);
  assert.equal(isSafeMerchantUrl('http://www.letbricks.com/'), false);
  assert.equal(isSafeMerchantUrl('https://evil.example/?ref=kfjtocxz'), false);
  assert.equal(resolveProduct({ id: 'x', sourceUrl: 'https://evil.example/' }).href, null);
});

test('manifest validates and piece counts match the owner-supplied values', () => {
  assert.deepEqual(validateManifest(), []);
  assert.equal(PRODUCTS.find((p) => p.id === 'b2-spirit-stealth-bomber-moc-166363').pieceCount, 1977);
  assert.equal(PRODUCTS.find((p) => p.id === 'ch-53e-super-stallion-moc-127265').pieceCount, 2099);
});

// ---- Section 13.5: internal outbound redirects ----
test('every outbound slug is unique, keyword-style and resolves to a safe merchant URL with one ref', () => {
  const slugs = allOutboundSlugs();
  assert.equal(new Set(slugs).size, slugs.length, 'slug collision');
  for (const s of slugs) {
    assert.ok(isValidSlug(s), `${s} is not a clean slug`);
    const r = resolveBySlug(s);
    assert.ok(r.href && isSafeMerchantUrl(r.href), `${s} did not resolve`);
    assert.equal(new URL(r.href).searchParams.getAll('ref').join(), 'kfjtocxz');
  }
});

test('unknown, malformed or hostile slugs never redirect', () => {
  for (const s of ['nope', '../etc/passwd', 'a/b', 'http://evil.example', 'Moc-Sets', '', 'constructor', '__proto__', undefined]) {
    assert.equal(resolveBySlug(s).href, null, String(s));
  }
});

test('outPath is the basePath-prefixed internal route', () => {
  assert.equal(outPath('moc-sets'), '/letbricks/api/out/moc-sets');
  assert.equal(outPath('bad slug'), null);
});

test('route handler redirects with 302, noindex and no caching', () => {
  const src = readFileSync('app/api/out/[slug]/route.js', 'utf8');
  assert.match(src, /status: 302/);
  assert.match(src, /Location: result\.href/);
  assert.match(src, /noindex, nofollow/);
  assert.match(src, /no-store/);
  assert.match(src, /status: 404/);
});

test('components never render a raw merchant URL; anchors use the internal path', () => {
  for (const f of [...walk('components'), ...walk('app')].filter((x) => /\.js$/.test(x) && !x.includes('api'))) {
    const src = readFileSync(f, 'utf8');
    assert.ok(!/letbricks\.com\/[^\s'"`]*ref=/.test(src), `${f} has an affiliate URL`);
    assert.ok(!/href=\{?["'`]https?:\/\/(www\.)?letbricks/.test(src), `${f} has a raw merchant href`);
  }
  const link = readFileSync('components/AffiliateLink.js', 'utf8');
  assert.match(link, /href=\{href\}/);
  assert.match(link, /outPath\(slug\)/);
  assert.match(link, /target="_blank"/);
  assert.match(link, /rel="noopener noreferrer"/);
  // Client bundles (Header) must not import the resolver that holds merchant URLs.
  assert.ok(!/lib\/affiliate\.js/.test(readFileSync('components/Header.js', 'utf8')));
});

test('robots keeps redirect endpoints out of the index', () => {
  assert.match(readFileSync('app/robots.js', 'utf8'), /api\/out\//);
});

// ---- Section 13.6: SEO structure ----
test('headings: exactly one h1 per page template, h2 for sections, h3 only for cards and offers', () => {
  const count = (f, re) => (readFileSync(f, 'utf8').match(re) || []).length;
  assert.equal(count('components/Hero.js', /<h1[\s>]/g), 1);
  assert.equal(count('components/LegalPage.js', /<h1[\s>]/g), 1);
  for (const f of walk('app').concat(walk('components')).filter((x) => /\.js$/.test(x))) {
    if (f.endsWith('Hero.js') || f.endsWith('LegalPage.js')) continue;
    assert.equal(count(f, /<h1[\s>]/g), 0, `${f} has an extra h1`);
  }
  assert.ok(count('app/page.js', /<h2[\s>]/g) + count('app/page.js', /SectionHeading/g) > 3);
});

test('product slugs are readable and carry the product keyword', () => {
  const must = {
    'pirates-of-the-caribbean-naval-battle-moc-275985': ['pirates', 'naval-battle'],
    'uss-arizona-battleship-moc-275741': ['uss-arizona', 'battleship'],
    'palace-of-versailles-modular-building-blocks': ['versailles', 'building-blocks'],
    'b2-spirit-stealth-bomber-moc-166363': ['b2-spirit', 'stealth-bomber'],
    'ch-53e-super-stallion-moc-127265': ['ch-53e', 'super-stallion'],
  };
  for (const [id, parts] of Object.entries(must)) {
    assert.ok(PRODUCTS.some((p) => p.id === id), id);
    for (const part of parts) assert.ok(id.includes(part), `${id} lacks ${part}`);
  }
  for (const c of CATEGORIES) assert.ok(isValidSlug(c.id));
});

test('primary keyword appears naturally in title, h1 and description', () => {
  const hero = readFileSync('components/Hero.js', 'utf8');
  assert.match(hero, /MOC building block sets/);
  const seo = readFileSync('lib/seo.js', 'utf8');
  assert.match(seo, /MOC Building Block Sets/);
  assert.match(seo, /MOC building block sets/);
});

test('social image is a product photo, never the logo or favicon', () => {
  assert.equal(SOCIAL_IMAGE.url, FEATURED_PRODUCT.image.src);
  assert.ok(SOCIAL_IMAGE.url.startsWith('https://www.letbricks.com/wp-content/uploads/'));
  assert.ok(!/logo|favicon/i.test(SOCIAL_IMAGE.url));
});

test('asset and canonical URLs respect the /letbricks subpath without duplication', () => {
  assert.equal(assetPath('/favicon.ico'), '/letbricks/favicon.ico');
  assert.equal(LOGO.src, '/letbricks/logo.png');
  assert.equal(canonicalUrl('/'), 'https://primegearlab.com/letbricks');
  assert.equal(canonicalUrl('/privacy'), 'https://primegearlab.com/letbricks/privacy');
  assert.ok(!canonicalUrl('/privacy').includes('/letbricks/letbricks'));
});

test('mobile card DOM order is image, title, description, action', () => {
  for (const file of ['components/ProductCard.js', 'components/CategoryCard.js']) {
    const src = readFileSync(file, 'utf8');
    const order = ['product-card__image', 'product-card__title', 'product-card__description', 'product-card__action'].map((c) => src.indexOf(c));
    assert.ok(order.every((i) => i > -1), `${file}: missing a card part`);
    assert.deepEqual([...order].sort((a, b) => a - b), order, `${file}: card parts out of order`);
    assert.ok(!/\border-(first|last|\d)|absolute/.test(src), `${file}: reordering or overlay class found`);
  }
});

test('next.config sets basePath, assetPrefix and merchant remotePatterns', () => {
  const cfg = readFileSync('next.config.mjs', 'utf8');
  assert.match(cfg, /basePath: SUBPATH/);
  assert.match(cfg, /assetPrefix: SUBPATH/);
  assert.match(cfg, /hostname: 'www\.letbricks\.com'/);
});

test('.gitignore does not swallow the outbound route folder (app/api/out)', () => {
  const lines = readFileSync('.gitignore', 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
  // An unanchored "out" or "out/" matches at any depth, including app/api/out, and the route is then missing on Vercel.
  assert.ok(!lines.includes('out') && !lines.includes('out/'), 'use /out, not out');
  assert.ok(readFileSync('app/api/out/[slug]/route.js', 'utf8').includes('export function GET'));
});

// ---- Speed: Edge runtime redirect + instant click feedback ----
test('redirect route runs on the Edge runtime and stays dependency-light', () => {
  const src = readFileSync('app/api/out/[slug]/route.js', 'utf8');
  assert.match(src, /^[\s\S]*export const runtime = 'edge';/);
  assert.ok(!/from 'node:|require\(|from 'fs'|from 'path'/.test(src), 'Node-only import in an Edge route');
  for (const f of ['lib/affiliate.js', 'lib/outbound.js', 'lib/manifest.js', 'lib/config.js']) {
    assert.ok(!/from 'node:|require\(|from 'fs'|from 'path'|Buffer\./.test(readFileSync(f, 'utf8')), `${f} is not Edge-safe`);
  }
});

test('CTA click feedback is visual only: no preventDefault, no JS navigation, auto-reset', () => {
  const src = readFileSync('components/AffiliateLink.js', 'utf8');
  assert.match(src, /^'use client';/);
  assert.match(src, /Redirecting…/);
  assert.match(src, /aria-busy/);
  assert.match(src, /setTimeout\(clear, RESET_MS\)/);
  assert.match(src, /pageshow/);
  assert.ok(!/preventDefault|window\.open|window\.location|router\./.test(src));
  assert.match(src, /target="_blank"/);
  assert.match(src, /rel="noopener noreferrer"/);
});

test('button class strings live outside the client component', () => {
  assert.ok(!/export const BUTTON_/.test(readFileSync('components/AffiliateLink.js', 'utf8')));
  assert.match(readFileSync('components/buttonStyles.js', 'utf8'), /export const BUTTON_PRIMARY/);
  for (const f of [...walk('components'), ...walk('app')].filter((x) => /\.js$/.test(x))) {
    assert.ok(!/BUTTON_\w+[^;\n]*from '[^']*AffiliateLink\.js'/.test(readFileSync(f, 'utf8')), `${f} imports styles from the client module`);
  }
});

test('outbound route runs on the Edge runtime and its imports are Node-free', () => {
  const route = readFileSync('app/api/out/[slug]/route.js', 'utf8');
  assert.match(route, /export const runtime = 'edge';/);
  for (const f of ['lib/affiliate.js', 'lib/manifest.js', 'lib/outbound.js', 'lib/config.js']) {
    assert.ok(!/from 'node:|require\(|from 'fs'|from 'path'|Buffer\./.test(readFileSync(f, 'utf8')), `${f} uses a Node-only API`);
  }
});

test('CTA shows instant redirecting feedback without blocking navigation', () => {
  const src = readFileSync('components/AffiliateLink.js', 'utf8');
  assert.match(src, /Redirecting/);
  assert.match(src, /onClick=\{onClick\}/);
  assert.ok(!/preventDefault/.test(src));
  assert.match(src, /pageshow/);
});
