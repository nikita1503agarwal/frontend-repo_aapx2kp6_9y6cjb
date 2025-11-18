import { useEffect, useState } from 'react'
import { Trophy } from 'lucide-react'

export default function Achievements() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${baseUrl}/api/achievements/demo-user`)
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"><Trophy size={20}/> Logros</h2>
      {loading ? (
        <p className="text-slate-600">Cargando...</p>
      ) : items.length === 0 ? (
        <p className="text-slate-600">Aún no hay logros desbloqueados.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-4">
          {items.map((a) => (
            <li key={a.id} className="border rounded-xl p-4 bg-white/70 backdrop-blur">
              <div className="font-semibold text-slate-800">{a.title}</div>
              <div className="text-sm text-slate-600">{a.description}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
