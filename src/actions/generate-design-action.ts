
'use server';

import { generateSockDesign, GenerateSockDesignInput } from '@/ai/flows/generate-sock-design';
import { sockDesignSchema } from '@/lib/types';

export async function generateDesignAction(values: unknown) {
  const validatedFields = sockDesignSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid input.', details: validatedFields.error.flatten().fieldErrors };
  }

  const { logo, prompt, parts } = validatedFields.data;

  try {
    const input: GenerateSockDesignInput = {
      logoDataUri: logo,
      prompt,
      selectedParts: [parts],
    };
    const result = await generateSockDesign(input);
    return { data: result };
  } catch (error) {
    console.error('AI design generation failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { error: `Failed to generate design: ${errorMessage}` };
  }
}
