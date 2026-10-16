import Link from 'next/link';
import Logo from './Logo.js';
import { SITE } from '../lib/config.js';

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-navy">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Mobile: single column. md+: logo left spanning two rows, links top-right, text block below. */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-[auto_minmax(0,1fr)] md:grid-rows-[auto_auto]">
          <div className="md:row-span-2">
            <Logo className="w-[150px] md:w-[170px]" />
          </div>

          <nav aria-label="Legal" className="md:justify-self-end">
            <ul className="flex flex-wrap gap-x-5 gap-y-3 md:flex-nowrap md:justify-end md:whitespace-nowrap">
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-slate-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="max-w-4xl space-y-3 text-left text-sm leading-relaxed text-slate-400">
            <p>
              This website may contain affiliate links. We may earn a commission when you purchase
              through eligible links, at no additional cost to you. {SITE.brandName} is an
              independent publisher and is not the merchant; products are sold by {SITE.merchantName}.
            </p>
            <p>
              Contact:{' '}
              <a className="underline hover:text-white" href={`mailto:${SITE.contactEmail}`}>
                {SITE.contactEmail}
              </a>
            </p>
            <p>© {year} {SITE.brandName}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
