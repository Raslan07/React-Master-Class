import { useState } from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';

interface LaneDefinition {
  id: string;
  name: string;
  bitmask: number;
  binary: string;
  color: string;
  description: string;
}

const LANES: LaneDefinition[] = [
  { id: 'sync', name: 'SyncLane', bitmask: 0b0000000000000000000000000000001, binary: '0b0000...0001', color: 'rose', description: 'Immediate discrete user actions like clicks, typing, or input blur.' },
  { id: 'input', name: 'InputContinuousLane', bitmask: 0b0000000000000000000000000000100, binary: '0b0000...0100', color: 'amber', description: 'Continuous user interactions such as mouse dragging, wheel scrolling, or slider changes.' },
  { id: 'default', name: 'DefaultLane', bitmask: 0b0000000000000000000000000010000, binary: '0b0000...10000', color: 'blue', description: 'Standard async updates like API network fetches, timeouts, or normal state changes.' },
  { id: 'transition', name: 'TransitionLane1', bitmask: 0b0000000000000000000000001000000, binary: '0b0000...1000000', color: 'purple', description: 'Low-priority visual updates wrapped inside startTransition() or useDeferredValue().' },
  { id: 'idle', name: 'IdleLane', bitmask: 0b0100000000000000000000000000000, binary: '0b0100...0000', color: 'slate', description: 'Work that runs only when the browser has zero other tasks pending.' },
];

export const LanesModule: React.FC = () => {
  const [activeBitmask, setActiveBitmask] = useState<number>(0b0000000000000000000000001010001);

  const toggleLane = (mask: number) => {
    setActiveBitmask(prev => prev ^ mask);
  };

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Core Module 5
            </span>
            <span className="text-xs text-slate-400 font-mono">Bitmask Priority Math</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-['Outfit'] mt-1">
            Lanes & Bitmask Priority Engine
          </h1>
        </div>

        <div className="p-3 rounded-xl bg-[#0b0f19] border border-white/10 flex items-center space-x-3 font-mono text-xs">
          <span className="text-slate-400">root.pendingLanes =</span>
          <span className="text-emerald-400 font-bold text-sm">
            0b{activeBitmask.toString(2).padStart(12, '0')}
          </span>
        </div>
      </div>

      {/* Interactive Bitmask Calculator Stage */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Layers className="w-4 h-4 text-[#58c4dc]" />
            <span>Interactive Bitmask Update Batching</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Click any lane card below to toggle pending bit in root mask</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {LANES.map((lane) => {
            const isBitActive = (activeBitmask & lane.bitmask) !== 0;

            return (
              <button
                key={lane.id}
                onClick={() => toggleLane(lane.bitmask)}
                className={`p-5 rounded-2xl border text-left flex flex-col justify-between space-y-4 transition-all duration-300 ${
                  isBitActive
                    ? 'bg-gradient-to-b from-[#149eca]/25 to-[#131a29] border-[#58c4dc] shadow-xl shadow-[#149eca]/15 scale-105'
                    : 'bg-[#131a29] border-white/10 opacity-70 hover:opacity-100 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-extrabold text-[#58c4dc]">{lane.binary}</span>
                    {isBitActive && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <h4 className="font-bold text-white text-base font-['Outfit']">{lane.name}</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed font-normal">{lane.description}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Bitwise Check:</span>
                  <span className={`font-bold ${isBitActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {isBitActive ? 'PENDING (1)' : 'IDLE (0)'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bitwise Explanation Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 space-y-3">
        <h4 className="font-bold text-white text-base">Why did React switch from Expiration Times to 31-Bit Lanes?</h4>
        <p className="text-xs text-slate-300 leading-relaxed">
          In React 16, priorities were numbers (expiration timestamps). But numbers cannot express set relationships easily without sorting arrays. By using a 31-bit integer where each bit represents a specific priority lane, React can merge multiple updates using a single CPU bitwise OR operation (<code className="text-[#58c4dc]">lanes |= updateLane</code>) and check priority with bitwise AND (<code className="text-[#58c4dc]">lanes & SyncLane</code>) in nanoseconds!
        </p>
      </div>
    </div>
  );
};
