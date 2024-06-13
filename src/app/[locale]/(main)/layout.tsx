import Layout from '@/src/layout/layout';
import { Metadata } from 'next';

interface AppLayoutProps {
    children: React.ReactNode;
    params: {
        lang: string;
    };
}

export const metadata: Metadata = {
    title: 'OBI - One Brewery Industry',
    description: 'The modeling system designed for Breweries and Beverages.',
    robots: { index: false, follow: false },
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
    }
}; 

export default function AppLayout({ children }: AppLayoutProps) {
    // console.log('Layout lang', params.lang);
    return <Layout>{children}</Layout>;
}
