'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateDesignAction } from '@/actions/generate-design-action';
import { SockIcon } from '@/components/icons/SockIcon';
import { sockDesignSchema, type SockPart, type SockDesignForm } from '@/lib/types';
import { Upload, Wand2, Loader2, Download, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const examplePrompts = [
    { text: "Red athletic socks for my gym with bold logo placement" },
    { text: "Black and white sports socks for basketball team" },
    { text: "Neon green running socks with moisture-wicking design" },
]

export function SockBuilder() {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedDesign, setGeneratedDesign] = React.useState<string | null>(null);

  const { toast } = useToast();
  const form = useForm<SockDesignForm>({
    resolver: zodResolver(sockDesignSchema),
    defaultValues: {
      logo: '',
      prompt: '',
      parts: [],
    },
    mode: 'onChange',
  });

  const { watch, setValue } = form;
  const watchedParts = watch('parts');
  const watchedLogo = watch('logo');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
            variant: "destructive",
            title: "File too large",
            description: "Please upload a logo smaller than 5MB.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setValue('logo', e.target?.result as string, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePartClick = (part: SockPart) => {
    const currentParts = watchedParts;
    const newParts = currentParts.includes(part)
      ? currentParts.filter((p) => p !== part)
      : [...currentParts, part];
    setValue('parts', newParts, { shouldValidate: true });
  };

  const onSubmit = async (values: SockDesignForm) => {
    setIsGenerating(true);
    setGeneratedDesign(null);
    try {
      const result = await generateDesignAction(values);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: result.error,
        });
      } else if (result.data) {
        setGeneratedDesign(result.data.designDataUri);
        toast({
          title: 'Design Generated!',
          description: 'Your custom sock design is ready.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  if (generatedDesign) {
    return (
        <div className="container mx-auto max-w-4xl px-4 text-center">
            <Card className="bg-white p-8 shadow-xl md:p-12">
                <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
                    Your <span className="text-primary">Design</span> is Ready!
                </h2>
                <div className="relative mx-auto mt-8 w-full max-w-md aspect-square">
                    <Image src={generatedDesign} alt="Generated sock design" layout="fill" objectFit="contain" className="rounded-lg" />
                </div>
                <div className="mt-8 flex justify-center gap-4">
                    <Button asChild size="lg" className="rounded-full bg-primary px-8 py-6 text-base font-bold text-primary-foreground hover:bg-primary/90">
                        <a href={generatedDesign} download="custom-sock-design.png">
                            <Download className="mr-2 h-5 w-5" />
                            Download Design
                        </a>
                    </Button>
                    <Button 
                        size="lg" 
                        variant="outline" 
                        className="rounded-full border-2 border-primary px-8 py-6 text-base font-bold text-primary hover:bg-primary/5"
                        onClick={() => {
                            form.reset();
                            setGeneratedDesign(null);
                        }}>
                        Start Over
                    </Button>
                </div>
            </Card>
        </div>
    );
  }


  return (
    <div className="container mx-auto max-w-7xl px-4">
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <Card className="bg-white p-8 shadow-xl">
                 <h2 className="text-2xl font-bold uppercase tracking-tight">Upload Your <span className="text-primary">Logo</span></h2>
                 <p className="mt-1 text-sm text-gray-500">Upload your brand or team logo (PNG, JPG, SVG supported)</p>
                 <div className="mt-6">
                    <FormField
                      control={form.control}
                      name="logo"
                      render={() => (
                        <FormItem>
                           <FormControl>
                            <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10">
                              <div className="text-center">
                                {watchedLogo ? (
                                  <Image src={watchedLogo} alt="Logo preview" width={128} height={128} className="mx-auto h-24 w-24 object-contain" />
                                ) : (
                                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                )}
                                <p className="mt-4 text-sm text-gray-600">
                                  Drop your logo here, or <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer font-semibold text-primary hover:text-primary/80"
                                  >
                                    click to browse
                                  </label>
                                </p>
                                <Input id="file-upload" name="logo" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/svg+xml" />
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, SVG up to 5MB</p>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage className="text-center"/>
                        </FormItem>
                      )}
                    />
                 </div>
            </Card>

            {/* Right Column */}
            <div className="space-y-8">
                <Card className="bg-white p-8 shadow-xl">
                    <h2 className="text-2xl font-bold uppercase tracking-tight">Design <span className="text-primary">Prompt</span></h2>
                     <FormField
                      control={form.control}
                      name="prompt"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormControl>
                            <Textarea
                              placeholder="Example: Red athletic socks for my gym with bold logo placement with red on toe part blue on heel part cuff should be in black"
                              className="resize-none bg-gray-50"
                              {...field}
                              rows={4}
                              maxLength={250}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <Button type="submit" size="lg" className="w-full mt-4 rounded-full bg-primary px-8 py-6 text-base font-bold text-primary-foreground hover:bg-primary/90" disabled={isGenerating}>
                        {isGenerating ? (
                            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating...</>
                        ) : (
                            <><Wand2 className="mr-2 h-5 w-5" /> Generate</>
                        )}
                    </Button>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {examplePrompts.map(p => (
                             <button
                                type="button"
                                key={p.text}
                                onClick={() => setValue('prompt', p.text, { shouldValidate: true })}
                                className="flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-xs text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                              >
                                {p.text}
                                <ArrowRight className="h-3 w-3" />
                              </button>
                        ))}
                    </div>
                </Card>

                <Card className="bg-white p-8 shadow-xl">
                    <h2 className="text-2xl font-bold uppercase tracking-tight">Choose <span className="text-primary">Logo Placement</span> (Multiple allowed)</h2>
                    <div className="mt-4">
                        <SockIcon selectedParts={watchedParts} onPartClick={handlePartClick} />
                         <FormField
                            control={form.control}
                            name="parts"
                            render={() => (
                            <FormItem>
                                <FormMessage className="text-center mt-2" />
                            </FormItem>
                            )}
                        />
                    </div>
                </Card>
            </div>
        </form>
      </Form>
    </div>
  );
}
