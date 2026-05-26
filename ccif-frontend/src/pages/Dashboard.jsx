import cytoscape from 'cytoscape'
import { motion } from 'framer-motion'
import { Activity, BrainCircuit, Crosshair, Radar, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import HoloPanel from '../components/HoloPanel.jsx'
import { alerts as fallbackAlerts, cases as fallbackCases, evidence as fallbackEvidence, graphData as fallbackGraphData, locations } from '../data/mockData.js'
import { getAlerts } from '../services/alertService.js'
import { getCases } from '../services/caseService.js'
import { getDashboardStats } from '../services/dashboardService.js'
import { getEvidence } from '../services/evidenceService.js'
import { graphService } from '../services/graphService.js'

export default function Dashboard() {
  const [cases, setCases] = useState(fallbackCases)
  const [alerts, setAlerts] = useState(fallbackAlerts)
  const [evidence, setEvidence] = useState(fallbackEvidence)
  const [graph, setGraph] = useState(fallbackGraphData)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadDashboard() {
      const [statsData, casesData, alertsData, evidenceData, graphData] = await Promise.all([
        getDashboardStats(),
        getCases(),
        getAlerts(),
        getEvidence(),
        graphService.getGraph()
      ])

      if (cancelled) return

      setStats(statsData)
      setCases(casesData.length ? casesData : fallbackCases)
      setAlerts(alertsData.length ? alertsData : fallbackAlerts)
      setEvidence(evidenceData.length ? evidenceData : fallbackEvidence)
      setGraph(graphData?.nodes?.length ? graphData : fallbackGraphData)
    }

    loadDashboard()
    return () => { cancelled = true }
  }, [])

  const summary = useMemo(() => [
    { value: String(stats?.criticalCases ?? cases.filter((item) => item.status === 'Critical').length), label: 'critical investigations indexed' },
    { value: String(stats?.activeCases ?? cases.filter((item) => item.status === 'Active').length), label: 'active cases synchronized' },
    { value: String(stats?.activeAlerts ?? alerts.length), label: 'active threat alerts' }
  ], [alerts.length, cases, stats])

  return (
    <div className="space-y-8 pb-20 lg:pb-6">
      <section className="grid min-h-[620px] items-center gap-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(460px,0.75fr)]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-4 py-2 text-sm text-cyan-100 shadow-[0_0_34px_rgba(34,211,238,.12)]">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 pulse-dot" />
            Live fabric synchronized
          </div>
          <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[0.92] text-white sm:text-7xl xl:text-8xl">
            Cognitive Criminal Intelligence Fabric
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
            A connected intelligence surface that turns isolated records into living criminal networks, risk signals, and investigation pathways.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {summary.map((item, index) => (
              <motion.div
                key={item.label}
                className="glass-panel-soft rounded-3xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <div className="text-4xl font-semibold text-cyan-100">{item.value}</div>
                <p className="mt-2 text-sm leading-5 text-zinc-400">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="relative" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
          <NetworkPreview graphData={graph} />
        </motion.div>
      </section>

      <section className="columns-1 gap-5 space-y-5 xl:columns-2 2xl:columns-3">
        <ThreatRadar />
        <CrimeHeatmap />
        <InvestigationTimeline cases={cases} />
        <LiveAlertsModule alerts={alerts} />
        <AiInsights />
        <TrustConstellation evidence={evidence} />
      </section>
    </div>
  )
}

function NetworkPreview({ graphData }) {
  const ref = useRef(null)
  const cyRef = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    cyRef.current?.destroy()
    cyRef.current = null

    const elements = [
      ...graphData.nodes.slice(0, 22),
      ...graphData.edges.slice(0, 32).filter((edge) => {
        const ids = new Set(graphData.nodes.slice(0, 22).map((node) => node.data.id))
        return ids.has(edge.data.source) && ids.has(edge.data.target)
      })
    ]
    cyRef.current = cytoscape({
      container: ref.current,
      elements,
      userZoomingEnabled: false,
      userPanningEnabled: false,
      autoungrabify: true,
      style: [
        {
          selector: 'node',
          style: {
            width: (node) => 18 + (node.data('risk') || 50) / 5,
            height: (node) => 18 + (node.data('risk') || 50) / 5,
            'background-color': (node) => node.data('type') === 'suspect' ? '#22d3ee' : node.data('type') === 'case' ? '#8b5cf6' : '#60a5fa',
            'border-width': 1,
            'border-color': 'rgba(255,255,255,.45)'
          }
        },
        {
          selector: 'edge',
          style: {
            width: 1.2,
            'line-color': 'rgba(34,211,238,.32)',
            'target-arrow-color': 'rgba(34,211,238,.48)',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            opacity: 0.72
          }
        }
      ],
      layout: { name: 'cose', animate: true, animationDuration: 1200, idealEdgeLength: 95, nodeRepulsion: 6800 }
    })
    const interval = setInterval(() => {
      cyRef.current?.edges().forEach((edge, index) => {
        edge.style('line-color', index % 3 === 0 ? 'rgba(168,85,247,.55)' : 'rgba(34,211,238,.36)')
        setTimeout(() => edge.style('line-color', 'rgba(34,211,238,.32)'), 500)
      })
    }, 1800)
    return () => {
      clearInterval(interval)
      cyRef.current?.destroy()
      cyRef.current = null
    }
  }, [graphData])

  return (
    <div className="glass-panel edge-glow scanline relative h-[540px] overflow-hidden rounded-[2.25rem] p-4 shadow-[0_0_90px_rgba(34,211,238,.12)]">
      <div className="absolute left-6 top-6 z-10 rounded-full border border-white/10 bg-black/[0.35] px-4 py-2 text-sm text-cyan-100 backdrop-blur-xl">
        Criminal network preview
      </div>
      <div ref={ref} className="h-full w-full" />
      <motion.div
        className="absolute bottom-6 right-6 rounded-3xl border border-violet-300/20 bg-violet-300/[0.08] p-4 backdrop-blur-xl"
        animate={{ y: [0, -8, 0], opacity: [0.72, 1, 0.72] }}
        transition={{ repeat: Infinity, duration: 3.2 }}
      >
        <p className="text-xs text-zinc-400">Relationship pulse</p>
        <p className="mt-1 text-2xl font-semibold text-violet-100">147 links</p>
      </motion.div>
    </div>
  )
}

