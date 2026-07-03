import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface DomNodeItem {
  id: string;
  type: string;
  key: string;
  propsText: string;
  status: 'unchanged' | 'updated' | 'inserted' | 'deleted';
}

export const ReconciliationModule: React.FC = () => {
  const [treeMode, setTreeMode] = useState<'same-type' | 'diff-type' | 'key-reorder'>('same-type');

  const getTreeData = (): { oldNodes: DomNodeItem[]; newNodes: DomNodeItem[]; explanation: string } => {
    if (treeMode === 'same-type') {
      return {
        oldNodes: [
          { id: '1', type: 'div', key: 'header', propsText: 'className="card"', status: 'unchanged' },
          { id: '2', type: 'h1', key: 'title', propsText: 'text: "Hello React 18"', status: 'updated' },
          { id: '3', type: 'p', key: 'desc', propsText: 'color: "blue"', status: 'unchanged' },
        ],
        newNodes: [
          { id: '1', type: 'div', key: 'header', propsText: 'className="card"', status: 'unchanged' },
          { id: '2', type: 'h1', key: 'title', propsText: 'text: "Hello React 19"', status: 'updated' },
          { id: '3', type: 'p', key: 'desc', propsText: 'color: "blue"', status: 'unchanged' },
        ],
        explanation: 'When comparing two elements of the same type (e.g. <h1> to <h1>), React keeps the underlying DOM node and only updates the changed attributes or text content.'
      };
    } else if (treeMode === 'diff-type') {
      return {
        oldNodes: [
          { id: '1', type: 'div', key: 'box', propsText: 'className="container"', status: 'deleted' },
          { id: '2', type: 'Counter', key: 'c1', propsText: 'count={5}', status: 'deleted' },
        ],
        newNodes: [
          { id: '3', type: 'section', key: 'box', propsText: 'className="container"', status: 'inserted' },
          { id: '4', type: 'Counter', key: 'c1', propsText: 'count={0}', status: 'inserted' },
        ],
        explanation: 'Whenever the root elements change type (e.g. <div> to <section>), React destroys the old tree completely—tearing down old DOM nodes and resetting all component state inside.'
      };
    } else {
      return {
        oldNodes: [
          { id: '1', type: 'li', key: 'key="apple"', propsText: 'Item: Apple', status: 'unchanged' },
          { id: '2', type: 'li', key: 'key="banana"', propsText: 'Item: Banana', status: 'unchanged' },
        ],
        newNodes: [
          { id: '3', type: 'li', key: 'key="kiwi"', propsText: 'Item: Kiwi', status: 'inserted' },
          { id: '1', type: 'li', key: 'key="apple"', propsText: 'Item: Apple', status: 'unchanged' },
          { id: '2', type: 'li', key: 'key="banana"', propsText: 'Item: Banana', status: 'unchanged' },
        ],
        explanation: 'Keys tell React which child items match across re-renders. When inserting "Kiwi" at the top with keys, React reuses Apple and Banana DOM nodes without re-creating them.'
      };
    }
  };

  const { oldNodes, newNodes, explanation } = getTreeData();

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Core Module 2
            </span>
            <span className="text-xs text-slate-400 font-mono">Diff Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-['Outfit'] mt-1">
            Reconciliation & Virtual DOM Diffing
          </h1>
        </div>

        {/* Scenario Selector */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTreeMode('same-type')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              treeMode === 'same-type'
                ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20'
                : 'bg-[#131a29] text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            Scenario 1: Same Element Type
          </button>
          <button
            onClick={() => setTreeMode('diff-type')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              treeMode === 'diff-type'
                ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20'
                : 'bg-[#131a29] text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            Scenario 2: Different Element Type
          </button>
          <button
            onClick={() => setTreeMode('key-reorder')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              treeMode === 'key-reorder'
                ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20'
                : 'bg-[#131a29] text-slate-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            Scenario 3: List Keys Optimization
          </button>
        </div>
      </div>

      {/* Interactive Diffing Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Old Virtual Tree */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              <span>Old Virtual DOM Tree (Current Fiber)</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Previous Render</span>
          </div>

          <div className="space-y-3 pt-2">
            {oldNodes.map((node) => (
              <div
                key={node.id}
                className={`p-4 rounded-xl border flex items-center justify-between font-mono text-xs transition-all ${
                  node.status === 'deleted'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-300 opacity-60 line-through'
                    : 'bg-[#131a29] border-white/10 text-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="px-2 py-1 rounded bg-[#080b11] text-[#58c4dc] font-bold">
                    &lt;{node.type}&gt;
                  </span>
                  <span>{node.propsText}</span>
                </div>
                <span className="text-[10px] text-slate-500">{node.key}</span>
              </div>
            ))}
          </div>
        </div>

        {/* New Virtual Tree */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span>New Virtual DOM Tree (WorkInProgress)</span>
            </h3>
            <span className="text-xs font-mono text-amber-400">Current Render Output</span>
          </div>

          <div className="space-y-3 pt-2">
            {newNodes.map((node) => (
              <div
                key={node.id}
                className={`p-4 rounded-xl border flex items-center justify-between font-mono text-xs transition-all ${
                  node.status === 'inserted'
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-500/10'
                    : node.status === 'updated'
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-md shadow-amber-500/10'
                    : 'bg-[#131a29] border-white/10 text-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="px-2 py-1 rounded bg-[#080b11] text-[#58c4dc] font-bold">
                    &lt;{node.type}&gt;
                  </span>
                  <span>{node.propsText}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-slate-500">{node.key}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    node.status === 'inserted' ? 'bg-emerald-500/20 text-emerald-400' :
                    node.status === 'updated' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {node.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-[#149eca]/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h4 className="font-bold text-white text-base">Heuristic Rule Active</h4>
          </div>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            {explanation}
          </p>
        </div>
      </div>
    </div>
  );
};
