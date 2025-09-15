
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SockBuilder } from '@/components/sock-builder/SockBuilder';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Build Your Sock | SockAI',
    description: 'Customize your sock design.',
};

const sockImages: Record<string, string> = {
    'Ankle': '/Zip/ankle.png',
    'Quarter': '/Zip/heel.png',
    '2.0 - Crew': '/Zip/crew.png',
    'Elite - Crew': '/Zip/crew.png',
    'Havoc - Crew': '/Zip/crew.png',
    'Polaris - Crew': '/Zip/crew.png',
    '2.0 - Knee High': '/image 7.png',
    'Easton - Knee High': '/image 7.png',
    'Havoc - Knee High': '/image 7.png',
    'Polaris - Knee High': '/image 7.png',
    'Stellaris - Knee High': '/image 7.png',
    'Stirrup - Knee High': '/image 7.png',
    '2 Stripes - Over The Knee': '/image 8.png',
    '3 Stripes - Over The Knee': '/image 8.png',
    'Solid - Over The Knee': '/image 8.png',
  };
  

export default function BuildPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const sockLength = typeof searchParams.length === 'string' ? decodeURIComponent(searchParams.length) : 'Ankle';
    const sockImage = sockImages[sockLength] || '/image 4.png';
    const sockLengthWithSuffix = `${sockLength} Length`;

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 py-12 md:py-20">
                <SockBuilder sockLength={sockLengthWithSuffix} sockImage={sockImage} />
            </main>
            <Footer />
        </div>
    );
}
