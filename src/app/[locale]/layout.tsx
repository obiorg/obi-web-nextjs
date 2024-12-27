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
import { Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import Head from 'next/head';
import { notFound } from 'next/navigation';


type RootLayoutProps = {
    children: React.ReactNode;
    params: { locale: string };
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
    themeColor: '#colorHere',
    initialScale: 1, 
    width: 'device-width'
}


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


    /** Prime react */
    // const { layoutConfig } = useContext(LayoutContext);



    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <>

            <html lang={locale} suppressHydrationWarning>
                <head>
                    <link id="theme-css" href={`../themes/lara-dark-teal/theme.css`} rel="stylesheet"></link>
                </head>
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
