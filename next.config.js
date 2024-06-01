/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
    env: {
        httpPath: 'http://[::1]:7022/api',
        httpsPath: 'https://[::1]:7023/api',

        // httpPath: 'http://[::1]:7022/api',
        // httpsPath: 'https://[::1]:7023/api',
    },
    i18n: {
        // These are all the locales you want to support in
        // your application
        locales: ['fr-Fr', 'en-US'],

        // This is the default locale you want to be used when visiting
        // a non-locale prefixed path e.g. `/hello`
        defaultLocale: 'fr-Fr',

        localeDetection: true,

        // This is a list of locale domains and the default locale they
        // should handle (these are only required when setting up domain routing)
        // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
        domains: [
            {
                domain: 'fr.10.242.14.3',
                defaultLocale: 'fr-Fr',
                locales: ['fr', 'fr-BE'],
                // an optional http field can also be used to test
                // locale domains locally with http instead of https
                http: true
            },
            {
                domain: 'en.10.242.14.3',
                defaultLocale: 'en-US'
            }
        ]
    },

    trailingSlash: true,

    reactStrictMode: true,
    experimental: {
        newNextLinkBehavior: false,
    },
    basePath: process.env.NODE_ENV === 'production' ? '/obi' : '',
    publicRuntimeConfig: {
        contextPath: process.env.NODE_ENV === 'production' ? '/obi' : '',
        uploadPath: process.env.NODE_ENV === 'production' ? '/obi/upload.php' : '/api/upload'
    }
};

module.exports = nextConfig;
