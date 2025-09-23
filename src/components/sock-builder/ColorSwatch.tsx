'use client';

import React from 'react';

interface ColorSwatchProps {
  color: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const colorMap: { [key: string]: string } = {
  'Black': '#000000',
  'Athletic Gold': '#FFD700',
  'White': '#FFFFFF',
  'Light Grey': '#D3D3D3',
  'Grey': '#808080',
  'Dark Grey': '#A9A9A9',
  'Red': '#FF0000',
  'Blue': '#0000FF',
  'Green': '#008000',
  'Yellow': '#FFFF00',
  'Orange': '#FFA500',
  'Purple': '#800080',
  'Pink': '#FFC0CB',
  'Navy Blue': '#000080',
  'Royal Blue': '#4169E1',
  'Kelly Green': '#4CBB17',
  'Maroon': '#800000',
  'Brown': '#8B4513',
  'Cream': '#F5F5DC',
  'Auto Detect': '#3B82F6',
  'Cardinal Red': '#C41E3A',
  'Scarlet Red': '#FF2400',
  'Bright Pink': '#FF69B4',
  'Breast Cancer Pink': '#FFB6C1',
  'Soft Pink': '#FFB6C1',
  'Light Purple': '#DDA0DD',
  'Green Teal': '#008080',
  'Blue Teal': '#20B2AA',
  'Turquoise': '#40E0D0',
  'Cyan': '#00FFFF',
  'Columbia Blue': '#87CEEB',
  'Carolina Blue': '#4B9CD3',
  'Light Blue': '#ADD8E6',
  'Bahama Blue': '#0066CC',
  'Dark Navy': '#191970',
  'Olive Green': '#808000',
  'Lime Green': '#32CD32',
  'Neon Green': '#39FF14',
  'Kiwi Green': '#8FBC8F',
  'Hunter Green': '#355E3B',
  'Neon Yellow': '#FFFF00',
  'Vegas Gold': '#C5B358',
  'Neon Orange': '#FF6600',
  'Light Orange': '#FFA500',
  'Burnt Orange': '#CC5500',
};

export function ColorSwatch({ color, size = 'md', className = '' }: ColorSwatchProps) {
  const colorHex = colorMap[color] || '#000000';
  
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        className="rounded border border-gray-300"
      >
        {/* Background */}
        <rect
          width="32"
          height="32"
          fill={colorHex}
          rx="4"
        />
        
        {/* Inner border for better visibility */}
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          fill="none"
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="1"
          rx="3"
        />
        
        {/* Checker pattern for white/light colors */}
        {(color === 'White' || color === 'Cream' || colorHex === '#FFFFFF' || colorHex === '#F5F5DC') && (
          <defs>
            <pattern id="checker" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <rect width="2" height="2" fill="rgba(0,0,0,0.1)"/>
              <rect x="2" y="2" width="2" height="2" fill="rgba(0,0,0,0.1)"/>
            </pattern>
          </defs>
        )}
        
        {(color === 'White' || color === 'Cream' || colorHex === '#FFFFFF' || colorHex === '#F5F5DC') && (
          <rect
            width="32"
            height="32"
            fill="url(#checker)"
            rx="4"
          />
        )}
      </svg>
    </div>
  );
}
