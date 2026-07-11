/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/guides/retirement-benefits',
        destination: '/guides/retirement',
        permanent: true,
      },
      {
        source: '/guides/medicare-guide',
        destination: '/guides/medicare',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;