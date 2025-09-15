
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
import { Upload, Wand2, Loader2, RotateCw, ShoppingCart, CheckCircle2, X, ChevronLeft, Lightbulb, Download, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ColorPicker } from './ColorPicker';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';

interface SockBuilderProps {
    sockLength: string;
    sockImage: string;
}

const getImagePaths = (sockLength: string) => {
    let prefix = '';
    if (sockLength.toLowerCase().includes('ankle')) {
        prefix = 'Ankle';
    } else if (sockLength.toLowerCase().includes('quarter')) {
        prefix = 'Heel';
    } else if (sockLength.toLowerCase().includes('crew')) {
        prefix = 'Crew';
    }

    if (prefix) {
        return [
            `/Zip/${prefix}-1.png`,
            `/Zip/${prefix}-2.png`,
            `/Zip/${prefix}-3.png`,
            `/Zip/${prefix}-4.png`,
        ];
    }
    return [sockLength];
}

export function SockBuilder({ sockLength, sockImage }: SockBuilderProps) {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedDesign, setGeneratedDesign] = React.useState<string | null>(null);
  const [isAddedToCart, setIsAddedToCart] = React.useState(false);
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const router = useRouter();
  const previewImages = React.useMemo(() => getImagePaths(sockLength), [sockLength]);


  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])


  const { toast } = useToast();
  const form = useForm<SockDesignForm>({
    resolver: zodResolver(sockDesignSchema),
    defaultValues: {
      logo: '',
      parts: 'ankle',
      primaryColor: 'Black',
      secondaryColor: 'White',
      accentColor: 'Orange',
    },
    mode: 'onChange',
  });

  const { watch, setValue, getValues } = form;
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
          description: <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4"><code className="text-white">{result.error}</code></pre>,
        });
      } else if (result.data) {
        setGeneratedDesign(result.data.designDataUri);
      }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4"><code className="text-white">{errorMessage}</code></pre>,
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
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold">Upload Your Logo</h2>
                        <p className="text-sm text-gray-500">Upload your brand or team logo (PNG, JPG)</p>
                        <div className="mt-4">
                            <FormField
                            control={form.control}
                            name="logo"
                            render={() => (
                                <FormItem>
                                <FormControl>
                                    <div className="mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/50 px-6 py-10 relative h-48">
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
                                            <div className="text-center w-full space-y-2">
                                                <Upload className="mx-auto h-10 w-10 text-gray-400" />
                                                <p className="text-sm text-gray-600">
                                                    Drop your logo here, or click to browse
                                                </p>
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 10MB</p>
                                                <Button asChild variant="outline" size="sm" className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
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

                         <div className="mt-4 rounded-lg bg-yellow-50 border border-yellow-200 p-3 flex items-start gap-3">
                            <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-yellow-800">
                                <span className='font-semibold'>Tip:</span> For best results, use a high-contrast logo with a transparent background.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Logo Placement</h2>
                        <p className="text-sm text-gray-500">Select where you want your logo to appear on the sock.</p>
                        <FormField
                            control={form.control}
                            name="parts"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <PlacementSelector
                                        selectedPart={field.value as SockPart}
                                        onPartClick={(part) => field.onChange(part)}
                                        sockImage={sockImage}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     
                    <div>
                        <h2 className="text-xl font-semibold">Choose Colors</h2>
                        <div className="mt-4 space-y-2">
                            <Accordion type="single" collapsible defaultValue='item-1' className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className='font-semibold p-4 border rounded-lg'>Primary Color</AccordionTrigger>
                                    <AccordionContent className='p-4 border border-t-0 rounded-b-lg'>
                                         <FormField
                                            control={form.control}
                                            name="primaryColor"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <ColorPicker
                                                        description="Choose a color for the base of the sock."
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className='font-semibold p-4 border rounded-lg'>Secondary Color</AccordionTrigger>
                                    <AccordionContent className='p-4 border border-t-0 rounded-b-lg'>
                                        <FormField
                                            control={form.control}
                                            name="secondaryColor"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <ColorPicker
                                                        description="Choose a color for secondary elements."
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </AccordionContent>
                                </AccordionItem>
                                 <AccordionItem value="item-3">
                                    <AccordionTrigger className='font-semibold p-4 border rounded-lg'>Accent Color</AccordionTrigger>
                                    <AccordionContent className='p-4 border border-t-0 rounded-b-lg'>
                                         <FormField
                                            control={form.control}
                                            name="accentColor"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <ColorPicker
                                                        description="Choose a color for accents and highlights."
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                     <Button type="submit" size="lg" className="w-full rounded-full bg-black text-white px-8 font-bold hover:bg-gray-800" disabled={isGenerating}>
                        {isGenerating ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Art Work...</>
                        ) : (
                            <><Wand2 className="mr-2 h-4 w-4" /> Generate Art Work</>
                        )}
                    </Button>
                </div>


                {/* Right Column */}
                <div className="sticky top-24">
                    <h2 className="text-xl font-semibold mb-4">Preview</h2>
                    <Card className="bg-gray-50 p-6 md:p-8 shadow-inner border">
                        <Carousel setApi={setApi} className="w-full">
                            <CarouselContent>
                                {previewImages.map((src, index) => (
                                    <CarouselItem key={index}>
                                        <div className="relative w-full aspect-square">
                                            <Image 
                                                src={src}
                                                alt={`Sock Preview ${index + 1}`}
                                                fill
                                                className="object-contain"
                                                data-ai-hint="custom sock"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                                <CarouselPrevious className="static -translate-y-0"/>
                                <div className="py-2 text-center text-sm text-muted-foreground">
                                    {current} / {count}
                                </div>
                                <CarouselNext className="static -translate-y-0"/>
                            </div>
                        </Carousel>
                        <Button size="icon" variant="outline" className="absolute top-4 right-4 rounded-full bg-white">
                            <Download className="h-5 w-5 text-gray-600"/>
                        </Button>
                    </Card>
                </div>
            </div>
        </form>
      </Form>
    </div>
  );
}
