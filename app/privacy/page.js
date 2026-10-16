import LegalPage from '../../components/LegalPage.js';
import { SITE } from '../../lib/config.js';
import { pageMetadata } from '../../lib/seo.js';

export const metadata = pageMetadata({
  path: '/privacy',
  title: 'Privacy Policy',
  description: `How ${SITE.brandName} handles information on this website.`,
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This page describes how {SITE.brandName} (“we”) handles information on this website. It
        reflects how the site currently works and may be updated as the site changes.
      </p>
      <h2>Information we collect</h2>
      <p>
        This site does not have accounts, forms or comments, and it does not currently run
        analytics or advertising tags. If you email us, we receive your email address and whatever
        you choose to write, and we use it only to reply.
      </p>
      <h2>Outbound links to Letbricks</h2>
      <p>
        Buttons on this site open letbricks.com in a new tab. Some links include an affiliate
        identifier so the merchant can recognize that a visit came from us. Once you are on
        letbricks.com, the merchant’s own privacy policy and cookies apply, and we do not control
        them.
      </p>
      <h2>Hosting</h2>
      <p>
        The site is hosted on Vercel, which may keep standard server logs such as IP address and
        request time for security and operations.
      </p>
      <h2>Your choices</h2>
      <p>
        You can ask us to delete any email correspondence by writing to{' '}
        <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>. Rights that apply to you
        depend on where you live; if you need legal advice about your situation, please consult a
        qualified professional.
      </p>
    </LegalPage>
  );
}
