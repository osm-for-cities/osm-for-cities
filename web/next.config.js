/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/admin",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
