import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '../../utils/cn'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  className?: string
}

export function CodeBlock({
  code,
  language = 'javascript',
  filename,
  showLineNumbers = true,
  highlightLines = [],
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split('\n')

  return (
    <div className={cn('rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-950 dark:bg-gray-900', className)}>
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900 dark:bg-gray-950 border-b border-gray-700">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-xs font-medium text-gray-300 dark:text-gray-400 font-mono">{filename}</span>
            )}
            <span className="text-xs text-gray-500 dark:text-gray-500 uppercase">{language}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-400 hover:text-gray-200 dark:hover:text-gray-300 transition-colors rounded"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <pre className="m-0 p-4 overflow-x-auto">
        <code className={`language-${language} font-mono text-sm leading-relaxed`}>
          {showLineNumbers && (
            <span className="inline-block w-8 text-right pr-4 text-gray-500 dark:text-gray-600 select-none border-r border-gray-700 mr-4">
              {lines.map((_, i) => (
                <div key={i} className={cn('h-5', highlightLines.includes(i + 1) && 'bg-yellow-500/20')}>
                  {i + 1}
                </div>
              ))}
            </span>
          )}
          <span className={cn('relative', highlightLines.length > 0 && 'z-10')}>
            {lines.map((line, i) => (
              <div
                key={i}
                className={cn(
                  'h-5',
                  highlightLines.includes(i + 1) && 'bg-yellow-500/20 px-2 -ml-2 rounded'
                )}
              >
                {line || ' '}
              </div>
            ))}
          </span>
        </code>
      </pre>
    </div>
  )
}