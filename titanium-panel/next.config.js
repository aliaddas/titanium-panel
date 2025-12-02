/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.0.50',
      },
      {
        protocol: 'http',
        hostname: '94.104.203.203',
      },
      {
        protocol: 'https',
        hostname: 'www.trulieve.com',
      },
      {
        protocol: 'https',
        hostname: 'www.drganja.com',
      },
      {
        protocol: 'https',
        hostname: 'ekicks.eu',
      },
      {
        protocol: 'https',
        hostname: 'img01.ztat.net',
      },
      {
        protocol: 'https',
        hostname: 'www.col-vert.fr',
      },
      {
        protocol: 'https',
        hostname: 'www.stropdassenwinkel.be',
      },
      {
        protocol: 'https',
        hostname: 'n.nordstrommedia.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'xcdn.next.co.uk',
      }
    ],
  },
};
{}