'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateDesignAction } from '@/actions/generate-design-action';
import { SockIcon } from '@/components/icons/SockIcon';
import { sockDesignSchema, type SockPart, type SockDesignForm } from '@/lib/types';
import { Upload, Palette, Text, Wand2, Loader2, Download } from 'lucide-react';
import Image from 'next/image';

const steps = [
  { id: 'logo', name: 'Upload Logo', icon: Upload },
  { id: 'parts', name: 'Select Parts', icon: Palette },
  { id: 'prompt', name: 'Add Prompt', icon: Text },
  { id: 'generate', name: 'Generate Design', icon: Wand2 },
];

export function SockBuilder() {
  const [currentStep, setCurrentStep] = React.useState(0);
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

  const { watch, setValue, trigger } = form;
  const watchedParts = watch('parts');
  const watchedLogo = watch('logo');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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

  const handleNext = async () => {
    let isValid = false;
    switch (steps[currentStep].id) {
      case 'logo':
        isValid = await trigger('logo');
        break;
      case 'parts':
        isValid = await trigger('parts');
        break;
      case 'prompt':
        isValid = await trigger('prompt');
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        await onSubmit(form.getValues());
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
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
        setCurrentStep(steps.length - 1); // Stay on the last step to show design
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

  const currentStepInfo = steps[currentStep];

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <Card className="bg-white shadow-xl">
        <div className="grid md:grid-cols-12">
          <div className="p-8 md:col-span-4 md:border-r">
            <h2 className="text-xl font-bold">Sock Customizer</h2>
            <p className="mt-2 text-sm text-muted-foreground">Follow the steps to create your unique design.</p>
            <nav className="mt-8">
              <ol className="space-y-4">
                {steps.map((step, index) => (
                  <li key={step.id} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          index < currentStep
                            ? 'bg-green-500 text-white'
                            : index === currentStep
                            ? 'border-2 border-primary bg-primary/10 text-primary'
                            : 'border-2 border-gray-300 bg-gray-50 text-gray-500'
                        }`}
                      >
                        <step.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">{step.name}</h3>
                      {index > currentStep && <p className="text-sm text-muted-foreground">Pending</p>}
                      {index < currentStep && <p className="text-sm text-green-600">Completed</p>}
                      {index === currentStep && <p className="text-sm text-primary">In Progress</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <div className="p-8 md:col-span-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{currentStepInfo.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
                    <FormField
                      control={form.control}
                      name="logo"
                      render={() => (
                        <FormItem>
                          <FormLabel>Upload Your Logo</FormLabel>
                          <FormControl>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                              <div className="text-center">
                                {watchedLogo ? (
                                  <Image src={watchedLogo} alt="Logo preview" width={128} height={128} className="mx-auto h-32 w-32 object-contain" />
                                ) : (
                                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                )}
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                  <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                                  >
                                    <span>Upload a file</span>
                                    <Input id="file-upload" name="logo" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
                    <p className="mb-4 text-sm text-muted-foreground">Click on the parts of the sock where you want your logo to appear.</p>
                    <SockIcon selectedParts={watchedParts} onPartClick={handlePartClick} />
                    <FormField
                        control={form.control}
                        name="parts"
                        render={() => (
                          <FormItem>
                             <FormMessage className="mt-2" />
                          </FormItem>
                        )}
                       />
                  </div>
                  <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
                     <FormField
                      control={form.control}
                      name="prompt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Describe Your Design</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g., 'a vibrant floral pattern with a retro feel', 'a geometric design with bold colors', 'a minimalist design with a single stripe'"
                              className="resize-none"
                              {...field}
                              rows={5}
                            />
                          </FormControl>
                           <p className="text-xs text-muted-foreground text-right">{field.value.length}/250</p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div style={{ display: currentStep === 3 ? 'flex' : 'none' }} className="flex h-full flex-col items-center justify-center text-center">
                    {isGenerating && (
                      <>
                        <Loader2 className="h-16 w-16 animate-spin text-primary" />
                        <h3 className="mt-4 text-xl font-semibold">Generating your design...</h3>
                        <p className="mt-2 text-muted-foreground">The AI is working its magic. This might take a moment.</p>
                      </>
                    )}
                    {!isGenerating && generatedDesign && (
                      <>
                        <h3 className="text-2xl font-bold">Your Design is Ready!</h3>
                        <div className="relative mt-4 w-full max-w-md aspect-square">
                           <Image src={generatedDesign} alt="Generated sock design" layout="fill" objectFit="cover" className="rounded-lg" />
                        </div>
                         <Button asChild className="mt-6">
                            <a href={generatedDesign} download="custom-sock-design.png">
                               <Download className="mr-2 h-4 w-4" />
                               Download Design
                            </a>
                        </Button>
                      </>
                    )}
                     {!isGenerating && !generatedDesign && (
                        <>
                           <Wand2 className="h-16 w-16 text-primary/50" />
                           <h3 className="mt-4 text-xl font-semibold">Ready to Generate?</h3>
                           <p className="mt-2 text-muted-foreground">Click the 'Generate' button to create your custom sock design.</p>
                        </>
                    )}
                  </div>
                </CardContent>

                <div className="mt-8 flex justify-end gap-4 border-t pt-4">
                  {currentStep > 0 && (
                    <Button type="button" variant="outline" onClick={handleBack} disabled={isGenerating}>
                      Back
                    </Button>
                  )}
                  {currentStep < steps.length - 1 && (
                    <Button type="button" onClick={handleNext}>
                      Next
                    </Button>
                  )}
                   {currentStep === steps.length - 1 && !generatedDesign && (
                    <Button type="submit" disabled={isGenerating}>
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        'Generate Design'
                      )}
                    </Button>
                  )}
                   {currentStep === steps.length - 1 && generatedDesign && (
                     <Button type="button" onClick={() => {
                        form.reset();
                        setGeneratedDesign(null);
                        setCurrentStep(0);
                     }}>
                        Start Over
                    </Button>
                   )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
}
