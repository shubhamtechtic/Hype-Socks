'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Minus, Plus, Type, Palette } from 'lucide-react'
import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SockTextRegion, TextLocation, textLocations } from '@/lib/types'

interface TextEditorProps {
  textRegions: (SockTextRegion & { id: string })[]
  onTextChange: (regionId: string, text: string) => void
  onColorChange: (regionId: string, color: string) => void
  onLocationChange: (regionId: string, location: TextLocation) => void
  className?: string
}

const defaultTextColors = [
  '#000000', // Black
  '#FFFFFF', // White
  '#D3D3D3', // Light Gray
  '#808080', // Medium Gray
  '#404040', // Dark Gray
  '#FF4500', // Bright Orange
  '#FF6347', // Reddish Orange
  '#4169E1', // Medium Blue
  '#00FFFF', // Cyan
  '#0000FF', // Dark Blue
  '#000080', // Dark Navy Blue
  '#006400', // Dark Green
  '#32CD32', // Lime Green
  '#008B8B', // Dark Teal
  '#00FF00', // Bright Green
  '#FFD700', // Golden Yellow
  '#FFFF00', // Bright Yellow
  '#800000', // Dark Maroon/Burgundy
  '#A52A2A', // Dark Brown
  '#FF69B4', // Hot Pink
  '#FF00FF', // Magenta
  '#800080', // Dark Purple
  '#008080', // Teal
]

export function TextEditor({
  textRegions,
  onTextChange,
  onColorChange,
  onLocationChange,
  className
}: TextEditorProps) {
  const [expandedRegions, setExpandedRegions] = useState<{ [key: string]: boolean }>({})
  const [colorSelectors, setColorSelectors] = useState<{ [key: string]: boolean }>({})

  const handleTextChange = useCallback((regionId: string, text: string) => {
    onTextChange(regionId, text)
  }, [onTextChange])

  const handleColorChange = useCallback((regionId: string, color: string) => {
    onColorChange(regionId, color)
  }, [onColorChange])

  const handleLocationChange = useCallback((regionId: string, location: TextLocation) => {
    onLocationChange(regionId, location)
  }, [onLocationChange])

  const toggleRegionExpansion = useCallback((regionId: string) => {
    setExpandedRegions(prev => ({
      ...prev,
      [regionId]: !prev[regionId]
    }))
  }, [])

  const toggleColorSelector = useCallback((regionId: string) => {
    setColorSelectors(prev => {
      const newState = { ...prev }
      if (prev[regionId]) {
        // Close this one
        newState[regionId] = false
      } else {
        // Close all others and open this one
        Object.keys(newState).forEach(key => {
          newState[key] = false
        })
        newState[regionId] = true
      }
      return newState
    })
  }, [])

  if (textRegions.length === 0) {
    return (
      <Card className={cn("w-full border-primary/20", className)}>
        <div className="p-4 text-center">
          <Type className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No text regions available for this template</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className={cn("w-full border-primary/20", className)}>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">Text Editor</h3>
        </div>
        
        <div className="space-y-3">
          {textRegions.map((region) => (
            <TextRegionEditor
              key={region.id}
              region={region}
              isExpanded={expandedRegions[region.id] || false}
              isColorSelectorOpen={colorSelectors[region.id] || false}
              onTextChange={(text) => handleTextChange(region.id, text)}
              onColorChange={(color) => handleColorChange(region.id, color)}
              onLocationChange={(location) => handleLocationChange(region.id, location)}
              onToggleExpansion={() => toggleRegionExpansion(region.id)}
              onToggleColorSelector={() => toggleColorSelector(region.id)}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}

interface TextRegionEditorProps {
  region: SockTextRegion & { id: string }
  isExpanded: boolean
  isColorSelectorOpen: boolean
  onTextChange: (text: string) => void
  onColorChange: (color: string) => void
  onLocationChange: (location: TextLocation) => void
  onToggleExpansion: () => void
  onToggleColorSelector: () => void
}

function TextRegionEditor({
  region,
  isExpanded,
  isColorSelectorOpen,
  onTextChange,
  onColorChange,
  onLocationChange,
  onToggleExpansion,
  onToggleColorSelector
}: TextRegionEditorProps) {
  const currentColor = region.color === 'auto' ? '#000000' : region.color

  return (
    <Card className="border-gray-200 hover:border-gray-300 transition-colors duration-200">
      <div className="p-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900">
              Text Region {region.id}
            </h4>
            <p className="text-xs text-gray-500">
              Location: {textLocations[region.textLocation]}
            </p>
          </div>
          <motion.button
            onClick={onToggleExpansion}
            className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors duration-200"
            aria-label={isExpanded ? "Collapse" : "Expand"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 0 : 180 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isExpanded ? (
                <Minus className="size-4 text-gray-500" />
              ) : (
                <Plus className="size-4 text-gray-500" />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                opacity: { duration: 0.2 }
              }}
              className="overflow-hidden mt-3 space-y-3"
            >
              {/* Text Input */}
              <div className="space-y-2">
                <Label htmlFor={`text-${region.id}`} className="text-sm font-medium">
                  Text Content
                </Label>
                <Input
                  id={`text-${region.id}`}
                  value={region.text}
                  onChange={(e) => onTextChange(e.target.value)}
                  placeholder="Enter text..."
                  className="w-full"
                />
              </div>

              {/* Location Selector */}
              <div className="space-y-2">
                <Label htmlFor={`location-${region.id}`} className="text-sm font-medium">
                  Text Location
                </Label>
                <Select
                  value={region.textLocation}
                  onValueChange={(value: TextLocation) => onLocationChange(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(textLocations).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Color Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Text Color</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onToggleColorSelector}
                    className="flex items-center gap-2"
                  >
                    <Palette className="w-3 h-3" />
                    {region.color === 'auto' ? 'Auto' : 'Custom'}
                  </Button>
                </div>

                {/* Color Picker */}
                <AnimatePresence>
                  {isColorSelectorOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Button
                            variant={region.color === 'auto' ? "default" : "outline"}
                            size="sm"
                            onClick={() => onColorChange('auto')}
                            className="flex-1"
                          >
                            Auto
                          </Button>
                          <Button
                            variant={region.color !== 'auto' ? "default" : "outline"}
                            size="sm"
                            onClick={() => onColorChange(currentColor)}
                            className="flex-1"
                          >
                            Custom
                          </Button>
                        </div>

                        {region.color !== 'auto' && (
                          <div className="grid grid-cols-6 gap-2">
                            {defaultTextColors.map((color) => (
                              <motion.button
                                key={color}
                                onClick={() => onColorChange(color)}
                                className={cn(
                                  "w-6 h-6 rounded border-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50",
                                  currentColor === color
                                    ? "border-primary shadow-md ring-2 ring-primary/20"
                                    : "border-gray-200 hover:border-gray-300"
                                )}
                                style={{ backgroundColor: color }}
                                aria-label={`Select color ${color}`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {currentColor === color && (
                                  <motion.div
                                    className="w-full h-full flex items-center justify-center"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <svg
                                      className="w-3 h-3 text-white drop-shadow-sm"
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
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
}
