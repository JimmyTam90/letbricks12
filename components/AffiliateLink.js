// The only component that renders outbound affiliate anchors (Sections 10 and 13.5).
// The href is the internal /api/out/<slug> path, so no raw affiliate URL appears in the DOM; the route
// handler performs the redirect. Plain <a>, new tab, noopener noreferrer, no handler touching navigation.
// Renders nothing for an invalid slug (no fake fallback, no placeholder href).
import { outPath } from '../lib/outbound.js';

export default function AffiliateLink({
  slug,
  children,
  className = '',
  placement = 'unspecified',
  ariaLabel,
}) {
  const href = outPath(slug);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      data-affiliate="true"
      data-placement={placement}
      data-destination-key={slug}
    >
      {children}
    </a>
  );
}

export const BUTTON_PRIMARY =
  'inline-flex min-h-[44px] items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

export const BUTTON_SECONDARY =
  'inline-flex min-h-[44px] items-center justify-center rounded-lg border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';
