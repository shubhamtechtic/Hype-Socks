
'use server';

/**
 * @fileOverview A sock design generator AI agent.
 *
 * - generateSockDesign - A function that handles the sock design generation process.
 * - GenerateSockDesignInput - The input type for the generateSockDesign function.
 * - GenerateSockDesignOutput - The return type for the generateSockDesign function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSockDesignInputSchema = z.object({
  logoDataUri: z
    .string()
    .describe(
      "A logo image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  selectedPart: z.string().describe('The selected sock part for logo placement.'),
  baseColor: z.string().describe('Base/main color of the sock.'),
  secondaryColor: z.string().describe('Secondary color of the sock.'),
  accentColor: z.string().describe('Accent/highlight color on panels.'),
});
export type GenerateSockDesignInput = z.infer<typeof GenerateSockDesignInputSchema>;

const GenerateSockDesignOutputSchema = z.object({
  designDataUri: z.string().describe('The generated sock design as a data URI.'),
});
export type GenerateSockDesignOutput = z.infer<typeof GenerateSockDesignOutputSchema>;

export async function generateSockDesign(input: GenerateSockDesignInput): Promise<GenerateSockDesignOutput> {
  return generateSockDesignFlow(input);
}

const generateSockDesignPrompt = ai.definePrompt({
  name: 'generateSockDesignPrompt',
  input: {schema: GenerateSockDesignInputSchema},
  prompt: `Design a single crew-length sock using a {{{baseColor}}}, {{{accentColor}}}, and {{{secondaryColor}}} color palette.
The sock should feature a {{{baseColor}}} foundation with bold {{{accentColor}}} panels on the heel, toe, calf, and mid-foot areas.
Include a pattern of alternating horizontal bars or stripes along the upper shaft or side, filled with {{{secondaryColor}}} for visual interest.
Render the sock from at least three views (front, side, and back).

Logo: {{media url=logoDataUri}}
Selected Part for logo: {{{selectedPart}}}

Ensure the logo is clearly visible in at least two of the views, positioned naturally according to the sock's curvature and texture on the selected part.
The logo should appear naturally printed on the knit fabric, following fabric contours with realistic lighting and shading.
The overall look should be premium, modern, and athletic.`,
});

const generateSockDesignFlow = ai.defineFlow(
  {
    name: 'generateSockDesignFlow',
    inputSchema: GenerateSockDesignInputSchema,
    outputSchema: GenerateSockDesignOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: generateSockDesignPrompt,
      input,
    });
    if (!media) {
      throw new Error('Image generation failed to produce media.');
    }
    return {
      designDataUri: media.url,
    };
  }
);
