# letbricks (PrimeGearLab × Letbricks)

Next.js 14.2.35 App Router, JavaScript, Tailwind 3, npm. Hub–Spoke subpath deployment at
`https://primegearlab.com/letbricks`, Spoke at `https://letbricks12.vercel.app/letbricks`.

## Run

```bash
npm install
npm run check      # link validation + unit tests (Node only, no dependencies needed)
npm run build
npm run start
```

## Where things live

- `app/api/out/[slug]/route.js` — internal outbound redirect (302, `noindex`, `no-store`). Every CTA links to `/letbricks/api/out/<slug>`; no raw affiliate URL is rendered in the HTML.
- `lib/affiliate.js` — server-side resolver. Category links are the exact Section 1 strings; product pages get the supplied `ref` parameter appended once. Slugs are exact-match only.
- `lib/outbound.js` — client-safe slug helpers (no merchant URLs).
- `lib/manifest.js` — categories, collections, products, offers, FAQ. A product `id` is also its keyword slug. Piece counts: B2 Spirit 1977, CH-53E 2099 (owner-supplied).
- `components/AffiliateLink.js` — the only outbound anchor (`target="_blank" rel="noopener noreferrer"`).
- `next.config.mjs` — `basePath` and `assetPrefix` `/letbricks`, `images.remotePatterns` for `www.letbricks.com`.
- `docs/hub-vercel.json` — rewrites to merge into the Hub project's `vercel.json`.
- `docs/MASTER_PROMPT_V4.3.md` — master prompt with the redirect-routing (13.5) and keyword-slug (13.6) locks added.
- `public/logo.png`, `public/favicon.ico`, `public/apple-touch-icon.png` — served at `/letbricks/...`. Copies of the logo and favicon also sit in `public/letbricks/` because `BRAND_LOGO_PATH` and `FAVICON_PUBLIC_PATH` name that folder; components reference only `/letbricks/logo.png` and `/letbricks/favicon.ico`.

## Verification status

Done without Next.js installed: `npm run check` (validation and 20 tests), and a render of the real components with stubbed `next/*`
modules asserting the HTML (one h1, 15 outbound anchors all on `/letbricks/api/out/...`, card order, piece counts, redirect responses).

Not run: `npm run build`, `npm run lint`, browser or mobile layout checks. Also untested: Hub rewrites, remote product images through the
Next.js optimizer, whether the affiliate program permits redirected links, and affiliate attribution.
