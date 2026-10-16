// Central catalog manifest. Every fact below was observed on letbricks.com (October 2026)
// via the merchant's homepage, search and category pages. Prices are USD as listed and can change.
// Fields the merchant page did not state are null — never guessed.

const UPLOADS = 'https://www.letbricks.com/wp-content/uploads';

export const GROUPS = [
  { id: 'ships', title: 'Ships & Battleships', blurb: 'Naval battles and capital ships, built to display.' },
  { id: 'architecture', title: 'Architecture & Castles', blurb: 'Palaces and landmark architecture in modular form.' },
  { id: 'military', title: 'Military Vehicles & Aircraft', blurb: 'Stealth bombers and heavy-lift helicopters at scale.' },
];

export const CATEGORIES = [
  {
    id: 'moc-sets',
    title: 'MOC Sets',
    description: 'Browse the full range of MOC building block sets from independent designers.',
    image: {
      src: `${UPLOADS}/2026/10/letbricks-chateau-de-versailles-palace-of-versailles-modular-building-blocks-set-by-fred_mlr-bricks.jpg`,
      alt: 'Château de Versailles modular building blocks set',
    },
  },
  {
    id: 'best-seller',
    title: 'Best Sellers',
    description: 'The sets currently featured as weekly best sellers on the merchant site.',
    image: {
      src: `${UPLOADS}/2024/12/letbricks-moc-198409-1-35-scale-uh-60-black-hawk-american-military-helicopter-building-blocks-set-957pcs-v3-versionby-darthdesigner.jpg`,
      alt: 'UH-60 Black Hawk military helicopter building blocks set',
    },
  },
  {
    id: 'military-bricks',
    title: 'Military Bricks',
    description: 'Aircraft, helicopters, ships and vehicles for military model hobbyists.',
    image: {
      src: `${UPLOADS}/2023/09/letbricks-Mocsage-MOC-127265-CH-53E-Super-Stallion-135-Scale-Modern-Military-themed-Model-2192PCS-4-2.jpg`,
      alt: 'CH-53E Super Stallion helicopter building blocks model',
    },
  },
  {
    id: 'new-moc',
    title: 'New MOC Arrivals',
    description: 'Recently listed MOC sets, updated by the merchant as new designs arrive.',
    image: {
      src: `${UPLOADS}/2026/10/letbricks-moc-275985-pirates-of-the-caribbean-at-the-worlds-end-naval-battle-building-blocks-set-1053-pcs-by-brickmanstudio-4.jpg`,
      alt: 'Pirates of the Caribbean At the World’s End naval battle building blocks set',
    },
  },
  {
    id: 'flash-deals',
    title: 'Flash Deals',
    description: 'Limited-time offers collection. Availability and pricing are set by the merchant.',
    image: {
      src: `${UPLOADS}/2026/10/letbricks-sitcomplex-apartment-building-blocks-set-13927pcs-by-brickartisan-6.jpg`,
      alt: 'SitComplex apartment building blocks set',
    },
  },
  {
    id: 'all-products',
    title: 'All Products',
    description: 'Start at the Letbricks storefront and explore every collection yourself.',
    image: {
      src: `${UPLOADS}/2023/03/letbricks-1-350-moc-ucs-uss-enterprise-cvn-65-nuclear-powered-aircraft-carrier-2-1.jpg`,
      alt: 'USS Enterprise CVN-65 aircraft carrier building blocks set',
    },
  },
];

