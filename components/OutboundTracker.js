'use client';

import { useEffect } from 'react';

// Standard outbound click handler. One delegated listener, so a click produces one event no matter
// which CTA (card, hero, sticky bar) was used. It never calls preventDefault or changes the href,
// and it only reports to a dataLayer that the site owner has already configured (no IDs are set here).
export default function OutboundTracker() {
  useEffect(() => {
    const onClick = (event) => {
      const el = event.target instanceof Element ? event.target.closest('a[data-affiliate]') : null;
      if (!el) return;
      const detail = {
        placement: el.getAttribute('data-placement') || 'unspecified',
        destinationKey: el.getAttribute('data-destination-key') || 'unknown',
      };
      try {
        window.dispatchEvent(new CustomEvent('affiliate:click', { detail }));
        if (Array.isArray(window.dataLayer)) {
          window.dataLayer.push({ event: 'affiliate_click', ...detail });
        }
      } catch {
        /* reporting must never interfere with navigation */
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
  return null;
}
