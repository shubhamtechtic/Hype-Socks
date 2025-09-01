
'use client';

import Image from 'next/image';
import { type SockPart } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface PlacementSelectorProps {
  selectedPart: SockPart | string;
  onPartClick: (part: SockPart) => void;
}

const placementOptions: { id: SockPart; name: string; description: string, position: string }[] = [
  { id: 'instep', name: 'Instep', description: 'Top of the foot', position: "top-[45%] left-[55%] w-[30%] h-[15%]" },
  { id: 'heel', name: 'Heel', description: 'Back of the heel', position: "top-[60%] left-[22%] w-[25%] h-[20%]" },
  { id: 'ankle', name: 'Side', description: 'Outer side panel', position: "top-[20%] left-[30%] w-[30%] h-[35%]" },
  { id: 'sole', name: 'Sole', description: 'Bottom of the foot', position: "bottom-[5%] left-[35%] w-[40%] h-[15%]" },
  { id: 'toe', name: 'Toe', description: 'Front toe area', position: "top-[50%] right-[2%] w-[25%] h-[25%]" },
];

export function PlacementSelector({ selectedPart, onPartClick }: PlacementSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div className="relative w-full aspect-square">
        <Image 
          src="/image 4.png" 
          alt="Sock for placement selection" 
          layout="fill" 
          objectFit="contain" 
          data-ai-hint="custom sock"
        />
        {placementOptions.map((part) => {
            const isSelected = selectedPart === part.id;
            return isSelected && (
                <div key={part.id} className={cn("absolute border-2 border-dashed border-black rounded-md flex items-center justify-center", part.position)}>
                    <div className="bg-black/70 text-white rounded-full p-1">
                        <Check className="w-4 h-4" />
                    </div>
                </div>
            )
        })}

      </div>
      <div className="flex flex-col gap-3">
        {placementOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onPartClick(option.id)}
            className={cn(
              'w-full text-left p-3 rounded-lg border-2 transition-all',
              selectedPart === option.id
                ? 'bg-primary border-primary text-primary-foreground'
                : 'bg-white border-gray-200 hover:border-gray-400'
            )}
          >
            <p className="font-semibold">{option.name}</p>
            <p className="text-sm">{option.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
