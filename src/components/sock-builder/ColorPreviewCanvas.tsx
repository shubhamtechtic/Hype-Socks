'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';

interface ColorPreviewCanvasProps {
  imageSrc: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  stripeColor?: string;
  borderColor?: string;
  className?: string;
  debugMode?: boolean;
  text?: string;
  textLocation?: string;
  textColor?: string;
  logo?: string | null;
  logoOption?: 'upload' | 'email' | 'none';
  logoLocation?: string;
  livePreview?: boolean;
  sockType?: string;
}

export function ColorPreviewCanvas({ 
  imageSrc, 
  primaryColor, 
  secondaryColor, 
  accentColor, 
  stripeColor = 'Red',
  borderColor = 'Black',
  className,
  debugMode = false,
  text = '',
  textLocation = 'Back (Vertical)',
  textColor = 'Auto Detect',
  logo = null,
  logoOption = 'none',
  logoLocation = 'Front',
  livePreview = false,
  sockType = 'ankle'
}: ColorPreviewCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [originalImageData, setOriginalImageData] = useState<ImageData | null>(null);

  // Get color hex values with memoization
  const getColorHex = useCallback((colorName: string) => {
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
  }, []);

  const primaryHex = useMemo(() => getColorHex(primaryColor), [primaryColor, getColorHex]);
  const secondaryHex = useMemo(() => getColorHex(secondaryColor), [secondaryColor, getColorHex]);
  const accentHex = useMemo(() => getColorHex(accentColor), [accentColor, getColorHex]);
  const stripeHex = useMemo(() => getColorHex(stripeColor), [stripeColor, getColorHex]);
  const borderHex = useMemo(() => getColorHex(borderColor), [borderColor, getColorHex]);

  // Load original image and store it
  const loadOriginalImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsLoading(true);
    setError(null);

    const img = new Image();
    // img.crossOrigin = 'anonymous'; // Commented out to avoid CORS issues
    
    img.onload = () => {
      try {
        console.log('Image loaded successfully:', imageSrc, 'Dimensions:', img.width, 'x', img.height);
        
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
        console.log('Canvas setup complete, dimensions:', canvasWidth, 'x', canvasHeight);
      } catch (err) {
        console.error('Error loading image:', err);
        setError('Failed to load image');
        setIsLoading(false);
      }
    };

    img.onerror = (error) => {
      console.error('Image load error:', error, 'for image:', imageSrc);
      setError(`Failed to load image: ${imageSrc}`);
      setIsLoading(false);
    };

    img.src = imageSrc;
  }, [imageSrc]);

  // Enhanced area detection for elite sport socks
  const getAreaType = useCallback((x: number, y: number, width: number, height: number, gray: number) => {
    // Define sock areas based on position - make them more generous
    const isToeArea = y > height * 0.7; // Bottom 30% - toe area
    const isHeelArea = (x < width * 0.3 || x > width * 0.7) && y > height * 0.6; // Sides and bottom - heel area
    const isCuffArea = y < height * 0.25; // Top 25% - cuff area
    const isMainBody = !isToeArea && !isHeelArea && !isCuffArea; // Everything else is main body
    
    // Check for stripe patterns (horizontal lines)
    const isStripeArea = Math.abs(y - height * 0.4) < height * 0.05 || Math.abs(y - height * 0.6) < height * 0.05;
    
    // Check for border areas (edges)
    const isBorderArea = x < width * 0.1 || x > width * 0.9 || y < height * 0.1 || y > height * 0.9;
    
    // Use brightness to determine if it should be colored - more lenient
    const isLightArea = gray > 120; // Light areas get secondary/accent colors
    const isDarkArea = gray < 150; // Dark areas get primary color
    
    // Enhanced area detection for elite sport socks
    if (isStripeArea && isLightArea) {
      return 'stripe'; // Stripe areas get stripe color
    } else if (isBorderArea) {
      return 'border'; // Border areas get border color
    } else if (isToeArea || isHeelArea) {
      return 'accent'; // Toe and heel areas get accent color
    } else if (isCuffArea && isLightArea) {
      return 'secondary'; // Light cuff areas get secondary color
    } else if (isMainBody) {
      return 'primary'; // Main body gets primary color
    } else {
      return 'primary'; // Default to primary - always apply color
    }
  }, []);

  // Apply colors to the stored original image
  const applyColors = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !originalImageData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check if any colors are selected (not empty strings)
    const hasPrimaryColor = primaryColor && primaryColor !== '';
    const hasSecondaryColor = secondaryColor && secondaryColor !== '';
    const hasAccentColor = accentColor && accentColor !== '';
    const hasStripeColor = stripeColor && stripeColor !== '';
    const hasBorderColor = borderColor && borderColor !== '';

    console.log('Applying colors:', {
      primaryColor,
      secondaryColor,
      accentColor,
      hasPrimaryColor,
      hasSecondaryColor,
      hasAccentColor,
      primaryHex,
      secondaryHex,
      accentHex
    });

    // If no colors are selected, show original image
    if (!hasPrimaryColor && !hasSecondaryColor && !hasAccentColor) {
      console.log('No colors selected, showing original image');
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

    // Simple and reliable color application
    let colorAppliedCount = 0;
    let primaryCount = 0;
    let secondaryCount = 0;
    let accentCount = 0;
    
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
      
      // Calculate brightness
      const gray = (r + g + b) / 3;
      
      // Determine area type based on position and brightness
      const areaType = getAreaType(x, y, canvas.width, canvas.height, gray);
      
      let newColor: string | null = null;
      
      // Apply color based on area type - always apply a color if available
      if (areaType === 'primary' && hasPrimaryColor) {
        newColor = primaryHex;
        primaryCount++;
      } else if (areaType === 'secondary' && hasSecondaryColor) {
        newColor = secondaryHex;
        secondaryCount++;
      } else if (areaType === 'accent' && hasAccentColor) {
        newColor = accentHex;
        accentCount++;
      } else if (areaType === 'stripe' && hasStripeColor) {
        newColor = stripeHex;
        accentCount++;
      } else if (areaType === 'border' && hasBorderColor) {
        newColor = borderHex;
        accentCount++;
      } else if (hasPrimaryColor) {
        // Fallback: if no specific area detected, apply primary color
        newColor = primaryHex;
        primaryCount++;
      }

      // Debug mode - show area detection
      if (debugMode) {
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
          case 'stripe':
            data[i] = 255; data[i + 1] = 255; data[i + 2] = 0; // Yellow for stripe
            break;
          case 'border':
            data[i] = 255; data[i + 1] = 0; data[i + 2] = 255; // Magenta for border
            break;
        }
      }

      // Apply the color if one was selected
      if (newColor) {
        const hex = newColor.replace('#', '');
        const newR = parseInt(hex.substr(0, 2), 16);
        const newG = parseInt(hex.substr(2, 2), 16);
        const newB = parseInt(hex.substr(4, 2), 16);

        // Simple color application - just replace the color
        data[i] = newR;
        data[i + 1] = newG;
        data[i + 2] = newB;
        colorAppliedCount++;
      }
    }
    
    console.log('Color application complete:', {
      totalPixels: data.length / 4,
      colorAppliedCount,
      primaryCount,
      secondaryCount,
      accentCount,
      debugMode
    });

    // Put the modified image data back
    ctx.putImageData(imageData, 0, 0);

    // Draw text if provided
    if (text && text.trim()) {
      drawText(ctx, canvas.width, canvas.height);
    }

    // Draw logo if provided or show placeholder
    if (logoOption === 'upload') {
      if (logo) {
        drawLogo(ctx, canvas.width, canvas.height);
      } else {
        drawLogoPlaceholder(ctx, canvas.width, canvas.height);
      }
    }
  }, [originalImageData, primaryColor, secondaryColor, accentColor, stripeColor, borderColor, primaryHex, secondaryHex, accentHex, stripeHex, borderHex, getAreaType, text, textLocation, textColor, logo, logoOption, logoLocation, livePreview]);

  // Draw text on the sock
  const drawText = useCallback((ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    if (!text || !text.trim()) return;

    const textColorHex = textColor === 'Auto Detect' ? secondaryHex : getColorHex(textColor);
    
    // Parse text color
    const hex = textColorHex.replace('#', '');
    const textR = parseInt(hex.substr(0, 2), 16);
    const textG = parseInt(hex.substr(2, 2), 16);
    const textB = parseInt(hex.substr(4, 2), 16);

    // Enhanced text styling for better visibility and natural look
    ctx.fillStyle = `rgb(${textR}, ${textG}, ${textB})`;
    ctx.strokeStyle = `rgb(${Math.max(0, textR - 60)}, ${Math.max(0, textG - 60)}, ${Math.max(0, textB - 60)})`;
    ctx.lineWidth = 2; // Moderate stroke for natural look

    // Calculate text position based on location and sock view
    let x = canvasWidth / 2;
    let y = canvasHeight / 2;
    let fontSize = Math.min(canvasWidth, canvasHeight) * 0.15; // Larger font size
    let rotation = 0;

    // Position based on sock view and text location
    if (imageSrc.includes('FRONT')) {
      switch (textLocation) {
        case 'Back (Vertical)':
          x = canvasWidth * 0.8;
          y = canvasHeight * 0.35;
          rotation = Math.PI / 2;
          break;
        case 'Front (Horizontal)':
          x = canvasWidth / 2;
          y = canvasHeight * 0.8;
          rotation = 0;
          break;
        case 'Side (Vertical)':
          x = canvasWidth * 0.2;
          y = canvasHeight * 0.35;
          rotation = -Math.PI / 2;
          break;
        case 'Top (Horizontal)':
          x = canvasWidth / 2;
          y = canvasHeight * 0.2;
          rotation = 0;
          break;
        default:
          x = canvasWidth * 0.8;
          y = canvasHeight * 0.35;
          rotation = Math.PI / 2;
      }
    } else if (imageSrc.includes('BACK')) {
      switch (textLocation) {
        case 'Back (Vertical)':
          x = canvasWidth * 0.2;
          y = canvasHeight * 0.35;
          rotation = -Math.PI / 2;
          break;
        case 'Front (Horizontal)':
          x = canvasWidth / 2;
          y = canvasHeight * 0.8;
          rotation = 0;
          break;
        case 'Side (Vertical)':
          x = canvasWidth * 0.8;
          y = canvasHeight * 0.35;
          rotation = Math.PI / 2;
          break;
        case 'Top (Horizontal)':
          x = canvasWidth / 2;
          y = canvasHeight * 0.2;
          rotation = 0;
          break;
        default:
          x = canvasWidth * 0.2;
          y = canvasHeight * 0.35;
          rotation = -Math.PI / 2;
      }
    } else if (imageSrc.includes('LEFT') || imageSrc.includes('RIGHT')) {
      switch (textLocation) {
        case 'Back (Vertical)':
          x = canvasWidth * 0.75;
          y = canvasHeight * 0.4;
          rotation = Math.PI / 2;
          break;
        case 'Front (Horizontal)':
          x = canvasWidth / 2;
          y = canvasHeight * 0.75;
          rotation = 0;
          break;
        case 'Side (Vertical)':
          x = canvasWidth * 0.25;
          y = canvasHeight * 0.4;
          rotation = -Math.PI / 2;
          break;
        case 'Top (Horizontal)':
          x = canvasWidth / 2;
          y = canvasHeight * 0.25;
          rotation = 0;
          break;
        default:
          x = canvasWidth * 0.75;
          y = canvasHeight * 0.4;
          rotation = Math.PI / 2;
      }
    }

    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Save context state
    ctx.save();
    
    // Apply rotation
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    // Draw text with enhanced stroke for better visibility
    ctx.strokeText(text, 0, 0);
    ctx.fillText(text, 0, 0);
    
    // Restore context state
    ctx.restore();
  }, [text, textLocation, textColor, secondaryHex, getColorHex, imageSrc]);

  // Draw logo placeholder
  const drawLogoPlaceholder = useCallback((ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    // Calculate logo area size and position
    const logoSize = Math.min(canvasWidth, canvasHeight) * 0.25;
    let x = canvasWidth * 0.2;
    let y = canvasHeight * 0.3;
    
    // Position based on logo location setting
    switch (logoLocation) {
      case 'Front':
        if (imageSrc.includes('FRONT')) {
          x = canvasWidth * 0.3;
          y = canvasHeight * 0.4;
        } else if (imageSrc.includes('BACK')) {
          x = canvasWidth * 0.7;
          y = canvasHeight * 0.4;
        } else {
          x = canvasWidth * 0.5;
          y = canvasHeight * 0.4;
        }
        break;
      case 'Outside':
        if (imageSrc.includes('LEFT')) {
          x = canvasWidth * 0.15;
          y = canvasHeight * 0.3;
        } else if (imageSrc.includes('RIGHT')) {
          x = canvasWidth * 0.85;
          y = canvasHeight * 0.3;
        } else {
          x = canvasWidth * 0.1;
          y = canvasHeight * 0.3;
        }
        break;
      case 'Sides':
        if (imageSrc.includes('LEFT') || imageSrc.includes('RIGHT')) {
          x = canvasWidth * 0.25;
          y = canvasHeight * 0.35;
        } else {
          x = canvasWidth * 0.2;
          y = canvasHeight * 0.35;
        }
        break;
      case 'Inside':
        if (imageSrc.includes('LEFT')) {
          x = canvasWidth * 0.75;
          y = canvasHeight * 0.3;
        } else if (imageSrc.includes('RIGHT')) {
          x = canvasWidth * 0.25;
          y = canvasHeight * 0.3;
        } else {
          x = canvasWidth * 0.7;
          y = canvasHeight * 0.3;
        }
        break;
      default:
        x = canvasWidth * 0.3;
        y = canvasHeight * 0.4;
    }

    // Draw circular background
    ctx.fillStyle = accentHex;
    ctx.beginPath();
    ctx.arc(x, y, logoSize / 2, 0, 2 * Math.PI);
    ctx.fill();

    // Draw border
    ctx.strokeStyle = primaryHex;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw "YOUR LOGO HERE" text
    ctx.fillStyle = primaryHex;
    ctx.font = `bold ${logoSize * 0.15}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Split text into two lines
    const text1 = "YOUR LOGO";
    const text2 = "HERE";
    
    ctx.fillText(text1, x, y - logoSize * 0.1);
    ctx.fillText(text2, x, y + logoSize * 0.1);
  }, [logoLocation, accentHex, primaryHex, imageSrc]);

  // Draw logo on the sock
  const drawLogo = useCallback((ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    if (!logo || logoOption !== 'upload') return;

    const logoImg = new Image();
    logoImg.crossOrigin = 'anonymous';
    
    logoImg.onload = () => {
      // Calculate logo size and position based on logo location and sock view
      const logoSize = Math.min(canvasWidth, canvasHeight) * 0.2; // Larger for better visibility
      let x = canvasWidth * 0.2;
      let y = canvasHeight * 0.3;
      
      // Position based on logo location setting
      switch (logoLocation) {
        case 'Front':
          if (imageSrc.includes('FRONT')) {
            x = canvasWidth * 0.3;
            y = canvasHeight * 0.4;
          } else if (imageSrc.includes('BACK')) {
            x = canvasWidth * 0.7;
            y = canvasHeight * 0.4;
          } else {
            x = canvasWidth * 0.5;
            y = canvasHeight * 0.4;
          }
          break;
        case 'Outside':
          if (imageSrc.includes('LEFT')) {
            x = canvasWidth * 0.15;
            y = canvasHeight * 0.3;
          } else if (imageSrc.includes('RIGHT')) {
            x = canvasWidth * 0.85;
            y = canvasHeight * 0.3;
          } else {
            x = canvasWidth * 0.1;
            y = canvasHeight * 0.3;
          }
          break;
        case 'Sides':
          if (imageSrc.includes('LEFT') || imageSrc.includes('RIGHT')) {
            x = canvasWidth * 0.25;
            y = canvasHeight * 0.35;
          } else {
            x = canvasWidth * 0.2;
            y = canvasHeight * 0.35;
          }
          break;
        case 'Inside':
          x = canvasWidth * 0.4;
          y = canvasHeight * 0.5;
          break;
        default:
          x = canvasWidth * 0.3;
          y = canvasHeight * 0.4;
      }
      
      // Add a subtle background for better visibility
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x - 5, y - 5, logoSize + 10, logoSize + 10);
      ctx.restore();
      
      // Draw logo
      ctx.drawImage(logoImg, x, y, logoSize, logoSize);
    };
    
    logoImg.src = logo;
  }, [logo, logoOption, logoLocation, imageSrc]);

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
      <div className={`flex flex-col items-center justify-center bg-gray-100 ${className}`}>
        <p className="text-sm text-gray-500">Preview unavailable</p>
        <p className="text-xs text-gray-400 mt-1">{imageSrc}</p>
        <img 
          src={imageSrc} 
          alt="Sock preview" 
          className="max-w-full max-h-full object-contain mt-2"
          onError={(e) => {
            console.error('Fallback image also failed to load:', imageSrc);
            e.currentTarget.style.display = 'none';
          }}
        />
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
