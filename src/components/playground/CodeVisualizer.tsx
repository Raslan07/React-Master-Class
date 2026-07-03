import React from 'react';
import { Code2, Play, RotateCcw } from 'lucide-react';

interface CodeVisualizerProps {
  title?: string;
  code: string;
  activeLines?: number[];
  variables?: Record<string, any>;
  onRun?: () => void;
  onReset?: () => void;
  isPlaying?: boolean;
}

export const CodeVisualizer: React.FC<CodeVisualizerProps> = ({
  title = "Interactive React 19 Execution Sandbox",
  code,
  activeLines = [],
  variables = {},
  onRun,
  onReset,
  isPlaying = false,
}) => {
  const lines = code.trim().split('\n');

  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col h-full shadow-2xl">
      <div className="px-5 py-3.5 bg-[#0d121c] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-slate-300">
            <Code2 className="w-4 h-4 text-[#58c4dc]" />
            <span>{title}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {onReset && (
            <button
              onClick={onReset}
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium flex items-center space-x-1.5 transition-colors border border-white/10"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
          {onRun && (
            <button
              onClick={onRun}
              className={`px-3 py-1 rounded text-xs font-bold flex items-center space-x-1.5 transition-all ${
                isPlaying 
                  ? 'bg-amber-500 text-slate-900 animate-pulse' 
                  : 'bg-[#149eca] hover:bg-[#118bbb] text-[#0b0f19] shadow-md shadow-[#149eca]/20'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isPlaying ? 'Stepping...' : 'Simulate Pipeline'}</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 min-h-[280px]">
        {/* Code Editor/Viewer Viewport */}
        <div className="lg:col-span-2 bg-[#080b11] p-4 overflow-x-auto font-mono text-xs leading-relaxed border-r border-white/10">
          <div className="space-y-1">
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              const isActive = activeLines.includes(lineNumber);

              return (
                <div
                  key={index}
                  className={`flex items-start px-2 py-0.5 rounded transition-all duration-200 ${
                    isActive
                      ? 'bg-[#149eca]/20 border-l-2 border-[#58c4dc] text-white font-semibold'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span className="w-6 text-right mr-4 text-slate-600 select-none">
                    {lineNumber}
                  </span>
                  <pre className="flex-1 whitespace-pre">{line}</pre>
                  {isActive && (
                    <span className="ml-2 px-1.5 py-0.5 rounded bg-[#149eca] text-[#0b0f19] text-[9px] font-bold uppercase tracking-wider animate-pulse">
                      Executing
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Variable & Fiber State Watcher */}
        <div className="bg-[#0b0f19] p-4 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Internal Memory Snapshot</span>
            </h4>
            <div className="space-y-2 font-mono text-xs">
              {Object.entries(variables).map(([key, val]) => (
                <div
                  key={key}
                  className="p-2.5 rounded-lg bg-[#131a29] border border-white/5 flex flex-col space-y-1"
                >
                  <span className="text-slate-400 font-semibold">{key}:</span>
                  <span className="text-[#58c4dc] font-bold break-all">
                    {typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val)}
                  </span>
                </div>
              ))}
              {Object.keys(variables).length === 0 && (
                <div className="text-slate-500 text-center py-6 text-xs font-sans italic">
                  Run simulation to populate Fiber state inspection variables.
                </div>
              )}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-[#149eca]/10 border border-purple-500/20 text-[11px] text-slate-300">
            <span className="font-bold text-purple-400 block mb-0.5">Core Note:</span>
            In React 19, functional components do not instantiate class instances; they execute as pure functions generating work-in-progress Fiber trees.
          </div>
        </div>
      </div>
    </div>
  );
};
