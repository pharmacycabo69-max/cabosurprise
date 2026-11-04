/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async redirects() {
    const nonWww = [{ type: "host", value: "cabosurprise.com" }];
    return [
      { source: "/legal", destination: "/terms/", statusCode: 301 },
      // renamed product pages
      { source: "/anniversary-dinner", destination: "/private-anniversary-dinner/", statusCode: 301 },
      { source: "/beach-horse-photo-session", destination: "/private-beach-horse-photoshoot/", statusCode: 301 },
      { source: "/wedding-reception", destination: "/ranch-wedding-reception/", statusCode: 301 },
      { source: "/beach-horse-activity", destination: "/private-beach-horse-experience/", statusCode: 301 },
      // removed wellness pages
      { source: "/iv-therapy", destination: "/", statusCode: 301 },
      { source: "/pharmacy-delivery", destination: "/", statusCode: 301 },
      { source: "/consultations", destination: "/", statusCode: 301 },
      // non-www -> www (301)
      { source: "/", has: nonWww, destination: "https://www.cabosurprise.com/", statusCode: 301 },
      { source: "/:path+", has: nonWww, destination: "https://www.cabosurprise.com/:path+/", statusCode: 301 },
    ];
  },
};
export default nextConfig;
