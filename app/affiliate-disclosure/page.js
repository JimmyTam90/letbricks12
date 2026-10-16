import Link from 'next/link';
import LegalPage from '../../components/LegalPage.js';
import { SITE } from '../../lib/config.js';
import { pageMetadata } from '../../lib/seo.js';

export const metadata = pageMetadata({
  path: '/affiliate-disclosure',
  title: 'Affiliate Disclosure',
  description: `How ${SITE.brandName} earns commissions from affiliate links.`,
});

export default function AffiliateDisclosurePage() {
  return (
    <LegalPage title="Affiliate Disclosure">
      <p>
        This website may contain affiliate links. We may earn a commission when you purchase
        through eligible links, at no additional cost to you.
      </p>
      <h2>How it works</h2>
      <p>
        {SITE.brandName} participates in the affiliate program of {SITE.merchantName}{' '}
        (letbricks.com). Links on this site that lead to letbricks.com carry an identifier so the
        merchant can recognize visits from us. Not every click or order is guaranteed to earn a
        commission, and eligibility is decided by the merchant’s program terms.
      </p>
      <h2>Our independence</h2>
      <p>
        We are an independent publisher, not the merchant and not an official representative of
        Letbricks. Descriptions come from the merchant’s public pages; we do not publish invented
        ratings, reviews or discounts.
      </p>
      <h2>Questions</h2>
      <p>
        Write to <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> or visit our{' '}
        <Link href="/contact">Contact</Link> page.
      </p>
    </LegalPage>
  );
}
