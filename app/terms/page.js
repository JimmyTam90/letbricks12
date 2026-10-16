import Link from 'next/link';
import LegalPage from '../../components/LegalPage.js';
import { SITE } from '../../lib/config.js';
import { pageMetadata } from '../../lib/seo.js';

export const metadata = pageMetadata({
  path: '/terms',
  title: 'Terms of Service',
  description: `Terms for using the ${SITE.brandName} website.`,
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>By using this website you agree to these terms. If you do not agree, please do not use it.</p>
      <h2>What this site is</h2>
      <p>
        {SITE.brandName} is an independent publisher that highlights products sold by{' '}
        {SITE.merchantName} (letbricks.com). We are not the merchant, we do not sell products, and
        we do not process orders or payments.
      </p>
      <h2>Product information</h2>
      <p>
        Product names, designers, piece counts and prices are read from letbricks.com and can
        change or contain errors. Always confirm current details, availability, shipping and return
        terms on the merchant’s website before you buy.
      </p>
      <h2>Purchases</h2>
      <p>
        Any purchase is a transaction between you and the merchant under the merchant’s terms. We
        are not responsible for orders, delivery, warranties or refunds.
      </p>
      <h2>Affiliate relationship</h2>
      <p>
        Some links are affiliate links. See our <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>.
      </p>
      <h2>Changes and contact</h2>
      <p>
        We may update these terms at any time. Questions can be sent to{' '}
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
