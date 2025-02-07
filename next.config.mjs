import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        // PC
        // httpPath: 'http://[::1]:7022/obi/api/v1',
        // httpsPath: 'https://[::1]:7023/obi/api/v1'

        // // Use at home
        // httpPath: 'http://192.168.1.75:7022/obi/api/v1',
        // httpsPath: 'http://192.168.1.75:7023/obi/api/v1',

        // // // VPN at home
        // httpPath: 'http://10.242.19.217:7022/obi/api/v1',
        // httpsPath: 'http://10.242.19.217:7023/obi/api/v1'

        // httpPath: 'http://[::1]:7022/api',
        // httpsPath: 'https://[::1]:7023/api',

        // Server
        httpPath: 'http://10.242.14.3:7022/obi/api/v1',
        httpsPath: 'https://10.242.14.3:7023/obi/api/v1',
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
    }
    // publicRuntimeConfig: {
    //     contextPath: process.env.NODE_ENV === 'production' ? '/obi' : '/obi',
    //     uploadPath: process.env.NODE_ENV === 'production' ? '/obi/upload.php' : '/api/upload'
    // }
};

export default withNextIntl(nextConfig);
