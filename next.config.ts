import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    transpilePackages: ['@scanupload/qr-code-generator-react', '@scanupload/qr-code-generator-core'],
    async rewrites() {
        return [
            {
                source: '/hub-api/:path*',
                destination: 'https://hub.scanupload.net/:path*'
            }
        ];
    },
    allowedDevOrigins: ['localhost', '127.0.0.1']
};

export default nextConfig;
