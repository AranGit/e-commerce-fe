/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    output: 'export',
    experimental: {
        images: {
            unoptimized: true
        }
    }
};

export default nextConfig;
