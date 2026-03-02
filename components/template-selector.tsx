'use client'

import { Template } from '@/hooks/use-image-preview'
import { Button } from '@/components/ui/button'

interface TemplateSelectorProps {
  templates: Template[]
  selectedTemplate: Template
  onSelectTemplate: (templateId: string) => void
}

export function TemplateSelector({
  templates,
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Frame Style</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-1 lg:grid-cols-2">
        {templates.map((template) => (
          <Button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            variant={
              selectedTemplate.id === template.id ? 'default' : 'outline'
            }
            className="h-auto flex-col items-start gap-2 p-3"
          >
            <div className="flex w-full items-center gap-2">
              <div
                className="h-8 w-12 rounded border border-border"
                style={{
                  backgroundColor: template.frameColor,
                  boxShadow: `inset 0 0 0 2px ${template.matColor || template.frameColor}`,
                }}
              />
              <span className="text-sm font-medium">{template.name}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}