function ThreatRadar() {
  const rings = [84, 64, 43]
  return (
    <HoloPanel className="mb-5 inline-block w-full break-inside-avoid p-6">
      <PanelTitle icon={Radar} label="Threat Radar" />
      <div className="relative mx-auto mt-7 flex aspect-square max-w-[360px] items-center justify-center rounded-full border border-cyan-300/10 bg-black/25">
        {[0, 1, 2, 3].map((ring) => <span key={ring} className="absolute rounded-full border border-cyan-300/15" style={{ inset: `${ring * 12 + 8}%` }} />)}
        <motion.span className="absolute h-1/2 w-px origin-bottom bg-gradient-to-t from-cyan-300 to-transparent" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 5.5, ease: 'linear' }} />
        {rings.map((value, index) => (
          <motion.span
            key={value}
            className="absolute h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_22px_rgba(34,211,238,.9)]"
            style={{ left: `${34 + index * 18}%`, top: `${24 + index * 18}%` }}
            animate={{ scale: [1, 1.55, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.7 + index * 0.45 }}
          />
        ))}
        <div className="text-center">
          <p className="text-5xl font-semibold text-white">86</p>
          <p className="mt-1 text-sm text-zinc-500">threat index</p>
        </div>
      </div>
    </HoloPanel>
  )
}

function CrimeHeatmap() {
  return (
    <HoloPanel className="mb-5 inline-block w-full break-inside-avoid p-6">
      <PanelTitle icon={Crosshair} label="Crime Heatmap" />
      <div className="mt-6 grid grid-cols-7 gap-2">
        {Array.from({ length: 42 }, (_, index) => {
          const intensity = [0.12, 0.18, 0.26, 0.38, 0.58, 0.76][(index * 7 + index) % 6]
          return (
            <motion.div
              key={index}
              className="aspect-square rounded-xl border border-white/5"
              style={{ background: `rgba(34, 211, 238, ${intensity})` }}
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ repeat: Infinity, duration: 2.8 + (index % 5), delay: index * 0.02 }}
            />
          )
        })}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {locations.map((item) => <span key={item.name} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300">{item.name} {item.severity}</span>)}
      </div>
    </HoloPanel>
  )
}

