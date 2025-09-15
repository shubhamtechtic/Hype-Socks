
'use client';

import Image from 'next/image';
import { type SockPart } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface PlacementSelectorProps {
  selectedPart: SockPart | string;
  onPartClick: (part: SockPart) => void;
  sockImage: string;
  debugMode?: boolean;
}

const placementOptions: { id: SockPart; name: string; position: string }[] = [
  { id: 'heel', name: 'Heel', position: "top-[55%] left-[20%] w-[30%] h-[25%]" },
  { id: 'ankle', name: 'Ankle', position: "top-[25%] left-[25%] w-[35%] h-[30%]" },
  { id: 'calf', name: 'Calf', position: "top-[8%] left-[30%] w-[35%] h-[20%]" },
  { id: 'toe', name: 'Toe', position: "top-[70%] left-[60%] w-[25%] h-[20%]" },
  { id: 'sole', name: 'Sole', position: "bottom-[8%] left-[30%] w-[45%] h-[18%]" },
  { id: 'full', name: 'Full', position: "top-[15%] left-[15%] w-[70%] h-[70%]" },
];

export function PlacementSelector({ selectedPart, onPartClick, sockImage, debugMode = false }: PlacementSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div className="relative w-full aspect-square">
        <Image 
          src={sockImage} 
          alt="Sock for placement selection" 
          fill
          className="object-contain animate-tilt-shaking"
          data-ai-hint="custom sock"
        />
        {placementOptions.map((part) => {
            const isSelected = selectedPart === part.id;
            const shouldShow = isSelected || debugMode;
            
            return shouldShow && (
                <div 
                    key={part.id} 
                    className={cn(
                        "absolute border-2 border-dashed rounded-lg flex items-center justify-center",
                        isSelected 
                            ? "border-primary bg-primary/10" 
                            : "border-gray-400 bg-gray-100/50",
                        part.position
                    )}
                >
                    <div className={cn(
                        "rounded-full p-1.5 shadow-lg text-xs font-semibold",
                        isSelected 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-gray-600 text-white"
                    )}>
                        {isSelected ? <Check className="w-3 h-3" /> : part.name}
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
          </button>
        ))}
      </div>
    </div>
  );
}
