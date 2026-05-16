import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import HoloPanel from '../components/HoloPanel.jsx'
import PageHeader from '../components/PageHeader.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { cases, evidence, suspects } from '../data/mockData.js'

export default function CaseDetail() {
  const { caseId } = useParams()
  const caseItem = cases.find((item) => item.id === caseId)
  if (!caseItem) return <div className="text-zinc-200">Case not found.</div>
  const linkedSuspects = suspects.filter((item) => caseItem.suspects.includes(item.id))
  const linkedEvidence = evidence.filter((item) => item.caseId === caseItem.id).slice(0, 10)
  const relatedCases = cases.filter((item) => caseItem.related.includes(item.id))

  return (
    <div className="space-y-8 pb-20 lg:pb-6">
      <PageHeader eyebrow={caseItem.id} title={caseItem.title} summary={caseItem.summary}>
        <StatusBadge value={caseItem.status} />
      </PageHeader>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <HoloPanel className="scanline min-h-[480px] p-7">
          <div className="grid gap-8 lg:grid-cols-[1fr_18rem]">
            <div>
              <p className="text-sm text-cyan-200">Operational summary</p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight text-white">{caseItem.type} / {caseItem.location}</h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-400">{caseItem.summary}</p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  ['Officer', caseItem.officer],
                  ['Date opened', caseItem.date],
                  ['Related cases', String(caseItem.related.length)]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-sm text-zinc-500">{label}</p>
                    <p className="mt-2 text-zinc-100">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.06] p-6">
              <motion.div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-cyan-300/25" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}>
                <span className="absolute inset-5 rounded-full border border-violet-300/20" />
                <span className="absolute inset-10 rounded-full border border-cyan-300/20" />
              </motion.div>
              <div className="-mt-32 text-center">
                <p className="text-5xl font-semibold text-white">{caseItem.trust}%</p>
                <p className="mt-2 text-sm text-zinc-400">trust score</p>
              </div>
            </div>
          </div>
        </HoloPanel>

        <HoloPanel className="p-5">
          <p className="text-sm text-cyan-200">Related fabric</p>
          <div className="mt-5 space-y-3">
            {relatedCases.length ? relatedCases.map((item) => (
              <Link key={item.id} to={`/cases/${item.id}`} className="block rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4 text-sm text-zinc-300 transition hover:border-cyan-300/25 hover:text-white">{item.title}</Link>
            )) : <p className="text-sm text-zinc-500">No related cases indexed.</p>}
          </div>
        </HoloPanel>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <HoloPanel className="p-6">
          <p className="text-sm text-cyan-200">Linked suspects</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {linkedSuspects.map((item) => (
              <Link key={item.id} to={`/suspects/${item.id}`} className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-300/25">
                <p className="font-medium text-white">{item.name}</p>
                <p className="mt-2 text-sm text-zinc-500">{item.gang}</p>
                <div className="mt-4 h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-300" style={{ width: `${item.risk}%` }} /></div>
              </Link>
            ))}
          </div>
        </HoloPanel>

        <HoloPanel className="p-6">
          <p className="text-sm text-cyan-200">Evidence strand</p>
          <div className="mt-5 grid gap-3">
            {linkedEvidence.map((item, index) => (
              <motion.div key={item.id} className="rounded-[1.25rem] border border-white/10 bg-black/[0.24] p-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-white">{item.id} / {item.type}</p>
                  <span className="text-xs text-cyan-200">{item.trust}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </HoloPanel>
      </div>
    </div>
  )
}
