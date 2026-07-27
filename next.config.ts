import type { NextConfig } from 'next';

const hubApiTarget = process.env.NEXT_PUBLIC_HUB_API_TARGET ?? 'https://hub.scanupload.net';

const nextConfig: NextConfig = {
    transpilePackages: ['@scanupload/qr-code-generator-react', '@scanupload/qr-code-generator-core'],
    async rewrites() {
        return [
            {
                source: '/hub-api/:path*',
                destination: `${hubApiTarget}/:path*`
            }
        ];
    },
    allowedDevOrigins: ['localhost', '127.0.0.1']
};

export default nextConfig;
