import React, { useState, useEffect } from 'react';
import { Cpu, Terminal, Sparkles, Code2, BookOpen, Activity } from 'lucide-react';

interface NavbarProps {
  activeModuleId: string;
  onSelectModule: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeModuleId, onSelectModule }) => {
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState(38.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.floor(58 + Math.random() * 3));
      setMemory(Number((37.8 + Math.random() * 1.5).toFixed(1)));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div 
          onClick={() => onSelectModule('overview')}
          className="flex items-center space-x-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#149eca] to-[#087ea4] p-0.5 shadow-lg shadow-[#149eca]/20 flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-[#58c4dc] animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight text-white font-['Outfit']">React<span className="text-[#58c4dc]">Internals</span></span>
              <span className="text-[10px] uppercase font-bold bg-[#149eca]/20 text-[#58c4dc] px-2 py-0.5 rounded-full border border-[#149eca]/40">v19 Core</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Interactive Architecture Visualizer</p>
          </div>
        </div>
      </div>

      {/* DevTools Mock Status Bar */}
      <div className="hidden md:flex items-center space-x-6 px-4 py-1.5 rounded-full bg-[#0d121c]/80 border border-white/5 text-xs font-mono">
        <div className="flex items-center space-x-2 text-emerald-400">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>FPS: <strong className="text-white">{fps}</strong></span>
        </div>
        <div className="w-px h-3 bg-white/10" />
        <div className="flex items-center space-x-2 text-[#58c4dc]">
          <Terminal className="w-3.5 h-3.5" />
          <span>Heap: <strong className="text-white">{memory} MB</strong></span>
        </div>
        <div className="w-px h-3 bg-white/10" />
        <div className="flex items-center space-x-2 text-amber-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Module: <strong className="text-white uppercase">{activeModuleId}</strong></span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <a
          href="https://react.dev/learn"
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#58c4dc]" />
          <span>React Docs</span>
        </a>
        <div className="h-6 w-px bg-white/10" />
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#149eca]/20 to-purple-500/20 border border-[#149eca]/30 text-xs font-semibold text-[#58c4dc]">
          <Code2 className="w-3.5 h-3.5" />
          <span>Interactive Playground Active</span>
        </div>
      </div>
    </header>
  );
};
