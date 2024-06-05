'use client';
<<<<<<<< HEAD:app/layout.tsx
import { LayoutProvider } from '../layout/context/layoutcontext';
========
import { LayoutContext, LayoutProvider } from '@/layout/context/layoutcontext';
>>>>>>>> parent of 7e662ea (Revert "Wrong lang"):app/[lang]/layout.tsx
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
<<<<<<<< HEAD:app/layout.tsx
========
    
    const { layoutConfig } = useContext(LayoutContext);
    console.log('Starting root layout')
>>>>>>>> parent of 7e662ea (Revert "Wrong lang"):app/[lang]/layout.tsx
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <PrimeReactProvider>
                    <LayoutProvider>{children}</LayoutProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
