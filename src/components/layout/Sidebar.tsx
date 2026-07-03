import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, ChevronDown, BookOpen, Zap, BarChart2, HelpCircle, ChevronLeft } from 'lucide-react'
import { topics, coreInternalsTopics, performanceTopics } from '../../data/topics'
import { useState } from 'react'
import { cn } from '../../utils/cn'

export function Sidebar() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    core: true,
    performance: true,
    extras: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const renderTopicLink = (topic: typeof topics[0]) => {
    const isActive = location.pathname === `/topic/${topic.id}`
    return (
      <Link
        key={topic.id}
        to={`/topic/${topic.id}`}
        className={cn(
          'sidebar-link group',
          isActive && 'sidebar-link-active'
        )}
        title={topic.title}
      >
        <span className="flex-1 truncate">{topic.title}</span>
        {!collapsed && (
          <span className={cn(
            'topic-badge',
            topic.part <= 11 && 'topic-badge-core',
            topic.part >= 12 && topic.part <= 16 && 'topic-badge-performance',
            topic.part >= 17 && 'topic-badge-advanced'
          )}>
            Part {topic.part}
          </span>
        )}
      </Link>
    )
  }

  const renderSection = (title: string, sectionKey: string, topicList: typeof topics, icon: React.ReactNode) => (
    <div className="mb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className={cn(
          'sidebar-section-title flex items-center gap-2 w-full',
          collapsed && 'justify-center px-0'
        )}
        aria-expanded={expandedSections[sectionKey]}
      >
        {icon}
        {!collapsed && <span>{title}</span>}
        {!collapsed && (
          <ChevronDown
            className={cn(
              'ml-auto h-4 w-4 transition-transform',
              expandedSections[sectionKey] && 'rotate-180'
            )}
          />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className={cn(
          'space-y-1 overflow-hidden transition-all duration-300',
          collapsed && 'hidden'
        )}>
          {topicList.map(renderTopicLink)}
        </div>
      )}
    </div>
  )

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-all duration-300',
        collapsed ? 'w-16' : 'w-72'
      )}
      aria-label="Main navigation"
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
        {!collapsed && (
          <span className="font-bold text-lg text-primary-600 dark:text-primary-400">
            React Internals
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2" aria-label="Topics">
        {renderSection('Core Internals', 'core', coreInternalsTopics, (
          <BookOpen className="h-5 w-5 text-primary-600 dark:text-primary-400" />
        ))}
        {renderSection('Performance & Modern', 'performance', performanceTopics, (
          <Zap className="h-5 w-5 text-accent-600 dark:text-accent-400" />
        ))}
        {renderSection('Reference', 'extras', topics.slice(-2), (
          <HelpCircle className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        {!collapsed && (
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2">
            <p>React 19+ Architecture</p>
            <p className="font-medium">v1.0.0</p>
          </div>
        )}
        {collapsed && (
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            v1.0.0
          </div>
        )}
      </div>
    </aside>
  )
}