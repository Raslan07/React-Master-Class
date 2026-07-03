import React from 'react';
import type { TimelineStep } from '../../types';
import { CheckCircle2, CircleDot, ChevronRight } from 'lucide-react';

interface TimelineBarProps {
  steps: TimelineStep[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
}

export const TimelineBar: React.FC<TimelineBarProps> = ({
  steps,
  currentStepIndex,
  onSelectStep,
}) => {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#149eca] animate-pulse" />
          <span>React Execution Pipeline Timeline</span>
        </h3>
        <span className="text-xs font-mono text-slate-400">
          Step {currentStepIndex + 1} of {steps.length}
        </span>
      </div>

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute top-5 left-6 right-6 h-1 bg-white/10 rounded-full z-0" />
        <div 
          className="absolute top-5 left-6 h-1 bg-gradient-to-r from-[#149eca] to-[#58c4dc] rounded-full z-0 transition-all duration-300" 
          style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
        />

        <div className="grid grid-cols-5 gap-2 relative z-10">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => onSelectStep(index)}
                className="group flex flex-col items-center text-center focus:outline-none"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? 'bg-[#149eca] text-[#0b0f19] ring-4 ring-[#149eca]/30 scale-110 shadow-lg shadow-[#149eca]/40'
                      : isCompleted
                      ? 'bg-emerald-500 text-white shadow'
                      : 'bg-[#131a29] text-slate-500 border border-white/10 group-hover:border-white/30 group-hover:text-slate-300'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isCurrent ? (
                    <CircleDot className="w-5 h-5 animate-spin-slow" />
                  ) : (
                    <span className="text-xs font-bold font-mono">{index + 1}</span>
                  )}
                </div>

                <div className="mt-3">
                  <span
                    className={`block text-xs font-bold transition-colors ${
                      isCurrent ? 'text-[#58c4dc]' : isCompleted ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="block text-[10px] text-slate-400 font-mono mt-0.5">
                    {step.phase}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Details Panel */}
      {steps[currentStepIndex] && (
        <div className="mt-6 p-4 rounded-xl bg-[#0d121c] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#149eca]/20 text-[#58c4dc] border border-[#149eca]/30">
                Phase: {steps[currentStepIndex].phase}
              </span>
              <h4 className="font-bold text-white text-base font-['Outfit']">
                {steps[currentStepIndex].title}
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              {steps[currentStepIndex].description}
            </p>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <button
              disabled={currentStepIndex === 0}
              onClick={() => onSelectStep(Math.max(0, currentStepIndex - 1))}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 transition-colors"
            >
              Previous
            </button>
            <button
              disabled={currentStepIndex === steps.length - 1}
              onClick={() => onSelectStep(Math.min(steps.length - 1, currentStepIndex + 1))}
              className="flex items-center space-x-1 px-4 py-1.5 rounded-lg bg-[#149eca] hover:bg-[#128bbc] text-xs font-bold text-[#0b0f19] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shadow-[#149eca]/20"
            >
              <span>Next Step</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
