import LegalPage from '../../components/LegalPage.js';
import { SITE } from '../../lib/config.js';
import { pageMetadata } from '../../lib/seo.js';

export const metadata = pageMetadata({
  path: '/contact',
  title: 'Contact',
  description: `Contact ${SITE.brandName}.`,
});

export default function ContactPage() {
  return (
    <LegalPage title="Contact" updated="October 16, 2026">
      <p>
        For questions about this website, corrections or removal requests, email us at{' '}
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>
      <p>
        We cannot help with orders, shipping, missing pieces or refunds, because purchases are made
        with the merchant. Please contact Letbricks customer service through letbricks.com for
        those.
      </p>
    </LegalPage>
  );
}