function InvestigationTimeline({ cases }) {
  return (
    <HoloPanel className="mb-5 inline-block w-full break-inside-avoid p-6">
      <PanelTitle icon={Activity} label="Active Investigations" />
      <div className="mt-6 space-y-5">
        {cases.slice(0, 5).map((item, index) => (
          <motion.div key={item.id} className="flex gap-4" initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
            <div className="flex flex-col items-center">
              <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,.8)]" />
              {index < 4 && <span className="mt-2 h-12 w-px bg-gradient-to-b from-cyan-300/50 to-transparent" />}
            </div>
            <div>
              <p className="font-medium text-white">{item.title}</p>
              <p className="mt-1 text-sm text-zinc-500">{item.location} / trust {item.trust}%</p>
            </div>
          </motion.div>
        ))}
      </div>
    </HoloPanel>
  )
}

function LiveAlertsModule({ alerts }) {
  return (
    <HoloPanel className="mb-5 inline-block w-full break-inside-avoid p-6">
      <PanelTitle icon={Zap} label="Live Alerts" />
      <div className="mt-5 space-y-3">
        {alerts.map((item, index) => (
          <motion.div key={item.id} className="rounded-2xl border border-white/[0.08] bg-black/25 p-4" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-zinc-200">{item.title}</p>
              <span className="text-xs text-cyan-200">{item.signal}%</span>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-300" initial={{ width: 0 }} whileInView={{ width: `${item.signal}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
            </div>
          </motion.div>
        ))}
      </div>
    </HoloPanel>
  )
}

function AiInsights() {
  return (
    <HoloPanel className="mb-5 inline-block w-full break-inside-avoid p-6">
      <PanelTitle icon={Sparkles} label="AI Insights" />
      <div className="mt-6 space-y-4">
        {[
          'Hidden link detected between harbor theft routes and dock bribery access logs.',
          'Two repeat suspects share device proximity across separate cyber fraud cases.',
          'Avadi arms cache requires immediate cross-check against Guindy convoy pattern.'
        ].map((item, index) => (
          <motion.div key={item} className="rounded-3xl border border-cyan-300/15 bg-cyan-300/[0.06] p-4 text-sm leading-6 text-zinc-300" animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 4 + index, delay: index * 0.4 }}>
            {item}
          </motion.div>
        ))}
      </div>
    </HoloPanel>
  )
}

function TrustConstellation({ evidence }) {
  return (
    <HoloPanel className="mb-5 inline-block w-full break-inside-avoid p-6">
      <PanelTitle icon={ShieldCheck} label="Trust Score Fabric" />
      <div className="relative mt-8 h-72 overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-black/25">
        {evidence.slice(0, 32).map((item, index) => (
          <motion.span
            key={item.id}
            className="absolute rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(34,211,238,.7)]"
            style={{
              width: `${6 + item.trust / 11}px`,
              height: `${6 + item.trust / 11}px`,
              left: `${(index * 31) % 92}%`,
              top: `${(index * 47) % 86}%`,
              opacity: item.trust / 110
            }}
            animate={{ y: [-5, 5, -5], scale: [0.9, 1.25, 0.9] }}
            transition={{ repeat: Infinity, duration: 3 + (index % 6) * 0.35 }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
          <p className="text-4xl font-semibold text-white">{Math.round(evidence.reduce((sum, item) => sum + item.trust, 0) / evidence.length)}%</p>
          <p className="mt-1 text-sm text-zinc-400">average evidence confidence</p>
        </div>
      </div>
    </HoloPanel>
  )
}

function PanelTitle({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200">
        <Icon size={19} />
      </span>
      <h2 className="text-lg font-semibold text-white">{label}</h2>
    </div>
  )
}
