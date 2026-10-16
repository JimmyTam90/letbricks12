import Image from 'next/image';
import Link from 'next/link';
import { LOGO } from '../lib/config.js';

// Logo-only branding: the supplied logo already contains the brand name, so no text is rendered beside it.
// The frame crops only the empty vertical margin of the square canvas; the image is never stretched.
export default function Logo({ className = 'w-[120px]', priority = false }) {
  return (
    <Link href="/" aria-label={`${LOGO.alt} home`} className="inline-block shrink-0">
      <span
        className={`relative block overflow-hidden ${className}`}
        style={{ aspectRatio: String(LOGO.frameRatio) }}
      >
        <Image
          src={LOGO.src}
          alt={LOGO.alt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 160px, 120px"
          className="object-cover"
        />
      </span>
    </Link>
  );
}
