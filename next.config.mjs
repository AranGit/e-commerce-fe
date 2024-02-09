/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    experimental: {
        images: {
            unoptimized: true
        }
    }
};

export default nextConfig;
