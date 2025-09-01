import { Header } from '@/components/layout/Header';
import { LengthSelector } from '@/components/length-selector/LengthSelector';
import { SockBuilder } from '@/components/sock-builder/SockBuilder';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 py-12 md:py-20">
        <div id="length-selector">
          <LengthSelector />
        </div>
        <div id="sock-builder" className="mt-20">
          <SockBuilder />
        </div>
      </main>
    </div>
  );
}
