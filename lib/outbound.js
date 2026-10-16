// Client-safe outbound path helpers (Section 13.5). This file contains no merchant URLs:
// the DOM only ever sees /letbricks/api/out/<slug>; the server handler resolves the real destination.
import { BASE_PATH } from './config.js';

export const DEFAULT_SLUG = 'shop-letbricks';
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidSlug(slug) {
  return typeof slug === 'string' && slug.length <= 96 && SLUG_PATTERN.test(slug);
}

/** Internal, basePath-aware path for an outbound CTA. Returns null for an invalid slug. */
export function outPath(slug) {
  return isValidSlug(slug) ? `${BASE_PATH}/api/out/${slug}` : null;
}
