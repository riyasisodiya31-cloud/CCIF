import { motion } from 'framer-motion'

export default function PageHeader({ eyebrow, title, summary, children }) {
  return (
    <motion.div
      className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl">
        {eyebrow && <p className="text-xs uppercase text-cyan-300/80">{eyebrow}</p>}
        <h1 className="mt-3 text-4xl font-semibold leading-[0.98] tracking-normal text-white sm:text-5xl xl:text-6xl">{title}</h1>
        {summary && <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">{summary}</p>}
      </div>
      {children}
    </motion.div>
  )
}
