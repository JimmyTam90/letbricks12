import { SITE, canonicalUrl } from '../lib/config.js';

export default function robots() {
  return {
    // Redirect endpoints are not pages; keep them out of the index.
    rules: [{ userAgent: '*', allow: '/', disallow: [`${SITE.subpath}/api/out/`] }],
    sitemap: canonicalUrl('/sitemap.xml'),
  };
}
