import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();



/** @type {import('next').NextConfig} */

const nextConfig = {

    
    // Basic configuration options
    reactStrictMode: true,
    swcMinify: true,

    // Webpack configuration (optional)
    webpack: (config, { isServer }) => {
        // Add custom webpack configurations
        // For example, handling specific file types or adding aliases
        return config;
    },

    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        DATABASE_URL: process.env.DATABASE_URL,

        httpPath: process.env.NODE_ENV === 'production' ? 'http://BLCSRV23003:7022/obi/api/v1' : 'http://[::1]:7022/obi/api/v1',
        httpsPath: process.env.NODE_ENV === 'production' ? 'http://BLCSRV23003:7023/obi/api/v1' : 'http://[::1]:7023/obi/api/v1',
            
        
        // PC
        // httpPath: 'http://[::1]:7022/obi/api/v1',
        // httpsPath: 'https://[::1]:7023/obi/api/v1',

        // // Use at home
        // httpPath: 'http://192.168.1.75:7022/obi/api/v1',
        // httpsPath: 'http://192.168.1.75:7023/obi/api/v1',

        // // // VPN at home
        // httpPath: 'http://10.242.19.217:7022/obi/api/v1',
        // httpsPath: 'http://10.242.19.217:7023/obi/api/v1'

        // httpPath: 'http://[::1]:7022/api',
        // httpsPath: 'https://[::1]:7023/api',

        // Server
        // httpPath: 'http://10.242.14.3:7022/obi/api/v1',
        // httpsPath: 'https://10.242.14.3:7023/obi/api/v1',
    },

    trailingSlash: true,

    reactStrictMode: true,
    // experimental: {
    //     newNextLinkBehavior: false,
    // },

    /**
     * Setup the basePath for application
     */
    basePath: process.env.NODE_ENV === 'production' ? '/obi' : '/obi',
    experimental: {
        serverActions: {
            bodySizeLimit: '100mb'
        }
    },
    // publicRuntimeConfig: {
    //     contextPath: process.env.NODE_ENV === 'production' ? '/obi' : '/obi',
    //     uploadPath: process.env.NODE_ENV === 'production' ? '/obi/upload.php' : '/api/upload'
    // }
    
    // Redirects configuration
    async redirects() {
        return [
            {
                source: '/old-page',
                destination: '/new-page',
                permanent: true
            }
        ];
    },

    // Rewrites configuration
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://api.example.com/:path*'
            }
        ];
    },

    // Image optimization configuration
    images: {
        domains: ['example.com', 'cdn.example.net'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
    },

    // Headers configuration
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' }
                ]
            }
        ];
    },

    // Compiler options (for SWC)
    compiler: {
        // Remove console logs in production
        removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,

        // Experimental features
        reactRemoveProperties: true
    },


};

export default withNextIntl(nextConfig);
