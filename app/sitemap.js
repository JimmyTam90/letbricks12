import { canonicalUrl } from '../lib/config.js';

const ROUTES = ['/', '/privacy', '/terms', '/affiliate-disclosure', '/contact'];

export default function sitemap() {
  return ROUTES.map((path) => ({
    url: canonicalUrl(path),
    lastModified: new Date('2026-10-16'),
  }));
}
