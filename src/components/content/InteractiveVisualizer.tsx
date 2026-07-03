import { useState, useCallback } from 'react'
import { cn } from '../../utils/cn'

interface VisualizerControlsProps {
  onPlay: () => void
  onPause: () => void
  onStep: () => void
  onReset: () => void
  onSpeedChange: (speed: number) => void
  isPlaying: boolean
  speed: number
  step: number
  totalSteps: number
  className?: string
}

export function VisualizerControls({
  onPlay,
  onPause,
  onStep,
  onReset,
  onSpeedChange,
  isPlaying,
  speed,
  step,
  totalSteps,
  className,
}: VisualizerControlsProps) {
  return (
    <div className={cn('visualizer-controls flex flex-wrap items-center gap-2', className)}>
      <button
        onClick={isPlaying ? onPause : onPlay}
        className="visualizer-btn visualizer-btn-primary"
        disabled={step >= totalSteps && isPlaying}
      >
        {isPlaying ? '⏸ Pause' : step >= totalSteps ? '🔄 Restart' : '▶ Play'}
      </button>
      <button
        onClick={onStep}
        className="visualizer-btn visualizer-btn-secondary"
        disabled={isPlaying || step >= totalSteps}
      >
        ⏭ Step
      </button>
      <button
        onClick={onReset}
        className="visualizer-btn visualizer-btn-secondary"
      >
        ↺ Reset
      </button>

      <div className="flex items-center gap-2 ml-auto">
        <label className="text-sm text-gray-600 dark:text-gray-400">Speed:</label>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-32 accent-primary-600"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400 w-10 text-right">{speed.toFixed(1)}x</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        Step <span className="font-mono">{step}</span> / <span className="font-mono">{totalSteps}</span>
      </div>
    </div>
  )
}

interface VisualizerPanelProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function VisualizerPanel({ title, children, className }: VisualizerPanelProps) {
  return (
    <div className={cn('bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4', className)}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
      <div>{children}</div>
    </div>
  )
}

interface VisualizerLegendProps {
  items: Array<{ color: string; label: string; shape?: 'circle' | 'square' | 'line' }>
  className?: string
}

export function VisualizerLegend({ items, className }: VisualizerLegendProps) {
  return (
    <div className={cn('flex flex-wrap gap-4 text-sm', className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          >
          <div
            className={cn(
              'w-3 h-3 rounded',
              item.shape === 'circle' && 'rounded-full',
              item.shape === 'line' && 'w-6 h-0.5 rounded-none'
            )}
            style={{ backgroundColor: item.color }}
          />
          <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export function useVisualizerState(totalSteps: number, initialSpeed = 1) {
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(initialSpeed)
  const animationRef = useRef<number>()

  const play = useCallback(() => {
    if (step >= totalSteps) return
    setIsPlaying(true)
    animate()
  }, [step, totalSteps])

  const pause = useCallback(() => {
    setIsPlaying(false)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const stepForward = useCallback(() => {
    if (step < totalSteps) {
      setStep(s => Math.min(s + 1, totalSteps))
    }
  }, [step, totalSteps])

  const reset = useCallback(() => {
    pause()
    setStep(0)
  }, [pause])

  const animate = useCallback(() => {
    if (!isPlaying || step >= totalSteps) {
      setIsPlaying(false)
      return
    }

    const delay = 1000 / speed
    animationRef.current = setTimeout(() => {
      setStep(s => {
        const next = s + 1
        if (next >= totalSteps) {
          setIsPlaying(false)
          return totalSteps
        }
        return next
      })
    }, delay)
  }, [isPlaying, step, totalSteps, speed])

  return { step, isPlaying, speed, play, pause, stepForward, reset, setSpeed }
}

import { useRef } from 'react'