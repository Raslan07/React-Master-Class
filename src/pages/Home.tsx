import { Link } from 'react-router-dom'
import { topics, coreInternalsTopics, performanceTopics } from '../data/topics'
import { BookOpen, Zap, HelpCircle, Clock, Brain, Target } from 'lucide-react'
import { cn, formatTime, getDifficultyColor } from '../utils/cn'

export function Home() {
  const totalTime = topics.reduce((acc, t) => acc + parseInt(t.estimatedTime), 0)

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 animate-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">
          <Target className="h-4 w-4" />
          React 19+ Architecture
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          React Internals{' '}
          <span className="text-primary-600 dark:text-primary-400">Masterclass</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Deep dive into React's internal architecture. Learn how rendering, reconciliation, Fiber,
          scheduler, lanes, and concurrent features actually work under the hood.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-500">
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            {topics.length} Topics
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            ~{Math.ceil(totalTime / 60)}h Content
          </span>
          <span className="flex items-center gap-1.5">
            <Brain className="h-4 w-4" />
            100+ Interview Qs
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="h-4 w-4" />
            7 Interactive Visualizers
          </span>
        </div>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            to="/topic/part1-rendering"
            className="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Start Learning
          </Link>
          <Link
            to="/visualizers"
            className="px-8 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Explore Visualizers
          </Link>
        </div>
      </section>

      {/* Learning Path */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Learning Path</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <LearningPathCard
            title="Core Internals (Parts 1-11)"
            description="Master the fundamental architecture that powers React"
            icon={<BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400" />}
            topics={coreInternalsTopics}
            link="/topic/part1-rendering"
            linkText="Start Core Internals"
          />
          <LearningPathCard
            title="Performance & Modern (Parts 12-16)"
            description="Optimize your apps with modern React patterns"
            icon={<Zap className="h-8 w-8 text-accent-600 dark:text-accent-400" />}
            topics={performanceTopics}
            link="/topic/part12-batching"
            linkText="Learn Performance"
          />
          <LearningPathCard
            title="Reference & Interview Prep (Parts 17-18)"
            description="Browser pipeline integration and 100+ interview questions"
            icon={<HelpCircle className="h-8 w-8 text-secondary-600 dark:text-secondary-400" />}
            topics={topics.slice(-2)}
            link="/topic/part17-browser-pipeline"
            linkText="View Reference"
          />
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard value="18" label="Comprehensive Topics" icon={<BookOpen />} />
        <StatCard value="7" label="Interactive Visualizers" icon={<Zap />} />
        <StatCard value="50+" label="Mermaid Diagrams" icon={<Brain />} />
        <StatCard value="100+" label="Interview Questions" icon={<Target />} />
      </section>
    </div>
  )
}

function LearningPathCard({
  title,
  description,
  icon,
  topics,
  link,
  linkText,
}: {
  title: string
  description: string
  icon: React.ReactNode
  topics: typeof topics
  link: string
  linkText: string
}) {
  const totalTime = topics.reduce((acc, t) => acc + parseInt(t.estimatedTime), 0)

  return (
    <Link to={link} className="group block p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">{icon}</div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        </div>
      </div>
      <ul className="space-y-2 mb-6">
        {topics.slice(0, 4).map(topic => (
          <li key={topic.id} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
            {topic.title}
            <span className="ml-auto text-xs text-gray-400">{topic.estimatedTime}</span>
          </li>
        ))}
        {topics.length > 4 && (
          <li className="text-sm text-primary-600 dark:text-primary-400">
            +{topics.length - 4} more topics
          </li>
        )}
      </ul>
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-500 dark:text-gray-500">
          {topics.length} topics • ~{Math.ceil(totalTime / 60)}h
        </span>
        <span className="text-sm font-medium text-primary-600 dark:text-primary-400 group-hover:underline">
          {linkText} →
        </span>
      </div>
    </Link>
  )
}

function StatCard({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
      <div className="text-primary-600 dark:text-primary-400 mb-3">{icon}</div>
      <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{label}</div>
    </div>
  )
}