import { motion } from 'framer-motion'

export default function CrimeDomainCard({ domain, index = 0 }) {
  const Icon = domain.icon

  return (
    <motion.article
      className="glass-panel edge-glow scanline relative min-h-[290px] overflow-hidden rounded-[1.6rem] p-6"
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${domain.gradient || 'from-cyan-300/15 via-blue-400/10 to-transparent'}`} />
      <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border border-cyan-300/10 bg-cyan-300/[0.04] blur-sm" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.1] text-cyan-100 shadow-[0_0_34px_rgba(34,211,238,.14)]">
            {Icon && <Icon size={25} />}
          </span>
          <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-semibold text-cyan-100">
            {domain.crimeCode}
          </div>
        </div>

        <div className="mt-7">
          <p className="text-xs uppercase tracking-[0.26em] text-cyan-300/80">{domain.assignedUnit}</p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-white">{domain.name}</h2>
          <p className="mt-4 text-sm leading-6 text-zinc-400">{domain.description}</p>
        </div>

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-black/25 px-4 py-3">
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Priority</span>
            <span className="text-sm font-medium text-cyan-100">{domain.priorityLevel}</span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
