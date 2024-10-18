import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"], // Add Cloudinary domain for image optimization
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx", "md"],
  experimental: {
    turbo: {
      loaders: {
        ".md": ["@mdx-js/loader"],
        ".mdx": ["@mdx-js/loader"],
      },
    },
    mdxRs: true,
  },
  async rewrites() {
    return [
      {
        source: "/metrics",
        destination: "/api/metrics",
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
