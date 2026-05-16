import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HoloPanel from '../components/HoloPanel.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { suspects } from '../data/mockData.js'

export default function Suspects() {
  const highRisk = suspects.filter((item) => item.risk >= 80)
  return (
    <div className="space-y-8 pb-20 lg:pb-6">
      <PageHeader
        eyebrow="Identity resolution"
        title="Suspect Constellation"
        summary="Persons of interest are arranged as risk-bearing entities with associations, affiliations, and movement context."
      >
        <div className="rounded-full border border-red-300/20 bg-red-300/[0.08] px-4 py-2 text-sm text-red-100">{highRisk.length} high risk entities</div>
      </PageHeader>

      <div className="columns-1 gap-5 space-y-5 md:columns-2 2xl:columns-3">
        {suspects.map((item, index) => (
          <motion.div key={item.id} className="break-inside-avoid" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.035 }}>
            <Link to={`/suspects/${item.id}`} className="block">
              <HoloPanel className={`p-5 ${item.risk >= 85 ? 'min-h-[23rem]' : item.risk >= 70 ? 'min-h-[19rem]' : 'min-h-[16rem]'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.3rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/20 via-blue-400/15 to-violet-400/20 text-lg font-black text-white">
                      {item.photo}
                      <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-cyan-300 pulse-dot" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">{item.name}</h2>
                      <p className="mt-1 text-sm text-zinc-500">{item.id} / age {item.age}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-semibold text-cyan-100">{item.risk}</p>
                    <p className="text-xs text-zinc-500">risk</p>
                  </div>
                </div>
                <div className="mt-7 h-2 rounded-full bg-white/10">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-red-300" initial={{ width: 0 }} whileInView={{ width: `${item.risk}%` }} viewport={{ once: true }} transition={{ duration: 0.9 }} />
                </div>
                <div className="mt-6 space-y-3 text-sm">
                  <p className="text-zinc-400">Gang affiliation <span className="text-zinc-100">{item.gang}</span></p>
                  <p className="text-zinc-400">Location <span className="text-zinc-100">{item.location}</span></p>
                  <p className="text-zinc-400">Known associations <span className="text-zinc-100">{item.associations.length}</span></p>
                </div>
              </HoloPanel>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
