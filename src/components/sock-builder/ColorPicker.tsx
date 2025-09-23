
'use client';

import { cn } from '@/lib/utils';
import { Check, Plus, Minus } from 'lucide-react';
import { colors } from '@/lib/types';
import { useState } from 'react';

interface ColorPickerProps {
    label: string;
    description: string;
    value: string;
    onChange: (value: string) => void;
    isExpanded: boolean;
    onToggle: () => void;
}

export function ColorPicker({ label, description, value, onChange, isExpanded, onToggle }: ColorPickerProps) {
    const selectedColor = colors.find(color => color.name === value);
    
    return (
        <div className="w-full">
            {/* Header - Always visible */}
            <div 
                className={cn(
                    'w-full flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all duration-200',
                    isExpanded 
                        ? 'border-primary bg-white' 
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                )}
                onClick={onToggle}
            >
                <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
                    {selectedColor && !isExpanded && (
                        <div 
                            className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                            style={{ backgroundColor: selectedColor.hex }}
                        />
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {isExpanded ? (
                        <Minus className="w-5 h-5 text-gray-400" />
                    ) : (
                        <Plus className="w-5 h-5 text-gray-400" />
                    )}
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-4">{description}</p>
                    
                    {/* Color Grid */}
                    <div className="grid grid-cols-11 gap-2">
                        {colors.map((color) => (
                            <button
                                type="button"
                                key={color.name}
                                title={color.name}
                                onClick={() => onChange(color.name)}
                                className={cn(
                                    'group relative w-8 h-8 rounded-lg border-2 transition-all duration-200',
                                    'hover:scale-110 hover:shadow-md active:scale-95',
                                    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
                                    value === color.name 
                                        ? 'border-primary shadow-md scale-105' 
                                        : 'border-gray-300 hover:border-gray-400'
                                )}
                                style={{ backgroundColor: color.hex }}
                            >
                                {/* Selection indicator */}
                                {value === color.name && (
                                    <div className="absolute inset-0 rounded-lg flex items-center justify-center">
                                        <div className="w-4 h-4 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                                            <Check className="w-2.5 h-2.5 text-primary" />
                                        </div>
                                    </div>
                                )}
                                
                                <span className="sr-only">{color.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

    