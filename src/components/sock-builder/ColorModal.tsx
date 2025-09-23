'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ColorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectColor: (color: string) => void;
  currentColor: string;
}

const colors = [
  // Column 1 - Grays, Browns, Reds, Pinks
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Light Grey', hex: '#D3D3D3' },
  { name: 'Grey', hex: '#808080' },
  { name: 'Dark Grey', hex: '#A9A9A9' },
  { name: 'Dark Brown', hex: '#654321' },
  { name: 'Brown', hex: '#8B4513' },
  { name: 'Cream', hex: '#F5F5DC' },
  { name: 'Maroon', hex: '#800000' },
  { name: 'Cardinal Red', hex: '#C41E3A' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Scarlet Red', hex: '#FF2400' },
  { name: 'Bright Pink', hex: '#FF69B4' },
  { name: 'Breast Cancer Pink', hex: '#FFB6C1' },
  
  // Column 2 - Purples, Teals, Blues
  { name: 'Soft Pink', hex: '#FFB6C1' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Light Purple', hex: '#DDA0DD' },
  { name: 'Green Teal', hex: '#008080' },
  { name: 'Blue Teal', hex: '#20B2AA' },
  { name: 'Turquoise', hex: '#40E0D0' },
  { name: 'Cyan', hex: '#00FFFF' },
  { name: 'Columbia Blue', hex: '#87CEEB' },
  { name: 'Carolina Blue', hex: '#4B9CD3' },
  { name: 'Light Blue', hex: '#ADD8E6' },
  { name: 'Bahama Blue', hex: '#0066CC' },
  { name: 'Royal Blue', hex: '#4169E1' },
  { name: 'Navy Blue', hex: '#000080' },
  { name: 'Dark Navy', hex: '#191970' },
  
  // Column 3 - Greens, Yellows, Oranges
  { name: 'Olive Green', hex: '#808000' },
  { name: 'Lime Green', hex: '#32CD32' },
  { name: 'Neon Green', hex: '#39FF14' },
  { name: 'Kiwi Green', hex: '#8FBC8F' },
  { name: 'Kelly Green', hex: '#4CBB17' },
  { name: 'Hunter Green', hex: '#355E3B' },
  { name: 'Neon Yellow', hex: '#FFFF00' },
  { name: 'Yellow', hex: '#FFD700' },
  { name: 'Athletic Gold', hex: '#FFD700' },
  { name: 'Vegas Gold', hex: '#C5B358' },
  { name: 'Neon Orange', hex: '#FF6600' },
  { name: 'Light Orange', hex: '#FFA500' },
  { name: 'Orange', hex: '#FF8C00' },
  { name: 'Burnt Orange', hex: '#CC5500' },
];

export function ColorModal({ isOpen, onClose, onSelectColor, currentColor }: ColorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Select a Color</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Color Grid */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-3 gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => onSelectColor(color.name)}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                  currentColor === color.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="relative w-8 h-8 rounded border border-gray-300 flex-shrink-0 overflow-hidden">
                  <div
                    className="w-full h-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="absolute inset-0 border border-gray-400 rounded" />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {color.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
