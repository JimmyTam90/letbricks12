// Shared button class strings. Kept out of AffiliateLink.js because that file is a client component,
// and non-component exports of a client module reach server components as references, not strings.
export const BUTTON_PRIMARY =
  'inline-flex min-h-[44px] items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

export const BUTTON_SECONDARY =
  'inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';
