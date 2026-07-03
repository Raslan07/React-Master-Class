import React from 'react';
import { REACT_MODULES } from '../../constants/modules';
import { 
  Cpu, 
  Activity, 
  GitMerge, 
  Network, 
  Clock, 
  Layers, 
  LayoutTemplate,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeModuleId: string;
  onSelectModule: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeModuleId, onSelectModule }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Activity': return <Activity className="w-4 h-4" />;
      case 'GitMerge': return <GitMerge className="w-4 h-4" />;
      case 'Network': return <Network className="w-4 h-4" />;
      case 'Clock': return <Clock className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      case 'LayoutTemplate': return <LayoutTemplate className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <aside className="w-72 flex-shrink-0 border-r border-white/10 bg-[#0b0f19]/90 flex flex-col justify-between h-[calc(100vh-69px)] sticky top-[69px]">
      <div className="p-4 space-y-6 overflow-y-auto">
        <div>
          <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Curriculum Modules
          </div>
          <nav className="space-y-1">
            {REACT_MODULES.map((module) => {
              const isActive = module.id === activeModuleId;
              return (
                <button
                  key={module.id}
                  onClick={() => onSelectModule(module.id)}
                  className={`w-full group flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-left ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#149eca]/20 to-transparent border-l-4 border-[#58c4dc] text-white shadow-md shadow-[#149eca]/10' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div 
                      className={`p-2 rounded-lg transition-colors ${
                        isActive ? 'bg-[#149eca] text-[#0b0f19]' : 'bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-white/10'
                      }`}
                    >
                      {getIcon(module.iconName)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold truncate group-hover:text-[#58c4dc] transition-colors">
                        {module.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate font-medium">
                        {module.subtitle}
                      </div>
                    </div>
                  </div>
                  <ChevronRight 
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${
                      isActive ? 'text-[#58c4dc] translate-x-1' : 'opacity-0 group-hover:opacity-100'
                    }`} 
                  />
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-[#131a29] to-[#1a2336] border border-white/10 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#149eca]/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#58c4dc]" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">How to Learn</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Click step triggers in visualizers to see live changes across the Virtual DOM, Fiber Tree, and Scheduler priority lanes.
          </p>
        </div>
      </div>

      <div className="p-4 border-t border-white/10 bg-[#0d121c]">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Architecture: <strong className="text-white">Concurrent</strong></span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">Live</span>
        </div>
      </div>
    </aside>
  );
};
