/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [], // Add any external domains if needed (e.g., for remote images)
        formats: ['image/avif', 'image/webp'], // Optimize for modern formats
    },
};

export default nextConfig;
