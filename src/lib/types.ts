import { z } from 'zod';

export type SockPart = 'cuff' | 'ankle' | 'instep' | 'heel' | 'foot' | 'sole' | 'toe';

export const sockDesignSchema = z.object({
  logo: z.string().min(1, 'Please upload your logo.'),
  prompt: z.string().min(1, 'Prompt cannot be empty.').max(250, 'Prompt must be 250 characters or less.'),
  parts: z.array(z.string()).min(1, 'Please select at least one sock part for logo placement.'),
});

export type SockDesignForm = z.infer<typeof sockDesignSchema>;
