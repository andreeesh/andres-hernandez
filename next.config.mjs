/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [{
      source: "/:path*",
      has: [{ type: "host", value: "www.andreshernandez.ar" }],
      destination: "https://andreshernandez.ar/:path*",
      permanent: true,
    }];
  },
};

export default nextConfig;
