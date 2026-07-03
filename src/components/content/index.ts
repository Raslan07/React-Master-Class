import { ReactNode } from 'react'
import { Mermaid } from './Mermaid'
import { CodeBlock } from './CodeBlock'
import { DiagramViewer } from './DiagramViewer'
import { InteractiveVisualizer } from './InteractiveVisualizer'
import { cn } from '../../utils/cn'

interface TopicContentProps {
  children: ReactNode
  className?: string
}

export function TopicContent({ children, className }: TopicContentProps) {
  return (
    <article className={cn('prose prose-lg dark:prose-invert max-w-none', className)}>
      {children}
    </article>
  )
}

interface SectionProps {
  id: string
  title: string
  children: ReactNode
  level?: 2 | 3 | 4
}

export function Section({ id, title, children, level = 2 }: SectionProps) {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements
  return (
    <section id={id} className="mb-10 animate-in">
      <Heading className={`text-${level === 2 ? '2xl' : level === 3 ? 'xl' : 'lg'} font-semibold text-gray-900 dark:text-gray-100 mb-4`}>
        {title}
      </Heading>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

interface ContentBlockProps {
  children: ReactNode
  type?: 'default' | 'note' | 'warning' | 'tip' | 'danger'
  title?: string
}

export function ContentBlock({ children, type = 'default', title }: ContentBlockProps) {
  const styles = {
    default: 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800',
    note: 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800',
    tip: 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800',
    warning: 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800',
    danger: 'border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800',
  }

  const icons = {
    default: 'ℹ️',
    note: '📝',
    tip: '💡',
    warning: '⚠️',
    danger: '🚨',
  }

  return (
    <div className={`rounded-lg border p-4 my-4 ${styles[type]}`}>
      {title && (
        <div className="flex items-center gap-2 mb-2 font-medium text-gray-900 dark:text-gray-100">
          <span>{icons[type]}</span>
          {title}
        </div>
      )}
      <div className="prose prose-sm dark:prose-invert max-w-none">{children}</div>
    </div>
  )
}

interface TableOfContentsProps {
  items: Array<{ id: string; title: string; level: number }>
}

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <nav className="hidden lg:block sticky top-24 w-64">
      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">On this page</h4>
      <ul className="space-y-1 text-sm">
        {items.map(item => (
          <li key={item.id} className={`pl-${item.level * 4}`}>
            <a
              href={`#${item.id}`}
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors block py-1 truncate"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { Mermaid, CodeBlock, DiagramViewer, InteractiveVisualizer }