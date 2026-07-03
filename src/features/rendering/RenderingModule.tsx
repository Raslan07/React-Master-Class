import { useState, useEffect } from 'react';
import { TimelineBar } from '../../components/timeline/TimelineBar';
import { CodeVisualizer } from '../../components/playground/CodeVisualizer';
import { DevToolsInspector } from '../../components/visualizers/DevToolsInspector';
import type { TimelineStep } from '../../types';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const RENDERING_STEPS: TimelineStep[] = [
  {
    id: 'step-1',
    title: '1. State Trigger',
    phase: 'Trigger',
    description: 'User interacts (e.g. clicking "Increment Counter"). React schedules an update object into the Fiber node update queue and marks the root fiber with pending priority lanes.',
  },
  {
    id: 'step-2',
    title: '2. Render Phase (BeginWork)',
    phase: 'Render Phase',
    description: 'React traverses down the Fiber tree calling component functions. Pure function execution produces new React elements without touching the actual DOM.',
  },
  {
    id: 'step-3',
    title: '3. Virtual DOM Diffing',
    phase: 'Reconciliation',
    description: 'Reconciliation compares work-in-progress elements with current Fiber tree nodes. Changed props or text nodes receive update flags (e.g. Update=0x04).',
  },
  {
    id: 'step-4',
    title: '4. Commit Phase Mutation',
    phase: 'Commit Phase',
    description: 'Synchronous execution of host node changes. React applies exact DOM patches (e.g. node.textContent = "1"), fires useLayoutEffect hooks, and swaps Fiber root alternate.',
  },
  {
    id: 'step-5',
    title: '5. Browser Frame Paint',
    phase: 'Browser Paint',
    description: 'React yields execution to the browser engine. The browser recalculates layout, paints styles to bitmap layers, and composites the final frame to the monitor screen.',
  },
];

const RENDERING_CODE = `function CounterApp() {
  const [count, setCount] = useState(0);

  // Step 1: Trigger update on click
  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  // Step 2 & 3: Render return & Diff
  return (
    <button onClick={handleIncrement}>
      Count is: {count}
    </button>
  );
}`;

