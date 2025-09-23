'use client';

import React from 'react';
import Image from 'next/image';
import { ColorPreviewCanvas } from './ColorPreviewCanvas';

interface SockDesign {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  stripeColor: string;
  borderColor: string;
  text: string;
  textLocation: string;
  textColor: string;
  logo: string | null;
  logoOption: 'upload' | 'email' | 'none';
  logoLocation: string;
  livePreview: boolean;
  sockType: string;
}

interface SockPreviewProps {
  design: SockDesign;
  debugMode?: boolean;
}

export function SockPreview({ design, debugMode = false }: SockPreviewProps) {
  // Get images based on sock type using actual available images
  const getImagesForSockType = (sockType: string) => {
    const basePath = '/Zip/';
    const typeMap: { [key: string]: string[] } = {
      'ankle': [
        `${basePath}Ankle-FRONT-Sock.png`,
        `${basePath}Ankle-LEFT-Sock.png`,
        `${basePath}Ankle-RIGHT-Sock.png`,
        `${basePath}Ankle-BACK-Sock.png`,
      ],
      'crew': [
        `${basePath}Crew2.0-FRONT-Sock.png`,
        `${basePath}Crew-2.0-LEFT-Sock.png`,
        `${basePath}Crew-2.0-LEFT-Sock.png`, // Use LEFT as RIGHT since no RIGHT exists
        `${basePath}Crew2.0-FRONT-Sock.png`, // Use FRONT as BACK since no BACK exists
      ],
      'knee-high': [
        `${basePath}CrewEliteFRONT-Sock.png`,
        `${basePath}CrewEliteLEFTSIDE-Sock.png`,
        `${basePath}CrewEliteRIGHTSIDE-Sock.png`,
        `${basePath}CrewEliteBACK-Sock.png`,
      ],
      'over-the-knee': [
        `${basePath}Crew-EASTON-FRONT-Sock.png`,
        `${basePath}Crew-EASTON-LEFT-Sock.png`,
        `${basePath}Crew-EASTON-RIGHT-Sock.png`,
        `${basePath}Crew-EASTON-BACK-Sock.png`,
      ],
      'quarter': [
        `${basePath}Heel-FRONT-Sock.png`,
        `${basePath}Heel-LEFT-Sock.png`,
        `${basePath}Heel-RIGHT-Sock.png`,
        `${basePath}Heel-BACK-Sock.png`,
      ]
    };
    
    return typeMap[sockType] || typeMap['ankle']; // Default to ankle if type not found
  };

  const previewImages = getImagesForSockType(design.sockType);
  
  console.log('SockPreview - sockType:', design.sockType, 'images:', previewImages);

  return (
    <div className="flex gap-12 items-center justify-center py-8">
      {/* Left Sock - Side View (LEFT) */}
      <div className="relative w-80 h-96 flex items-center justify-center">
        <ColorPreviewCanvas
          imageSrc={previewImages[1]} // LEFT view
          primaryColor={design.primaryColor}
          secondaryColor={design.secondaryColor}
          accentColor={design.accentColor}
          stripeColor={design.stripeColor}
          borderColor={design.borderColor}
          text={design.text}
          textLocation={design.textLocation}
          textColor={design.textColor}
          logo={design.logo}
          logoOption={design.logoOption}
          logoLocation={design.logoLocation}
          livePreview={design.livePreview}
          sockType={design.sockType}
          debugMode={debugMode}
          className="w-full h-full"
        />
      </div>

      {/* Middle Sock - Front View */}
      <div className="relative w-80 h-96 flex items-center justify-center">
        <ColorPreviewCanvas
          imageSrc={previewImages[0]} // FRONT view
          primaryColor={design.primaryColor}
          secondaryColor={design.secondaryColor}
          accentColor={design.accentColor}
          stripeColor={design.stripeColor}
          borderColor={design.borderColor}
          text={design.text}
          textLocation={design.textLocation}
          textColor={design.textColor}
          logo={design.logo}
          logoOption={design.logoOption}
          logoLocation={design.logoLocation}
          livePreview={design.livePreview}
          sockType={design.sockType}
          debugMode={debugMode}
          className="w-full h-full"
        />
      </div>

      {/* Right Sock - Back View */}
      <div className="relative w-80 h-96 flex items-center justify-center">
        <ColorPreviewCanvas
          imageSrc={previewImages[3]} // BACK view
          primaryColor={design.primaryColor}
          secondaryColor={design.secondaryColor}
          accentColor={design.accentColor}
          stripeColor={design.stripeColor}
          borderColor={design.borderColor}
          text={design.text}
          textLocation={design.textLocation}
          textColor={design.textColor}
          logo={design.logo}
          logoOption={design.logoOption}
          logoLocation={design.logoLocation}
          livePreview={design.livePreview}
          sockType={design.sockType}
          debugMode={debugMode}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
