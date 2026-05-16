export default function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && <p className="text-xs uppercase text-cyan-300/80">{eyebrow}</p>}
        <h2 className="mt-1 text-xl font-semibold text-white">{title}</h2>
      </div>
      {action}
    </div>
  )
}
