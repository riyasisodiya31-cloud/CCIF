import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  FileSearch,
  Gauge,
  Mic,
  Network,
  Search,
  ShieldAlert,
  UserRoundSearch
} from 'lucide-react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { alerts, activityFeed } from '../data/mockData.js'

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: Gauge },
  { label: 'Investigations', to: '/cases', icon: BriefcaseBusiness },
  { label: 'Suspects', to: '/suspects', icon: UserRoundSearch },
  { label: 'Evidence', to: '/evidence', icon: FileSearch },
  { label: 'Graph', to: '/graph', icon: Network },
  { label: 'Copilot', to: '/copilot', icon: Bot },
  { label: 'Alerts', to: '/alerts', icon: ShieldAlert }
]

const streamItems = [
  ...alerts.map((item) => ({
    title: item.title,
    meta: `${item.location} / ${item.time}`,
    severity: item.severity
  })),
  ...activityFeed.map((item, index) => ({
    title: item,
    meta: `fabric event 0${index + 1}`,
    severity: index % 2 ? 'Medium' : 'High'
  }))
]

export default function Layout() {
  const location = useLocation()

  return (
    <div className="aurora-shell min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 ambient-grid opacity-70" />
      <div className="pointer-events-none fixed inset-0 noise-overlay" />
      <ParticleField />

      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-[5.5rem_minmax(0,1fr)] 2xl:grid-cols-[5.5rem_minmax(0,1fr)_24rem]">
        <IntelligenceRail />

        <div className="min-w-0 px-4 pb-8 pt-24 sm:px-6 lg:px-8">
          <CommandBar />
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(10px)' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.main>
          </AnimatePresence>
        </div>

        <LiveStream />
      </div>
    </div>
  )
}

function IntelligenceRail() {
  return (
    <motion.aside
      className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-zinc-950/80 p-2 shadow-[0_20px_70px_rgba(0,0,0,.55)] backdrop-blur-2xl lg:sticky lg:bottom-auto lg:left-auto lg:top-0 lg:h-screen lg:translate-x-0 lg:flex-col lg:justify-center lg:rounded-none lg:border-r lg:border-t-0 lg:bg-zinc-950/[0.36]"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.55 }}
    >
      <NavLink to="/dashboard" className="mb-0 hidden h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-200 shadow-[0_0_34px_rgba(34,211,238,.18)] lg:flex" aria-label="CCIF home">
        <BrainCircuit size={24} />
      </NavLink>
      <div className="flex items-center gap-2 lg:mt-8 lg:flex-col">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className="group relative" aria-label={item.label}>
            {({ isActive }) => (
              <motion.span
                className={`relative flex h-11 w-11 items-center justify-center rounded-2xl border transition lg:h-12 lg:w-12 ${
                  isActive
                    ? 'border-cyan-300/35 bg-cyan-300/[0.12] text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,.22)]'
                    : 'border-white/[0.08] bg-white/[0.035] text-zinc-500 hover:border-cyan-300/[0.24] hover:text-cyan-100'
                }`}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="rail-active-indicator"
                    className="absolute -left-1 hidden h-7 w-1 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,.8)] lg:block"
                  />
                )}
                <item.icon size={20} />
                <span className="pointer-events-none absolute left-14 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-zinc-950/[0.92] px-3 py-1.5 text-xs text-zinc-200 opacity-0 shadow-2xl backdrop-blur-xl transition group-hover:opacity-100 lg:block">
                  {item.label}
                </span>
              </motion.span>
            )}
          </NavLink>
        ))}
      </div>
    </motion.aside>
  )
}

function CommandBar() {
  return (
    <motion.header
      className="fixed left-4 right-4 top-4 z-30 lg:left-[7rem] 2xl:right-[25rem]"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, delay: 0.1 }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 rounded-full border border-white/10 bg-zinc-950/[0.62] px-3 py-2 shadow-[0_18px_70px_rgba(0,0,0,.45)] backdrop-blur-2xl">
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2.5">
          <Search size={18} className="shrink-0 text-cyan-200" />
          <input className="min-w-0 flex-1 bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500" placeholder="Search suspects, cases, evidence..." />
          <button className="hidden rounded-full border border-white/10 bg-white/[0.04] p-2 text-zinc-300 transition hover:text-cyan-100 sm:block" aria-label="Voice command">
            <Mic size={16} />
          </button>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-3 py-2 text-xs text-emerald-200 md:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-300 pulse-dot" />
          AI online
        </div>
        <button className="rounded-full border border-white/10 bg-white/[0.04] p-3 text-zinc-300 transition hover:text-cyan-100" aria-label="Notifications">
          <Bell size={17} />
        </button>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-blue-400 to-violet-400 text-sm font-black text-zinc-950">
          SI
        </div>
      </div>
    </motion.header>
  )
}

function LiveStream() {
  return (
    <motion.aside
      className="relative hidden min-h-screen border-l border-white/[0.08] bg-zinc-950/[0.32] px-4 py-6 backdrop-blur-2xl 2xl:block"
      initial={{ x: 24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.55, delay: 0.12 }}
    >
      <div className="sticky top-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-cyan-300/80">Live Fabric</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Intelligence Stream</h2>
          </div>
          <span className="h-3 w-3 rounded-full bg-cyan-300 pulse-dot" />
        </div>
        <div className="thin-scroll max-h-[calc(100vh-9rem)] space-y-3 overflow-y-auto pr-1">
          {streamItems.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
              className="glass-panel-soft edge-glow rounded-2xl p-4"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * index, duration: 0.35 }}
              whileHover={{ x: -4, borderColor: 'rgba(34,211,238,.28)' }}
            >
              <div className="flex items-center gap-2 text-[10px] uppercase text-zinc-500">
                <span className={`h-2 w-2 rounded-full ${item.severity === 'Critical' ? 'bg-red-300' : item.severity === 'High' ? 'bg-cyan-300' : 'bg-violet-300'}`} />
                {item.severity}
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-200">{item.title}</p>
              <p className="mt-2 text-xs text-zinc-500">{item.meta}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.aside>
  )
}

function ParticleField() {
  const particles = Array.from({ length: 34 }, (_, index) => ({
    id: index,
    left: `${(index * 29) % 100}%`,
    top: `${(index * 47) % 100}%`,
    delay: (index % 9) * 0.35,
    duration: 7 + (index % 6)
  }))

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1 w-1 rounded-full bg-cyan-200/40 shadow-[0_0_18px_rgba(34,211,238,.6)]"
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [-14, 16, -14], opacity: [0.12, 0.8, 0.12], scale: [0.8, 1.35, 0.8] }}
          transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
