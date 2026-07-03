import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mermaid: ['mermaid'],
          visualizers: [
            './src/components/visualizers/RenderingVisualizer',
            './src/components/visualizers/ReconciliationVisualizer',
            './src/components/visualizers/FiberTreeVisualizer',
            './src/components/visualizers/SchedulerSimulator',
            './src/components/visualizers/RenderPhaseSimulator',
            './src/components/visualizers/CommitPhaseSimulator',
            './src/components/visualizers/LaneVisualizer',
          ],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})