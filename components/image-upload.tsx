'use client'

import { useRef } from 'react'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageUploadProps {
  onImageUpload: (file: File) => void
  hasImage: boolean
}

export function ImageUpload({ onImageUpload, hasImage }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImageUpload(file)
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Your Photo</h3>
      <Button
        onClick={handleClick}
        variant={hasImage ? 'outline' : 'default'}
        className="w-full gap-2"
      >
        <Upload className="h-4 w-4" />
        {hasImage ? 'Change Photo' : 'Upload Photo'}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <p className="text-xs text-muted-foreground">
        JPG, PNG or WebP. Max 10MB.
      </p>
    </div>
  )
}
