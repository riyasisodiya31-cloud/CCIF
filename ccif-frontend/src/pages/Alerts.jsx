import L from 'leaflet'
import { motion } from 'framer-motion'
import { AlertTriangle, RadioTower, Siren } from 'lucide-react'
import { useEffect, useRef } from 'react'
import HoloPanel from '../components/HoloPanel.jsx'
import PageHeader from '../components/PageHeader.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { alerts, locations } from '../data/mockData.js'

export default function Alerts() {
  const mapRef = useRef(null)
  const hostRef = useRef(null)

  useEffect(() => {
    if (!hostRef.current || mapRef.current) return
    mapRef.current = L.map(hostRef.current, { zoomControl: false }).setView([13.04, 80.22], 11)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(mapRef.current)
    locations.forEach((item) => {
      L.circleMarker([item.lat, item.lng], {
        radius: 14 + item.severity / 10,
        color: '#22d3ee',
        fillColor: item.severity > 90 ? '#fb7185' : '#22d3ee',
        fillOpacity: 0.28,
        weight: 2
      }).addTo(mapRef.current).bindPopup(`${item.name}: severity ${item.severity}`)
    })
    setTimeout(() => mapRef.current?.invalidateSize(), 120)
    return () => {
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div className="space-y-8 pb-20 lg:pb-6">
      <PageHeader
        eyebrow="Threat warning"
        title="Live Alert Theater"
        summary="A warning surface for emerging hotspots, repeated regional patterns, and live signal confidence."
      >
        <div className="rounded-full border border-red-300/20 bg-red-300/[0.08] px-4 py-2 text-sm text-red-100">2 critical watch zones</div>
      </PageHeader>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <HoloPanel className="overflow-hidden p-0">
          <div className="relative h-[620px]">
            <div ref={hostRef} className="absolute inset-0 grayscale invert-[0.93] hue-rotate-180 saturate-[0.55]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/[0.35]" />
            <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-zinc-950/70 px-4 py-2 text-sm text-cyan-100 backdrop-blur-xl">
              Chennai operational heat surface
            </div>
            <div className="absolute bottom-6 left-6 right-6 grid gap-3 md:grid-cols-3">
              {locations.slice(0, 3).map((item) => (
                <div key={item.name} className="rounded-[1.2rem] border border-white/10 bg-zinc-950/[0.68] p-4 backdrop-blur-xl">
                  <p className="text-sm text-white">{item.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">severity {item.severity}</p>
                </div>
              ))}
            </div>
          </div>
        </HoloPanel>

        <HoloPanel className="p-6">
          <div className="flex items-center gap-3">
            <RadioTower className="text-cyan-200" />
            <h2 className="text-xl font-semibold text-white">Live Feed</h2>
          </div>
          <div className="mt-6 space-y-3">
            {alerts.concat(alerts.slice(0, 2)).map((item, index) => (
              <motion.div key={`${item.id}-${index}`} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <Siren size={16} className={item.severity === 'Critical' ? 'text-red-300' : 'text-cyan-200'} />
                  <StatusBadge value={item.severity} />
                </div>
                <p className="text-sm leading-6 text-zinc-200">{item.title}</p>
                <p className="mt-2 text-xs text-zinc-500">{item.location} / {item.time}</p>
              </motion.div>
            ))}
          </div>
        </HoloPanel>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {alerts.slice(0, 3).map((item, index) => (
          <HoloPanel key={item.id} className="p-6" delay={index * 0.06}>
            <div className="flex items-start justify-between gap-4">
              <AlertTriangle className={item.severity === 'Critical' ? 'text-red-300' : 'text-cyan-200'} />
              <span className="text-3xl font-semibold text-white">{item.signal}</span>
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm text-zinc-500">{item.location} / {item.time}</p>
            <div className="mt-5 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-red-300" style={{ width: `${item.signal}%` }} /></div>
          </HoloPanel>
        ))}
      </div>
    </div>
  )
}
