import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { TopicPage } from './pages/TopicPage'
import { VisualizerPage } from './pages/VisualizerPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="topic/:partId" element={<TopicPage />} />
        <Route path="visualizer/:visualizerId" element={<VisualizerPage />} />
      </Route>
    </Routes>
  )
}

export default App