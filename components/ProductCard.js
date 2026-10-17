import Image from 'next/image';
import AffiliateLink from './AffiliateLink.js';
import { BUTTON_PRIMARY } from './buttonStyles.js';
import { CATEGORIES, GROUPS } from '../lib/manifest.js';

// DOM order is the mobile order: IMAGE → TITLE → SPECS → CTA. Plain flow layout, nothing is reordered or overlaid.
export default function ProductCard({ product }) {
  const group = GROUPS.find((g) => g.id === product.group);
  const category = CATEGORIES.find((c) => c.id === product.category);
  return (
    <article className="product-card flex h-full flex-col rounded-2xl border border-white/10 bg-navy-800 p-4">
      <div className="product-card__image relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-navy-700">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(min-width: 1024px) 352px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <h3 className="product-card__title mt-4 text-lg font-semibold leading-snug text-white">
        {product.title}
      </h3>
      <div className="product-card__description mt-3">
        <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1.5 text-sm">
          <dt className="text-slate-400">Designer</dt>
          <dd className="text-slate-100">{product.designer}</dd>
          {product.pieceCount ? (
            <>
              <dt className="text-slate-400">Pieces</dt>
              <dd className="text-slate-100">{product.pieceCount.toLocaleString('en-US')} PCS</dd>
            </>
          ) : null}
          <dt className="text-slate-400">Collection</dt>
          <dd className="text-slate-100">{group?.title}</dd>
          <dt className="text-slate-400">Category</dt>
          <dd className="text-slate-100">{category?.title}</dd>
          <dt className="text-slate-400">Price</dt>
          <dd className="font-semibold text-white">
            {product.price}
            {product.priceNote ? (
              <span className="block text-xs font-normal text-slate-400">{product.priceNote}</span>
            ) : null}
          </dd>
        </dl>
      </div>
      <div className="product-card__action mt-auto pt-5">
        <AffiliateLink
          slug={product.id}
          placement={`product-${product.id}`}
          ariaLabel={`View ${product.title} on Letbricks`}
          className={`${BUTTON_PRIMARY} w-full`}
        >
          View on Letbricks
        </AffiliateLink>
      </div>
    </article>
  );
}
