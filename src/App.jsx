import { useState } from 'react'
import Header from './components/Header'
import RoutesCatalog from './components/RoutesCatalog'
import SosPanel from './components/SosPanel'
import Achievements from './components/Achievements'

function App() {
  const [view, setView] = useState('routes')

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <Header onNav={setView} />
      {view === 'routes' && <RoutesCatalog />}
      {view === 'sos' && <SosPanel />}
      {view === 'achievements' && <Achievements />}
      <footer className="text-center text-slate-500 text-sm py-10">HikeIt • Prototipo</footer>
    </div>
  )
}

export default App
