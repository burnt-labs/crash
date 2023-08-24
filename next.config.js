const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: { not: /inline|sprite/ }, // exclude if *.svg?inline
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: /inline/, // *.svg?inline
        use: ['@svgr/webpack'],
      },
    );
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    config.resolve.alias = {
      ...config.resolve.alias,
      '@/styles': path.resolve(__dirname, 'src/styles'),
    };

    return config;
  },
};

module.exports = nextConfig;
