
'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Grey', hex: '#808080' },
    { name: 'Dark Grey', hex: '#A9A9A9' },
    { name: 'Charcoal', hex: '#36454F' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Dark Orange', hex: '#FF8C00' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Light Orange', hex: '#FFD580' },
    { name: 'Light Blue', hex: '#ADD8E6' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Dark Blue', hex: '#00008B' },
    { name: 'Green', hex: '#008000' },
    { name: 'Light Green', hex: '#90EE90' },
    { name: 'Dark Green', hex: '#006400' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Gold', hex: '#FFD700' },
    { name: 'Neon Yellow', hex: '#FFF44F' },
    { name: 'Maroon', hex: '#800000' },
    { name: 'Brown', hex: '#A52A2A' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Teal', hex: '#008080' },
    { name: 'Aqua', hex: '#00FFFF' },
];

interface ColorPickerProps {
    label?: string;
    description: string;
    value: string;
    onChange: (value: string) => void;
}

export function ColorPicker({ label, description, value, onChange }: ColorPickerProps) {
    return (
        <div>
            {label && <h3 className="text-lg font-semibold">{label}</h3>}
            <p className="text-sm text-gray-500">{description}</p>
            <div className="mt-4 grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2">
                {colors.map((color) => (
                    <button
                        type="button"
                        key={color.name}
                        title={color.name}
                        onClick={() => onChange(color.name)}
                        className={cn(
                            'h-8 w-8 rounded-full border border-gray-300 transition-transform transform hover:scale-110',
                            value === color.name && 'ring-2 ring-primary ring-offset-2'
                        )}
                        style={{ backgroundColor: color.hex }}
                    >
                        {value === color.name && <Check className="h-5 w-5 text-white mix-blend-difference" />}
                        <span className="sr-only">{color.name}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
