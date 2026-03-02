'use client'

import { useState, useCallback, useRef, useEffect } from 'react'

export interface Template {
  id: string
  name: string
  frameColor: string
  frameWidth: number
  matColor?: string
  matWidth?: number
}

export interface PreviewState {
  imageSrc: string | null
  template: Template
  scale: number
  offsetX: number
  offsetY: number
}

const TEMPLATES: Template[] = [
  {
    id: 'natural',
    name: 'Natural Wood',
    frameColor: '#D4A574',
    frameWidth: 40,
  },
  {
    id: 'dark-walnut',
    name: 'Dark Walnut',
    frameColor: '#3E2723',
    frameWidth: 35,
  },
  {
    id: 'white',
    name: 'White',
    frameColor: '#F5F5F5',
    frameWidth: 30,
    matColor: '#E8E8E8',
    matWidth: 20,
  },
  {
    id: 'black',
    name: 'Black',
    frameColor: '#1A1A1A',
    frameWidth: 32,
    matColor: '#2A2A2A',
    matWidth: 15,
  },
]

export const useImagePreview = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [preview, setPreview] = useState<PreviewState>({
    imageSrc: null,
    template: TEMPLATES[0],
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  })

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageSrc = e.target?.result as string
      setPreview((prev) => ({
        ...prev,
        imageSrc,
        scale: 1,
        offsetX: 0,
        offsetY: 0,
      }))
    }
    reader.readAsDataURL(file)
  }, [])

  const updateTemplate = useCallback((templateId: string) => {
    const newTemplate = TEMPLATES.find((t) => t.id === templateId)
    if (newTemplate) {
      setPreview((prev) => ({ ...prev, template: newTemplate }))
    }
  }, [])

  const updateTransform = useCallback(
    (scale: number, offsetX: number, offsetY: number) => {
      setPreview((prev) => ({
        ...prev,
        scale: Math.max(1, Math.min(3, scale)),
        offsetX,
        offsetY,
      }))
    },
    []
  )

  const renderPreview = useCallback(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const displayWidth = 1024
    const displayHeight = 682

    canvas.width = displayWidth * dpr
    canvas.height = displayHeight * dpr
    ctx.scale(dpr, dpr)

    const mockup = new Image()
    mockup.src = '/mockup.jpg'
    mockup.onload = () => {
      // Draw mockup background
      ctx.drawImage(mockup, 0, 0, displayWidth, displayHeight)

      if (preview.imageSrc) {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          // Precise coordinates for the frame in the 1024x682 mockup image
          const contentX = 344
          const contentY = 264
          const contentWidth = 343
          const contentHeight = 253

          // Create clipping region for the frame
          ctx.save()
          ctx.beginPath()
          ctx.rect(contentX, contentY, contentWidth, contentHeight)
          ctx.clip()

          // Draw image
          const imgWidth = img.width
          const imgHeight = img.height
          const imgRatio = imgWidth / imgHeight
          const containerRatio = contentWidth / contentHeight

          let drawWidth = contentWidth
          let drawHeight = contentHeight

          if (imgRatio > containerRatio) {
            drawWidth = contentHeight * imgRatio
          } else {
            drawHeight = contentWidth / imgRatio
          }

          const scaledWidth = drawWidth * preview.scale
          const scaledHeight = drawHeight * preview.scale

          const x =
            contentX +
            (contentWidth - scaledWidth) / 2 +
            preview.offsetX * (scaledWidth - contentWidth)
          const y =
            contentY +
            (contentHeight - scaledHeight) / 2 +
            preview.offsetY * (scaledHeight - contentHeight)

          ctx.drawImage(img, x, y, scaledWidth, scaledHeight)

          // Glass Effect - Draw on top of the image layer within the same clip
          // 1. Subtle Glass Tint
          ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
          ctx.fillRect(contentX, contentY, contentWidth, contentHeight)

          // 2. Specular Highlights (Diagonal light beam)
          const highlightGradient = ctx.createLinearGradient(
            contentX,
            contentY,
            contentX + contentWidth,
            contentY + contentHeight
          )
          highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.0)')
          highlightGradient.addColorStop(0.45, 'rgba(255, 255, 255, 0.0)')
          highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)')
          highlightGradient.addColorStop(0.55, 'rgba(255, 255, 255, 0.0)')
          highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)')

          ctx.fillStyle = highlightGradient
          ctx.fillRect(contentX, contentY, contentWidth, contentHeight)

          // 3. Subtle Environmental Reflections (faint diagonal lines)
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
          ctx.lineWidth = 1

          // Draw a few parallel faint reflection lines
          for (let i = 0; i < 3; i++) {
            ctx.beginPath()
            const offset = i * 40 - 20
            ctx.moveTo(contentX + 50 + offset, contentY)
            ctx.lineTo(contentX, contentY + 50 + offset)
            ctx.stroke()
          }

          // 4. Edge Polish (Slight inner glow on the glass edge)
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
          ctx.lineWidth = 0.5
          ctx.strokeRect(contentX + 0.5, contentY + 0.5, contentWidth - 1, contentHeight - 1)

          ctx.restore()
        }
        img.src = preview.imageSrc
      }
    }
  }, [preview])

  useEffect(() => {
    renderPreview()
  }, [preview, renderPreview])

  return {
    canvasRef,
    preview,
    templates: TEMPLATES,
    handleImageUpload,
    updateTemplate,
    updateTransform,
  }
}
