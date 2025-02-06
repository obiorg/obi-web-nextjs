import Layout from '@/src/layout/layout';

interface AppLayoutProps {
    children: React.ReactNode;
    params: { locale: string };
};




export default function AppLayout({
    children,
    params: { locale }
}: AppLayoutProps) {

    // console.log('Layout lang', locale);
    return <Layout>{children}</Layout>;
}
