import { AnimatePresence, motion } from 'framer-motion'
import { Bot, BrainCircuit, Cpu, Loader2, Mic, Send, Sparkles, Wand2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import HoloPanel from '../components/HoloPanel.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { aiService } from '../services/aiService.js'

const memories = [
  'Port theft cluster',
  'Guindy convoy escalation',
  'Synthetic identity pattern',
  'Dock access anomaly',
  'Arms cache triage'
]

const recommendations = [
  'Compare C-2401 gate logs with Ennore dock bribery windows.',
  'Prioritize associates of North Quay Syndicate with cargo access.',
  'Run device proximity over Velachery and Besant Nagar fraud clusters.'
]

export default function AICopilot() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [responses, setResponses] = useState([
    {
      prompt: 'Show theft cases near Chennai Port',
      answer: 'Detected hidden link: Arjun Varma <-> North Quay Syndicate. Three theft cases share route timing, vehicle proximity, and gate access anomalies.'
    }
  ])

  const latest = responses[responses.length - 1]
  const tokens = useMemo(() => latest.answer.split(' '), [latest.answer])

  const send = async () => {
    if (!prompt.trim() || loading) return
    const nextPrompt = prompt
    setPrompt('')
    setLoading(true)
    const response = await aiService.askCopilot(nextPrompt)
    setTimeout(() => {
      setResponses((items) => [...items, { prompt: nextPrompt, answer: response.answer.replace('Found:', 'Detected fabric pattern:') }])
      setLoading(false)
    }, 900)
  }

  return (
    <div className="space-y-8 pb-20 lg:pb-6">
      <PageHeader
        eyebrow="AI mission partner"
        title="Copilot Workspace"
        summary="A cinematic investigation console for asking, reasoning, and turning weak signals into operational recommendations."
      />

      <div className="grid min-h-[720px] gap-5 xl:grid-cols-[18rem_minmax(0,1fr)_21rem]">
        <HoloPanel className="p-5">
          <div className="flex items-center gap-3">
            <BrainCircuit className="text-cyan-200" />
            <h2 className="text-lg font-semibold text-white">Conversation Memory</h2>
          </div>
          <div className="mt-6 space-y-3">
            {memories.map((memory, index) => (
              <motion.button
                key={memory}
                className="group w-full rounded-[1.3rem] border border-white/10 bg-white/[0.035] p-4 text-left transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.07]"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ x: 4 }}
              >
                <p className="text-sm text-zinc-200">{memory}</p>
                <p className="mt-2 text-xs text-zinc-500">memory strand {index + 1}</p>
              </motion.button>
            ))}
          </div>
        </HoloPanel>

        <HoloPanel className="scanline flex min-h-[720px] flex-col overflow-hidden p-0">
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200">
                  <Bot size={23} />
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-white">CCIF Reasoning Core</h2>
                  <p className="mt-1 text-sm text-zinc-500">Streaming intelligence synthesis</p>
                </div>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.08] px-3 py-2 text-sm text-emerald-200 sm:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-300 pulse-dot" />
                neural fabric active
              </div>
            </div>
          </div>

          <div className="relative flex-1 overflow-hidden p-6">
            <div className="absolute inset-0 ambient-grid opacity-25" />
            <div className="relative z-10">
              <div className="rounded-[2rem] border border-white/10 bg-black/[0.28] p-5">
                <p className="text-sm text-zinc-500">Current query</p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight text-white">{latest.prompt}</h3>
              </div>

              <div className="mt-6 rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.045] p-6 shadow-[0_0_60px_rgba(34,211,238,.08)]">
                <div className="mb-5 flex items-center gap-3">
                  <Sparkles className="text-cyan-200" />
                  <p className="text-sm font-medium text-cyan-100">Synthesized answer</p>
                </div>
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div key="thinking" className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="flex items-center gap-3 text-cyan-100"><Loader2 className="animate-spin" size={18} /> Thinking across graph, evidence, and movement patterns...</div>
                      {[0, 1, 2].map((item) => <motion.div key={item} className="h-3 rounded-full bg-white/10" animate={{ opacity: [0.25, 0.9, 0.25] }} transition={{ repeat: Infinity, duration: 1.2, delay: item * 0.2 }} />)}
                    </motion.div>
                  ) : (
                    <motion.p key={latest.answer} className="text-2xl leading-[1.55] text-zinc-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {tokens.map((token, index) => (
                        <motion.span key={`${token}-${index}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.025 }}>
                          {token}{' '}
                        </motion.span>
                      ))}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {['3 linked cases', '2 repeat suspects', '1 shared evidence pattern'].map((item, index) => (
                  <motion.div key={item} className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + index * 0.08 }}>
                    <p className="text-sm text-zinc-400">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 p-5">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/[0.35] px-4 py-3">
              <Wand2 size={18} className="text-cyan-200" />
              <input className="min-w-0 flex-1 bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500" value={prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && send()} placeholder="Ask the fabric to expose a hidden link..." />
              <button className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-zinc-300 transition hover:text-cyan-100" aria-label="Voice input"><Mic size={16} /></button>
              <button onClick={send} className="rounded-full bg-cyan-300 p-2.5 text-zinc-950 transition hover:bg-cyan-200" aria-label="Send prompt"><Send size={17} /></button>
            </div>
          </div>
        </HoloPanel>

        <HoloPanel className="p-5">
          <div className="flex items-center gap-3">
            <Cpu className="text-cyan-200" />
            <h2 className="text-lg font-semibold text-white">Investigation Insights</h2>
          </div>
          <div className="mt-6 space-y-4">
            {recommendations.map((item, index) => (
              <motion.div
                key={item}
                className="rounded-[1.35rem] border border-violet-300/15 bg-violet-300/[0.07] p-4"
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.14 + index * 0.08 }}
                whileHover={{ x: -4 }}
              >
                <p className="text-sm leading-6 text-zinc-300">{item}</p>
              </motion.div>
            ))}
          </div>
        </HoloPanel>
      </div>
    </div>
  )
}
