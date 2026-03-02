'use client'

import { useRef, useEffect, useState } from 'react'
import { Slider } from '@/components/ui/slider'

interface PreviewCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>
  hasImage: boolean
  scale: number
  offsetX: number
  offsetY: number
  onTransformChange: (scale: number, offsetX: number, offsetY: number) => void
}

export function PreviewCanvas({
  canvasRef,
  hasImage,
  scale,
  offsetX,
  offsetY,
  onTransformChange,
}: PreviewCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!hasImage) return
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const deltaX = (e.clientX - dragStart.x) / rect.width
    const deltaY = (e.clientY - dragStart.y) / rect.height

    const newOffsetX = Math.max(-1, Math.min(1, offsetX + deltaX))
    const newOffsetY = Math.max(-1, Math.min(1, offsetY + deltaY))

    onTransformChange(scale, newOffsetX, newOffsetY)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (!hasImage) return
    e.preventDefault()

    const delta = e.deltaY > 0 ? -0.1 : 0.1
    const newScale = Math.max(1, Math.min(3, scale + delta))
    onTransformChange(newScale, offsetX, offsetY)
  }

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="flex aspect-[3/2] items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          className={`h-full w-full object-cover ${hasImage ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
          style={{ touchAction: 'none' }}
        />
      </div>

      {hasImage && (
        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground">Zoom</label>
            <Slider
              value={[scale]}
              onValueChange={([newScale]) =>
                onTransformChange(newScale, offsetX, offsetY)
              }
              min={1}
              max={3}
              step={0.1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">{scale.toFixed(1)}x</p>
          </div>

          <p className="text-xs text-muted-foreground">
            💡 Drag to move photo. Scroll to zoom.
          </p>
        </div>
      )}
    </div>
  )
}
