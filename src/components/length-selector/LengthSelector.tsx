
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const sockLengths = [
  { name: 'Ankle', icon: 'https://hypesocks.com/wp-content/uploads/2024/07/Heel-RIGHT-Sock.png' },
  { name: 'Quarter', icon: 'https://hypesocks.com/wp-content/uploads/2024/07/Ankle-RIGHT-Sock.png' },
  { name: 'Crew', icon: '/image 6.png' },
  { name: 'Knee High', icon: '/image 7.png' },
  { name: 'Over The Knee', icon: '/image 8.png' },
];

const subCategories: Record<string, { name: string; icon: string }[]> = {
    'Ankle': [
      { name: 'Ankle', icon: 'https://hypesocks.com/wp-content/uploads/2024/07/Heel-RIGHT-Sock.png' },
    ],
    'Quarter': [
      { name: 'Quarter', icon: 'https://hypesocks.com/wp-content/uploads/2024/07/Ankle-RIGHT-Sock.png' },
    ],
    'Crew': [
        { name: '2.0 - Crew', icon: 'https://hypesocks.com/wp-content/uploads/2024/07/Crew2.0-RIGHT-Sock.png' },
        { name: 'Elite - Crew', icon: 'https://hypesocks.com/wp-content/uploads/2024/07/CrewEliteRIGHTSIDE-Sock.png' },
        { name: 'Havoc - Crew', icon: 'https://hypesocks.com/wp-content/uploads/2024/07/Crew-HAVOC-RIGHT-Sock.png' },
        { name: 'Polaris - Crew', icon: 'https://hypesocks.com/wp-content/uploads/2024/07/Crew-POLARIS-RIGHT-Sock-1.png' },
    ],
    'Knee High': [
        { name: '2.0 - Knee High', icon: '/image 7-1.png' },
        { name: 'Easton - Knee High', icon: '/image 7-2.png' },
        { name: 'Havoc - Knee High', icon: '/image 7-3.png' },
        { name: 'Polaris - Knee High', icon: '/image 7-4.png' },
        { name: 'Stellaris - Knee High', icon: '/image 7-5.png' },
        { name: 'Stirrup - Knee High', icon: '/image 7-6.png' },
    ],
    'Over The Knee': [
        { name: '2 Stripes - Over The Knee', icon: 'https://hypesocks.com/wp-content/uploads/2024/07/European2Rings-RIGHT-Sock.png' },
        { name: '3 Stripes - Over The Knee', icon: 'https://hypesocks.com/wp-content/uploads/2024/07/European3Rings-RIGHT-Sock.png' },
        { name: 'Solid - Over The Knee', icon: 'https://hypesocks.com/wp-content/uploads/2024/07/Solid-RIGHT-Sock-1.png' },
    ]
};

export function LengthSelector() {
  const [selectedLength, setSelectedLength] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const router = useRouter();

  const handleLengthSelect = (lengthName: string) => {
    setSelectedLength(lengthName);
    setSelectedSub(null); // Reset sub-selection when a new length is picked
  };

  const handleSubSelect = (subName: string) => {
    setSelectedSub(subName);
    router.push(`/build?length=${encodeURIComponent(subName)}`);
  };
  
  const handleGoBack = () => {
    setSelectedLength(null);
    setSelectedSub(null);
  };

  const selectedSock = sockLengths.find((s) => s.name === selectedLength);
  const currentSubCategories = selectedLength ? subCategories[selectedLength] : [];

  const getGridCols = (count: number) => {
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-1 md:grid-cols-2';
    if (count === 3) return 'grid-cols-1 md:grid-cols-3';
    if (count === 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
    if (count <= 6) return 'grid-cols-1 md:grid-cols-3';
    return 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5';
  }

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
          {!selectedLength ? (
            <div className={`grid ${getGridCols(sockLengths.length)} gap-6`}>
              {sockLengths.map((sock) => (
                <div
                  key={sock.name}
                  onClick={() => handleLengthSelect(sock.name)}
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
            <div>
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold uppercase tracking-tight md:text-3xl mb-6">
                    Choose Your <span className="text-primary">{selectedLength} Style</span>
                </h2>
                <div className={`grid ${getGridCols(currentSubCategories.length)} gap-6 w-full`}>
                    {currentSubCategories.map((subSock) => (
                    <div
                        key={subSock.name}
                        onClick={() => handleSubSelect(subSock.name)}
                        className='relative cursor-pointer rounded-lg border-2 p-4 text-center transition-all hover:border-primary hover:shadow-md'
                    >
                        <div className="relative mx-auto h-48 w-full md:h-64">
                            <Image
                                src={subSock.icon}
                                alt={`${subSock.name} sock`}
                                fill
                                className="object-contain animate-tilt-shaking"
                                data-ai-hint={`${subSock.name.toLowerCase()} sock`}
                            />
                        </div>
                        <p className="mt-2 text-sm font-semibold">{subSock.name}</p>
                    </div>
                    ))}
                </div>
                <div className="mt-8 flex justify-center gap-4">
                    <Button variant="outline" size="lg" className="rounded-full border-2 border-primary px-8 py-6 text-base font-bold text-primary hover:bg-primary hover:text-primary-foreground" onClick={handleGoBack}>
                        <ChevronLeft className="mr-2 h-5 w-5" /> Back
                    </Button>
                </div>
              </div>
            </div>
          )}
        </div>

      </Card>
    </div>
  );
}
