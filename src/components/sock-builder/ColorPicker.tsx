
'use client';

import { cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';
import { colors } from '@/lib/types';
import { useState } from 'react';

interface ColorPickerProps {
    label?: string;
    description: string;
    value: string;
    onChange: (value: string) => void;
}

export function ColorPicker({ label, description, value, onChange }: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    
    const selectedColor = colors.find(color => color.name === value);
    
    return (
        <div className="relative">
            {label && <h3 className="text-lg font-semibold mb-1">{label}</h3>}
            <p className="text-sm text-gray-500 mb-3">{description}</p>
            
            {/* Compact Color Selector Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200',
                    'hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
                    isOpen 
                        ? 'border-primary bg-primary/5 shadow-lg' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                )}
            >
                <div className="flex items-center gap-3">
                    <div 
                        className={cn(
                            'w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm transition-all duration-200',
                            'hover:scale-110 hover:shadow-md'
                        )}
                        style={{ backgroundColor: selectedColor?.hex || '#f3f4f6' }}
                    >
                        {selectedColor && (
                            <div className="w-full h-full rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white drop-shadow-sm" />
                            </div>
                        )}
                    </div>
                    <span className="font-medium text-gray-700">
                        {selectedColor?.name || 'Select a color'}
                    </span>
                </div>
                <ChevronDown 
                    className={cn(
                        'w-5 h-5 text-gray-400 transition-transform duration-200',
                        isOpen && 'rotate-180'
                    )} 
                />
            </button>

            {/* Popup Color Grid */}
            <div className={cn(
                'absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50',
                'transition-all duration-300 ease-out transform origin-top',
                isOpen 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            )}>
                <div className="p-4">
                    <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
                        {colors.map((color) => (
                            <button
                                type="button"
                                key={color.name}
                                title={color.name}
                                onClick={() => {
                                    onChange(color.name);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    'group relative w-10 h-10 rounded-full border-2 transition-all duration-200',
                                    'hover:scale-110 hover:shadow-lg active:scale-95',
                                    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                                    value === color.name 
                                        ? 'border-primary shadow-md scale-105' 
                                        : 'border-gray-300 hover:border-gray-400'
                                )}
                                style={{ backgroundColor: color.hex }}
                            >
                                {/* Selection indicator */}
                                {value === color.name && (
                                    <div className="absolute inset-0 rounded-full flex items-center justify-center">
                                        <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                                            <Check className="w-3 h-3 text-primary" />
                                        </div>
                                    </div>
                                )}
                                
                                {/* Hover effect */}
                                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                
                                <span className="sr-only">{color.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    )
}

    