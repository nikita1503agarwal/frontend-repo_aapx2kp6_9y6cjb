import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function SosPanel() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [note, setNote] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const trigger = async () => {
    setLoading(true)
    setStatus(null)
    try {
      let coords = { lat: 0, lon: 0 }
      try {
        const pos = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 5000 }))
        coords = { lat: pos.coords.latitude, lon: pos.coords.longitude }
      } catch (_) {}

      const res = await fetch(`${baseUrl}/api/sos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 'demo-user', note, ...coords })
      })
      const data = await res.json()
      if (res.ok) setStatus({ ok: true, message: 'SOS enviado', id: data.id })
      else setStatus({ ok: false, message: data.detail || 'Error' })
    } catch (e) {
      setStatus({ ok: false, message: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-white/70 backdrop-blur border rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-3">Botón SOS</h2>
        <p className="text-sm text-slate-600 mb-4">En caso de emergencia, envía tu ubicación y una nota a los contactos de emergencia.</p>
        <textarea value={note} onChange={e=>setNote(e.target.value)} className="w-full border rounded-lg p-3 mb-4" placeholder="Nota opcional" rows={3} />
        <button disabled={loading} onClick={trigger} className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl">
          <AlertTriangle size={20}/> {loading ? 'Enviando...' : 'Enviar SOS'}
        </button>
        {status && (
          <div className={`mt-4 text-sm ${status.ok ? 'text-emerald-700' : 'text-red-700'}`}>{status.message}</div>
        )}
      </div>
    </section>
  )
}
