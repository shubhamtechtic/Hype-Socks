
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChevronRight, ArrowRight, ChevronLeft } from 'lucide-react';
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
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selected) {
      router.push(`/build?length=${encodeURIComponent(selected)}`);
    }
  };
  
  const handleGoBack = () => {
    setSelected(null);
  };

  const selectedSock = sockLengths.find((s) => s.name === selected);

  return (
    <div className="container mx-auto max-w-7xl px-4">
      <Card className="bg-white p-8 shadow-xl md:p-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
            Choose Your <span className="text-primary">Style</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500 md:text-base">
            Customize socks with your name, logo, and colors. Select your length and start customizing now.
          </p>
        </div>

        <div className="mt-10">
          {!selected ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {sockLengths.map((sock) => (
                <div
                  key={sock.name}
                  onClick={() => setSelected(sock.name)}
                  className='relative cursor-pointer rounded-lg border-2 p-4 text-center transition-all hover:border-primary hover:shadow-md'
                >
                  <div className="relative mx-auto h-48 w-full md:h-64">
                    <Image
                      src={sock.icon}
                      alt={`${sock.name} sock`}
                      fill
                      className="object-contain animate-tilt-shaking"
                      data-ai-hint={`${sock.name.toLowerCase()} sock`}
                    />
                  </div>
                  <p className="mt-2 text-sm font-semibold">{sock.name}</p>
                </div>
              ))}
            </div>
          ) : (
            selectedSock && (
              <div className="flex flex-col items-center justify-center gap-8">
                <div className="flex w-full items-center justify-center">
                  <div
                    className={cn(
                      'relative cursor-pointer rounded-lg border-2 p-4 text-center transition-all w-full max-w-sm',
                      'border-primary/30 bg-primary/5'
                    )}
                  >
                    <div className="relative mx-auto h-80 w-full md:h-96">
                      <Image
                        src={selectedSock.icon}
                        alt={`${selectedSock.name} sock`}
                        fill
                        className="object-contain animate-tilt-shaking"
                        data-ai-hint={`${selectedSock.name.toLowerCase()} sock`}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <p className="text-lg font-semibold">{selectedSock.name} Length</p>
                        <Button size="icon" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleContinue}>
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" size="lg" className="rounded-full border-2 border-primary px-8 py-6 text-base font-bold text-primary hover:bg-primary hover:text-primary-foreground" onClick={handleGoBack}>
                    <ChevronLeft className="mr-2 h-5 w-5" /> Back
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
        
        {!selected && (
            <div className="mt-12 flex justify-center">
                <Button size="lg" className="rounded-full bg-primary px-8 py-6 text-base font-bold text-primary-foreground hover:bg-primary/90" onClick={handleContinue} disabled={!selected}>
                    Continue <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        )}

      </Card>
    </div>
  );
}
