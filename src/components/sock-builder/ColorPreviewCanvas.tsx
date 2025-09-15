'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { colors } from '@/lib/types';

interface ColorPreviewCanvasProps {
  imageSrc: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  className?: string;
  debugMode?: boolean;
}

export function ColorPreviewCanvas({ 
  imageSrc, 
  primaryColor, 
  secondaryColor, 
  accentColor, 
  className,
  debugMode = false
}: ColorPreviewCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [originalImageData, setOriginalImageData] = useState<ImageData | null>(null);

  // Get color hex values with memoization
  const getColorHex = useCallback((colorName: string) => {
    const color = colors.find(c => c.name === colorName);
    return color?.hex || '#000000';
  }, []);

  const primaryHex = useMemo(() => getColorHex(primaryColor), [primaryColor, getColorHex]);
  const secondaryHex = useMemo(() => getColorHex(secondaryColor), [secondaryColor, getColorHex]);
  const accentHex = useMemo(() => getColorHex(accentColor), [accentColor, getColorHex]);

  // Load original image and store it
  const loadOriginalImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsLoading(true);
    setError(null);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        // Calculate the size to fit within the container while maintaining aspect ratio
        const containerWidth = canvas.parentElement?.clientWidth || 400;
        const containerHeight = canvas.parentElement?.clientHeight || 400;
        
        const imageAspectRatio = img.width / img.height;
        const containerAspectRatio = containerWidth / containerHeight;
        
        let canvasWidth, canvasHeight;
        
        if (imageAspectRatio > containerAspectRatio) {
          // Image is wider than container
          canvasWidth = containerWidth;
          canvasHeight = containerWidth / imageAspectRatio;
        } else {
          // Image is taller than container
          canvasHeight = containerHeight;
          canvasWidth = containerHeight * imageAspectRatio;
        }
        
        // Set canvas size
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.width = `${canvasWidth}px`;
        canvas.style.height = `${canvasHeight}px`;

        // Draw the original image scaled to fit
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

        // Store the original image data
        const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        setOriginalImageData(imageData);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading image:', err);
        setError('Failed to load image');
        setIsLoading(false);
      }
    };

    img.onerror = () => {
      setError('Failed to load image');
      setIsLoading(false);
    };

    img.src = imageSrc;
  }, [imageSrc]);

  // Helper function to detect if a pixel is part of a stripe pattern (small portions only)
  const isStripePattern = useCallback((data: Uint8ClampedArray, width: number, height: number, x: number, y: number) => {
    const pixelIndex = (y * width + x) * 4;
    const r = data[pixelIndex];
    const g = data[pixelIndex + 1];
    const b = data[pixelIndex + 2];
    const gray = (r + g + b) / 3;
    
    // Only consider medium-light gray areas for stripes (not too dark, not too light)
    if (gray < 160 || gray > 220) return false;
    
    // Check horizontal continuity with stricter criteria
    let horizontalSimilarity = 0;
    const checkDistance = 5; // Increased for better stripe detection
    
    for (let dx = -checkDistance; dx <= checkDistance; dx++) {
      const checkX = x + dx;
      if (checkX >= 0 && checkX < width) {
        const checkIndex = (y * width + checkX) * 4;
        const checkR = data[checkIndex];
        const checkG = data[checkIndex + 1];
        const checkB = data[checkIndex + 2];
        const checkGray = (checkR + checkG + checkB) / 3;
        
        // Stricter similarity check
        if (Math.abs(gray - checkGray) < 15) {
          horizontalSimilarity++;
        }
      }
    }
    
    // Require higher similarity for stripe detection
    return horizontalSimilarity >= checkDistance + 1;
  }, []);

  // Helper function to detect border/edge areas (small portions only)
  const isBorderArea = useCallback((data: Uint8ClampedArray, width: number, height: number, x: number, y: number) => {
    const pixelIndex = (y * width + x) * 4;
    const r = data[pixelIndex];
    const g = data[pixelIndex + 1];
    const b = data[pixelIndex + 2];
    const gray = (r + g + b) / 3;
    
    // Only consider specific gray ranges for borders (not too dark, not too light)
    if (gray < 100 || gray > 200) return false;
    
    // Check if near edges with stricter criteria
    const isNearEdge = x < 3 || x > width - 3 || y < 3 || y > height - 3;
    
    let contrastCount = 0;
    const neighbors = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    
    for (const [dx, dy] of neighbors) {
      const checkX = x + dx;
      const checkY = y + dy;
      if (checkX >= 0 && checkX < width && checkY >= 0 && checkY < height) {
        const checkIndex = (checkY * width + checkX) * 4;
        const checkR = data[checkIndex];
        const checkG = data[checkIndex + 1];
        const checkB = data[checkIndex + 2];
        const checkGray = (checkR + checkG + checkB) / 3;
        
        // Stricter contrast requirement
        if (Math.abs(gray - checkGray) > 40) {
          contrastCount++;
        }
      }
    }
    
    // Require higher contrast for border detection
    return isNearEdge || contrastCount > 4;
  }, []);

  // Apply colors to the stored original image
  const applyColors = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !originalImageData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check if any colors are selected (not default)
    const hasPrimaryColor = primaryColor && primaryColor !== 'Black';
    const hasSecondaryColor = secondaryColor && secondaryColor !== 'White';
    const hasAccentColor = accentColor && accentColor !== 'Orange';

    // If no colors are selected, show original image
    if (!hasPrimaryColor && !hasSecondaryColor && !hasAccentColor) {
      ctx.putImageData(originalImageData, 0, 0);
      return;
    }

    // Create a copy of the original image data
    const imageData = new ImageData(
      new Uint8ClampedArray(originalImageData.data),
      originalImageData.width,
      originalImageData.height
    );
    const data = imageData.data;

    // Apply color transformations based on pattern detection
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Skip transparent pixels
      if (a === 0) continue;

      // Calculate pixel position
      const pixelIndex = i / 4;
      const x = pixelIndex % canvas.width;
      const y = Math.floor(pixelIndex / canvas.width);
      
      // Analyze pixel characteristics
      const gray = (r + g + b) / 3;
      const saturation = Math.max(r, g, b) - Math.min(r, g, b);
      const isEdge = (r === 0 && g === 0 && b === 0) || (r === 255 && g === 255 && b === 255);
      
      let newColor: string | null = null;
      let areaType = 'none';
      
      // Pattern-based area detection with proper hierarchy
      
      // 1. SECONDARY COLOR - Only specific stripe patterns (small portions)
      if (isStripePattern(data, canvas.width, canvas.height, x, y)) {
        areaType = 'secondary';
        if (hasSecondaryColor) {
          newColor = secondaryHex;
        }
      }
      
      // 2. ACCENT COLOR - Only specific border/edge areas (small portions)
      else if (isBorderArea(data, canvas.width, canvas.height, x, y)) {
        areaType = 'accent';
        if (hasAccentColor) {
          newColor = accentHex;
        }
      }
      
      // 3. PRIMARY COLOR - Everything else (main sock body - large portions)
      else {
        areaType = 'primary';
        if (hasPrimaryColor) {
          newColor = primaryHex;
        }
      }

      // Debug mode - show area detection
      if (debugMode && !newColor) {
        switch (areaType) {
          case 'primary':
            data[i] = 255; data[i + 1] = 0; data[i + 2] = 0; // Red for primary
            break;
          case 'secondary':
            data[i] = 0; data[i + 1] = 255; data[i + 2] = 0; // Green for secondary
            break;
          case 'accent':
            data[i] = 0; data[i + 1] = 0; data[i + 2] = 255; // Blue for accent
            break;
          default:
            data[i] = 128; data[i + 1] = 128; data[i + 2] = 128; // Gray for none
        }
      }

      // Apply the color if one was selected
      if (newColor) {
        const hex = newColor.replace('#', '');
        const newR = parseInt(hex.substr(0, 2), 16);
        const newG = parseInt(hex.substr(2, 2), 16);
        const newB = parseInt(hex.substr(4, 2), 16);

        // Preserve some of the original intensity for natural look
        const intensity = Math.min(gray / 255, 0.9) + 0.1; // Keep more variation
        data[i] = Math.round(newR * intensity);
        data[i + 1] = Math.round(newG * intensity);
        data[i + 2] = Math.round(newB * intensity);
      }
    }

    // Put the modified image data back
    ctx.putImageData(imageData, 0, 0);
  }, [originalImageData, primaryColor, secondaryColor, accentColor, primaryHex, secondaryHex, accentHex, isBorderArea, isStripePattern]);

  // Load original image on mount
  useEffect(() => {
    loadOriginalImage();
  }, [loadOriginalImage]);

  // Apply colors when they change
  useEffect(() => {
    if (originalImageData) {
      applyColors();
    }
  }, [originalImageData, applyColors]);


  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <p className="text-sm text-gray-500">Preview unavailable</p>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <p className="text-xs text-gray-500">Applying colors...</p>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`max-w-full max-h-full object-contain ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
        style={{ 
          width: 'auto', 
          height: 'auto',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      />
    </div>
  );
}
