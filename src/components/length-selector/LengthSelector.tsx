'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const sockLengths = [
  { name: 'Ankle', icon: '/image 4.png' },
  { name: 'Quarter', icon: '/image 5.png' },
  { name: 'Crew', icon: '/image 6.png' },
  { name: 'Knee High', icon: '/image 7.png' },
  { name: 'Over The Knee', icon: '/image 8.png' },
];

export function LengthSelector() {
  const [selected, setSelected] = useState<string>('Ankle');
  const router = useRouter();

  const handleContinue = () => {
    router.push('/#sock-builder');
  };

  const selectedSock = sockLengths.find((s) => s.name === selected);

  return (
    <div className="container mx-auto max-w-4xl px-4">
      <Card className="bg-white p-8 shadow-xl md:p-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
            Choose Your <span className="text-accent">Length</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500 md:text-base">
            Customize socks with your name, logo, and colors. Select your length and start customizing now.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-8">
          <div className="flex w-full items-center justify-center">
             <div
              className={cn(
                'relative cursor-pointer rounded-lg border-2 p-4 text-center transition-all hover:border-accent hover:shadow-md',
                'border-accent bg-accent/5'
              )}
            >
                <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 fill-accent text-white" />
              <div className="relative mx-auto h-64 w-64">
                <Image
                  src={selectedSock?.icon || '/image 4.png'}
                  alt={`${selectedSock?.name} sock`}
                  fill
                  className="object-contain"
                  data-ai-hint={`${selectedSock?.name.toLowerCase()} sock`}
                />
              </div>
              <p className="mt-2 text-lg font-semibold">{selectedSock?.name} Length</p>
            </div>
          </div>
          <div className="flex justify-center gap-2">
            {sockLengths.map((sock) => (
              <button
                key={sock.name}
                onClick={() => setSelected(sock.name)}
                className={cn(
                  'h-3 w-3 rounded-full transition-colors',
                  selected === sock.name ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
                )}
                aria-label={`Select ${sock.name} length`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <Button variant="outline" size="lg" className="rounded-full border-2 border-primary px-8 py-6 text-base font-bold text-primary hover:bg-primary/5">
            <ChevronLeft className="mr-2 h-5 w-5" /> Back
          </Button>
          <Button size="lg" className="rounded-full bg-primary px-8 py-6 text-base font-bold text-primary-foreground hover:bg-primary/90" onClick={handleContinue}>
            Continue <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
