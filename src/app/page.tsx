'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SockLengthSelector } from '@/components/ui/sock-length-selector'
import { sockLengths } from '@/lib/constants'
import { SockLength, SockTemplate } from '@/lib/types'

export default function Home() {
  const [selectedLength, setSelectedLength] = useState<SockLength | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<SockTemplate | null>(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          {/* Sock Length Selector */}
          <SockLengthSelector
            selectedLength={selectedLength}
            selectedTemplate={selectedTemplate}
            onLengthChange={setSelectedLength}
            onTemplateChange={setSelectedTemplate}
            lengths={sockLengths}
          />

          {/* Selected Length and Template Display */}
          {(selectedLength || selectedTemplate) && (
            <div className="mx-auto mt-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Your Selection
                </h3>
                <div className="space-y-2">
                  {selectedLength && (
                    <div>
                      <span className="text-sm text-gray-600">Length: </span>
                      <span className="text-primary font-medium">
                        {selectedLength.name}
                      </span>
                    </div>
                  )}
                  {selectedTemplate && (
                    <div>
                      <span className="text-sm text-gray-600">Template: </span>
                      <span className="text-primary font-medium">
                        {selectedTemplate.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
