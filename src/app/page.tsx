import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LengthSelector } from '@/components/length-selector/LengthSelector';
import { SockBuilder } from '@/components/sock-builder/SockBuilder';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f0f2f5]">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <SockBuilder />
      </main>
      <Footer />
    </div>
  );
}
