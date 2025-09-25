'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { SockTemplate } from '@/lib/types'
import { motion } from 'framer-motion'

interface SockPreviewProps {
  selectedTemplate: SockTemplate | null
  primaryColor: string
  secondaryColor?: string
  accentColor?: string
  logoFile: File | null
  className?: string
}

export function SockPreview({
  selectedTemplate,
  primaryColor,
  secondaryColor,
  accentColor,
  logoFile,
  className
}: SockPreviewProps) {
  const handleDownload = () => {
    // Demo functionality - in a real app, this would generate and download the preview
    console.log('Download preview clicked')
  }

  return (
    <Card className={cn("w-full", className)}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Preview
          </h3>
        </div>

        {/* Preview Area */}
        <div className="relative">
          <div className="bg-white rounded-lg border border-gray-200 p-8 min-h-[300px] flex items-center justify-center">
            {selectedTemplate?.image ? (
              <selectedTemplate.image className="w-full h-full object-contain"/>
            ) : (
              <div className="text-center text-gray-400">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-t-full flex items-center justify-center">
                  <span className="text-2xl">🧦</span>
                </div>
                <p className="text-sm">Select a template to see preview</p>
              </div>
            )}
          </div>

          {/* Download Button */}
          {selectedTemplate && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-4 right-4"
            >
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white rounded-full w-10 h-10 p-0"
                onClick={handleDownload}
                aria-label="Download preview"
              >
                <Download className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>

        {/* Template Info */}
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-center"
          >
            <p className="text-sm text-gray-600">
              {selectedTemplate.name} Template
            </p>
          </motion.div>
        )}
      </div>
    </Card>
  )
}
