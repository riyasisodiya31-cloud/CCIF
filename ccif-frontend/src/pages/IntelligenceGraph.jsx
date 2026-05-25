import cytoscape from 'cytoscape'
import { AnimatePresence, motion } from 'framer-motion'
import { Crosshair, LocateFixed, Maximize2, Minus, Plus, Search, SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { graphService } from '../services/graphService.js'

const nodeTypes = ['suspect', 'case', 'evidence', 'location', 'gang']
const relationships = ['INVOLVED_IN', 'HAS_EVIDENCE', 'ASSOCIATED_WITH', 'AFFILIATED_WITH', 'LOCATED_AT']
const colors = {
  suspect: '#22d3ee',
  case: '#8b5cf6',
  evidence: '#34d399',
  location: '#fbbf24',
  gang: '#fb7185'
}

export default function IntelligenceGraph() {
  const containerRef = useRef(null)
  const cyRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [enabledTypes, setEnabledTypes] = useState(nodeTypes)
  const [enabledRelationships, setEnabledRelationships] = useState(relationships)
  const [search, setSearch] = useState('')
  const [time, setTime] = useState(78)
  const [elements, setElements] = useState([])

  useEffect(() => {
    graphService.getGraph().then(({ nodes, edges }) => {
      setElements([...nodes, ...edges])
    })
  }, [])

  useEffect(() => {
    if (!containerRef.current || elements.length === 0) return
    cyRef.current?.destroy()
    cyRef.current = null
    cyRef.current = cytoscape({
      container: containerRef.current,
      elements,
      minZoom: 0.18,
      maxZoom: 3,
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            color: '#e4e4e7',
            'font-size': 9,
            'text-wrap': 'wrap',
            'text-max-width': 92,
            'text-valign': 'bottom',
            'text-margin-y': 9,
            width: (node) => 24 + (node.data('risk') || 50) / 4.7,
            height: (node) => 24 + (node.data('risk') || 50) / 4.7,
            'background-color': (node) => colors[node.data('type')] || '#22d3ee',
            'border-width': 1,
            'border-color': 'rgba(255,255,255,.44)'
          }
        },
        {
          selector: 'edge',
          style: {
            label: 'data(label)',
            color: 'rgba(228,228,231,.64)',
            'font-size': 7,
            width: 1.4,
            'line-color': 'rgba(34,211,238,.25)',
            'target-arrow-color': 'rgba(34,211,238,.42)',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            opacity: 0.75
          }
        },
        { selector: '.dim', style: { opacity: 0.08 } },
        {
          selector: 'node.focus',
          style: {
            opacity: 1,
            'border-width': 4,
            'border-color': '#ffffff'
          }
        },
        {
          selector: 'edge.focus',
          style: {
            opacity: 1,
            'line-color': '#22d3ee',
            'target-arrow-color': '#22d3ee',
            width: 4
          }
        }
      ],
      layout: {
        name: 'cose',
        animate: true,
        animationDuration: 1200,
        idealEdgeLength: 130,
        nodeRepulsion: 9000,
        nestingFactor: 1.2
      }
    })

    cyRef.current.on('tap', 'node', (event) => focusNode(event.target))
    cyRef.current.on('tap', (event) => {
      if (event.target === cyRef.current) clearFocus()
    })

    return () => {
      cyRef.current?.destroy()
      cyRef.current = null
    }
  }, [elements])

  useEffect(() => {
    if (!cyRef.current) return
    cyRef.current.nodes().forEach((node) => {
      node.style('display', enabledTypes.includes(node.data('type')) ? 'element' : 'none')
    })
    cyRef.current.edges().forEach((edge) => {
      const relationshipVisible = enabledRelationships.includes(edge.data('label'))
      const nodesVisible = edge.source().style('display') !== 'none' && edge.target().style('display') !== 'none'
      edge.style('display', relationshipVisible && nodesVisible ? 'element' : 'none')
      edge.style('opacity', Math.max(0.18, time / 100))
    })
  }, [enabledRelationships, enabledTypes, time])

  const focusNode = (node) => {
    const data = node.data()
    setSelected(data)
    const neighborhood = node.closedNeighborhood()
    cyRef.current.elements().addClass('dim').removeClass('focus')
    neighborhood.removeClass('dim').addClass('focus')
    cyRef.current.animate({ center: { eles: node }, zoom: Math.max(cyRef.current.zoom(), 1.05) }, { duration: 450 })
  }

  const clearFocus = () => {
    setSelected(null)
    cyRef.current?.elements().removeClass('dim focus')
  }

  const locate = () => {
    if (!search.trim() || !cyRef.current) return
    const match = cyRef.current.nodes().filter((node) => node.data('label').toLowerCase().includes(search.toLowerCase()) || node.id().toLowerCase().includes(search.toLowerCase()))
    if (match.length > 0) focusNode(match[0])
  }

  const zoom = (direction) => {
    if (!cyRef.current) return
    const current = cyRef.current.zoom()
    cyRef.current.animate({ zoom: direction === 'in' ? current * 1.18 : current / 1.18 }, { duration: 220 })
  }

  return (
    <div className="relative -mx-2 min-h-[calc(100vh-7rem)] overflow-hidden rounded-[2rem] border border-white/10 bg-black/70 shadow-[0_0_120px_rgba(34,211,238,.08)]">
      <div className="absolute inset-0 ambient-grid opacity-30" />
      <div ref={containerRef} className="absolute inset-0" />

      <motion.div className="absolute left-5 top-5 z-10 max-w-xl" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-sm text-cyan-200">Full-spectrum criminal network</p>
        <h1 className="mt-2 text-4xl font-semibold leading-tight text-white sm:text-5xl">Intelligence Graph</h1>
      </motion.div>

      <motion.div className="absolute right-5 top-5 z-20 flex flex-wrap items-center justify-end gap-2" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <button className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-zinc-200 backdrop-blur-xl transition hover:text-cyan-100" onClick={() => zoom('out')} aria-label="Zoom out"><Minus size={18} /></button>
        <button className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-zinc-200 backdrop-blur-xl transition hover:text-cyan-100" onClick={() => zoom('in')} aria-label="Zoom in"><Plus size={18} /></button>
        <button className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-zinc-200 backdrop-blur-xl transition hover:text-cyan-100" onClick={() => cyRef.current?.fit(undefined, 80)} aria-label="Fit graph"><Maximize2 size={18} /></button>
      </motion.div>

      <motion.div className="absolute bottom-5 left-5 z-20 w-[min(92vw,31rem)] rounded-[1.5rem] border border-white/10 bg-zinc-950/[0.68] p-4 shadow-2xl backdrop-blur-2xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3">
          <Search size={17} className="text-cyan-200" />
          <input className="min-w-0 flex-1 bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500" value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && locate()} placeholder="Locate suspect, case, evidence..." />
          <button onClick={locate} className="rounded-full bg-cyan-300 px-3 py-1.5 text-xs font-semibold text-zinc-950">Locate</button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {nodeTypes.map((type) => (
            <button key={type} onClick={() => setEnabledTypes((items) => items.includes(type) ? items.filter((item) => item !== type) : [...items, type])} className={`rounded-full border px-3 py-1.5 text-xs capitalize transition ${enabledTypes.includes(type) ? 'border-cyan-300/35 bg-cyan-300/[0.1] text-cyan-100' : 'border-white/10 bg-black/25 text-zinc-500'}`}>
              {type}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div className="absolute bottom-5 right-5 z-20 hidden w-[22rem] rounded-[1.5rem] border border-white/10 bg-zinc-950/[0.68] p-4 shadow-2xl backdrop-blur-2xl xl:block" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
        <div className="flex items-center gap-2 text-zinc-200"><SlidersHorizontal size={17} className="text-cyan-200" /> Relationship controls</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {relationships.map((relationship) => (
            <button key={relationship} onClick={() => setEnabledRelationships((items) => items.includes(relationship) ? items.filter((item) => item !== relationship) : [...items, relationship])} className={`rounded-full border px-3 py-1.5 text-[11px] transition ${enabledRelationships.includes(relationship) ? 'border-violet-300/35 bg-violet-300/[0.1] text-violet-100' : 'border-white/10 bg-black/25 text-zinc-500'}`}>
              {relationship}
            </button>
          ))}
        </div>
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs text-zinc-500"><span>Timeline density</span><span>{time}%</span></div>
          <input className="w-full" type="range" value={time} min="25" max="100" onChange={(event) => setTime(Number(event.target.value))} />
        </div>
      </motion.div>

      <AnimatePresence>
        {selected && <NodeDrawer node={selected} onClose={clearFocus} />}
      </AnimatePresence>

      <motion.div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 text-cyan-200/45 md:block" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}>
        <Crosshair size={84} strokeWidth={0.7} />
      </motion.div>
    </div>
  )
}

function NodeDrawer({ node, onClose }) {
  const suspect = suspects.find((item) => item.id === node.id)
  const caseItem = cases.find((item) => item.id === node.id)
  const evidenceItem = evidence.find((item) => item.id === node.id)
  const title = suspect?.name || caseItem?.title || evidenceItem?.type || node.label
  const linkedCases = suspect ? cases.filter((item) => suspect.crimes.includes(item.id)) : []
  const linkedEvidence = caseItem ? evidence.filter((item) => item.caseId === caseItem.id).slice(0, 4) : []

  return (
    <motion.aside
      className="absolute bottom-5 right-5 top-24 z-30 w-[min(92vw,27rem)] rounded-[1.75rem] border border-cyan-300/20 bg-zinc-950/[0.82] p-5 shadow-[0_0_70px_rgba(34,211,238,.2)] backdrop-blur-2xl"
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 80, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 28 }}
    >
      <button className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/[0.04] p-2 text-zinc-300" onClick={onClose} aria-label="Close node drawer"><X size={16} /></button>
      <div className="pr-10">
        <p className="text-sm capitalize text-cyan-200">{node.type}</p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-white">{title}</h2>
      </div>
      <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center gap-3">
          <LocateFixed className="text-cyan-200" />
          <div>
            <p className="text-sm text-zinc-500">Risk score</p>
            <p className="text-4xl font-semibold text-white">{node.risk || suspect?.risk || caseItem?.trust || evidenceItem?.trust || 72}</p>
          </div>
        </div>
        <div className="mt-4 h-2 rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-300" style={{ width: `${node.risk || suspect?.risk || caseItem?.trust || evidenceItem?.trust || 72}%` }} />
        </div>
      </div>

      <div className="thin-scroll mt-5 max-h-[calc(100%-15rem)] space-y-4 overflow-y-auto pr-1">
        {suspect && (
          <>
            <IntelBlock title="Profile" lines={[`Age ${suspect.age}`, `Gang ${suspect.gang}`, `Location ${suspect.location}`]} />
            <IntelBlock title="Linked crimes" lines={linkedCases.map((item) => item.title)} />
            <IntelBlock title="Associates" lines={suspect.associations} />
          </>
        )}
        {caseItem && (
          <>
            <IntelBlock title="Case profile" lines={[caseItem.summary, `Officer ${caseItem.officer}`, `Status ${caseItem.status}`]} />
            <IntelBlock title="Evidence" lines={linkedEvidence.map((item) => `${item.id} ${item.type}`)} />
          </>
        )}
        {evidenceItem && <IntelBlock title="Evidence profile" lines={[`Case ${evidenceItem.caseId}`, `Uploaded by ${evidenceItem.uploadedBy}`, `Integrity ${evidenceItem.integrity}`]} />}
        {!suspect && !caseItem && !evidenceItem && <IntelBlock title="Entity" lines={[`Type ${node.type}`, `Network signal ${node.risk || 76}`, 'Connected to active investigation fabric']} />}
      </div>
    </motion.aside>
  )
}

function IntelBlock({ title, lines }) {
  return (
    <div className="rounded-[1.3rem] border border-white/10 bg-black/[0.22] p-4">
      <p className="mb-3 text-sm font-medium text-cyan-100">{title}</p>
      <div className="space-y-2">
        {lines.length ? lines.map((line) => <p key={line} className="text-sm leading-6 text-zinc-400">{line}</p>) : <p className="text-sm text-zinc-500">No indexed links.</p>}
      </div>
    </div>
  )
}
