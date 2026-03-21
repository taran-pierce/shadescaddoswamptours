/** @type {import('next').NextConfig} */

import withBundleAnalyzer from '@next/bundle-analyzer';

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './src/utils/loader.js',
    qualities: [50, 75, 100],
  },
  experimental: {
    esmExternals: true
  },
};

export default withAnalyzer(nextConfig);
