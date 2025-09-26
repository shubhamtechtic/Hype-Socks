'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ColorSelectorProps {
  title: string
  description?: string
  selectedColor: string
  onColorChange: (color: string) => void
  colors?: string[]
  isOpen: boolean
  onToggle: (isOpen: boolean) => void
  className?: string
}

const defaultColors = [
  '#000000', // Black
  '#FFFFFF', // White
  '#D3D3D3', // Light Gray
  '#808080', // Medium Gray
  '#404040', // Dark Gray
  '#FFA500', // Light Orange
  '#8B4513', // Medium Brown
  '#FF4500', // Bright Orange
  '#FF6347', // Reddish Orange
  '#87CEEB', // Light Sky Blue
  '#4169E1', // Medium Blue
  '#00FFFF', // Cyan
  '#0000FF', // Dark Blue
  '#000080', // Dark Navy Blue
  '#006400', // Dark Green
  '#32CD32', // Lime Green
  '#008B8B', // Dark Teal
  '#00FF00', // Bright Green
  '#FFD700', // Golden Yellow
  '#F5DEB3', // Tan/Beige
  '#FFFF00', // Bright Yellow
  '#800000', // Dark Maroon/Burgundy
  '#A52A2A', // Dark Brown
  '#FF69B4', // Hot Pink
  '#FF00FF', // Magenta
  '#800080', // Dark Purple
  '#008080', // Teal
  '#654321', // Another Dark Brown
]

export function ColorSelector({
  title,
  description,
  selectedColor,
  onColorChange,
  colors = defaultColors,
  isOpen,
  onToggle,
  className
}: ColorSelectorProps) {
  const selectedColorInColors = colors.map(color => color.toLowerCase())
    .includes(selectedColor.toLowerCase())
  const availableColors = selectedColorInColors ? colors : [selectedColor, ...colors]

  const toggleCollapse = () => {
    onToggle?.(!isOpen)
  }

  return (
    <Card className={cn(
      "w-full border-primary/20 hover:border-primary/40 transition-colors duration-200",
      className
    )}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {title}
            </h3>
          </div>
          <motion.button
            onClick={toggleCollapse}
            className="ml-4 p-1 hover:bg-gray-100 rounded transition-colors duration-200"
            aria-label={isOpen ? "Expand" : "Collapse"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 0 : 180 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isOpen ? (
                <Plus className="size-6 text-gray-500" />
              ) : (
                <Minus className="size-6 text-gray-500" />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Color Grid */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                opacity: { duration: 0.2 }
              }}
              className="overflow-hidden"
            >
              {description && (
                <motion.p
                  className="text-sm text-gray-600 mb-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  {description}
                </motion.p>
              )}
              <motion.div
                className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-9 lg:grid-cols-11 gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.2 }}
              >
                {availableColors.map((color, index) => (
                  <motion.button
                    key={index}
                    onClick={() => onColorChange(color)}
                    className={cn(
                      "w-8 h-8 rounded-md border-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50",
                      selectedColor === color
                        ? "border-primary shadow-md ring-2 ring-primary/20"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.2 + (index * 0.02),
                      duration: 0.2,
                      ease: "easeOut"
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Checkmark for selected color */}
                    <AnimatePresence>
                      {selectedColor === color && (
                        <motion.div
                          className="w-full h-full flex items-center justify-center"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <svg
                            className="w-4 h-4 text-white drop-shadow-sm"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
}