'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Check } from 'lucide-react';

const sockLengths = [
  { name: 'Ankle', icon: 'https://hypesocks.com/wp-content/uploads/2024/07/Heel-RIGHT-Sock.png' },
  { name: 'Quarter', icon: 'https://hypesocks.com/wp-content/uploads/2024/07/Ankle-RIGHT-Sock.png' },
  { name: 'Crew', icon: '/image 6.png' },
  { name: 'Knee High', icon: '/image 7.png' },
  { name: 'Over The Knee', icon: '/image 8.png' },
];



interface SockCategorySelectorProps {
  currentSockLength: string;
  currentSockImage: string;
  onSockChange: (length: string, image: string) => void;
}

export function SockCategorySelector({ 
  currentSockLength, 
  currentSockImage, 
  onSockChange 
}: SockCategorySelectorProps) {
  // For now, just show dummy categories - no functionality
  const baseLength = currentSockLength.replace(' Length', '');

  return (
    <div className="w-full">
      <Card className="p-8 bg-white shadow-sm border-2 border-gray-100">
        <div className="flex flex-col items-center">
          <div>
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl mb-4">
                Choose Your <span className="text-primary">Length</span>
              </h2>
              <p className="text-gray-600 mb-8 text-center max-w-2xl text-lg">
                Customize socks with your name, logo, and colors. Select your length and start customizing now.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full max-w-5xl">
                {sockLengths.map((sock) => (
                  <div
                    key={sock.name}
                    className="relative rounded-lg border-2 p-6 text-center bg-white border-gray-200 shadow-sm"
                  >
                    <div className="relative mx-auto h-32 w-full md:h-40">
                      <Image
                        src={sock.icon}
                        alt={`${sock.name} sock`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="mt-4 text-base font-semibold text-gray-800">{sock.name}</p>
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-300">
                        <Check className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
