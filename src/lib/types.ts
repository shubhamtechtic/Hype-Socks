
import { z } from 'zod';

export type SockPart = 'cuff' | 'ankle' | 'instep' | 'heel' | 'foot' | 'sole' | 'toe';

export const sockDesignSchema = z.object({
  logo: z.string().min(1, 'Please upload your logo.'),
  parts: z.string().min(1, 'Please select a sock part for logo placement.'),
  primaryColor: z.string().min(1, 'Please select a primary color.'),
  secondaryColor: z.string().min(1, 'Please select a secondary color.'),
  accentColor: z.string().min(1, 'Please select an accent color.'),
  sockImage: z.string().min(1, 'A sock image is required.'),
});

export type SockDesignForm = z.infer<typeof sockDesignSchema>;


export const colors = [
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

    
