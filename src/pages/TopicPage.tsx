import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { topics, getTopicById } from '../data/topics'
import { part1RenderingContent } from '../data/part1-rendering'
import { TopicContent, Section, ContentBlock, CodeBlock, DiagramViewer, TableOfContents } from '../components/content'
import { ArrowLeft, ArrowRight, BookOpen, Clock, Brain } from 'lucide-react'
import { cn, formatTime, getDifficultyColor } from '../utils/cn'

export function TopicPage() {
  const { partId } = useParams<{ partId: string }>()
  const topic = getTopicById(partId || '')

  if (!topic) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Topic not found</h1>
        <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline">
          ← Back to home
        </Link>
      </div>
    )
  }

  const content = getContentById(topic.id)
  const tocItems = content?.sections.map(s => ({ id: s.id, title: s.title, level: 2 })) || []
  const prevTopic = getPrevTopic(topic.id)
  const nextTopic = getNextTopic(topic.id)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-gray-700 dark:hover:text-gray-300">Home</Link>
        <span>/</span>
        <Link to={`/topic/part${topic.part}-${topic.slug}`} className="hover:text-gray-700 dark:hover:text-gray-300">
          Part {topic.part}
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">{topic.title}</span>
      </nav>

      {/* Topic Header */}
      <header className="mb-10 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className={cn('px-3 py-1 rounded-full text-sm font-medium', getDifficultyColor(topic.difficulty))}>
            {topic.difficulty}
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400">
            Part {topic.part}
          </span>
          {topic.visualizers?.length && (
            <span className="px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-sm font-medium">
              {topic.visualizers.length} Visualizer{topic.visualizers.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{topic.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">{topic.description}</p>
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-500">
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {topic.estimatedTime}</span>
          <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {topic.tags.length} concepts</span>
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_280px] gap-8">
        {/* Main Content */}
        <div>
          {content && (
            <TopicContent>
              {/* Visualizer at top if exists */}
              {topic.visualizers?.length && (
                <Section id="visualizer" title="Interactive Visualizer" level={2}>
                  <VisualizerEmbed visualizerIds={topic.visualizers} />
                </Section>
              )}

              {/* Diagrams */}
              {topic.diagrams?.length && content.diagrams && (
                <Section id="diagrams" title="Diagrams" level={2}>
                  <DiagramViewer diagrams={content.diagrams} />
                </Section>
              )}

              {/* Content Sections */}
              {content.sections.map(section => (
                <Section key={section.id} id={section.id} title={section.title} level={2}>
                  <section className="space-y-4">
                    {renderSectionContent(section)}
                  </section>
                </Section>
              ))}

              {/* Tags */}
              <div className="mt-10 flex flex-wrap gap-2">
                {topic.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </TopicContent>
          )}
        </div>

        {/* Sidebar - Table of Contents */}
        <aside className="hidden lg:block">
          <TableOfContents items={tocItems} />
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Quick Facts</h4>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-600 dark:text-gray-400">Difficulty</dt>
                <dd className="font-medium text-gray-900 dark:text-gray-100 capitalize">{topic.difficulty}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600 dark:text-gray-400">Estimated Time</dt>
                <dd className="font-medium text-gray-900 dark:text-gray-100">{topic.estimatedTime}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600 dark:text-gray-400">Part</dt>
                <dd className="font-medium text-gray-900 dark:text-gray-100">{topic.part} of 18</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      {/* Navigation */}
      <nav className="mt-12 flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
        {prevTopic && (
          <Link
            to={`/topic/${prevTopic.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Previous</span>
          </Link>
        )}
        {nextTopic && (
          <Link
            to={`/topic/${nextTopic.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <span className="text-sm font-medium">Next</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        )}
      </nav>
    </div>
  )
}

function renderSectionContent(section: typeof part1RenderingContent.sections[0]) {
  // This is a simplified renderer - in production you'd parse the content structure
  // For now, we'll render the content as-is with special handling for code blocks and diagrams
  return (
    <div dangerouslySetInnerHTML={{ __html: section.content }} />
  )
}

function VisualizerEmbed({ visualizerIds }: { visualizerIds: string[] }) {
  return (
    <div className="space-y-4">
      {visualizerIds.map(id => (
        <div key={id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <VisualizerPlaceholder visualizerId={id} />
        </div>
      ))}
    </div>
  )
}

function VisualizerPlaceholder({ visualizerId }: { visualizerId: string }) {
  const visualizerInfo: Record<string, { title: string; description: string }> = {
    rendering: {
      title: 'Rendering Visualizer',
      description: 'Watch how state changes trigger renders, create Virtual DOM, and update the real DOM'
    },
    reconciliation: {
      title: 'Reconciliation Visualizer',
      description: 'Compare old vs new trees, see diffing algorithm in action with highlighted changes'
    },
    'fiber-tree': {
      title: 'Fiber Tree Visualizer',
      description: 'Explore Fiber nodes with parent/child/sibling/alternate pointers'
    },
    scheduler: {
      title: 'Scheduler Simulator',
      description: 'Add updates with different priorities and watch the scheduler decide execution order'
    },
    'render-phase': {
      title: 'Render Phase Simulator',
      description: 'Step through component execution, fiber building, pause/resume/discard'
    },
    'commit-phase': {
      title: 'Commit Phase Simulator',
      description: 'Animate DOM mutations, ref updates, layout effects, paint, passive effects'
    },
    lanes: {
      title: 'Lane Visualizer',
      description: 'See how updates enter different lanes, merge, and get scheduled'
    },
  }

  const info = visualizerInfo[visualizerId] || { title: visualizerId, description: 'Interactive visualizer' }

  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
        <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400" />
      </div>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{info.title}</h4>
      <p className="text-gray-600 dark:text-gray-400 mt-1">{info.description}</p>
      <Link
        to={`/visualizer/${visualizerId}`}
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        Open Visualizer →
      </Link>
    </div>
  )
}

function getContentById(id: string) {
  switch (id) {
    case 'part1-rendering':
      return part1RenderingContent
    default:
      return null
  }
}

function getPrevTopic(currentId: string) {
  const index = topics.findIndex(t => t.id === currentId)
  if (index > 0) return topics[index - 1]
  return null
}

function getNextTopic(currentId: string) {
  const index = topics.findIndex(t => t.id === currentId)
  if (index < topics.length - 1) return topics[index + 1]
  return null
}