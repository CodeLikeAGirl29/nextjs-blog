/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // If deploying to https://<user>.github.io/<repo>/, uncomment and set:
  // basePath: "/<repo>",
};

export default nextConfig;
