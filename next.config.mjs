/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async redirects() {
    const nonWww = [{ type: "host", value: "cabosurprise.com" }];
    return [
      { source: "/legal", destination: "/terms/", statusCode: 301 },
      // non-www -> www (301)
      { source: "/", has: nonWww, destination: "https://www.cabosurprise.com/", statusCode: 301 },
      { source: "/:path+", has: nonWww, destination: "https://www.cabosurprise.com/:path+/", statusCode: 301 },
    ];
  },
};
export default nextConfig;
