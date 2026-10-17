import Image from 'next/image';
import Link from 'next/link';
import AffiliateLink from './AffiliateLink.js';
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from './buttonStyles.js';
import { DEFAULT_SLUG } from '../lib/outbound.js';
import { FEATURED_PRODUCT } from '../lib/manifest.js';

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-6 md:pt-14 md:pb-16">
      {/* 1.05fr / 0.95fr: slightly wider text column because the headline and CTA group carry the message. */}
      <div className="grid items-center gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-logo">
            Independent guide to Letbricks MOC sets
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Custom MOC building block sets from independent designers
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
            Browse naval battles, palaces, stealth bombers and heavy-lift helicopters from the
            Letbricks catalog. Piece counts, designers and prices below were read from the merchant
            site so you can compare before you click through.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <AffiliateLink slug={DEFAULT_SLUG} placement="hero-primary" className={BUTTON_PRIMARY}>
              Shop Letbricks MOC Sets
            </AffiliateLink>
            <Link href="/#featured" className={BUTTON_SECONDARY}>
              See Featured Sets
            </Link>
          </div>
          <p className="mt-4 max-w-xl text-xs leading-relaxed text-slate-400">
            This website may contain affiliate links. We may earn a commission when you purchase
            through eligible links, at no additional cost to you.
          </p>
        </div>

        <figure className="m-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-700">
            <Image
              src={FEATURED_PRODUCT.image.src}
              alt={FEATURED_PRODUCT.image.alt}
              fill
              priority
              sizes="(min-width: 768px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm text-slate-400">
            Featured: {FEATURED_PRODUCT.title} by {FEATURED_PRODUCT.designer}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
