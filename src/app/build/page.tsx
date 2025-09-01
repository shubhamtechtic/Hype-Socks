
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SockBuilder } from '@/components/sock-builder/SockBuilder';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Build Your Sock | SockAI',
    description: 'Customize your sock design.',
};

const sockImages: Record<string, string> = {
    'Ankle': '/image 4.png',
    'Quarter': '/image 5.png',
    'Crew': '/image 6.png',
    'Knee High': '/image 7.png',
    'Over The Knee': '/image 8.png',
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
