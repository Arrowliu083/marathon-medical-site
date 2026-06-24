const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/marathon-medical-site',
  assetPrefix: '/marathon-medical-site',
};

module.exports = withNextIntl(nextConfig);
