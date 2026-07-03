export type ModuleId = 
  | 'overview'
  | 'rendering'
  | 'reconciliation'
  | 'fiber'
  | 'scheduler'
  | 'lanes'
  | 'commit-phase'
  | 'concurrent';

export interface ReactConceptModule {
  id: ModuleId;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  badge: string;
  accentColor: string;
}

export type LanePriority = 
  | 'SyncLane'
  | 'InputContinuousLane'
  | 'DefaultLane'
  | 'TransitionLane'
  | 'IdleLane';

export interface FiberNode {
  id: string;
  name: string;
  type: string;
  tag: number; // e.g., 0: FunctionComponent, 3: HostRoot, 5: HostComponent
  memoizedProps: Record<string, any>;
  memoizedState: any;
  flags: string[]; // e.g., ['Placement', 'Update']
  lanes: LanePriority[];
  child?: string;
  sibling?: string;
  return?: string;
  alternate?: {
    memoizedProps: Record<string, any>;
    flags: string[];
  };
}

export type TaskPriority = 'Immediate' | 'UserBlocking' | 'Normal' | 'Low' | 'Idle';

export interface SchedulerTask {
  id: string;
  title: string;
  priority: TaskPriority;
  durationMs: number;
  remainingMs: number;
  status: 'pending' | 'running' | 'interrupted' | 'completed';
  lane: LanePriority;
  createdFrame: number;
}

export interface TimelineStep {
  id: string;
  title: string;
  phase: 'Trigger' | 'Render Phase' | 'Reconciliation' | 'Commit Phase' | 'Browser Paint';
  description: string;
  codeSnippet?: string;
  devtoolsNote?: string;
}
