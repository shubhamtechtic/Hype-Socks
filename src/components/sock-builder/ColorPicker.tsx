
'use client';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { colors } from '@/lib/types';

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

    