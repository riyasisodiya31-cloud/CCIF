import { motion } from 'framer-motion'
import { ArrowRightLeft, BrainCircuit, UsersRound } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import HoloPanel from '../components/HoloPanel.jsx'
import OfficerPanel from '../components/OfficerPanel.jsx'
import { officers as fallbackOfficers } from '../data/mockOfficers.js'
import { getOfficers } from '../services/officerService.js'

export default function Officers() {
  const [officers, setOfficers] = useState(fallbackOfficers)

  useEffect(() => {
    async function loadOfficers() {
      const data = await getOfficers()
      setOfficers(data.length ? data : fallbackOfficers)
    }

    loadOfficers()
  }, [])

  const overloaded = useMemo(() => officers.filter((officer) => officer.currentLoad >= 80), [officers])
  const available = useMemo(() => officers.filter((officer) => officer.currentLoad < 65), [officers])

  return (
    <div className="space-y-8 pb-20 lg:pb-6">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_28rem]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Officer Assignment Matrix</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
            Mission-control unit deployment
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
            Crime-specific teams are mapped to current caseload, specialization, and availability for focused operational response.
          </p>
        </motion.div>

        <HoloPanel className="p-6" delay={0.08}>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-100">
              <BrainCircuit size={20} />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Future AI Workload Balancing</p>
              <h2 className="text-xl font-semibold text-white">Suggested reassignment</h2>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {overloaded.slice(0, 2).map((officer, index) => {
              const target = available[index % Math.max(available.length, 1)]
              return (
                <div key={officer.id} className="rounded-2xl border border-white/[0.08] bg-black/25 p-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                    <ArrowRightLeft size={14} />
                    Load signal
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    Shift one {officer.assignedCrime} field review from {officer.name} to {target?.name || 'available unit standby'}.
                  </p>
                </div>
              )
            })}
            {!overloaded.length && (
              <p className="rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.08] p-4 text-sm text-emerald-100">
                All active unit loads are within operational tolerance.
              </p>
            )}
          </div>
        </HoloPanel>
      </section>

      <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {officers.map((officer, index) => (
          <OfficerPanel key={officer.id} officer={officer} index={index} />
        ))}
      </section>

      <HoloPanel className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-100">
              <UsersRound size={20} />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Command Readout</p>
              <h2 className="text-xl font-semibold text-white">{officers.length} specialized officers online</h2>
            </div>
          </div>
          <p className="text-sm text-zinc-400">{available.length} units currently below 65% workload.</p>
        </div>
      </HoloPanel>
    </div>
  )
}
