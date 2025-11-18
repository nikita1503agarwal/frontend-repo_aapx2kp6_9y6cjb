import { Mountain, Map, ShieldAlert, Trophy } from 'lucide-react'

export default function Header({ onNav }) {
  return (
    <header className="relative z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow">
              <Mountain size={20} />
            </div>
            <span className="font-bold text-slate-800 text-lg">HikeIt</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-slate-700">
            <button className="inline-flex items-center gap-2 hover:text-emerald-600" onClick={() => onNav('routes')}><Map size={18}/>Rutas</button>
            <button className="inline-flex items-center gap-2 hover:text-emerald-600" onClick={() => onNav('sos')}><ShieldAlert size={18}/>SOS</button>
            <button className="inline-flex items-center gap-2 hover:text-emerald-600" onClick={() => onNav('achievements')}><Trophy size={18}/>Logros</button>
          </nav>
        </div>
      </div>
    </header>
  )
}
