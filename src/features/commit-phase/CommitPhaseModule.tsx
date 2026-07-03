import { useState } from 'react';

interface SubPhase {
  id: string;
  name: string;
  engine: 'React Commit Phase' | 'Browser Pipeline';
  description: string;
  timing: string;
}

const COMMIT_SUBPHASES: SubPhase[] = [
  { id: '1', name: '1. BeforeMutation Phase', engine: 'React Commit Phase', description: 'Reads current DOM state before any alterations happen (e.g. getSnapshotBeforeUpdate).', timing: 'Synchronous (Pre-patch)' },
  { id: '2', name: '2. Mutation Phase', engine: 'React Commit Phase', description: 'Applies actual DOM mutations: text alterations, inserting host nodes, removing deleted elements.', timing: 'Synchronous (DOM Mutate)' },
  { id: '3', name: '3. Layout Phase', engine: 'React Commit Phase', description: 'Attaches refs and fires synchronous useLayoutEffect callbacks before browser repaint.', timing: 'Synchronous (Blocking Paint)' },
  { id: '4', name: '4. Browser Style / CSSOM Calculation', engine: 'Browser Pipeline', description: 'Browser engine recalculates matching CSS selector rules against updated DOM elements.', timing: 'Browser Frame Pipeline' },
  { id: '5', name: '5. Browser Layout / Reflow Calculation', engine: 'Browser Pipeline', description: 'Computes exact geometry (x, y, width, height) of every visible element on the page viewport.', timing: 'Browser Frame Pipeline' },
  { id: '6', name: '6. Browser Paint & Composite', engine: 'Browser Pipeline', description: 'Fills pixels on rasterized layer surfaces and composites them onto the user display hardware.', timing: 'Browser Frame Pipeline' },
  { id: '7', name: '7. Passive Effects Execution', engine: 'React Commit Phase', description: 'Fires async useEffect hooks without blocking visual responsiveness or causing frame drops.', timing: 'Asynchronous (Post-paint)' },
];

export const CommitPhaseModule: React.FC = () => {
  const [activeSubPhaseIdx, setActiveSubPhaseIdx] = useState(0);

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Core Module 6
            </span>
            <span className="text-xs text-slate-400 font-mono">DOM & Browser Pipeline</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-['Outfit'] mt-1">
            Commit Phase & Browser Paint Integration
          </h1>
        </div>

        <div className="flex space-x-2">
          <button
            disabled={activeSubPhaseIdx === 0}
            onClick={() => setActiveSubPhaseIdx(Math.max(0, activeSubPhaseIdx - 1))}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 disabled:opacity-30 border border-white/10"
          >
            Previous Subphase
          </button>
          <button
            disabled={activeSubPhaseIdx === COMMIT_SUBPHASES.length - 1}
            onClick={() => setActiveSubPhaseIdx(Math.min(COMMIT_SUBPHASES.length - 1, activeSubPhaseIdx + 1))}
            className="px-4 py-2 rounded-xl bg-[#149eca] hover:bg-[#128bbc] text-[#0b0f19] text-xs font-extrabold disabled:opacity-30 shadow-lg shadow-[#149eca]/20"
          >
            Next Subphase
          </button>
        </div>
      </div>

      {/* Synchronous vs Asynchronous Timeline Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {COMMIT_SUBPHASES.map((sub, idx) => {
          const isSelected = idx === activeSubPhaseIdx;
          const isCompleted = idx < activeSubPhaseIdx;
          const isReactEngine = sub.engine === 'React Commit Phase';

          return (
            <button
              key={sub.id}
              onClick={() => setActiveSubPhaseIdx(idx)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-300 min-h-[140px] ${
                isSelected
                  ? 'bg-gradient-to-b from-[#149eca]/25 to-[#131a29] border-[#58c4dc] shadow-xl shadow-[#149eca]/20 scale-105'
                  : isCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-300'
                  : 'bg-[#131a29] border-white/5 opacity-70 hover:opacity-100'
              }`}
            >
              <div>
                <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                  isReactEngine ? 'bg-[#149eca]/20 text-[#58c4dc]' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {isReactEngine ? 'React Engine' : 'Browser Engine'}
                </span>
                <h4 className="font-bold text-white text-xs mt-2 font-['Outfit']">{sub.name}</h4>
              </div>

              <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{idx + 1}/7</span>
                {isSelected && <span className="text-[#58c4dc] font-bold">INSPECTING</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Subphase Details Panel */}
      <div className="glass-panel rounded-2xl p-8 border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-[#58c4dc]">
              {COMMIT_SUBPHASES[activeSubPhaseIdx].engine} Execution Step
            </span>
            <h3 className="text-2xl font-extrabold text-white font-['Outfit']">
              {COMMIT_SUBPHASES[activeSubPhaseIdx].name}
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#131a29] border border-white/10 text-xs font-mono text-slate-300">
            Timing: {COMMIT_SUBPHASES[activeSubPhaseIdx].timing}
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {COMMIT_SUBPHASES[activeSubPhaseIdx].description}
        </p>

        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#080b11] border border-white/10 space-y-1 font-mono text-xs">
            <span className="font-bold text-emerald-400 block">useLayoutEffect vs useEffect:</span>
            <span className="text-slate-400">
              `useLayoutEffect` executes synchronously in Step 3 before the browser paints. `useEffect` executes asynchronously in Step 7 after the browser frame composite!
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#080b11] border border-white/10 space-y-1 font-mono text-xs">
            <span className="font-bold text-amber-400 block">Ref Attachment Guarantee:</span>
            <span className="text-slate-400">
              During Mutation (Step 2), old refs are detached (`null`). During Layout (Step 3), new DOM host instances are bound to your `ref.current`.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
