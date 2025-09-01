'use client';

import { useState, useTransition, type DragEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Palette, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';

import { generateDesignAction } from '@/actions/generate-design-action';
import { SockIcon } from '@/components/icons/SockIcon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { sockDesignSchema, type SockDesignForm, type SockPart } from '@/lib/types';
import { cn } from '@/lib/utils';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/svg+xml'];

export function SockBuilder() {
  const [isPending, startTransition] = useTransition();
  const [generatedDesignUri, setGeneratedDesignUri] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const form = useForm<SockDesignForm>({
    resolver: zodResolver(sockDesignSchema),
    defaultValues: {
      logo: '',
      prompt: 'A vibrant, abstract pattern inspired by nature, with flowing lines and a mix of warm and cool colors.',
      parts: [],
    },
  });

  const processFile = (file: File) => {
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      form.setError('logo', { message: 'File is too large. Max 5MB.' });
      return;
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      form.setError('logo', { message: 'Invalid file type. Use JPG, PNG, or SVG.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUri = reader.result as string;
      form.setValue('logo', dataUri, { shouldValidate: true });
      setLogoPreview(dataUri);
    };
    reader.onerror = () => {
      form.setError('logo', { message: 'Could not read file.' });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFile(e.target.files?.[0] as File);
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    processFile(e.dataTransfer.files?.[0] as File);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); };
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };

  const clearLogo = () => {
    form.setValue('logo', '', { shouldValidate: true });
    setLogoPreview(null);
    const fileInput = document.getElementById('logo-upload') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  }

  const onSubmit = (values: SockDesignForm) => {
    setGeneratedDesignUri(null);
    startTransition(async () => {
      const result = await generateDesignAction(values);
      if (result.error) {
        toast({ title: 'Generation Failed', description: result.error, variant: 'destructive' });
      } else if (result.data) {
        setGeneratedDesignUri(result.data.designDataUri);
        toast({ title: 'Success!', description: 'Your custom sock design is ready.' });
      }
    });
  };

  return (
    <main className="flex-1">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>1. Upload Your Logo</CardTitle>
                  <CardDescription>Upload a JPG, PNG, or SVG file. Max size 5MB.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="logo"
                    render={() => (
                      <FormItem>
                        {logoPreview ? (
                           <div className="relative w-full h-48">
                           <Image src={logoPreview} alt="Logo preview" fill className="object-contain rounded-md border p-2" />
                           <Button type="button" variant="destructive" size="icon" className="absolute -top-3 -right-3 h-7 w-7 rounded-full" onClick={clearLogo}>
                             <X className="h-4 w-4" />
                           </Button>
                         </div>
                        ) : (
                          <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            className={cn("flex justify-center rounded-lg border-2 border-dashed border-border px-6 py-10", isDragging && "border-primary")}>
                            <div className="text-center">
                              <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                              <Label htmlFor="logo-upload" className="relative mt-4 flex cursor-pointer items-center justify-center text-sm font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:text-primary/80">
                                <span>Upload a file</span>
                                <Input id="logo-upload" type="file" className="sr-only" onChange={handleFileChange} accept={ACCEPTED_IMAGE_TYPES.join(',')} />
                              </Label>
                              <p className="text-xs text-muted-foreground">or drag and drop</p>
                            </div>
                          </div>
                        )}
                        <FormMessage className="pt-2" />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Describe Your Vision</CardTitle>
                  <CardDescription>Max 250 characters. Be descriptive!</CardDescription>
                </CardHeader>
                <CardContent>
                   <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea placeholder="e.g., A funky 80s synthwave style with neon grids and a setting sun." {...field} rows={4} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Choose Logo Placement</CardTitle>
                  <CardDescription>Select one or more parts of the sock.</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="parts"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <SockIcon
                            selectedParts={field.value as SockPart[]}
                            onPartClick={(part) => {
                              const newParts = field.value.includes(part)
                                ? field.value.filter((p) => p !== part)
                                : [...field.value, part];
                              field.onChange(newParts);
                            }}
                          />
                        </FormControl>
                         <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Button type="submit" size="lg" disabled={isPending} className="w-full text-lg font-semibold">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Designing Your Socks...
                  </>
                ) : (
                  'Generate Design'
                )}
              </Button>
            </div>
            
            <div className="sticky top-24 h-fit">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>AI Generated Preview</CardTitle>
                </CardHeader>
                <CardContent className="flex min-h-[350px] items-center justify-center rounded-lg bg-muted/30 p-4">
                  {isPending && (
                    <div className="flex flex-col items-center gap-4 text-center text-muted-foreground">
                      <Loader2 className="h-16 w-16 animate-spin text-primary" />
                      <p className="font-semibold">Our AI is stitching together your design...</p>
                      <p className="text-sm">This can take a moment.</p>
                    </div>
                  )}
                  {!isPending && generatedDesignUri && (
                    <Image src={generatedDesignUri} alt="Generated sock design" width={500} height={500} data-ai-hint="sock design" className="rounded-lg object-contain" />
                  )}
                   {!isPending && !generatedDesignUri && (
                    <div className="flex flex-col items-center gap-4 text-center text-muted-foreground">
                      <Palette className="h-16 w-16" />
                      <p className="font-semibold">Your custom design will appear here</p>
                    </div>
                  )}
                </CardContent>
                {generatedDesignUri && !isPending && (
                   <CardFooter className="mt-4 flex flex-col gap-2">
                   <Button size="lg" className="w-full">Add to Cart</Button>
                   <Button size="lg" variant="outline" className="w-full" onClick={() => form.handleSubmit(onSubmit)()} >
                     Regenerate Design
                   </Button>
                 </CardFooter>
                )}
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
