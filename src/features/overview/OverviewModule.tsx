import { Zap, Network, Layers, ArrowRight, Sparkles } from 'lucide-react';

interface OverviewModuleProps {
  onNavigate: (moduleId: string) => void;
}

export const OverviewModule: React.FC<OverviewModuleProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 pb-16 animate-fadeIn">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 p-8 sm:p-12 bg-radial-gradient">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-[#149eca]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#149eca]/20 border border-[#149eca]/40 text-[#58c4dc] text-xs font-bold tracking-wide">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>REACT 19 INTERNALS MASTERCLASS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-['Outfit'] leading-tight">
            How React <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#149eca] via-[#58c4dc] to-purple-400">Actually Works</span> Under the Hood.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Welcome to the interactive, visual guide to Reacts internal runtime architecture. Forget static textbooks—explore live double-buffered Fiber trees, bitmask priority lanes, heuristic reconciliation diffing, and cooperative time-sliced scheduling in real time.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onNavigate('rendering')}
              className="px-6 py-3.5 rounded-xl bg-[#149eca] hover:bg-[#118bbb] text-[#0b0f19] font-extrabold text-sm shadow-xl shadow-[#149eca]/25 transition-all flex items-center space-x-2 hover:translate-x-0.5"
            >
              <span>Launch Rendering Visualizer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('fiber')}
              className="px-6 py-3.5 rounded-xl glass-panel hover:bg-white/10 text-white font-bold text-sm border border-white/15 transition-all"
            >
              Inspect Fiber Tree
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Core Architecture Flow */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#58c4dc]">Unified Architecture</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1">
              The 3 Pillars of React Runtime
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Every component state change passes through this exact three-phase lifecycle before pixels appear on the user screen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => onNavigate('rendering')}
            className="glass-panel-interactive rounded-2xl p-6 space-y-4 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#149eca] to-blue-600 flex items-center justify-center text-[#0b0f19] font-black text-lg shadow-lg shadow-[#149eca]/20">
              01
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white group-hover:text-[#58c4dc] transition-colors flex items-center justify-between">
                <span>Trigger & Render Phase</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pure, interruptible calculation. React calls your components to build a work-in-progress Virtual DOM tree without touching the actual browser DOM.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Time-sliced</span>
              <span className="text-[#58c4dc] font-bold">Concurrent</span>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('reconciliation')}
            className="glass-panel-interactive rounded-2xl p-6 space-y-4 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-900 font-black text-lg shadow-lg shadow-amber-500/20">
              02
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                <span>Reconciliation & Fiber Diff</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Comparing the newly returned elements against the memoized alternate tree in O(n) linear time, marking exact update flags (`Placement`, `Update`, `Deletion`).
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Heuristic Diff</span>
              <span className="text-amber-400 font-bold">O(N) Complexity</span>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('commit-phase')}
            className="glass-panel-interactive rounded-2xl p-6 space-y-4 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-900 font-black text-lg shadow-lg shadow-emerald-500/20">
              03
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                <span>Commit & Browser Paint</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Synchronous, atomic DOM mutation. React applies all flagged changes to host nodes, fires layout effects, and yields to browser frame composition.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Synchronous</span>
              <span className="text-emerald-400 font-bold">DOM Mutation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Module Grid Deep Dives */}
      <div className="space-y-6 pt-6">
        <div>
          <h2 className="text-2xl font-extrabold text-white font-['Outfit']">
            Interactive Curriculum Modules
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Click any module to enter live simulations, timelines, and DevTools inspections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            onClick={() => onNavigate('fiber')}
            className="glass-panel-interactive p-5 rounded-2xl flex items-start space-x-4 cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Network className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Fiber Linked List</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Inspect double-buffered `alternate` pointers, child/sibling traversal, and memoized hook queues.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('scheduler')}
            className="glass-panel-interactive p-5 rounded-2xl flex items-start space-x-4 cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Concurrent Scheduler</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Simulate user click tasks preempting heavy rendering loops with cooperative `shouldYield()` loops.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('lanes')}
            className="glass-panel-interactive p-5 rounded-2xl flex items-start space-x-4 cursor-pointer"
          >
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">31-Bit Priority Lanes</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Master how bitwise OR (`|`) and AND (`&`) operations batch concurrent state transitions cleanly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
