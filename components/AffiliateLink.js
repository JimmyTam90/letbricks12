'use client';

// The only component that renders outbound affiliate anchors (Sections 10 and 13.5).
// The href is the internal /api/out/<slug> path, so no raw affiliate URL appears in the DOM; the Edge
// route handler performs the redirect. Plain <a>, new tab, noopener noreferrer. The click handler only
// toggles a visual "Redirecting…" state: it never stops the browser's default navigation and never touches the href.
// Renders nothing for an invalid slug (no fake fallback, no placeholder href).
import { useCallback, useEffect, useRef, useState } from 'react';
import { outPath } from '../lib/outbound.js';

// The link opens in a new tab, so this page stays put: the busy state must clear by itself.
const RESET_MS = 1800;

export default function AffiliateLink({
  slug,
  children,
  className = '',
  placement = 'unspecified',
  ariaLabel,
}) {
  const [busy, setBusy] = useState(false);
  const timer = useRef(null);
  const href = outPath(slug);

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setBusy(false);
  }, []);

  useEffect(() => {
    // Back/forward cache restore or returning to this tab must never leave a stuck spinner.
    const onShow = () => clear();
    const onVisible = () => {
      if (document.visibilityState === 'visible') clear();
    };
    window.addEventListener('pageshow', onShow);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.removeEventListener('pageshow', onShow);
      document.removeEventListener('visibilitychange', onVisible);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [clear]);

  if (!href) return null;

  const onClick = () => {
    setBusy(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(clear, RESET_MS);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      aria-busy={busy ? 'true' : undefined}
      data-affiliate="true"
      data-placement={placement}
      data-destination-key={slug}
      data-state={busy ? 'redirecting' : 'idle'}
      onClick={onClick}
    >
      {/* Both labels share one grid cell, so the button keeps its width and nothing shifts on click. */}
      <span className="inline-grid">
        <span className={`col-start-1 row-start-1 text-center ${busy ? 'invisible' : ''}`}>{children}</span>
        <span
          className={`col-start-1 row-start-1 inline-flex items-center justify-center gap-2 ${busy ? '' : 'invisible'}`}
          aria-hidden={busy ? undefined : 'true'}
        >
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.3" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span role="status">{busy ? 'Redirecting…' : ''}</span>
        </span>
      </span>
    </a>
  );
}
