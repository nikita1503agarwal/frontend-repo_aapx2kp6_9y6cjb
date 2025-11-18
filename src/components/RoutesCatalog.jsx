import { useEffect, useState } from 'react'
import { MapPin, TrendingUp, Search } from 'lucide-react'

export default function RoutesCatalog() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({ difficulty: '', region: '' })

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const loadRoutes = async () => {
    setLoading(true)
    try {
      const qs = new URLSearchParams()
      if (filters.difficulty) qs.set('difficulty', filters.difficulty)
      if (filters.region) qs.set('region', filters.region)
      const res = await fetch(`${baseUrl}/api/routes?${qs.toString()}`)
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadRoutes() }, [])

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm text-slate-600 mb-1">Dificultad</label>
          <select value={filters.difficulty} onChange={e=>setFilters({ ...filters, difficulty: e.target.value })} className="w-full border rounded-lg px-3 py-2">
            <option value="">Todas</option>
            <option value="easy">Fácil</option>
            <option value="moderate">Media</option>
            <option value="hard">Difícil</option>
            <option value="expert">Experto</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm text-slate-600 mb-1">Región</label>
          <input value={filters.region} onChange={e=>setFilters({ ...filters, region: e.target.value })} placeholder="Ej. Pirineos" className="w-full border rounded-lg px-3 py-2" />
        </div>
        <button onClick={loadRoutes} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"><Search size={18}/>Buscar</button>
      </div>

      {loading ? (
        <p className="text-slate-600">Cargando rutas...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((r) => (
            <article key={r.id} className="rounded-xl border bg-white/70 backdrop-blur hover:shadow-md transition p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-slate-800">{r.name}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">{r.difficulty}</span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-3 mb-3">{r.description}</p>
              <div className="flex items-center text-sm text-slate-700 gap-4">
                <span className="inline-flex items-center gap-1"><MapPin size={16}/> {r.region || '—'}</span>
                <span className="inline-flex items-center gap-1"><TrendingUp size={16}/> {r.elevation_gain_m} m</span>
                <span>{r.distance_km} km</span>
              </div>
            </article>
          ))}
          {items.length === 0 && (
            <div className="text-slate-600">No hay rutas disponibles todavía.</div>
          )}
        </div>
      )}
    </section>
  )
}
