'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SockLengthSelector } from '@/components/ui/sock-length-selector'
import { ColorSelector } from '@/components/ui/color-selector'
import { LogoUpload } from '@/components/ui/logo-upload'
import { SockPreview } from '@/components/ui/sock-preview'
import { sockLengths } from '@/lib/constants'
import { SockLength, SockTemplate } from '@/lib/types'

export default function Home() {
  const [selectedLength, setSelectedLength] = useState<SockLength | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<SockTemplate | null>(null)
  const [primaryColor, setPrimaryColor] = useState('#FFA500')
  const [secondaryColor, setSecondaryColor] = useState('')
  const [accentColor, setAccentColor] = useState('')
  const [logoFile, setLogoFile] = useState<File | null>(null)

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
                  <ColorSelector
                    title="Primary Color"
                    description="Choose a color for the base of the sock."
                    selectedColor={primaryColor}
                    onColorChange={setPrimaryColor}
                  />
                  
                  <ColorSelector
                    title="Secondary Color"
                    description="Choose a secondary color for accents."
                    selectedColor={secondaryColor}
                    onColorChange={setSecondaryColor}
                  />
                  
                  <ColorSelector
                    title="Accent Color"
                    description="Choose an accent color for highlights."
                    selectedColor={accentColor}
                    onColorChange={setAccentColor}
                  />
                </div>
              </div>

              {/* Right Column - Preview */}
              <div>
                <SockPreview
                  selectedTemplate={selectedTemplate}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  accentColor={accentColor}
                  logoFile={logoFile}
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
