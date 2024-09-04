/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        httpPath: 'http://[::1]:7022/obi/api/v1',
        httpsPath: 'https://[::1]:7023/obi/api/v1',
        
        // Use at home
        // httpPath: 'http://192.168.1.76:7022/api/v1',
        // httpsPath: 'https://192.168.1.7:7023/api/v1',

        // VPN at home
        // httpPath: 'http://192.168.1.72:7022/api/v1',
        // httpsPath: 'https://192.168.1.72:7023/api/v1',

        // httpPath: 'http://[::1]:7022/api',
        // httpsPath: 'https://[::1]:7023/api',
    },

    trailingSlash: true,

    reactStrictMode: true,
    // experimental: {
    //     newNextLinkBehavior: false,
    // },
    
    /**
     * Setup the basePath for application
     */
    basePath: process.env.NODE_ENV === 'production' ? '/obi' : '',
    
    publicRuntimeConfig: {
        contextPath: process.env.NODE_ENV === 'production' ? '/obi' : '/obi',
        uploadPath: process.env.NODE_ENV === 'production' ? '/obi/upload.php' : '/api/upload'
    }
};

module.exports = nextConfig;
