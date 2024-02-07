/** @type {import('next').NextConfig} */

const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin("./src/i18n/i18n.ts");

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
        ],
    },
};

module.exports = withNextIntl(nextConfig);