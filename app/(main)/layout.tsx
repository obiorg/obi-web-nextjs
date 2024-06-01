import { Metadata } from 'next';
import Layout from '../../layout/layout';

interface AppLayoutProps {
    children: React.ReactNode;
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
    return <Layout>{children}</Layout>;
}
