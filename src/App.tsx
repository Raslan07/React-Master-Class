import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { OverviewModule } from './features/overview/OverviewModule';
import { RenderingModule } from './features/rendering/RenderingModule';
import { ReconciliationModule } from './features/reconciliation/ReconciliationModule';
import { FiberModule } from './features/fiber/FiberModule';
import { SchedulerModule } from './features/scheduler/SchedulerModule';
import { LanesModule } from './features/lanes/LanesModule';
import { CommitPhaseModule } from './features/commit-phase/CommitPhaseModule';
import type { ModuleId } from './types';

export function App() {
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>('overview');

  const handleSelectModule = (id: string) => {
    setActiveModuleId(id as ModuleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveModule = () => {
    switch (activeModuleId) {
      case 'overview':
        return <OverviewModule onNavigate={handleSelectModule} />;
      case 'rendering':
        return <RenderingModule />;
      case 'reconciliation':
        return <ReconciliationModule />;
      case 'fiber':
        return <FiberModule />;
      case 'scheduler':
        return <SchedulerModule />;
      case 'lanes':
        return <LanesModule />;
      case 'commit-phase':
        return <CommitPhaseModule />;
      default:
        return <OverviewModule onNavigate={handleSelectModule} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080b11] text-[#f0f4f8] antialiased selection:bg-[#149eca]/30 selection:text-white">
      {/* Top Navbar */}
      <Navbar activeModuleId={activeModuleId} onSelectModule={handleSelectModule} />

      <div className="flex flex-1 relative max-w-[1600px] w-full mx-auto">
        {/* Sidebar Curriculum Navigation */}
        <div className="hidden lg:block">
          <Sidebar activeModuleId={activeModuleId} onSelectModule={handleSelectModule} />
        </div>

        {/* Main Content Workspace */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 py-8 overflow-y-auto">
          {renderActiveModule()}
        </main>
      </div>
    </div>
  );
}

export default App;
