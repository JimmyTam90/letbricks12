// Hub–Spoke subpath deployment: the Hub (primegearlab.com) rewrites /letbricks/* to this Spoke.
// basePath and assetPrefix both match PUBLIC_SUBPATH so CSS, JS chunks, public files and the
// image optimizer endpoint all resolve under /letbricks when served through the Hub proxy.
const SUBPATH = '/letbricks';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: SUBPATH,
  assetPrefix: SUBPATH,
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: SUBPATH,
  },
  images: {
    // Product images are served from the merchant's WordPress uploads folder.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.letbricks.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  async redirects() {
    return [
      // Direct visits to the Spoke root land on the subpath.
      { source: '/', destination: SUBPATH, permanent: false, basePath: false },
    ];
  },
};

export default nextConfig;
