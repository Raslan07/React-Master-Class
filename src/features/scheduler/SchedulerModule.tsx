import { useState, useEffect } from 'react';
import type { SchedulerTask, TaskPriority } from '../../types';
import { Clock, Play, Pause, Trash2 } from 'lucide-react';

export const SchedulerModule: React.FC = () => {
  const [tasks, setTasks] = useState<SchedulerTask[]>([
    { id: '1', title: 'User Click Button', priority: 'Immediate', durationMs: 16, remainingMs: 0, status: 'completed', lane: 'SyncLane', createdFrame: 1 },
    { id: '2', title: 'Heavy Data Filtering Chart', priority: 'Normal', durationMs: 120, remainingMs: 80, status: 'running', lane: 'DefaultLane', createdFrame: 2 },
  ]);
  const [isPaused, setIsPaused] = useState(false);
  const [frameNumber, setFrameNumber] = useState(3);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTasks((prevTasks) => {
        // Find highest priority running or pending task
        const pendingOrRunning = prevTasks.filter(t => t.status !== 'completed');
        if (pendingOrRunning.length === 0) return prevTasks;

        // Priority sort: Immediate > UserBlocking > Normal > Low > Idle
        const priorityOrder: Record<TaskPriority, number> = {
          Immediate: 0,
          UserBlocking: 1,
          Normal: 2,
          Low: 3,
          Idle: 4,
        };

        pendingOrRunning.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        const highestPriorityTask = pendingOrRunning[0];

        return prevTasks.map((t) => {
          if (t.id === highestPriorityTask.id) {
            const nextRemaining = Math.max(0, t.remainingMs - 20);
            return {
              ...t,
              status: nextRemaining === 0 ? 'completed' : 'running',
              remainingMs: nextRemaining,
            };
          } else if (t.status === 'running') {
            // Preempted / Interrupted!
            return { ...t, status: 'interrupted' };
          }
          return t;
        });
      });
      setFrameNumber(f => f + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const addTask = (title: string, priority: TaskPriority, durationMs: number, lane: any) => {
    const newTask: SchedulerTask = {
      id: Math.random().toString(),
      title,
      priority,
      durationMs,
      remainingMs: durationMs,
      status: 'pending',
      lane,
      createdFrame: frameNumber,
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleDiscardPending = () => {
    setTasks(prev => prev.filter(t => t.status === 'completed' || t.status === 'running'));
  };

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">
              Core Module 4
            </span>
            <span className="text-xs text-slate-400 font-mono">Cooperative Multitasking</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-['Outfit'] mt-1">
            Concurrent Scheduler Simulator
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              isPaused ? 'bg-emerald-500 text-slate-900 shadow-md shadow-emerald-500/20' : 'bg-amber-500 text-slate-900 shadow-md shadow-amber-500/20'
            }`}
          >
            {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
            <span>{isPaused ? 'Resume Scheduler' : 'Pause Execution'}</span>
          </button>
          <button
            onClick={handleDiscardPending}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 text-xs font-bold flex items-center space-x-1.5 border border-white/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Discard Pending Work</span>
          </button>
        </div>
      </div>

      {/* Quick Add Buttons Grid */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Simulate Incoming User Actions (Click to inject tasks into priority queue):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => addTask('Discrete Button Click', 'Immediate', 20, 'SyncLane')}
            className="p-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-left transition-all group"
          >
            <span className="text-[10px] font-extrabold text-rose-400 block uppercase">Immediate (Sync)</span>
            <span className="text-xs font-bold text-white block mt-0.5 group-hover:text-rose-300">User Click</span>
          </button>

          <button
            onClick={() => addTask('Keyboard Typing Event', 'UserBlocking', 40, 'InputContinuousLane')}
            className="p-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-left transition-all group"
          >
            <span className="text-[10px] font-extrabold text-amber-400 block uppercase">User Blocking</span>
            <span className="text-xs font-bold text-white block mt-0.5 group-hover:text-amber-300">Typing Input</span>
          </button>

          <button
            onClick={() => addTask('Continuous Scroll Handler', 'UserBlocking', 60, 'InputContinuousLane')}
            className="p-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-left transition-all group"
          >
            <span className="text-[10px] font-extrabold text-amber-400 block uppercase">User Blocking</span>
            <span className="text-xs font-bold text-white block mt-0.5 group-hover:text-amber-300">Scroll Event</span>
          </button>

          <button
            onClick={() => addTask('Network Payload Render', 'Normal', 100, 'DefaultLane')}
            className="p-3 rounded-xl bg-[#149eca]/15 hover:bg-[#149eca]/25 border border-[#149eca]/30 text-left transition-all group"
          >
            <span className="text-[10px] font-extrabold text-[#58c4dc] block uppercase">Normal Priority</span>
            <span className="text-xs font-bold text-white block mt-0.5 group-hover:text-[#58c4dc]">API Response</span>
          </button>

          <button
            onClick={() => addTask('startTransition() Tab Switch', 'Low', 180, 'TransitionLane')}
            className="p-3 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-left transition-all group"
          >
            <span className="text-[10px] font-extrabold text-purple-400 block uppercase">Transition (Low)</span>
            <span className="text-xs font-bold text-white block mt-0.5 group-hover:text-purple-300">Tab Transition</span>
          </button>

          <button
            onClick={() => addTask('Background Analytics Logging', 'Idle', 140, 'IdleLane')}
            className="p-3 rounded-xl bg-slate-500/15 hover:bg-slate-500/25 border border-slate-500/30 text-left transition-all group"
          >
            <span className="text-[10px] font-extrabold text-slate-400 block uppercase">Idle Priority</span>
            <span className="text-xs font-bold text-white block mt-0.5 group-hover:text-slate-300">Background Sync</span>
          </button>
        </div>
      </div>

      {/* Task Queue List */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Clock className="w-4 h-4 text-pink-400 animate-spin-slow" />
            <span>Active Scheduler Priority Queue</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">Time Slice: 5ms yield limit</span>
        </div>

        <div className="space-y-3 pt-2">
          {tasks.map((task) => {
            const progress = ((task.durationMs - task.remainingMs) / task.durationMs) * 100;

            return (
              <div
                key={task.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                  task.status === 'running'
                    ? 'bg-gradient-to-r from-[#149eca]/20 to-purple-500/10 border-[#58c4dc] shadow-md shadow-[#149eca]/15'
                    : task.status === 'interrupted'
                    ? 'bg-amber-500/10 border-amber-500/30 opacity-90'
                    : task.status === 'completed'
                    ? 'bg-[#131a29]/50 border-white/5 opacity-50'
                    : 'bg-[#131a29] border-white/10'
                }`}
              >
                <div className="space-y-1 min-w-[200px]">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      task.priority === 'Immediate' ? 'bg-rose-500 text-slate-900' :
                      task.priority === 'UserBlocking' ? 'bg-amber-500 text-slate-900' :
                      task.priority === 'Normal' ? 'bg-[#149eca] text-[#0b0f19]' : 'bg-purple-500 text-slate-900'
                    }`}>
                      {task.priority}
                    </span>
                    <h4 className="font-bold text-white text-sm">{task.title}</h4>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono block">
                    Assigned Lane: <strong className="text-white">{task.lane}</strong>
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="flex-1 w-full sm:w-auto px-4">
                  <div className="w-full h-2.5 bg-[#080b11] rounded-full overflow-hidden border border-white/10">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${
                        task.status === 'running' ? 'bg-gradient-to-r from-[#149eca] to-emerald-400 animate-pulse' :
                        task.status === 'completed' ? 'bg-emerald-500' :
                        task.status === 'interrupted' ? 'bg-amber-500' : 'bg-slate-600'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:text-right min-w-[140px] justify-between sm:justify-end w-full sm:w-auto">
                  <span className="font-mono text-xs text-slate-300">
                    {task.remainingMs}ms / {task.durationMs}ms
                  </span>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                    task.status === 'running' ? 'bg-emerald-500 text-slate-900 animate-bounce' :
                    task.status === 'interrupted' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    task.status === 'completed' ? 'bg-slate-700 text-slate-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
