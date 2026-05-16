import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import HoloPanel from '../components/HoloPanel.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { cases, suspects } from '../data/mockData.js'

export default function SuspectProfile() {
  const { suspectId } = useParams()
  const suspect = suspects.find((item) => item.id === suspectId)
  if (!suspect) return <div className="text-zinc-200">Suspect not found.</div>
  const linkedCases = cases.filter((item) => suspect.crimes.includes(item.id))
  const associated = suspects.filter((item) => suspect.associations.includes(item.id))

  return (
    <div className="space-y-8 pb-20 lg:pb-6">
      <PageHeader eyebrow={suspect.id} title={suspect.name} summary={`${suspect.location} / ${suspect.gang} / risk-indexed identity strand`} />

      <div className="grid gap-5 xl:grid-cols-[24rem_minmax(0,1fr)]">
        <HoloPanel className="scanline p-6">
          <div className="flex flex-col items-center">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-[2rem] border border-cyan-300/25 bg-gradient-to-br from-cyan-300/20 via-blue-500/10 to-violet-400/20 text-5xl font-black text-white shadow-[0_0_70px_rgba(34,211,238,.16)]">
              {suspect.photo}
              <span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-cyan-300 pulse-dot" />
            </div>
            <p className="mt-8 text-sm text-zinc-500">Risk gauge</p>
            <p className="text-7xl font-semibold text-white">{suspect.risk}</p>
            <div className="mt-5 h-2 w-full rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-red-300" initial={{ width: 0 }} animate={{ width: `${suspect.risk}%` }} transition={{ duration: 1 }} />
            </div>
            <div className="mt-8 w-full space-y-3 text-sm text-zinc-400">
              <p>Age <span className="text-zinc-100">{suspect.age}</span></p>
              <p>Location <span className="text-zinc-100">{suspect.location}</span></p>
              <p>Gang <span className="text-zinc-100">{suspect.gang}</span></p>
            </div>
          </div>
        </HoloPanel>

        <div className="space-y-5">
          <HoloPanel className="p-6">
            <p className="text-sm text-cyan-200">Linked crimes</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {linkedCases.map((item) => (
                <Link key={item.id} to={`/cases/${item.id}`} className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-300/25">
                  <p className="text-lg font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm text-zinc-500">{item.type} / {item.status}</p>
                </Link>
              ))}
            </div>
          </HoloPanel>

          <HoloPanel className="p-6">
            <p className="text-sm text-cyan-200">Timeline</p>
            <div className="mt-6 space-y-5">
              {['First observed near incident zone', 'Telecom metadata linked', 'Vehicle movement matched', 'Association confidence increased'].map((item, index) => (
                <motion.div key={item} className="flex gap-4" initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                  <span className="mt-1 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,.8)]" />
                  <div>
                    <p className="text-zinc-200">{item}</p>
                    <p className="mt-1 text-xs text-zinc-500">confidence event {index + 1}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </HoloPanel>

          <HoloPanel className="p-6">
            <p className="text-sm text-cyan-200">Associated suspects</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {associated.length ? associated.map((item) => <Link key={item.id} to={`/suspects/${item.id}`} className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-4 py-2 text-sm text-cyan-100">{item.name}</Link>) : <p className="text-sm text-zinc-500">No direct associations indexed.</p>}
            </div>
          </HoloPanel>
        </div>
      </div>
    </div>
  )
}
