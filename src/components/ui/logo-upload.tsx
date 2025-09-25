'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Lightbulb } from 'lucide-react'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface LogoUploadProps {
  onLogoChange: (file: File | null) => void
  className?: string
}

export function LogoUpload({ onLogoChange, className }: LogoUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        setUploadedFile(file)
        onLogoChange(file)
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setUploadedFile(file)
      onLogoChange(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const removeFile = () => {
    setUploadedFile(null)
    onLogoChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card className={cn("w-full", className)}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Upload Your Logo
          </h3>
          <p className="text-sm text-gray-600">
            Upload your brand or team logo (PNG, JPG)
          </p>
        </div>

        {/* Upload Area */}
        <motion.div
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200",
            isDragOver
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-primary/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileSelect}
            className="hidden"
          />

          {uploadedFile ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              {/* Preview */}
              <div className="mx-auto w-24 h-24 relative">
                <img
                  src={URL.createObjectURL(uploadedFile)}
                  alt="Uploaded logo"
                  className="w-full h-full object-contain rounded"
                />
              </div>
              
              {/* File Info */}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {uploadedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              {/* Remove Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile()
                }}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Remove
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Upload Icon */}
              <motion.div
                className="mx-auto w-12 h-12 text-gray-400"
                animate={{ y: isDragOver ? -2 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Upload className="w-full h-full" />
              </motion.div>

              {/* Upload Text */}
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Drop your logo here, or click to browse
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG up to 10MB
                </p>
              </div>

              {/* Choose File Button */}
              <Button
                type="button"
                className="bg-primary hover:bg-primary/90"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClick()
                }}
              >
                Choose File
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 flex items-start gap-2 p-3 bg-blue-50 rounded-lg"
        >
          <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-800">
            <span className="font-medium">Tip:</span> For best results, use a high-contrast logo with transparent background
          </p>
        </motion.div>
      </div>
    </Card>
  )
}
