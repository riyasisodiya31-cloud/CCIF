import { ArrowUpRight } from 'lucide-react'

export default function MetricCard({ icon: Icon, label, value, trend }) {
  return (
    <div className="glass relative overflow-hidden rounded-lg p-5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-400">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-normal text-white">{value}</p>
        </div>
        <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200 shadow-glow">
          <Icon size={22} />
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 text-sm text-emerald-300">
        <ArrowUpRight size={16} />
        <span>{trend}</span>
      </div>
    </div>
  )
}
