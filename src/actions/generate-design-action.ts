
'use server';

import { sockDesignSchema } from '@/lib/types';
import { dataURIToBlob } from '@/lib/utils';

export async function generateDesignAction(values: unknown) {
  const validatedFields = sockDesignSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid input.', details: validatedFields.error.flatten().fieldErrors };
  }

  const { logo, parts, primaryColor, secondaryColor, accentColor, sockImage } = validatedFields.data;

  try {
    const formData = new FormData();
    const logoBlob = dataURIToBlob(logo);
    
    // Fetch the sock image and convert it to a blob
    const sockImageRes = await fetch(sockImage, { cache: 'no-store' });
    if (!sockImageRes.ok) {
      throw new Error(`Failed to fetch sock image from: ${sockImage}`);
    }
    const sockImageBlob = await sockImageRes.blob();

    formData.append('logo_image', logoBlob, 'logo.png');
    formData.append('sock_image', sockImageBlob, 'sock.png');
    formData.append('position', parts);
    formData.append('base_color', primaryColor);
    formData.append('secondary_color', secondaryColor);
    formData.append('accent_color', accentColor);

    // IMPORTANT: Replace with your actual API endpoint
    const apiEndpoint = process.env.API_ENDPOINT || 'http://127.0.0.1:8000/api/v1/designs-v2/generate';
    
    const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: response.statusText }));
        throw new Error(`API Error: ${errorData.detail || 'Unknown error'}`);
    }

    const result = await response.json();
    
    return { data: result };

  } catch (error) {
    console.error('API call failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { error: `Failed to generate design: ${errorMessage}` };
  }
}
