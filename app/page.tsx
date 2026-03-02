'use client'

import { useImagePreview } from '@/hooks/use-image-preview'
import { TemplateSelector } from '@/components/template-selector'
import { ImageUpload } from '@/components/image-upload'
import { PreviewCanvas } from '@/components/preview-canvas'
import { Button } from '@/components/ui/button'
import { Download, ShoppingCart } from 'lucide-react'

export default function Home() {
  const {
    canvasRef,
    preview,
    templates,
    handleImageUpload,
    updateTemplate,
    updateTransform,
  } = useImagePreview()

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = 'custom-poster.png'
    link.click()
  }

  const handleAddToCart = () => {
    if (!preview.imageSrc) {
      alert('Please upload a photo first')
      return
    }

    // For future backend integration
    console.log('Adding to cart:', {
      templateId: preview.template.id,
      scale: preview.scale,
      offsetX: preview.offsetX,
      offsetY: preview.offsetY,
    })

    alert('Added to cart! (Demo)')
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Customize Your Wall Art Poster
          </h1>
          <p className="text-base text-muted-foreground">
            Upload your favorite photo and choose a frame style. See your
            design in real-time.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Preview Section */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 space-y-4">
              <PreviewCanvas
                canvasRef={canvasRef}
                hasImage={!!preview.imageSrc}
                scale={preview.scale}
                offsetX={preview.offsetX}
                offsetY={preview.offsetY}
                onTransformChange={updateTransform}
              />

              {preview.imageSrc && (
                <div className="flex gap-2">
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="flex-1 gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                  <Button onClick={handleAddToCart} className="flex-1 gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Controls Section */}
          <div className="space-y-6">
            <ImageUpload
              onImageUpload={handleImageUpload}
              hasImage={!!preview.imageSrc}
            />
            <TemplateSelector
              templates={templates}
              selectedTemplate={preview.template}
              onSelectTemplate={updateTemplate}
            />

            {/* Info Section */}
            <div className="rounded-lg bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                About This Product
              </h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex gap-2">
                  <span>📐</span>
                  <span>Available in multiple sizes</span>
                </li>
                <li className="flex gap-2">
                  <span>🖼️</span>
                  <span>Premium quality printing</span>
                </li>
                <li className="flex gap-2">
                  <span>🎨</span>
                  <span>Handcrafted wooden frames</span>
                </li>
                <li className="flex gap-2">
                  <span>✨</span>
                  <span>UV-resistant display</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
