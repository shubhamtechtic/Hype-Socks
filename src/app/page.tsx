'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SockLengthSelector } from '@/components/ui/sock-length-selector'
import { ColorSelector } from '@/components/ui/color-selector'
import { LogoUpload } from '@/components/ui/logo-upload'
import { SockPreview } from '@/components/ui/sock-preview'
import { sockLengths } from '@/lib/constants'
import { SockLength, SockTemplate, SockColorRegion } from '@/lib/types'

export default function Home() {
  const [selectedLength, setSelectedLength] = useState<SockLength | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<SockTemplate | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [colorRegions, setColorRegions] = useState<(SockColorRegion & { color: string })[]>([])
  const templateRef = useRef<SVGElement>(null)

  const handleColorChange = useCallback((colorRegion: SockColorRegion & { color: string }) => {
    setColorRegions(prev => prev.map(region => region.name === colorRegion.name ?
      { ...region, color: colorRegion.color }
      : region
    ))
    if (!colorRegion.selector) return
    const elements = templateRef.current!.querySelectorAll(colorRegion.selector.join(', '))
    elements.forEach(element => {
      // @ts-ignore
      element.style.fill = colorRegion.color
    })
  }, [setColorRegions, templateRef.current])


  useEffect(() => {
    if (!selectedTemplate) return
    if (!templateRef.current) return
    const colorRegions: (SockColorRegion & { color: string })[] = [];
    selectedTemplate.colorRegions.forEach(region => {
      if (!region.selector.length) {
        colorRegions.push({ ...region, color: '#000000' })
        return
      }
      // get the color from the first element
      // console.log(templateRef.current)
      // console.log(region.selector.join(', '))
      const elements = templateRef.current!.querySelectorAll(region.selector.join(', '))
      let color = '#000000'
      try {
        // @ts-ignore
        color = elements[0].style.fill
      } catch (error) {
        console.error(region.name, region.selector, elements[0], error)
      }
      colorRegions.push({ ...region, color: color })
    })
    setColorRegions(colorRegions)
  }, [selectedTemplate, templateRef.current])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Welcome to <span className="text-primary">HYPE</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Custom athletic socks engineered for comfort, durability, and style
            </p>
          </div>

          {/* Sock Length Selector */}
          <SockLengthSelector
            selectedLength={selectedLength}
            selectedTemplate={selectedTemplate}
            onLengthChange={setSelectedLength}
            onTemplateChange={setSelectedTemplate}
            lengths={sockLengths}
            className="mb-12"
          />

          {/* Customization Section */}
          <div className="mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Customization Options */}
              <div className="space-y-6">
                {/* Logo Upload */}
                <LogoUpload
                  onLogoChange={setLogoFile}
                />

                {/* Color Selectors */}
                <div className="space-y-4">
                  {colorRegions.map((colorRegion) => (
                    <ColorSelector
                      key={colorRegion.name}
                      title={colorRegion.name}
                      description={colorRegion.description}
                      selectedColor={colorRegion.color}
                      onColorChange={(color) => handleColorChange(
                        { ...colorRegion, color }
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Right Column - Preview */}
              <div>
                <SockPreview
                  ref={templateRef}
                  logoFile={logoFile}
                  colorRegions={colorRegions}
                  selectedTemplate={selectedTemplate}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
