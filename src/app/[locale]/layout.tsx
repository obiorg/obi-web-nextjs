'use client';

/** langue */
import Header from "../../obi/components/Header/Header";
import Footer from "../../obi/components/Footer/Footer";
import { getDirection } from "../../lib/intl";

/** Primereact */
import { LayoutContext, LayoutProvider } from '@/src/layout/context/layoutcontext';

import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@/src/styles/layout/layout.scss';
import '@/src/styles/demo/Demos.scss';
import { useContext } from 'react';


type RootLayoutProps = {
    params: { locale: string };
    children: React.ReactNode;
};


export default function RootLayout({ params, children }: RootLayoutProps) {
    /** Manage locale properties */
    const { locale } = params;
    const dir = getDirection(locale);
    /** Prime react */
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <html lang={locale} dir={dir} suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/lara-dark-teal/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <PrimeReactProvider>
                    <LayoutProvider>{children}</LayoutProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
