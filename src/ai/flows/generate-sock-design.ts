
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
  prompt: z.string().describe('The prompt describing the desired sock design.'),
  selectedParts: z.array(z.string()).describe('The selected sock parts for logo placement.'),
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
  prompt: `You are a sock design expert. Create a sock design based on the following logo, prompt and selected sock parts.

Logo: {{media url=logoDataUri}}
Prompt: {{{prompt}}}
Selected Parts: {{#each selectedParts}}{{{this}}}{{/each}}

Ensure the generated image is seamless and suitable for printing on a sock. The output should be a data URI representing the generated image.`,
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
