
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
    <div className="container mx-auto max-w-5xl px-4">
      <Card className="bg-white p-8 shadow-xl md:p-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
            Choose Your <span className="text-primary">Length</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500 md:text-base">
            {selected
              ? 'You have selected your sock length. Proceed to customize it.'
              : 'Customize socks with your name, logo, and colors. Select your length and start customizing now.'}
          </p>
        </div>

        <div className="mt-10">
          {!selected ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
                            'relative cursor-pointer rounded-lg border-2 p-4 text-center transition-all max-w-sm w-full',
                            'border-primary bg-primary/5'
                        )}
                        >
                            <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 fill-primary text-white md:h-6 md:w-6" />
                        <div className="relative mx-auto h-80 w-full md:h-96">
                            <Image
                            src={selectedSock.icon}
                            alt={`${selectedSock.name} sock`}
                            fill
                            className="object-contain animate-tilt-shaking"
                            data-ai-hint={`${selectedSock.name.toLowerCase()} sock`}
                            />
                        </div>
                        <p className="mt-2 text-lg font-semibold">{selectedSock.name} Length</p>
                        </div>
                    </div>
                </div>
            )
          )}
        </div>

        <div className="mt-12 flex justify-center gap-4">
          {selected && (
            <Button variant="outline" size="lg" className="rounded-full border-2 border-primary px-8 py-6 text-base font-bold text-primary hover:bg-primary hover:text-primary-foreground" onClick={handleGoBack}>
                <ChevronLeft className="mr-2 h-5 w-5" /> Back
            </Button>
          )}
          <Button size="lg" className="rounded-full bg-primary px-8 py-6 text-base font-bold text-primary-foreground hover:bg-primary/90" onClick={handleContinue} disabled={!selected}>
            Continue <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
