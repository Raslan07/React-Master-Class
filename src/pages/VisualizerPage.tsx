import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { cn } from '../utils/cn'

const visualizers = {
  rendering: {
    id: 'rendering',
    title: 'Rendering Visualizer',
    description: 'Watch the complete render pipeline: State Change → Render → Virtual DOM → DOM Update',
    component: RenderingVisualizer,
  },
  reconciliation: {
    id: 'reconciliation',
    title: 'Reconciliation Visualizer',
    description: 'Compare old vs new trees, see the diffing algorithm highlight changes in real-time',
    component: ReconciliationVisualizer,
  },
  'fiber-tree': {
    id: 'fiber-tree',
    title: 'Fiber Tree Visualizer',
    description: 'Explore Fiber nodes with parent/child/sibling/alternate pointers, expand/collapse',
    component: FiberTreeVisualizer,
  },
  scheduler: {
    id: 'scheduler',
    title: 'Scheduler Simulator',
    description: 'Add updates with different priorities (Urgent/Transition/Background) and watch scheduling',
    component: SchedulerSimulator,
  },
  'render-phase': {
    id: 'render-phase',
    title: 'Render Phase Simulator',
    description: 'Step through: Component calls → Fiber building → Reconciliation → Pause/Resume/Discard',
    component: RenderPhaseSimulator,
  },
  'commit-phase': {
    id: 'commit-phase',
    title: 'Commit Phase Simulator',
    description: 'Animate: DOM mutations → Ref updates → Layout Effects → Browser Paint → Passive Effects',
    component: CommitPhaseSimulator,
  },
  lanes: {
    id: 'lanes',
    title: 'Lane Visualizer',
    description: 'Visualize 31-bit lane system: priorities, bitmasks, merging, scheduling decisions',
    component: LaneVisualizer,
  },
}

export function VisualizerPage() {
  const { visualizerId } = useParams<{ visualizerId: string }>()
  const visualizer = visualizers[visualizerId || ''] || visualizers.rendering

  return (
    <div className="max-w-full mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/visualizers"
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{visualizer.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{visualizer.description}</p>
          </div>
        </div>
        <Link
          to={`/topic/part${getPartNumber(visualizerId || '')}-${getSlug(visualizerId || '')}`}
          className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors"
        >
          <BookOpen className="h-4 w-4 inline mr-1" />
          Read Topic
        </Link>
      </div>

      {/* Visualizer */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <visualizer.component />
      </div>
    </div>
  )
}

// Placeholder visualizer components - these will be fully implemented
function RenderingVisualizer() {
  return <VisualizerPlaceholder title="Rendering Visualizer" description="State Change → Render → VDOM → DOM" />
}

function ReconciliationVisualizer() {
  return <VisualizerPlaceholder title="Reconciliation Visualizer" description="Old Tree vs New Tree Diff" />
}

function FiberTreeVisualizer() {
  return <VisualizerPlaceholder title="Fiber Tree Visualizer" description="Parent/Child/Sibling/Alternate" />
}

function SchedulerSimulator() {
  return <VisualizerPlaceholder title="Scheduler Simulator" description="Priority Queue with Urgent/Transition/Background" />
}

function RenderPhaseSimulator() {
  return <VisualizerPlaceholder title="Render Phase Simulator" description="Component → Fiber → Reconcile → Pause/Resume" />
}

function CommitPhaseSimulator() {
  return <VisualizerPlaceholder title="Commit Phase Simulator" description="Mutation → Layout → Paint → Passive" />
}

function LaneVisualizer() {
  return <VisualizerPlaceholder title="Lane Visualizer" description="31-bit Lanes: Priority, Merging, Scheduling" />
}

function VisualizerPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="h-[600px] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
        <BookOpen className="h-12 w-12 text-primary-600 dark:text-primary-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">{description}</p>
      <div className="text-sm text-gray-500 dark:text-gray-500">
        Full implementation coming soon...
      </div>
    </div>
  )
}

function getPartNumber(id: string): number {
  const partMap: Record<string, number> = {
    rendering: 1, rerendering: 2, 'virtual-dom': 3, reconciliation: 4, fiber: 5,
    scheduler: 6, lanes: 7, 'render-phase': 8, 'commit-phase': 9, lifecycle: 10,
    concurrent: 11, batching: 12, 'start-transition': 13, 'use-transition': 14,
    'use-deferred-value': 15, performance: 16, 'browser-pipeline': 17, interview: 18,
  }
  return partMap[id] || 1
}

function getSlug(id: string): string {
  const slugMap: Record<string, string> = {
    rendering: 'what-is-rendering', rerendering: 're-rendering', 'virtual-dom': 'virtual-dom',
    reconciliation: 'reconciliation', fiber: 'fiber-architecture', scheduler: 'scheduler',
    lanes: 'lanes', 'render-phase': 'render-phase', 'commit-phase': 'commit-phase',
    lifecycle: 'complete-lifecycle', concurrent: 'concurrent-rendering', batching: 'automatic-batching',
    'start-transition': 'start-transition', 'use-transition': 'use-transition',
    'use-deferred-value': 'use-deferred-value', performance: 'performance-optimization',
    'browser-pipeline': 'browser-rendering-pipeline', interview: 'interview-questions',
  }
  return slugMap[id] || 'what-is-rendering'
}