
import { z } from 'zod';

export type SockPart = 'cuff' | 'ankle' | 'instep' | 'heel' | 'foot' | 'sole' | 'toe';

export const sockDesignSchema = z.object({
  logo: z.string().min(1, 'Please upload your logo.'),
  parts: z.string().min(1, 'Please select a sock part for logo placement.'),
  primaryColor: z.string().min(1, 'Please select a primary color.'),
  secondaryColor: z.string().min(1, 'Please select a secondary color.'),
  accentColor: z.string().min(1, 'Please select an accent color.'),
});

export type SockDesignForm = z.infer<typeof sockDesignSchema>;
