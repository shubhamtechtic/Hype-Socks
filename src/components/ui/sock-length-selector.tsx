'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Check, ArrowLeft } from 'lucide-react'
import { SockLength, SockTemplate } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

interface SockLengthSelectorProps {
  selectedLength: SockLength | null
  selectedTemplate: SockTemplate | null
  onLengthChange: (length: SockLength) => void
  onTemplateChange: (template: SockTemplate) => void
  lengths: SockLength[]
  className?: string
}

export function SockLengthSelector({
  selectedLength,
  selectedTemplate,
  onLengthChange,
  onTemplateChange,
  lengths,
  className
}: SockLengthSelectorProps) {
  const [showTemplates, setShowTemplates] = useState(false)

  const handleLengthSelect = (length: SockLength) => {
    onLengthChange(length)
    setShowTemplates(true)
  }

  const handleBackToLengths = () => {
    setShowTemplates(false)
  }

  return (
    <Card className={cn("w-full px-20 pb-20 pt-6", className)}>
      <AnimatePresence mode="wait">
        {!showTemplates ? (
          <motion.div
            key="lengths"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Choose Your Length
              </h2>
              <p className="text-gray-400 mx-auto">
                Customize socks with your name, logo, and colors. Select your length and start customizing now.
              </p>
            </div>

            {/* Scrollable Row of Length Cards */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {lengths.map((length, index) => (
                <motion.div
                  key={length.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <Card
                    className={cn(
                      "relative cursor-pointer transition-all duration-200 hover:shadow-md w-64 h-full",
                      selectedLength?.id === length.id
                        ? "border-primary shadow-md ring-2 ring-primary/20"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => handleLengthSelect(length)}
                  >
                    <div className="p-4">
                      {/* Checkbox */}
                      <div className="absolute top-3 right-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                            selectedLength?.id === length.id
                              ? "bg-primary border-primary"
                              : "border-gray-300"
                          )}
                        >
                          {selectedLength?.id === length.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Sock Image */}
                      <div className="flex justify-center mb-3">
                        <div className="w-40 h-40 relative">
                          <Image
                            src={length.image}
                            alt={length.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>

                      {/* Length Name */}
                      <div className="text-center">
                        <span
                          className={cn(
                            "text-sm font-medium transition-colors duration-200",
                            selectedLength?.id === length.id
                              ? "text-primary"
                              : "text-gray-900"
                          )}
                        >
                          {length.name}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="templates"
            className='relative' 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header with Back Button */}
            <div className="flex items-center justify-between mb-6 absolute top-0 left-0">
              <button
                onClick={handleBackToLengths}
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Lengths</span>
              </button>
            </div>

            {/* Template Selection Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Choose Your Template
              </h2>
              <p className="text-gray-400 mx-auto">
                Select a template for your {selectedLength?.name} socks
              </p>
            </div>

            {/* Scrollable Row of Template Cards */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {selectedLength?.templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <Card
                    className={cn(
                      "relative cursor-pointer transition-all duration-200 hover:shadow-md w-64 h-full",
                      selectedTemplate?.id === template.id
                        ? "border-primary shadow-md ring-2 ring-primary/20"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => onTemplateChange(template)}
                  >
                    <div className="p-4">
                      {/* Checkbox */}
                      <div className="absolute top-3 right-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                            selectedTemplate?.id === template.id
                              ? "bg-primary border-primary"
                              : "border-gray-300"
                          )}
                        >
                          {selectedTemplate?.id === template.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Template Image */}
                      <div className="flex justify-center mb-3">
                        <div className="w-40 h-40 relative">
                          {template.image ? (
                            <template.image className="svg-template shadow-applied w-full h-full" />
                          ) : (
                            <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                              No SVG
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Template Name */}
                      <div className="text-center">
                        <span
                          className={cn(
                            "text-sm font-medium transition-colors duration-200",
                            selectedTemplate?.id === template.id
                              ? "text-primary"
                              : "text-gray-900"
                          )}
                        >
                          {template.name}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
