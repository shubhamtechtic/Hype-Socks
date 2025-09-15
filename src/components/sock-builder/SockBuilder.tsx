
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateDesignAction } from '@/actions/generate-design-action';
import { PlacementSelector } from '@/components/sock-builder/PlacementSelector';
import { sockDesignSchema, type SockPart, type SockDesignForm } from '@/lib/types';
import { Upload, Wand2, Loader2, RotateCw, ShoppingCart, CheckCircle2, X, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ColorPicker } from './ColorPicker';

interface SockBuilderProps {
    sockLength: string;
    sockImage: string;
}

export function SockBuilder({ sockLength, sockImage }: SockBuilderProps) {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedDesign, setGeneratedDesign] = React.useState<string | null>(null);
  const [isAddedToCart, setIsAddedToCart] = React.useState(false);

  const router = useRouter();

  const { toast } = useToast();
  const form = useForm<SockDesignForm>({
    resolver: zodResolver(sockDesignSchema),
    defaultValues: {
      logo: '',
      parts: '',
      primaryColor: '',
      secondaryColor: '',
      accentColor: '',
    },
    mode: 'onChange',
  });

  const { watch, setValue, getValues } = form;
  const watchedParts = watch('parts');
  const watchedLogo = watch('logo');
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
            variant: "destructive",
            title: "File too large",
            description: "Please upload a logo smaller than 10MB.",
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
  
  const handleRemoveLogo = () => {
    setValue('logo', '', { shouldValidate: true });
  }

  const handlePartClick = (part: SockPart) => {
    setValue('parts', part, { shouldValidate: true });
  };
  
  const handleGoBack = () => {
    router.back();
  };
  
  const handleStartOver = () => {
    form.reset();
    setGeneratedDesign(null);
    setIsAddedToCart(false);
  }

  const handleRegenerate = async () => {
    await onSubmit(getValues());
  }

  const handleAddToCart = () => {
    setIsAddedToCart(true);
  }

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
      }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: `An unexpected error occurred: ${errorMessage}`,
        });
    } finally {
      setIsGenerating(false);
    }
  };
  
  if (generatedDesign) {
     if (isAddedToCart) {
      return (
        <div className="container mx-auto max-w-4xl px-4 text-center">
            <Card className="bg-white p-8 shadow-xl md:p-12">
                 <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                <h2 className="mt-6 text-3xl font-bold uppercase tracking-tight md:text-4xl">
                    Added to <span className="text-primary">Cart!</span>
                </h2>
                <p className="mt-2 text-gray-600">Your custom sock design has been successfully added to your cart.</p>
                <div className="relative mx-auto mt-8 w-full max-w-md aspect-square">
                    <Image src={generatedDesign} alt="Generated sock design" fill objectFit="contain" className="rounded-lg" />
                </div>
                <div className="mt-8 flex justify-center gap-4">
                    <Button 
                        size="lg" 
                        className="rounded-full bg-primary px-8 py-6 text-base font-bold text-primary-foreground hover:bg-primary/90"
                        onClick={() => router.push('/')}>
                        Continue Shopping
                    </Button>
                    <Button 
                        size="lg" 
                        variant="outline" 
                        className="rounded-full border-2 border-primary px-8 py-6 text-base font-bold text-primary hover:bg-primary hover:text-white"
                        onClick={handleStartOver}>
                        Create Another Design
                    </Button>
                </div>
            </Card>
        </div>
      );
     }

    return (
        <div className="container mx-auto max-w-4xl px-4 text-center">
            <Card className="bg-white p-8 shadow-xl md:p-12">
                <h2 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
                    Your <span className="text-primary">Design</span> is Ready!
                </h2>
                <div className="relative mx-auto mt-8 w-full max-w-md aspect-square">
                     {isGenerating ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10 rounded-lg">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                            <p className="mt-4 font-semibold">Generating new design...</p>
                        </div>
                    ) : (
                        <Image src={generatedDesign} alt="Generated sock design" fill objectFit="contain" className="rounded-lg" />
                    )}
                </div>
                <div className="mt-8 flex justify-center gap-4">
                     <Button 
                        size="lg" 
                        variant="outline" 
                        className="rounded-full border-2 border-primary px-8 py-6 text-base font-bold text-primary hover:bg-primary hover:text-white"
                        onClick={handleRegenerate}
                        disabled={isGenerating}
                     >
                        <RotateCw className="mr-2 h-5 w-5" />
                        Regenerate Design
                    </Button>
                    <Button 
                        size="lg" 
                        className="rounded-full bg-primary px-8 py-6 text-base font-bold text-primary-foreground hover:bg-primary/90"
                        onClick={handleAddToCart}
                        disabled={isGenerating}
                    >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                    </Button>
                </div>
            </Card>
        </div>
    );
  }


  return (
    <div className="container mx-auto max-w-7xl px-4">
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left Column */}
                <div className="space-y-8">
                    <Card className="bg-white p-6 md:p-8 shadow-xl">
                        <h2 className="text-2xl font-bold uppercase tracking-tight">Upload Your <span className="text-primary">Logo</span></h2>
                        <p className="mt-1 text-sm text-gray-500">Upload your brand or team logo (PNG, JPG, SVG supported)</p>
                        <div className="mt-6">
                            <FormField
                            control={form.control}
                            name="logo"
                            render={() => (
                                <FormItem>
                                <FormControl>
                                    <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 relative">
                                        {watchedLogo ? (
                                            <>
                                                <Image src={watchedLogo} alt="Logo preview" fill className="object-contain p-2" />
                                                <div className="absolute top-2 right-2">
                                                    <Button variant="ghost" size="icon" onClick={handleRemoveLogo} className="bg-white/50 hover:bg-white/80 rounded-full h-8 w-8">
                                                        <X className="h-4 w-4 text-gray-600"/>
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center w-full">
                                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                <p className="mt-4 text-sm text-gray-600">
                                                    Drop your logo here, or click to browse
                                                </p>
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, SVG up to 10MB</p>
                                                <Button asChild variant="outline" className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                                                    <label htmlFor="file-upload">Choose File</label>
                                                </Button>
                                                <Input id="file-upload" name="logo" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/svg+xml" />
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage className="text-center"/>
                                </FormItem>
                            )}
                            />
                        </div>
                        
                        {watchedLogo && (
                            <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    <p className="font-semibold text-sm text-green-800">Logo uploaded successfully</p>
                                </div>
                                <button onClick={handleRemoveLogo}>
                                    <X className="h-5 w-5 text-green-600"/>
                                </button>
                            </div>
                        )}

                        <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 p-4 flex items-center gap-3">
                            <Image src={sockImage} alt={sockLength} width={40} height={40} data-ai-hint="custom sock" className="animate-tilt-shaking" />
                            <div>
                                <p className="font-semibold text-sm">{sockLength}</p>
                                <p className="text-xs text-gray-500">Ready for customization</p>
                            </div>
                        </div>
                    </Card>
                     <Card className="bg-white p-6 md:p-8 shadow-xl">
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="primaryColor"
                                render={({ field }) => (
                                    <FormItem>
                                        <ColorPicker
                                            label="Primary Color"
                                            description="Choose a color for color layer 1 (if applicable)."
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="secondaryColor"
                                render={({ field }) => (
                                    <FormItem>
                                        <ColorPicker
                                            label="Secondary Color"
                                            description="Choose a color for color layer 2 (if applicable)."
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="accentColor"
                                render={({ field }) => (
                                    <FormItem>
                                        <ColorPicker
                                            label="Accent Color"
                                            description="Choose a color for color layer 3 (if applicable)."
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </Card>
                </div>


                {/* Right Column */}
                <Card className="bg-white p-6 md:p-8 shadow-xl">
                    <h2 className="text-2xl font-bold uppercase tracking-tight">Choose <span className="text-primary">Logo Placement</span></h2>
                    <div className="mt-4">
                        <PlacementSelector selectedPart={watchedParts} onPartClick={handlePartClick} sockImage={sockImage} />
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
            
            <div className="flex justify-center items-center gap-4 pt-4">
                <Button variant="outline" size="lg" className="rounded-full px-8 font-bold" onClick={handleGoBack}>
                    <ChevronLeft className="mr-2 h-5 w-5" /> Back
                </Button>
                <Button variant="ghost" size="lg" className="rounded-full px-8 font-bold" onClick={handleStartOver}>
                    Start Over
                </Button>
                <Button type="submit" size="lg" className="rounded-full bg-black text-white px-8 font-bold hover:bg-gray-800" disabled={isGenerating}>
                    {isGenerating ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                    ) : (
                        <><Wand2 className="mr-2 h-4 w-4" /> Generate AI Design</>
                    )}
                </Button>
            </div>
        </form>
      </Form>
    </div>
  );
}
