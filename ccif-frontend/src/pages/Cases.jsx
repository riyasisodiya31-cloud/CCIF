import { motion } from 'framer-motion'
import { Calendar, Filter, MapPin, Search, Shield } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import HoloPanel from '../components/HoloPanel.jsx'
import PageHeader from '../components/PageHeader.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { cases } from '../data/mockData.js'

export default function Cases() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const filtered = useMemo(() => cases.filter((item) => {
    const text = `${item.title} ${item.type} ${item.location} ${item.officer}`.toLowerCase()
    return text.includes(query.toLowerCase()) && (status === 'All' || item.status === status)
  }), [query, status])

  return (
    <div className="space-y-8 pb-20 lg:pb-6">
      <PageHeader
        eyebrow="Investigation fabric"
        title="Active Investigation Space"
        summary="Cases appear as operational strands with trust, location, officer ownership, and relationship pressure rather than spreadsheet rows."
      >
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 pulse-dot" />
          {filtered.length} visible strands
        </div>
      </PageHeader>

      <HoloPanel className="p-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <label className="flex flex-1 items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-3">
            <Search size={17} className="text-cyan-200" />
            <input className="min-w-0 flex-1 bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search investigation fabric..." />
          </label>
          <label className="flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-3 text-zinc-300">
            <Filter size={17} className="text-cyan-200" />
            <select className="bg-transparent text-sm text-zinc-100 outline-none" value={status} onChange={(event) => setStatus(event.target.value)}>
              {['All', 'Active', 'Review', 'Critical', 'Closed', 'Cold'].map((item) => <option key={item} className="bg-zinc-950">{item}</option>)}
            </select>
          </label>
        </div>
      </HoloPanel>

      <div className="relative">
        <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-cyan-300/40 via-violet-300/20 to-transparent md:block" />
        <div className="space-y-5">
          {filtered.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.045 }}>
              <Link to={`/cases/${item.id}`} className="group relative block md:pl-16">
                <span className="absolute left-[1.15rem] top-8 hidden h-4 w-4 rounded-full border border-cyan-200 bg-zinc-950 shadow-[0_0_18px_rgba(34,211,238,.75)] md:block" />
                <div className="glass-panel edge-glow rounded-[1.7rem] p-5 transition duration-300 group-hover:-translate-y-1 group-hover:border-cyan-300/25">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-xs text-cyan-100">{item.id}</span>
                        <StatusBadge value={item.status} />
                      </div>
                      <h2 className="mt-4 text-2xl font-semibold text-white">{item.title}</h2>
                      <p className="mt-3 text-sm leading-6 text-zinc-400">{item.summary}</p>
                    </div>
                    <div className="grid min-w-[18rem] gap-3 text-sm text-zinc-300">
                      <span className="flex items-center gap-2"><Shield size={16} className="text-cyan-200" />{item.type}</span>
                      <span className="flex items-center gap-2"><MapPin size={16} className="text-cyan-200" />{item.location}</span>
                      <span className="flex items-center gap-2"><Calendar size={16} className="text-cyan-200" />{item.date}</span>
                      <span className="text-zinc-500">Officer <span className="text-zinc-200">{item.officer}</span></span>
                    </div>
                  </div>
                  <div className="mt-5 h-1.5 rounded-full bg-white/10">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-300" initial={{ width: 0 }} animate={{ width: `${item.trust}%` }} transition={{ duration: 0.85, delay: index * 0.04 }} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
