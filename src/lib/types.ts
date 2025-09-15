
import { z } from 'zod';

export type SockPart = 'heel' | 'ankle' | 'calf' | 'toe' | 'sole' | 'full';

export const sockDesignSchema = z.object({
  logo: z.string().min(1, 'Please upload your logo.'),
  parts: z.string().min(1, 'Please select a sock part for logo placement.'),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  accentColor: z.string().optional(),
  sockImage: z.string().min(1, 'A sock image is required.'),
});

// Schema for API generation (requires colors)
export const sockDesignApiSchema = z.object({
  logo: z.string().min(1, 'Please upload your logo.'),
  parts: z.string().min(1, 'Please select a sock part for logo placement.'),
  primaryColor: z.string().min(1, 'Please select a primary color.'),
  secondaryColor: z.string().min(1, 'Please select a secondary color.'),
  accentColor: z.string().min(1, 'Please select an accent color.'),
  sockImage: z.string().min(1, 'A sock image is required.'),
});

export type SockDesignForm = z.infer<typeof sockDesignSchema>;

export const positions = {
  "heel": "Place the logo realistically on the back heel of the socks, as if printed on the fabric. It should follow the sock's curvature and lighting.",
  "ankle": "Place the logo on the outer side of the sock near the ankle. Make it look naturally printed on the material.",
  "calf": "Position the logo on the upper part of the sock around the calf area. Ensure it follows the fabric texture and sock shape.",
  "toe": "Add the logo to the top of the toes area on the sock, following the sock's curves and shadows.",
  "sole": "Place the logo on the underside (sole) of the sock. Make sure it blends realistically with the fabric.",
  "full": "Apply the logo in a repeated or central design across the entire surface of the socks. The print should follow the sock's contours naturally."
};

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

    
