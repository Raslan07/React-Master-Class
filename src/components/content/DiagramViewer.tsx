import { useState } from 'react'
import { Mermaid } from './Mermaid'
import { cn } from '../../utils/cn'

interface DiagramData {
  id: string
  title: string
  mermaid: string
}

interface DiagramViewerProps {
  diagrams: DiagramData[]
  className?: string
}

export function DiagramViewer({ diagrams, className }: DiagramViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (diagrams.length === 0) return null

  return (
    <div className={cn('space-y-4', className)}>
      {diagrams.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2" role="tablist">
          {diagrams.map((diagram, index) => (
            <button
              key={diagram.id}
              onClick={() => setActiveIndex(index)}
              role="tab"
              aria-selected={index === activeIndex}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors',
                index === activeIndex
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              {diagram.title}
            </button>
          ))}
        </div>
      )}

      <div className="diagram-container" role="tabpanel">
        <Mermaid chart={diagrams[activeIndex].mermaid} id={diagrams[activeIndex].id} />
      </div>
    </div>
  )
}