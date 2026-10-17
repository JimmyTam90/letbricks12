import Image from 'next/image';
import AffiliateLink from './AffiliateLink.js';
import { BUTTON_PRIMARY } from './buttonStyles.js';

// DOM order is the mobile order: IMAGE → TITLE → DESCRIPTION → CTA. No CSS reordering, no overlays.
export default function CategoryCard({ category }) {
  return (
    <article className="product-card flex h-full flex-col rounded-2xl border border-white/10 bg-navy-800 p-4">
      <div className="product-card__image relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-navy-700">
        <Image
          src={category.image.src}
          alt={category.image.alt}
          fill
          sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <h3 className="product-card__title mt-4 text-lg font-semibold leading-snug text-white">
        {category.title}
      </h3>
      <div className="product-card__description mt-2 text-sm leading-relaxed text-slate-300">
        {category.description}
      </div>
      <div className="product-card__action mt-auto pt-5">
        <AffiliateLink
          slug={category.id}
          placement={`category-${category.id}`}
          ariaLabel={`Browse ${category.title} on Letbricks`}
          className={`${BUTTON_PRIMARY} w-full sm:w-auto`}
        >
          Browse {category.title}
        </AffiliateLink>
      </div>
    </article>
  );
}
