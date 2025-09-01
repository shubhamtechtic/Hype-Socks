'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const sockLengths = [
  { name: 'Ankle', icon: 'https://picsum.photos/300/400' },
  { name: 'Quarter', icon: 'https://picsum.photos/300/400' },
  { name: 'Crew', icon: 'https://picsum.photos/300/400' },
  { name: 'Knee High', icon: 'https://picsum.photos/300/400' },
  { name: 'Over The Knee', icon: 'https://picsum.photos/300/400' },
];

export function LengthSelector() {
  const [selected, setSelected] = useState<string>('Crew');

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
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-5">
          {sockLengths.map((sock) => (
            <div
              key={sock.name}
              onClick={() => setSelected(sock.name)}
              className={cn(
                'relative cursor-pointer rounded-lg border-2 p-4 text-center transition-all hover:border-accent hover:shadow-md',
                selected === sock.name ? 'border-accent bg-accent/5' : 'border-transparent'
              )}
            >
              {selected === sock.name && (
                <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 fill-accent text-white" />
              )}
              <div className="relative mx-auto h-48 w-full">
                <Image
                  src={sock.icon}
                  alt={`${sock.name} sock`}
                  fill
                  className="object-contain"
                  data-ai-hint={`${sock.name.toLowerCase()} sock`}
                />
              </div>
              <p className="mt-2 text-sm font-semibold">{sock.name} Length</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center gap-4">
          <Button variant="outline" size="lg" className="border-2 border-primary px-10 py-6 text-base font-bold text-primary hover:bg-primary/5">
            <ChevronLeft className="mr-2 h-5 w-5" /> Back
          </Button>
          <Button size="lg" className="bg-primary px-10 py-6 text-base font-bold text-primary-foreground hover:bg-primary/90">
            Continue <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
