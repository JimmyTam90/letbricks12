'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo.js';
import AffiliateLink, { BUTTON_PRIMARY } from './AffiliateLink.js';
import { DEFAULT_SLUG } from '../lib/outbound.js';

const NAV = [
  { label: 'Categories', href: '/#categories' },
  { label: 'Featured Sets', href: '/#featured' },
  { label: 'Why Letbricks', href: '/#why' },
  { label: 'FAQ', href: '/#faq' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-1 sm:px-6">
        {/* Logo strictly left */}
        <Logo className="w-[104px] sm:w-[120px]" priority />

        {/* Desktop (md+): navigation group and CTA strictly right */}
        <nav aria-label="Primary" className="ml-auto hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-200 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {item.label}
            </Link>
          ))}
          <AffiliateLink slug={DEFAULT_SLUG} placement="header-desktop" className={BUTTON_PRIMARY}>
            Explore Letbricks
          </AffiliateLink>
        </nav>

        {/* Mobile (<md): hamburger */}
        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {isOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="border-t border-white/10 bg-navy md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            <Link href="/" onClick={close} className="rounded-lg px-3 py-3 text-base font-medium text-white hover:bg-white/5">
              Home
            </Link>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="rounded-lg px-3 py-3 text-base font-medium text-slate-200 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3">
              <AffiliateLink slug={DEFAULT_SLUG} placement="header-mobile" className={`${BUTTON_PRIMARY} w-full`}>
                Explore Letbricks
              </AffiliateLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
