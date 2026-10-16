import AffiliateLink, { BUTTON_PRIMARY } from './AffiliateLink.js';
import { DEFAULT_SLUG } from '../lib/outbound.js';

// Mobile-only bar. The page adds bottom padding so it never hides the footer or card CTAs.
export default function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-navy/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <AffiliateLink slug={DEFAULT_SLUG} placement="sticky-mobile" className={`${BUTTON_PRIMARY} w-full`}>
        Shop Letbricks MOC Sets
      </AffiliateLink>
    </div>
  );
}
