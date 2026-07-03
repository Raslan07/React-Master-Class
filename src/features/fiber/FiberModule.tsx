import { useState } from 'react';
import type { FiberNode } from '../../types';
import { Network, CornerDownRight } from 'lucide-react';

const MOCK_FIBER_TREE: Record<string, FiberNode> = {
  root: {
    id: 'root',
    name: 'HostRootFiber',
    type: 'HostRoot (Tag 3)',
    tag: 3,
    memoizedProps: {},
    memoizedState: { element: '<App />' },
    flags: ['NoFlags'],
    lanes: ['DefaultLane'],
    child: 'app',
    alternate: { memoizedProps: {}, flags: ['NoFlags'] },
  },
  app: {
    id: 'app',
    name: 'App',
    type: 'FunctionComponent (Tag 0)',
    tag: 0,
    memoizedProps: { theme: 'dark', version: 19 },
    memoizedState: { memoizedState: 'userSessionToken_xyz' },
    flags: ['Update'],
    lanes: ['SyncLane'],
    return: 'root',
    child: 'nav',
    alternate: { memoizedProps: { theme: 'dark', version: 18 }, flags: ['NoFlags'] },
  },
  nav: {
    id: 'nav',
    name: 'Navbar',
    type: 'FunctionComponent (Tag 0)',
    tag: 0,
    memoizedProps: { activeId: 'fiber' },
    memoizedState: null,
    flags: ['NoFlags'],
    lanes: ['DefaultLane'],
    return: 'app',
    sibling: 'main',
    alternate: { memoizedProps: { activeId: 'rendering' }, flags: ['NoFlags'] },
  },
  main: {
    id: 'main',
    name: 'MainContent',
    type: 'HostComponent (Tag 5)',
    tag: 5,
    memoizedProps: { className: 'container' },
    memoizedState: null,
    flags: ['Placement'],
    lanes: ['TransitionLane'],
    return: 'app',
    child: 'counter',
    alternate: { memoizedProps: { className: 'container' }, flags: ['NoFlags'] },
  },
  counter: {
    id: 'counter',
    name: 'InteractiveCounter',
    type: 'FunctionComponent (Tag 0)',
    tag: 0,
    memoizedProps: { step: 1 },
    memoizedState: { memoizedState: 42, next: { memoizedState: 'Effect hook' } },
    flags: ['Update', 'Passive'],
    lanes: ['SyncLane'],
    return: 'main',
    alternate: { memoizedProps: { step: 1 }, flags: ['NoFlags'] },
  },
};

export const FiberModule: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('app');
  const selectedFiber = MOCK_FIBER_TREE[selectedNodeId];

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Core Module 3
            </span>
            <span className="text-xs text-slate-400 font-mono">Linked List Architecture</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-['Outfit'] mt-1">
            Fiber Node Explorer
          </h1>
        </div>
        <p className="text-xs text-slate-400 max-w-sm">
          Click any Fiber below to inspect its live internal pointers (`child`, `sibling`, `return`), side-effect flags, and memoized hook state.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Fiber Linked List Graph */}
        <div className="lg:col-span-1 glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2 border-b border-white/10 pb-3">
            <Network className="w-4 h-4 text-purple-400" />
            <span>Fiber Linked List Tree</span>
          </h3>

          <div className="space-y-3 pt-2">
            {Object.values(MOCK_FIBER_TREE).map((node) => {
              const isSelected = node.id === selectedNodeId;
              const indentLevel = node.id === 'root' ? 0 : node.id === 'app' ? 1 : node.id === 'nav' || node.id === 'main' ? 2 : 3;

              return (
                <div key={node.id} style={{ paddingLeft: `${indentLevel * 18}px` }}>
                  <button
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-purple-500/20 border-purple-500 text-white shadow-lg shadow-purple-500/20 scale-[1.02]'
                        : 'bg-[#131a29] border-white/5 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <CornerDownRight className={`w-3.5 h-3.5 ${isSelected ? 'text-purple-400' : 'text-slate-600'}`} />
                      <div>
                        <span className="font-bold text-xs block">{node.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono block">{node.type}</span>
                      </div>
                    </div>
                    {node.flags[0] !== 'NoFlags' && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        {node.flags[0]}
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Node Inspector Panel */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
                Tag {selectedFiber.tag}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-['Outfit']">{selectedFiber.name}</h3>
                <span className="text-xs font-mono text-purple-400">{selectedFiber.type}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              {selectedFiber.lanes.map((lane) => (
                <span key={lane} className="px-2.5 py-1 rounded-lg bg-[#149eca]/20 text-[#58c4dc] border border-[#149eca]/30 text-xs font-mono font-bold">
                  {lane}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#080b11] border border-white/10 space-y-2">
              <span className="text-slate-400 font-sans font-bold text-xs block">Memoized Props:</span>
              <pre className="text-[#58c4dc] overflow-x-auto">
                {JSON.stringify(selectedFiber.memoizedProps, null, 2)}
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-[#080b11] border border-white/10 space-y-2">
              <span className="text-slate-400 font-sans font-bold text-xs block">Memoized State / Hooks Queue:</span>
              <pre className="text-emerald-400 overflow-x-auto">
                {JSON.stringify(selectedFiber.memoizedState, null, 2)}
              </pre>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 font-mono text-xs text-center">
            <div className="p-3 rounded-xl bg-[#131a29] border border-white/5">
              <span className="text-[10px] uppercase font-sans text-slate-400 block mb-1">Return (Parent)</span>
              <span className="font-bold text-white">{selectedFiber.return || 'None (Root)'}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#131a29] border border-white/5">
              <span className="text-[10px] uppercase font-sans text-slate-400 block mb-1">Child Pointer</span>
              <span className="font-bold text-purple-400">{selectedFiber.child || 'None (Leaf)'}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#131a29] border border-white/5">
              <span className="text-[10px] uppercase font-sans text-slate-400 block mb-1">Sibling Pointer</span>
              <span className="font-bold text-amber-400">{selectedFiber.sibling || 'None'}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-[#149eca]/10 border border-purple-500/20 text-xs text-slate-300 leading-relaxed">
            <strong className="text-purple-400 block mb-1">Double Buffering Explanation:</strong>
            Every Fiber node has an <code className="text-[#58c4dc]">alternate</code> property pointing to its counterpart in the previous render tree. React reuses these nodes in memory rather than allocating fresh JavaScript objects on every update!
          </div>
        </div>
      </div>
    </div>
  );
};
