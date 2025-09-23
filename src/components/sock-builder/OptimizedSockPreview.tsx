'use client';

import React from 'react';

interface SockDesign {
  primaryColor: string;
  secondaryColor: string;
  text: string;
  textLocation: string;
  textColor: string;
  logo: string | null;
  logoOption: 'upload' | 'email' | 'none';
  logoLocation: string;
  livePreview: boolean;
  sockType: string;
}

interface OptimizedSockPreviewProps {
  design: SockDesign;
  debugMode?: boolean;
}

export function OptimizedSockPreview({ design, debugMode = false }: OptimizedSockPreviewProps) {
  // Color mapping function
  const getColorHex = (colorName: string) => {
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
    return colorMap[colorName] || '#000000';
  };

  const primaryHex = getColorHex(design.primaryColor);
  const secondaryHex = getColorHex(design.secondaryColor);
  const accentHex = getColorHex(design.textColor === 'Auto Detect' ? design.secondaryColor : design.textColor);

  // Get sock dimensions based on type
  const getSockDimensions = (sockType: string) => {
    switch (sockType) {
      case 'crew':
        return { height: 700, cuffHeight: 100, bodyHeight: 500, toeHeight: 100 };
      case 'knee-high':
        return { height: 800, cuffHeight: 120, bodyHeight: 600, toeHeight: 80 };
      case 'over-the-knee':
        return { height: 900, cuffHeight: 140, bodyHeight: 700, toeHeight: 60 };
      case 'quarter':
        return { height: 500, cuffHeight: 80, bodyHeight: 350, toeHeight: 70 };
      default: // ankle
        return { height: 600, cuffHeight: 80, bodyHeight: 450, toeHeight: 70 };
    }
  };

  const dimensions = getSockDimensions(design.sockType);

  // SVG path generators - simplified for reliability
  const getSockPath = (view: 'front' | 'side' | 'back') => {
    const { height, cuffHeight, bodyHeight, toeHeight } = dimensions;
    const width = 160;
    const centerX = 200;
    
    // Simple rounded rectangle for sock body
    return `M${centerX - width/2} ${cuffHeight}
            L${centerX - width/2} ${height - toeHeight}
            Q${centerX - width/2} ${height}, ${centerX - width/2 + 20} ${height}
            L${centerX + width/2 - 20} ${height}
            Q${centerX + width/2} ${height}, ${centerX + width/2} ${height - toeHeight}
            L${centerX + width/2} ${cuffHeight}
            Q${centerX + width/2} ${cuffHeight - 10}, ${centerX + width/2 - 10} ${cuffHeight - 10}
            L${centerX - width/2 + 10} ${cuffHeight - 10}
            Q${centerX - width/2} ${cuffHeight - 10}, ${centerX - width/2} ${cuffHeight}
            Z`;
  };

  const getToePath = (view: 'front' | 'side' | 'back') => {
    const { height, toeHeight } = dimensions;
    const width = 160;
    const centerX = 200;
    
    return `M${centerX - width/2 + 20} ${height - toeHeight}
            L${centerX + width/2 - 20} ${height - toeHeight}
            L${centerX + width/2 - 20} ${height - 10}
            Q${centerX + width/2 - 20} ${height}, ${centerX + width/2 - 30} ${height}
            L${centerX - width/2 + 30} ${height}
            Q${centerX - width/2 + 20} ${height}, ${centerX - width/2 + 20} ${height - 10}
            Z`;
  };

  const getCuffPath = (view: 'front' | 'side' | 'back') => {
    const { cuffHeight } = dimensions;
    const width = 160;
    const centerX = 200;
    
    return `M${centerX - width/2} ${cuffHeight}
            L${centerX + width/2} ${cuffHeight}
            L${centerX + width/2} ${cuffHeight - 20}
            L${centerX - width/2} ${cuffHeight - 20}
            Z`;
  };

  const getHeelPath = (view: 'front' | 'side' | 'back') => {
    const { height, cuffHeight, bodyHeight } = dimensions;
    const width = 160;
    const centerX = 200;
    const heelY = cuffHeight + bodyHeight * 0.6;
    
    return `M${centerX - width/2 + 10} ${heelY}
            L${centerX + width/2 - 10} ${heelY}
            L${centerX + width/2 - 10} ${heelY + 30}
            L${centerX - width/2 + 10} ${heelY + 30}
            Z`;
  };

  // Text positioning
  const getTextPosition = (view: 'front' | 'side' | 'back') => {
    const { height, cuffHeight, bodyHeight } = dimensions;
    const centerX = 200;
    const textY = cuffHeight + bodyHeight * 0.4;
    
    return {
      x: centerX,
      y: textY,
      fontSize: Math.min(24, bodyHeight * 0.08),
      rotation: view === 'side' ? -90 : 0
    };
  };

  const textPos = getTextPosition('front');

  // Single sock component
  const SockSVG = ({ view, className }: { view: 'front' | 'side' | 'back', className?: string }) => (
    <div className={`relative w-48 h-64 flex items-center justify-center ${className || ''}`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox={`0 0 400 ${dimensions.height}`} 
        className="w-full h-full"
        style={{ maxHeight: '256px' }}
      >
        <defs>
          <filter id={`shadow-${view}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
            <feOffset dy="2" dx="1"/>
            <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"/>
            <feFlood floodColor="#000000" floodOpacity="0.2"/>
            <feComposite in2="shadowDiff" operator="in"/>
            <feComposite in2="SourceGraphic" operator="over"/>
          </filter>
        </defs>
        
        {/* Main sock body - Primary color */}
        <path 
          d={getSockPath(view)} 
          fill={primaryHex} 
          filter={`url(#shadow-${view})`}
          className="transition-colors duration-200"
        />
        
        {/* Cuff area - Secondary color */}
        <path 
          d={getCuffPath(view)} 
          fill={secondaryHex} 
          filter={`url(#shadow-${view})`}
          className="transition-colors duration-200"
        />
        
        {/* Heel area - Accent color */}
        <path 
          d={getHeelPath(view)} 
          fill={accentHex} 
          filter={`url(#shadow-${view})`}
          className="transition-colors duration-200"
        />
        
        {/* Toe area - Secondary color */}
        <path 
          d={getToePath(view)} 
          fill={secondaryHex} 
          filter={`url(#shadow-${view})`}
          className="transition-colors duration-200"
        />
        
        {/* Text */}
        {design.text && (
          <text
            x={textPos.x}
            y={textPos.y}
            fontSize={textPos.fontSize}
            fill={accentHex}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${textPos.rotation} ${textPos.x} ${textPos.y})`}
            className="font-bold transition-colors duration-200"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            {design.text}
          </text>
        )}
        
        {/* Logo placeholder */}
        {design.logo && design.logoOption === 'upload' && (
          <rect
            x={200 - 30}
            y={cuffHeight + bodyHeight * 0.2}
            width="60"
            height="40"
            rx="5"
            fill={accentHex}
            opacity="0.8"
            className="transition-colors duration-200"
          />
        )}
        
        {/* Debug mode - show color areas */}
        {debugMode && (
          <>
            <rect
              x={200 - 100}
              y={cuffHeight + 20}
              width="200"
              height="20"
              fill="rgba(255,0,0,0.3)"
              className="pointer-events-none"
            />
            <text x="200" y={cuffHeight + 35} textAnchor="middle" fill="red" fontSize="12">
              Primary: {design.primaryColor}
            </text>
          </>
        )}
      </svg>
    </div>
  );

  return (
    <div className="flex gap-8 items-center justify-center">
      {/* Left Sock - Side View */}
      <SockSVG view="side" />
      
      {/* Middle Sock - Front View */}
      <SockSVG view="front" />
      
      {/* Right Sock - Back View */}
      <SockSVG view="back" />
    </div>
  );
}