// Each product id doubles as its keyword slug: /letbricks/api/out/<id> (Sections 13.5 / 13.6).
export const PRODUCTS = [
  {
    id: 'pirates-of-the-caribbean-naval-battle-moc-275985',
    group: 'ships',
    category: 'new-moc',
    title: 'MOC-275985 Pirates of the Caribbean At the World’s End Naval Battle Building Blocks Set',
    designer: 'BRICKMANstudio',
    pieceCount: 1053,
    price: '$77.99',
    priceNote: null,
    sourceUrl:
      'https://www.letbricks.com/product/moc-275985-pirates-of-the-caribbean-at-the-worlds-end-naval-battle-building-blocks-set-1053-pcs-by-brickmanstudio/',
    image: {
      src: `${UPLOADS}/2026/10/letbricks-moc-275985-pirates-of-the-caribbean-at-the-worlds-end-naval-battle-building-blocks-set-1053-pcs-by-brickmanstudio-4.jpg`,
      alt: 'Pirates of the Caribbean At the World’s End naval battle building blocks set by BRICKMANstudio',
    },
    availability: 'AVAILABILITY_NOT_VERIFIED',
  },
  {
    id: 'uss-arizona-battleship-moc-275741',
    group: 'ships',
    category: 'new-moc',
    title: 'MOC-275741 USS Arizona Battleship Building Blocks Set',
    designer: 'BespokeBrickDesigns',
    pieceCount: 2458,
    price: '$202.99',
    priceNote: null,
    sourceUrl:
      'https://www.letbricks.com/product/moc-275741-uss-arizona-battleship-building-blocks-set-2458pcs-by-bespokebrickdesigns/',
    image: {
      src: `${UPLOADS}/2026/10/letbricks-moc-275741-uss-arizona-battleship-building-blocks-set-2458pcs-by-bespokebrickdesigns-1.jpg`,
      alt: 'USS Arizona battleship building blocks set by BespokeBrickDesigns',
    },
    availability: 'AVAILABILITY_NOT_VERIFIED',
  },
  {
    id: 'palace-of-versailles-modular-building-blocks',
    group: 'architecture',
    category: 'moc-sets',
    title: 'Château de Versailles Palace of Versailles Modular Building Blocks Set',
    designer: 'fred_mlr bricks',
    pieceCount: null,
    price: '$186.99 – $649.99',
    priceNote: 'Price range across options',
    sourceUrl:
      'https://www.letbricks.com/product/chateau-de-versailles-palace-of-versailles-modular-building-blocks-set-by-fred_mlr-bricks/',
    image: {
      src: `${UPLOADS}/2026/10/letbricks-chateau-de-versailles-palace-of-versailles-modular-building-blocks-set-by-fred_mlr-bricks.jpg`,
      alt: 'Château de Versailles modular building blocks set by fred_mlr bricks',
    },
    availability: 'AVAILABILITY_NOT_VERIFIED',
  },
  {
    id: 'b2-spirit-stealth-bomber-moc-166363',
    group: 'military',
    category: 'military-bricks',
    title: 'Mocsage MOC-166363 B2 Spirit 1/70 Scale Flying-Wing Stealth Bomber',
    designer: 'Mocsage',
    // 1977 per the listing title and product summary (owner-confirmed). The page's description and URL slug say 2063.
    pieceCount: 1977,
    price: '$88.99',
    priceNote: 'Listed on sale, was $113.99',
    sourceUrl:
      'https://www.letbricks.com/product/mocsage-b2-spirit-1-70-scale-flying-wing-ultra-high-speed-intercontinental-stealth-strategic-bomber-model2063pcs/',
    image: {
      src: `${UPLOADS}/2024/03/letbricks-mocsage-b2-spirit-1-70-scale-flying-wing-ultra-high-speed-intercontinental-stealth-strategic-bomber-model2063pcs-1.jpg`,
      alt: 'B2 Spirit 1/70 scale stealth bomber building blocks model by Mocsage',
    },
    availability: 'AVAILABILITY_NOT_VERIFIED',
  },
  {
    id: 'ch-53e-super-stallion-moc-127265',
    group: 'military',
    category: 'military-bricks',
    title: 'Mocsage MOC-127265 CH-53E Super Stallion 1/35 Scale Modern Military-Themed Model',
    designer: 'Mocsage',
    // 2099: owner-confirmed against the live letbricks.com specifications (2026-10-16). Older page text elsewhere says 2193/2192.
    pieceCount: 2099,
    price: '$106.99',
    priceNote: null,
    sourceUrl:
      'https://www.letbricks.com/product/mocsage-moc-127265-ch-53e-super-stallion-1-35-scale-modern-military-themed-model-2192pcs/',
    image: {
      src: `${UPLOADS}/2023/09/letbricks-Mocsage-MOC-127265-CH-53E-Super-Stallion-135-Scale-Modern-Military-themed-Model-2192PCS-4-2.jpg`,
      alt: 'CH-53E Super Stallion 1/35 scale helicopter building blocks model by Mocsage',
    },
    availability: 'AVAILABILITY_NOT_VERIFIED',
  },
];

// og:image / twitter:image — the first featured product image (never the logo or favicon).
export const FEATURED_PRODUCT = PRODUCTS[0];

export const OFFERS = [
  {
    id: 'replacement',
    title: 'Replacement assurance',
    text: 'The merchant’s Brick Assurance Guarantee covers missing or damaged pieces; contact its customer service with the part number or description.',
  },
  {
    id: 'designers',
    title: 'Independent MOC designers',
    text: 'Sets are credited to designers such as BRICKMANstudio, BespokeBrickDesigns and Mocsage, so you can follow the builders you like.',
  },
  {
    id: 'checkout',
    title: 'Checkout on Letbricks',
    text: 'Every button opens letbricks.com in a new tab. Orders, payment and shipping are handled by the merchant.',
  },
];

export const FAQ = [
  {
    q: 'Is PrimeGearLab the store?',
    a: 'No. PrimeGearLab is an independent publisher. Purchases are made on letbricks.com and we may earn a commission through our links.',
  },
  {
    q: 'What if a piece is missing or damaged?',
    a: 'Letbricks lists a Brick Assurance Guarantee with replacement assurance for missing or damaged pieces. Contact the merchant’s customer service with the part number or description.',
  },
  {
    q: 'Are the prices current?',
    a: 'Prices were read from letbricks.com in October 2026 and can change. The product page on the merchant site always has the current price and availability.',
  },
  {
    q: 'What is a MOC set?',
    a: 'MOC means “my own creation”: a custom model designed by an independent builder rather than a mass-market box set.',
  },
];

/** Basic manifest validation, also used by scripts/validate-links.mjs and the tests. */
export function validateManifest() {
  const errors = [];
  const ids = new Set();
  const groupIds = new Set(GROUPS.map((g) => g.id));
  const categoryIds = new Set(CATEGORIES.map((c) => c.id));
  for (const p of PRODUCTS) {
    if (ids.has(p.id)) errors.push(`duplicate product id ${p.id}`);
    ids.add(p.id);
    if (!p.title) errors.push(`${p.id}: missing title`);
    if (!p.image?.src?.startsWith('https://www.letbricks.com/wp-content/uploads/')) {
      errors.push(`${p.id}: image must come from the merchant uploads folder`);
    }
    if (!p.sourceUrl) errors.push(`${p.id}: missing sourceUrl`);
    if (!groupIds.has(p.group)) errors.push(`${p.id}: unknown group ${p.group}`);
    if (!categoryIds.has(p.category)) errors.push(`${p.id}: unknown category ${p.category}`);
  }
  return errors;
}
