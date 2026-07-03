import React, { useState } from 'react';
import { Terminal, Activity, Zap, Check } from 'lucide-react';

interface DevToolsInspectorProps {
  logs: Array<{
    id: string;
    timestamp: string;
    level: 'info' | 'warn' | 'success' | 'render';
    message: string;
    detail?: string;
  }>;
}

export const DevToolsInspector: React.FC<DevToolsInspectorProps> = ({ logs }) => {
  const [activeTab, setActiveTab] = useState<'profiler' | 'console' | 'lanes'>('profiler');

  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col h-full">
      {/* DevTools Mock Tabs Header */}
      <div className="bg-[#0d121c] px-4 py-2 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('profiler')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'profiler'
                ? 'bg-[#149eca] text-[#0b0f19] shadow-md shadow-[#149eca]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>React Profiler (Flamegraph)</span>
          </button>
          <button
            onClick={() => setActiveTab('console')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'console'
                ? 'bg-[#149eca] text-[#0b0f19] shadow-md shadow-[#149eca]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Fiber Console Logs</span>
          </button>
          <button
            onClick={() => setActiveTab('lanes')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'lanes'
                ? 'bg-[#149eca] text-[#0b0f19] shadow-md shadow-[#149eca]/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Concurrent Lanes Inspection</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-[11px] font-mono text-slate-400">
          <span>Commit Duration: <strong className="text-emerald-400">1.2ms</strong></span>
          <span>•</span>
          <span>DOM Nodes: <strong className="text-white">14</strong></span>
        </div>
      </div>

      {/* Tab Body */}
      <div className="p-4 bg-[#080b11] font-mono text-xs flex-1 min-h-[220px] overflow-y-auto">
        {activeTab === 'profiler' && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-[#131a29] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>App (HostRoot)</span>
                <span className="text-emerald-400">0.2ms</span>
              </div>
              <div className="w-full h-4 bg-[#149eca]/20 rounded relative overflow-hidden">
                <div className="absolute top-0 left-0 bottom-0 bg-[#149eca] w-full opacity-60" />
                <span className="absolute inset-0 flex items-center px-2 text-[10px] font-bold text-white">
                  WorkInProgress Root Fiber
                </span>
              </div>

              <div className="pl-6 pt-1 space-y-2">
                <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                  <span>ReconciliationTreeVisualizer (FunctionComponent)</span>
                  <span className="text-amber-400">0.8ms (Did Render)</span>
                </div>
                <div className="w-full h-4 bg-amber-500/20 rounded relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 bg-amber-500 w-[80%] opacity-70" />
                  <span className="absolute inset-0 flex items-center px-2 text-[10px] font-bold text-slate-900">
                    Hook reconciliation + diffing
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-sans">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Double-buffering alternate pointer successfully flipped to Current tree.</span>
            </div>
          </div>
        )}

        {activeTab === 'console' && (
          <div className="space-y-2">
            {logs.map((log) => (
              <div
                key={log.id}
                className={`p-2.5 rounded-lg border flex items-start space-x-3 ${
                  log.level === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                    : log.level === 'render'
                    ? 'bg-[#149eca]/10 border-[#149eca]/20 text-[#58c4dc]'
                    : log.level === 'warn'
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                    : 'bg-[#131a29] border-white/5 text-slate-300'
                }`}
              >
                <span className="text-slate-500 flex-shrink-0">{log.timestamp}</span>
                <div className="flex-1">
                  <span className="font-bold">{log.message}</span>
                  {log.detail && (
                    <pre className="mt-1 p-1.5 bg-[#080b11] rounded text-[11px] text-slate-400 overflow-x-auto">
                      {log.detail}
                    </pre>
                  )}
                </div>
              </div>
            ))}
            {logs.length === 0 && (
              <div className="text-center py-8 text-slate-500 font-sans italic">
                No pipeline events logged yet. Trigger an interaction above.
              </div>
            )}
          </div>
        )}

        {activeTab === 'lanes' && (
          <div className="space-y-4 font-sans">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-[#131a29] border border-white/5 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">SyncLane</span>
                <span className="text-lg font-extrabold text-rose-400 font-mono">0b0000001</span>
                <span className="text-[10px] text-slate-500 block mt-1">Discrete Clicks</span>
              </div>
              <div className="p-3 rounded-xl bg-[#131a29] border border-white/5 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">InputLane</span>
                <span className="text-lg font-extrabold text-amber-400 font-mono">0b0000010</span>
                <span className="text-[10px] text-slate-500 block mt-1">Mouse Movement</span>
              </div>
              <div className="p-3 rounded-xl bg-[#131a29] border border-white/5 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">DefaultLane</span>
                <span className="text-lg font-extrabold text-[#58c4dc] font-mono">0b0010000</span>
                <span className="text-[10px] text-slate-500 block mt-1">Standard Network</span>
              </div>
              <div className="p-3 rounded-xl bg-[#131a29] border border-white/5 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">TransitionLane</span>
                <span className="text-lg font-extrabold text-purple-400 font-mono">0b1000000</span>
                <span className="text-[10px] text-slate-500 block mt-1">startTransition()</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed p-3 bg-white/5 rounded-xl border border-white/5">
              React checks priority using bitwise AND: <code className="text-[#58c4dc]">root.pendingLanes & SyncLane</code>. If non-zero, it immediately interrupts continuous rendering to execute the synchronous lane.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
