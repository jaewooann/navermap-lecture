/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lecture-1.vercel.app", 'search.pstatic.net'],
  },
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  },
}

module.exports = nextConfig
