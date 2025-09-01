
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SockBuilder } from '@/components/sock-builder/SockBuilder';

export default function BuildPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <SockBuilder />
      </main>
      <Footer />
    </div>
  );
}