export const RenderingModule: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(1500);
  const [countState, setCountState] = useState(0);
  const [logs, setLogs] = useState<Array<{ id: string; timestamp: string; level: 'info' | 'warn' | 'success' | 'render'; message: string; detail?: string }>>([]);

  const addLog = (msg: string, level: 'info' | 'warn' | 'success' | 'render' = 'info', detail?: string) => {
    const now = new Date().toLocaleTimeString();
    setLogs(prev => [{ id: Math.random().toString(), timestamp: now, level, message: msg, detail }, ...prev.slice(0, 15)]);
  };

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < RENDERING_STEPS.length - 1) {
            const next = prev + 1;
            handleStepChange(next);
            return next;
          } else {
            setIsPlaying(false);
            confetti({ particleCount: 60, spread: 55, origin: { y: 0.8 } });
            addLog('Cycle complete! Browser painted new frame.', 'success');
            return prev;
          }
        });
      }, speedMs);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speedMs]);

  const handleStepChange = (stepIdx: number) => {
    setCurrentStep(stepIdx);
    if (stepIdx === 0) {
      addLog('Triggered state update via setCount(1)', 'info', 'Lane priority assigned: SyncLane (0b0000001)');
    } else if (stepIdx === 1) {
      addLog('Executing render phase: CounterApp() called', 'render', 'Building WorkInProgress Virtual DOM tree.');
    } else if (stepIdx === 2) {
      addLog('Diffing Virtual DOM tree against current Fiber', 'render', 'Flagged Fiber node #btn with Update (0x04) flag.');
    } else if (stepIdx === 3) {
      addLog('Commit phase mutating host DOM node', 'success', 'DOM node.textContent updated synchronously.');
      setCountState(c => c + 1);
    } else if (stepIdx === 4) {
      addLog('Browser composited and painted frame to monitor screen.', 'success');
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setCountState(0);
    addLog('Reset simulation pipeline to initial idle state.', 'info');
  };

  const getActiveLinesForStep = (step: number) => {
    switch (step) {
      case 0: return [5, 6];
      case 1: return [1, 2];
      case 2: return [10, 11, 12];
      case 3: return [11];
      case 4: return [11];
      default: return [];
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Module Title Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Core Module 1
            </span>
            <span className="text-xs text-slate-400 font-mono">React 19 Pipeline</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-['Outfit'] mt-1">
            The Rendering Pipeline Visualizer
          </h1>
        </div>

        {/* Playback Control Bar */}
        <div className="flex items-center space-x-3 bg-[#0b0f19] p-2 rounded-xl border border-white/10">
          <button
            onClick={() => handleStepChange(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Previous Step"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              if (currentStep === RENDERING_STEPS.length - 1) handleReset();
              setIsPlaying(!isPlaying);
            }}
            className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center space-x-2 transition-all ${
              isPlaying 
                ? 'bg-amber-500 text-slate-900 shadow-md shadow-amber-500/20' 
                : 'bg-[#149eca] hover:bg-[#118bbc] text-[#0b0f19] shadow-md shadow-[#149eca]/20'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? 'Pause Simulation' : currentStep === RENDERING_STEPS.length - 1 ? 'Replay' : 'Play Auto-Step'}</span>
          </button>

          <button
            onClick={() => handleStepChange(Math.min(RENDERING_STEPS.length - 1, currentStep + 1))}
            disabled={currentStep === RENDERING_STEPS.length - 1}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Next Step"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <div className="h-5 w-px bg-white/10 mx-1" />

          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            title="Reset Pipeline"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Speed Control */}
          <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-white/10 text-xs text-slate-400 font-mono">
            <span>Speed:</span>
            <select
              value={speedMs}
              onChange={(e) => setSpeedMs(Number(e.target.value))}
              className="bg-[#131a29] text-white rounded px-2 py-1 text-xs border border-white/10 outline-none"
            >
              <option value={2500}>Slow (2.5s)</option>
              <option value={1500}>Normal (1.5s)</option>
              <option value={800}>Fast (0.8s)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Timeline Bar */}
      <TimelineBar
        steps={RENDERING_STEPS}
        currentStepIndex={currentStep}
        onSelectStep={handleStepChange}
      />

      {/* Main Interactive Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visual Simulation Stage */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Live DOM & Fiber State Viewport
              </span>
              <span className="px-2 py-0.5 rounded bg-[#149eca]/20 text-[#58c4dc] text-[10px] font-mono">
                Active Fiber Tag: FunctionComponent (0)
              </span>
            </div>

            {/* Interactive Stage Animation Box */}
            <div className="p-8 rounded-2xl bg-[#080b11] border border-white/10 flex flex-col items-center justify-center min-h-[240px] relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-40" />

              <div className="relative z-10 flex flex-col items-center space-y-4">
                <div 
                  className={`w-28 h-28 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 ${
                    currentStep === 3 
                      ? 'bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-900 scale-110 shadow-2xl shadow-emerald-500/30' 
                      : currentStep === 1 || currentStep === 2
                      ? 'bg-gradient-to-br from-[#149eca] to-blue-600 text-[#0b0f19] animate-pulse scale-105'
                      : 'bg-[#131a29] text-white border border-white/20'
                  }`}
                >
                  <span className="text-xs uppercase font-bold opacity-80">Counter State</span>
                  <span className="text-4xl font-extrabold font-mono mt-1">{countState}</span>
                </div>

                <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                  <span>Current DOM Tree Text:</span>
                  <span className="px-2 py-1 rounded bg-[#131a29] text-white font-bold border border-white/10">
                    &lt;button&gt;Count is: {countState}&lt;/button&gt;
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step Educational Notes */}
          <div className="p-4 rounded-xl bg-[#0d121c] border border-white/10 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400">
              <CheckCircle className="w-4 h-4" />
              <span>Architectural Insight for Step {currentStep + 1}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentStep === 0 && "When setState is called, React does NOT immediately re-render. Instead, it pushes the update onto the Fiber node update queue and schedules a reconciliation pass via the Concurrent Scheduler."}
              {currentStep === 1 && "During BeginWork, React invokes your component function. Any side effects (like API requests) placed directly inside the function body are dangerous because this phase can be interrupted or executed multiple times."}
              {currentStep === 2 && "React compares elements using two rules: 1) Elements of different types produce different trees. 2) Elements with matching keys are kept across re-renders."}
              {currentStep === 3 && "The Commit Phase is completely synchronous. React mutates the DOM tree in one unbroken pass so the user never sees a partially updated UI."}
              {currentStep === 4 && "Once React finishes committing DOM mutations, the browser takes over to calculate CSS Layout and paint pixels to the display."}
            </p>
          </div>
        </div>

        {/* Side-by-side Code Visualizer */}
        <CodeVisualizer
          code={RENDERING_CODE}
          activeLines={getActiveLinesForStep(currentStep)}
          variables={{
            count: countState,
            fiberFlags: currentStep >= 2 ? ['Update (0x04)'] : ['NoFlags (0x00)'],
            phase: RENDERING_STEPS[currentStep].phase,
          }}
          onRun={() => handleStepChange(1)}
          onReset={handleReset}
          isPlaying={isPlaying}
        />
      </div>

      {/* Bottom DevTools & Logs Inspector */}
      <div className="h-64">
        <DevToolsInspector logs={logs} />
      </div>
    </div>
  );
};
