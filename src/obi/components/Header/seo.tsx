import Head from "next/head";



interface SEOProps {
    title: string;
    description: string;  // Add meta description for SEO purposes.
}

const SEO = (SEOProps: SEOProps) => (
    <Head>
        <title>{SEOProps.title}</title>
        <meta name="description" content={SEOProps.description} />

        <link rel="icon" href='/favicon.ico' />

                 
        {/* <meta charset="UTF-8" /> */}
        <meta name="description"
            content="NextJS Head component" />
        <meta name="keywords"
            content="HTML, CSS, JavaScript, NextJS" />
        <meta name="r.hendrick" content="obi creator" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="accepted-language" content="fr, ar, en, nl-NL"/>


        {/* robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    openGraph: {
        type: 'website',
        title: 'OBI - One Brewery Industry',
        url: 'https://castel-group.org/',
        description: 'The modeling system designed for Breweries and Beverages',
        images: ['https://www.primefaces.org/static/social/sakai-react.png'],
        ttl: 604800
    },
    icons: {
        icon: '/favicon.ico'
    } */}

    </Head>
);

export default SEO;