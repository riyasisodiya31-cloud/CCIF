import { motion } from 'framer-motion'
import { RadioTower, ShieldCheck } from 'lucide-react'

export default function OfficerPanel({ officer, index = 0 }) {
  const pressure = officer.currentLoad >= 85 ? 'from-red-300 to-amber-200' : officer.currentLoad >= 70 ? 'from-amber-200 to-cyan-200' : 'from-cyan-300 to-emerald-200'

  return (
    <motion.article
      className="glass-panel-soft edge-glow rounded-[1.35rem] p-5"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.09] text-lg font-semibold text-cyan-100">
            {officer.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-white">{officer.name}</h2>
            <p className="mt-1 text-sm text-zinc-500">{officer.rank}</p>
          </div>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-cyan-100">
          {officer.availability}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <Signal label="Unit" value={officer.assignedUnit} icon={RadioTower} />
        <Signal label="Role" value={officer.role} icon={ShieldCheck} />
      </div>

      <div className="mt-5 rounded-2xl border border-white/[0.08] bg-black/25 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Crime Specialization</p>
        <p className="mt-2 text-sm leading-6 text-zinc-300">{officer.assignedCrime}</p>
        <p className="mt-1 text-xs text-zinc-500">{officer.specialization}</p>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="uppercase tracking-[0.2em] text-zinc-500">Workload</span>
          <span className="text-cyan-100">{officer.currentLoad}% / {officer.activeCases} active</span>
        </div>
        <div className="h-2 rounded-full bg-white/10">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${pressure}`}
            initial={{ width: 0 }}
            animate={{ width: `${officer.currentLoad}%` }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.04 }}
          />
        </div>
      </div>
    </motion.article>
  )
}

function Signal({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-zinc-500">
        <Icon size={14} className="text-cyan-200" />
        {label}
      </div>
      <p className="mt-2 text-sm leading-5 text-zinc-200">{value}</p>
    </div>
  )
}
