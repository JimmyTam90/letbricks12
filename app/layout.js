import './globals.css';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import StickyCta from '../components/StickyCta.js';
import OutboundTracker from '../components/OutboundTracker.js';
import { SITE, assetPath } from '../lib/config.js';
import { SITE_TITLE, SITE_DESCRIPTION, SOCIAL_IMAGE } from '../lib/seo.js';

export const metadata = {
  metadataBase: new URL(SITE.publicOrigin),
  title: { default: SITE_TITLE, template: `%s | ${SITE.brandName}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE.brandName,
  // Local public files are prefixed with the basePath so the icons resolve through the Hub proxy.
  icons: {
    icon: [{ url: assetPath('/favicon.ico'), sizes: 'any' }],
    shortcut: assetPath('/favicon.ico'),
    apple: assetPath('/apple-touch-icon.png'),
  },
  // Fallback social preview (product photo). Each page re-declares it with its own canonical URL.
  openGraph: { type: 'website', siteName: SITE.brandName, locale: 'en_US', images: [SOCIAL_IMAGE] },
  twitter: { card: 'summary_large_image', images: [SOCIAL_IMAGE.url] },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        <Header />
        <main>{children}</main>
        {/* Bottom padding on mobile keeps the sticky CTA from covering the footer */}
        <div className="pb-24 md:pb-0">
          <Footer />
        </div>
        <StickyCta />
        <OutboundTracker />
      </body>
    </html>
  );
}
