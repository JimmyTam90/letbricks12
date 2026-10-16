// Single source of truth for site-level values (Section 1 of the master prompt).
export const SITE = {
  projectName: 'letbricks',
  brandName: 'PrimeGearLab',
  contactEmail: 'daniaengracia26377@gmail.com',
  publicOrigin: 'https://primegearlab.com',
  subpath: '/letbricks',
  canonicalBaseUrl: 'https://primegearlab.com/letbricks',
  merchantName: 'Letbricks',
  merchantUrl: 'https://www.letbricks.com/',
  locale: 'en-US',
};

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || SITE.subpath;

/**
 * Prefix a root-relative public asset path (public/logo.png etc.) with the basePath.
 * next/link and next/image prefix automatically for routes; plain <img>, <link> and
 * metadata URLs do not, so every raw asset reference goes through this helper.
 */
export function assetPath(path) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}

export function canonicalUrl(path = '') {
  const clean = path === '' || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `${SITE.canonicalBaseUrl}${clean}`;
}

export const LOGO = {
  src: assetPath('/logo.png'),
  width: 1254,
  height: 1254,
  // Content of the transparent logo sits in the vertical middle of a square canvas;
  // the frame crops only the empty top and bottom margin (no distortion).
  frameRatio: 1.39,
  alt: SITE.brandName,
};
