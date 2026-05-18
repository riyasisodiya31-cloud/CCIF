const styles = {
  Active: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200',
  Critical: 'border-red-400/30 bg-red-400/10 text-red-200',
  High: 'border-orange-400/30 bg-orange-400/10 text-orange-200',
  Medium: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  Review: 'border-violet-400/30 bg-violet-400/10 text-violet-200',
  Closed: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  Cold: 'border-zinc-400/30 bg-zinc-400/10 text-zinc-200',
  Verified: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  Intact: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200',
  'Needs Review': 'border-amber-400/30 bg-amber-400/10 text-amber-200'
}

export default function StatusBadge({ value }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles[value] || styles.Active}`}>
      {value}
    </span>
  )
}
