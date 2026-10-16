import { NextResponse } from 'next/server';
import { resolveBySlug } from '../../../../lib/affiliate.js';

// Section 13.5 — internal outbound redirect. CTA anchors point at /letbricks/api/out/<slug>;
// the merchant URL (with the supplied ref parameter intact) is resolved here and never rendered in HTML.
export const dynamic = 'force-dynamic';

const HEADERS = {
  'X-Robots-Tag': 'noindex, nofollow',
  'Cache-Control': 'no-store',
};

export function GET(_request, { params }) {
  const result = resolveBySlug(params.slug);
  if (!result.href) {
    return new NextResponse('Unknown link.', {
      status: 404,
      headers: { ...HEADERS, 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
  // 302: the destination is a business choice that may change, so it must not be cached as permanent.
  return new NextResponse(null, { status: 302, headers: { ...HEADERS, Location: result.href } });
}
