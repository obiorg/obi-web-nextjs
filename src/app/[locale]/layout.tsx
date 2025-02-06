// 'use client';



/** Primereact */
import { LayoutProvider } from '@/src/layout/context/layoutcontext';

import '@/src/styles/demo/Demos.scss';
import '@/src/styles/layout/layout.scss';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';

import { locales } from '@/src/config';
import { routing } from '@/src/i18n/routing';
import { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import Head from 'next/head';
import { notFound } from 'next/navigation';

// import '@/public/themes/lara-dark-teal/theme.css';

type RootLayoutProps = {
    children: React.ReactNode;
    params: { locale: string };
};

// export function generateStaticParams() {
//     return locales.map((locale) => ({ locale }));
// }

export const viewport: Viewport = {
    themeColor: '#colorHere',
    initialScale: 1,
    width: 'device-width'
}


export const metadata: Metadata = {
    title: {
        template: '%s | OBI - One Brewery Industry',
        default: 'OBI - One Brewery Industry',
    },
    description: 'The modeling system designed for Breweries and Beverages.',
    robots: { index: false, follow: false },

    openGraph: {
        type: 'website',
        title: 'OBI - One Brewery Industry',
        url: 'https://castel-group.org/',
        description: 'The modeling system designed for Breweries and Beverages',
        images: ['https://www.primefaces.org/static/social/sakai-react.png'],
        ttl: 604800
    },

};

export default async function RootLayout({
    children,
    params: { locale }
}: RootLayoutProps) {


    // Enable static rendering
    if (!locales.includes(locale as never)) {
        setRequestLocale(locale);
    }

    /// Ensure that the incoming locale is valid
    if (!locales.includes(locale as never)) {
        notFound();
        // return NotFound();
        console.log('locale not found ("' + `>> ${locale} <<`
            + '") : while ' + `locales = >> ${locales} <<`
            + ` and routing locales : >>  ${routing.locales} <<`);
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <>

            <html lang={locale} suppressHydrationWarning>
                <head>
                    <link id="theme-css" href={'/obi/themes/lara-dark-teal/theme.css'} rel="stylesheet" key="k_theme-css" />
                </head>
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <body>


                    <PrimeReactProvider >
                        <NextIntlClientProvider messages={messages}>
                            <LayoutProvider>{children}</LayoutProvider>
                        </NextIntlClientProvider>
                    </PrimeReactProvider>
                </body>
            </html>

        </>
    );
}
