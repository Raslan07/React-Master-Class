import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#0ea5e9',
    primaryTextColor: '#1e293b',
    primaryBorderColor: '#0ea5e9',
    lineColor: '#64748b',
    secondaryColor: '#f1f5f9',
    tertiaryColor: '#e2e8f0',
    background: 'transparent',
    mainBkg: 'transparent',
    secondBkg: '#f8fafc',
    tertiaryBkg: '#f1f5f9',
    textColor: '#1e293b',
    nodeBorder: '#0ea5e9',
    clusterBkg: '#f8fafc',
    clusterBorder: '#0ea5e9',
    defaultLinkColor: '#64748b',
    titleColor: '#1e293b',
    edgeLabelBackground: '#f8fafc',
  },
})

interface MermaidProps {
  chart: string
  className?: string
  id?: string
}

export function Mermaid({ chart, className, id }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    let mounted = true
    setLoading(true)
    setError(null)

    mermaid.render(`mermaid-${id || Math.random().toString(36).slice(2)}`, chart)
      .then(({ svg }) => {
        if (mounted) {
          setSvg(svg)
          setLoading(false)
        }
      })
      .catch(err => {
        if (mounted) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => { mounted = false }
  }, [chart, id])

  if (loading) {
    return (
      <div ref={containerRef} className={className} style={{ minHeight: '200px' }}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div ref={containerRef} className={className}>
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <pre className="text-red-700 dark:text-red-400 text-sm overflow-x-auto">{error}</pre>
          <details className="mt-2">
            <summary className="cursor-pointer text-sm font-medium text-red-700 dark:text-red-400">View source</summary>
            <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-x-auto">{chart}</pre>
          </details>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={className} dangerouslySetInnerHTML={{ __html: svg }} />
  )
}