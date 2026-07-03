export interface Topic {
  id: string
  part: number
  title: string
  description: string
  slug: string
  visualizers?: string[]
  diagrams?: string[]
  estimatedTime: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
}

export const topics: Topic[] = [
  // Part 1-5: Core Internals (Priority)
  {
    id: 'part1-rendering',
    part: 1,
    title: 'What is Rendering?',
    description: 'Understanding what rendering means in React, the difference between React rendering and browser rendering, and the internal flow of a render.',
    slug: 'what-is-rendering',
    visualizers: ['rendering'],
    diagrams: ['rendering-flow', 'initial-render', 'react-vs-browser-rendering'],
    estimatedTime: '30 min',
    difficulty: 'beginner',
    tags: ['rendering', 'fundamentals', 'jsx', 'virtual-dom'],
  },
  {
    id: 'part2-rerendering',
    part: 2,
    title: 'Re-rendering',
    description: 'Why React re-renders, the difference between render and DOM update, triggers for re-renders, and when React re-renders but DOM does not change.',
    slug: 're-rendering',
    visualizers: ['rerendering'],
    diagrams: ['rerender-flow', 'state-update-trigger', 'props-change-trigger', 'context-trigger'],
    estimatedTime: '35 min',
    difficulty: 'beginner',
    tags: ['rerendering', 'state', 'props', 'context', 'optimization'],
  },
  {
    id: 'part3-virtual-dom',
    part: 3,
    title: 'Virtual DOM',
    description: 'What Virtual DOM is, why React introduced it, how JSX becomes Virtual DOM, its structure, benefits, limitations, and common misconceptions.',
    slug: 'virtual-dom',
    visualizers: ['virtual-dom'],
    diagrams: ['virtual-dom-structure', 'jsx-to-vdom', 'old-vs-new-tree'],
    estimatedTime: '30 min',
    difficulty: 'beginner',
    tags: ['virtual-dom', 'jsx', 'reconciliation', 'performance'],
  },
  {
    id: 'part4-reconciliation',
    part: 4,
    title: 'Reconciliation & Diffing Algorithm',
    description: 'How React compares trees, the diffing algorithm, same/different element types, props comparison, children reconciliation, keys, and optimization strategies.',
    slug: 'reconciliation',
    visualizers: ['reconciliation'],
    diagrams: ['reconciliation-flow', 'diffing-algorithm', 'same-type-diff', 'different-type-diff', 'keyed-reconciliation'],
    estimatedTime: '45 min',
    difficulty: 'intermediate',
    tags: ['reconciliation', 'diffing', 'keys', 'algorithm', 'optimization'],
  },
  {
    id: 'part5-fiber',
    part: 5,
    title: 'Fiber Architecture',
    description: 'Deep dive into Fiber: why Stack Reconciler was replaced, Fiber node structure, work loop, double buffering, and every Fiber property explained.',
    slug: 'fiber-architecture',
    visualizers: ['fiber-tree'],
    diagrams: ['fiber-node-structure', 'fiber-tree', 'current-wip-trees', 'double-buffering', 'work-loop'],
    estimatedTime: '60 min',
    difficulty: 'advanced',
    tags: ['fiber', 'architecture', 'reconciler', 'work-loop', 'double-buffering'],
  },
  {
    id: 'part6-scheduler',
    part: 6,
    title: 'Scheduler & Cooperative Scheduling',
    description: 'Why React needs a scheduler, interruptible rendering, cooperative scheduling, priority levels, time slicing, and how React decides which update runs first.',
    slug: 'scheduler',
    visualizers: ['scheduler'],
    diagrams: ['scheduler-flow', 'priority-queue', 'time-slicing', 'urgent-vs-transition-vs-background'],
    estimatedTime: '45 min',
    difficulty: 'advanced',
    tags: ['scheduler', 'priority', 'time-slicing', 'cooperative-scheduling', 'interruptible'],
  },
  {
    id: 'part7-lanes',
    part: 7,
    title: 'React Lanes (Priority System)',
    description: 'Deep dive into Lanes: what they are, why they replaced expiration times, lane priorities, multiple lanes, merging lanes, and scheduling with lanes.',
    slug: 'lanes',
    visualizers: ['lanes'],
    diagrams: ['lane-priorities', 'lane-bitmask', 'lane-merging', 'lane-scheduling', 'expiration-vs-lanes'],
    estimatedTime: '40 min',
    difficulty: 'advanced',
    tags: ['lanes', 'priority', 'bitmask', 'scheduling', 'expiration-time'],
  },
  {
    id: 'part8-render-phase',
    part: 8,
    title: 'Render Phase Deep Dive',
    description: 'What happens during render phase: building WIP tree, calling components, running hooks, calculating JSX, reconciliation, and why render phase can pause/restart/discard.',
    slug: 'render-phase',
    visualizers: ['render-phase'],
    diagrams: ['render-phase-steps', 'wip-tree-building', 'component-execution', 'hook-execution', 'pause-resume-discard'],
    estimatedTime: '50 min',
    difficulty: 'advanced',
    tags: ['render-phase', 'wip-tree', 'hooks', 'reconciliation', 'interruptible'],
  },
  {
    id: 'part9-commit-phase',
    part: 9,
    title: 'Commit Phase Deep Dive',
    description: 'Commit phase breakdown: Mutation phase (DOM mutations, ref updates), Layout phase (useLayoutEffect), Browser paint, Passive phase (useEffect). Why commit phase cannot be interrupted.',
    slug: 'commit-phase',
    visualizers: ['commit-phase'],
    diagrams: ['commit-phases', 'mutation-phase', 'layout-phase', 'passive-phase', 'why-cannot-interrupt'],
    estimatedTime: '45 min',
    difficulty: 'advanced',
    tags: ['commit-phase', 'mutation', 'layout-effects', 'useeffect', 'uselayouteffect', 'browser-paint'],
  },
  {
    id: 'part10-lifecycle',
    part: 10,
    title: 'Complete React Lifecycle',
    description: 'End-to-end flow: User click → State update → Scheduler → Priority → Render Phase → Fiber → Reconciliation → Commit Phase → DOM Update → Browser Paint → useEffect.',
    slug: 'complete-lifecycle',
    visualizers: ['lifecycle'],
    diagrams: ['complete-lifecycle', 'update-pipeline', 'fiber-traversal', 'commit-sequence'],
    estimatedTime: '55 min',
    difficulty: 'advanced',
    tags: ['lifecycle', 'update-pipeline', 'end-to-end', 'debugging'],
  },
  {
    id: 'part11-concurrent',
    part: 11,
    title: 'Concurrent Rendering',
    description: 'What concurrent rendering actually means (and what it does not), interruptible rendering, time slicing, cooperative scheduling, and common misconceptions.',
    slug: 'concurrent-rendering',
    visualizers: ['concurrent'],
    diagrams: ['concurrent-vs-sync', 'interruptible-rendering', 'time-slicing-visual', 'misconceptions'],
    estimatedTime: '40 min',
    difficulty: 'advanced',
    tags: ['concurrent', 'interruptible', 'time-slicing', 'react-18', 'react-19'],
  },
  // Part 12-16: Performance & Modern Features
  {
    id: 'part12-batching',
    part: 12,
    title: 'Automatic Batching',
    description: 'Batching before React 18 vs after React 18, how automatic batching works, examples, and performance implications.',
    slug: 'automatic-batching',
    diagrams: ['batching-before-18', 'batching-after-18', 'batching-examples', 'flushSync'],
    estimatedTime: '25 min',
    difficulty: 'intermediate',
    tags: ['batching', 'react-18', 'performance', 'state-updates'],
  },
  {
    id: 'part13-starttransition',
    part: 13,
    title: 'startTransition',
    description: 'Why startTransition exists, how it interacts with the scheduler, priority changes, practical examples, and best practices.',
    slug: 'start-transition',
    diagrams: ['starttransition-flow', 'priority-change', 'transition-examples'],
    estimatedTime: '30 min',
    difficulty: 'intermediate',
    tags: ['starttransition', 'transitions', 'priority', 'react-18', 'concurrent'],
  },
  {
    id: 'part14-usetransition',
    part: 14,
    title: 'useTransition Hook',
    description: 'Complete guide to useTransition: API, return values, pending state, combining with useDeferredValue, and real-world patterns.',
    slug: 'use-transition',
    diagrams: ['usetransition-api', 'pending-state', 'transition-patterns'],
    estimatedTime: '30 min',
    difficulty: 'intermediate',
    tags: ['usetransition', 'hooks', 'transitions', 'pending', 'ux'],
  },
  {
    id: 'part15-usedferredvalue',
    part: 15,
    title: 'useDeferredValue Hook',
    description: 'Complete guide to useDeferredValue: how it differs from useTransition, use cases, implementation details, and performance patterns.',
    slug: 'use-deferred-value',
    diagrams: ['usedeferredvalue-api', 'deferred-vs-transition', 'deferred-patterns'],
    estimatedTime: '25 min',
    difficulty: 'intermediate',
    tags: ['usedeferredvalue', 'hooks', 'deferred', 'performance', 'debounce'],
  },
  {
    id: 'part16-performance',
    part: 16,
    title: 'React Performance Optimization',
    description: 'memo(), useMemo(), useCallback(), React Compiler, React 19 optimizations, preventing wasted renders, render cost vs commit cost analysis.',
    slug: 'performance-optimization',
    visualizers: ['performance'],
    diagrams: ['memo-comparison', 'usememo-vs-usecallback', 'compiler-optimizations', 'render-cost', 'commit-cost', 'wasted-renders'],
    estimatedTime: '55 min',
    difficulty: 'advanced',
    tags: ['memo', 'usememo', 'usecallback', 'compiler', 'react-19', 'optimization', 'performance'],
  },
  {
    id: 'part17-browser-pipeline',
    part: 17,
    title: 'Browser Rendering Pipeline',
    description: 'DOM, CSSOM, Render Tree, Layout, Paint, Composite, GPU acceleration, and how React fits into the browser rendering pipeline.',
    slug: 'browser-rendering-pipeline',
    diagrams: ['browser-pipeline', 'dom-cssom', 'render-tree', 'layout-paint-composite', 'gpu-acceleration', 'react-in-pipeline'],
    estimatedTime: '40 min',
    difficulty: 'intermediate',
    tags: ['browser', 'rendering-pipeline', 'layout', 'paint', 'composite', 'gpu', 'performance'],
  },
  {
    id: 'part18-interview',
    part: 18,
    title: 'Senior Frontend Interview Questions',
    description: '100+ interview questions covering all topics with detailed answers, categorized by topic and difficulty.',
    slug: 'interview-questions',
    diagrams: [],
    estimatedTime: '60 min',
    difficulty: 'advanced',
    tags: ['interview', 'questions', 'senior', 'preparation', 'all-topics'],
  },
]

export const getTopicById = (id: string) => topics.find(t => t.id === id)

export const getTopicBySlug = (slug: string) => topics.find(t => t.slug === slug)

export const getTopicsByPart = (part: number) => topics.filter(t => t.part === part)

export const coreInternalsTopics = topics.filter(t => t.part <= 11)

export const performanceTopics = topics.filter(t => t.part >= 12 && t.part <= 16)

export const allTags = [...new Set(topics.flatMap(t => t.tags))].sort()