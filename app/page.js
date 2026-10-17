import Hero from '../components/Hero.js';
import CategoryCard from '../components/CategoryCard.js';
import ProductCard from '../components/ProductCard.js';
import AffiliateLink from '../components/AffiliateLink.js';
import { BUTTON_PRIMARY } from '../components/buttonStyles.js';
import { DEFAULT_SLUG } from '../lib/outbound.js';
import { CATEGORIES, PRODUCTS, OFFERS, FAQ } from '../lib/manifest.js';
import { pageMetadata } from '../lib/seo.js';

export const metadata = pageMetadata({ path: '/' });

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-logo">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
      {children ? <p className="mt-3 text-base leading-relaxed text-slate-300">{children}</p> : null}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="categories" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <SectionHeading eyebrow="Collections" title="Browse by category">
          Each button opens the matching collection on letbricks.com in a new tab.
        </SectionHeading>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section id="featured" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <SectionHeading eyebrow="Featured sets" title="Ships, palaces and military builds">
          Details are as listed on letbricks.com in October 2026. Prices can change and availability
          is confirmed on the merchant’s product page.
        </SectionHeading>
        {/* Five cards: centered flex rows (3 + 2) avoid an accidental, lopsided last row. */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <section id="why" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <SectionHeading eyebrow="Before you buy" title="What to know about Letbricks" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {OFFERS.map((offer) => (
            <div key={offer.id} className="rounded-2xl border border-white/10 bg-navy-800 p-6">
              <h3 className="text-lg font-semibold text-white">{offer.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{offer.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <SectionHeading eyebrow="FAQ" title="Common questions" />
        <div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-navy-800">
          {FAQ.map((item) => (
            <details key={item.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                {item.q}
                <span aria-hidden="true" className="text-slate-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-4 pb-16 sm:px-6">
        <div className="rounded-2xl border border-white/10 bg-navy-800 px-6 py-10 text-center sm:px-10">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Ready to find your next build?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-slate-300">
            Head to Letbricks to see the full catalog, current prices and shipping details.
          </p>
          <div className="mt-6">
            <AffiliateLink slug={DEFAULT_SLUG} placement="final-cta" className={BUTTON_PRIMARY}>
              Shop Letbricks MOC Sets
            </AffiliateLink>
          </div>
          <p className="mx-auto mt-4 max-w-xl text-xs text-slate-400">
            This website may contain affiliate links. We may earn a commission when you purchase
            through eligible links, at no additional cost to you.
          </p>
        </div>
      </section>
    </>
  );
}
