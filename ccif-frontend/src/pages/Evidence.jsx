import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Fingerprint, ShieldCheck, Workflow } from 'lucide-react'
import HoloPanel from '../components/HoloPanel.jsx'
import PageHeader from '../components/PageHeader.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { getEvidence } from '../services/evidenceService.js'

export default function Evidence() {
  const [evidence, setEvidence] = useState([])

  useEffect(() => {
    getEvidence().then(setEvidence)
  }, [])

  const verified = evidence.filter((item) => item.integrity === 'Verified' || item.integrity === 'Intact').length
  return (
    <div className="space-y-8 pb-20 lg:pb-6">
      <PageHeader
        eyebrow="Evidence fabric"
        title="Custody and Trust Vault"
        summary="Evidence is rendered as a confidence field, custody path, and integrity signal map rather than a static inventory."
      >
        <div className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-4 py-2 text-sm text-emerald-100">{verified} clean custody signals</div>
      </PageHeader>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <HoloPanel className="p-6">
          <div className="flex items-center gap-3">
            <Fingerprint className="text-cyan-200" />
            <h2 className="text-xl font-semibold text-white">Evidence Confidence Field</h2>
          </div>
          <div className="relative mt-7 min-h-[540px] overflow-hidden rounded-[2rem] border border-white/10 bg-black/[0.28]">
            <div className="absolute inset-0 ambient-grid opacity-25" />
            {evidence.map((item, index) => (
              <motion.div
                key={item.id}
                className="absolute rounded-full border border-white/20 bg-cyan-300/40 shadow-[0_0_22px_rgba(34,211,238,.45)]"
                style={{
                  width: `${18 + item.trust / 3.8}px`,
                  height: `${18 + item.trust / 3.8}px`,
                  left: `${(index * 37) % 88}%`,
                  top: `${(index * 23) % 86}%`,
                  opacity: item.trust / 115
                }}
                animate={{ y: [-7, 7, -7], scale: [0.9, 1.08, 0.9] }}
                transition={{ repeat: Infinity, duration: 3.5 + (index % 7) * 0.28, delay: index * 0.02 }}
                title={`${item.id} ${item.type}`}
              />
            ))}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-sm text-zinc-400">Hover field represents trust density across the vault.</p>
            </div>
          </div>
        </HoloPanel>

        <HoloPanel className="p-6">
          <div className="flex items-center gap-3">
            <Workflow className="text-cyan-200" />
            <h2 className="text-xl font-semibold text-white">Custody Timeline</h2>
          </div>
          <div className="mt-7 space-y-6">
            {['Officer A uploaded raw media', 'Officer B verified hash integrity', 'Officer C transferred forensic bundle', 'Digital seal renewed after review'].map((item, index) => (
              <motion.div key={item} className="relative pl-8" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,.8)]" />
                {index < 3 && <span className="absolute left-[5px] top-6 h-12 w-px bg-gradient-to-b from-cyan-300/50 to-transparent" />}
                <p className="text-zinc-200">{item}</p>
                <p className="mt-1 text-xs text-zinc-500">custody checkpoint {index + 1}</p>
              </motion.div>
            ))}
          </div>
        </HoloPanel>
      </div>

      <div className="columns-1 gap-5 space-y-5 md:columns-2 2xl:columns-3">
        {evidence.slice(0, 18).map((item, index) => (
          <motion.div key={item.id} className="break-inside-avoid" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.03 }}>
            <HoloPanel className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-cyan-200">{item.id}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{item.type}</h3>
                </div>
                <StatusBadge value={item.integrity} />
              </div>
              <div className="mt-5 space-y-2 text-sm text-zinc-400">
                <p>Case <span className="text-zinc-100">{item.caseId}</span></p>
                <p>Uploaded by <span className="text-zinc-100">{item.uploadedBy}</span></p>
                <p>{item.timestamp}</p>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <ShieldCheck size={18} className="text-cyan-200" />
                <div className="flex-1">
                  <div className="h-1.5 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" style={{ width: `${item.trust}%` }} /></div>
                </div>
                <span className="text-sm text-cyan-100">{item.trust}%</span>
              </div>
            </HoloPanel>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
