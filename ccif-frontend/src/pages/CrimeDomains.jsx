import { motion } from 'framer-motion'
import { Crosshair, Fingerprint, ShieldAlert } from 'lucide-react'
import { useEffect, useState } from 'react'
import CrimeDomainCard from '../components/CrimeDomainCard.jsx'
import HoloPanel from '../components/HoloPanel.jsx'
import { crimeCategories as fallbackCategories } from '../data/mockCrimeCategories.js'
import { getCrimeCategories } from '../services/crimeService.js'

export default function CrimeDomains() {
  const [domains, setDomains] = useState(fallbackCategories)

  useEffect(() => {
    async function loadDomains() {
      const data = await getCrimeCategories()
      setDomains(data.length ? data : fallbackCategories)
    }

    loadDomains()
  }, [])

  return (
    <div className="space-y-8 pb-20 lg:pb-6">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Crime Coverage Domain</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
            Specialized criminal intelligence lanes
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
            CCIF intake is restricted to operational categories with assigned investigative units, priority posture, and code-based case generation.
          </p>
        </motion.div>

        <HoloPanel className="p-6" delay={0.08}>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-100">
              <ShieldAlert size={20} />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Scope Lock</p>
              <h2 className="text-xl font-semibold text-white">{domains.length} supported domains</h2>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <ScopeStat icon={Crosshair} value="100%" label="intake filtered" />
            <ScopeStat icon={Fingerprint} value="ID" label="auto-coded" />
          </div>
        </HoloPanel>
      </section>

      <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {domains.map((domain, index) => (
          <CrimeDomainCard key={domain.id || domain.crimeCode} domain={domain} index={index} />
        ))}
      </section>
    </div>
  )
}

function ScopeStat({ icon: Icon, value, label }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-black/25 p-4">
      <Icon size={18} className="text-cyan-200" />
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-500">{label}</p>
    </div>
  )
}
