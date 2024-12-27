import Layout from '@/src/layout/layout';
import { Metadata } from 'next';

interface AppLayoutProps {
    children: React.ReactNode;
    params: {
        lang: string;
    };
}



export default function AppLayout({ children }: AppLayoutProps) {
    // console.log('Layout lang', params.lang);
    return <Layout>{children}</Layout>;
}
