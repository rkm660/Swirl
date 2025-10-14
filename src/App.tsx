import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

// Pages
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Goal from './pages/Goal'
import Templates from './pages/Templates'
import Prospects from './pages/Prospects'
import Outbounds from './pages/Outbounds'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/goal" element={<Goal />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/prospects" element={<Prospects />} />
        <Route path="/outbounds" element={<Outbounds />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
