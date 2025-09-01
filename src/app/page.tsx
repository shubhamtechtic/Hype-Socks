import { Header } from '@/components/sock-builder/Header';
import { SockBuilder } from '@/components/sock-builder/SockBuilder';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <SockBuilder />
    </div>
  );
}
