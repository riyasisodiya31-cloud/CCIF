import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, BadgeCheck, CalendarDays, Fingerprint, Gauge, MapPin, Save, ShieldCheck, UserRound } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import HoloPanel from '../components/HoloPanel.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { createCase } from '../services/caseService.js'

const crimeTypes = ['Cargo Theft', 'Cyber Fraud', 'Assault', 'Smuggling', 'Burglary', 'Extortion', 'Arson', 'Financial Crime', 'Corruption', 'Weapons', 'Auto Theft']
const statuses = ['Active', 'Critical', 'Review', 'Closed', 'Cold']

function generateCaseId() {
  const bytes = new Uint16Array(1)
  if (window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(bytes)
    return `C-${String(1000 + (bytes[0] % 9000)).padStart(4, '0')}`
  }
  return `C-${Math.floor(1000 + Math.random() * 9000)}`
}

const today = new Date().toISOString().slice(0, 10)

export default function AddCase() {
  const navigate = useNavigate()
  const generatedId = useMemo(() => generateCaseId(), [])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    id: generatedId,
    title: '',
    type: crimeTypes[0],
    location: '',
    officer: '',
    status: 'Active',
    date: today,
    trust: 75,
    summary: ''
  })

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const payload = {
      ...form,
      title: form.title.trim(),
      location: form.location.trim(),
      officer: form.officer.trim(),
      summary: form.summary.trim(),
      trust: Number(form.trust)
    }

    if (!payload.title || !payload.location || !payload.officer || !payload.summary) {
      setError('Complete the required case details before saving.')
      return
    }

    setSaving(true)
    const created = await createCase(payload)
    setSaving(false)
    navigate(`/cases/${created.id}`)
  }

  return (
    <div className="space-y-8 pb-20 lg:pb-6">
      <PageHeader eyebrow="Case Intake" title="Add Investigation" summary="Register a new case with a generated case ID and the operational details needed by the intelligence fabric.">
        <Link to="/cases" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-200 transition hover:border-cyan-300/30 hover:text-cyan-100">
          <ArrowLeft size={17} />
          Back
        </Link>
      </PageHeader>

      <form onSubmit={handleSubmit} className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <HoloPanel as="div" className="p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <Field icon={Fingerprint} label="Case ID">
              <input className="field-input font-mono text-cyan-100" value={form.id} readOnly />
            </Field>

            <Field icon={BadgeCheck} label="Status">
              <select className="field-input" value={form.status} onChange={(event) => updateField('status', event.target.value)}>
                {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </Field>

            <Field icon={ShieldCheck} label="Case Title" className="md:col-span-2">
              <input className="field-input" value={form.title} onChange={(event) => updateField('title', event.target.value)} placeholder="Harbor Container Theft" required />
            </Field>

            <Field icon={Gauge} label="Crime Type">
              <select className="field-input" value={form.type} onChange={(event) => updateField('type', event.target.value)}>
                {crimeTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </Field>

            <Field icon={CalendarDays} label="Date Opened">
              <input className="field-input" type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} required />
            </Field>

            <Field icon={MapPin} label="Location">
              <input className="field-input" value={form.location} onChange={(event) => updateField('location', event.target.value)} placeholder="Chennai Port" required />
            </Field>

            <Field icon={UserRound} label="Officer">
              <input className="field-input" value={form.officer} onChange={(event) => updateField('officer', event.target.value)} placeholder="ACP R. Iyer" required />
            </Field>

            <div className="md:col-span-2">
              <div className="flex items-center justify-between gap-4">
                <label className="text-sm text-zinc-300">Trust Score</label>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1 text-sm text-cyan-100">{form.trust}%</span>
              </div>
              <input className="mt-4 w-full accent-cyan-300" type="range" min="0" max="100" value={form.trust} onChange={(event) => updateField('trust', event.target.value)} />
            </div>

            <Field icon={ShieldCheck} label="Operational Summary" className="md:col-span-2">
              <textarea className="field-input min-h-36 resize-y leading-7" value={form.summary} onChange={(event) => updateField('summary', event.target.value)} placeholder="Capture the incident pattern, key indicators, and current intelligence posture." required />
            </Field>
          </div>

          {error && <p className="mt-5 rounded-2xl border border-red-300/20 bg-red-300/[0.08] px-4 py-3 text-sm text-red-100">{error}</p>}

          <div className="mt-7 flex justify-end">
            <motion.button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60" whileTap={{ scale: 0.97 }}>
              <Save size={17} />
              {saving ? 'Saving' : 'Save Case'}
            </motion.button>
          </div>
        </HoloPanel>

        <HoloPanel as="aside" className="p-6">
          <p className="text-sm text-cyan-200">Case Packet</p>
          <div className="mt-6 space-y-4">
            <PreviewItem label="Identifier" value={form.id} />
            <PreviewItem label="Classification" value={form.type} />
            <PreviewItem label="Lead officer" value={form.officer || 'Unassigned'} />
            <PreviewItem label="Location" value={form.location || 'Pending'} />
            <PreviewItem label="Opened" value={form.date} />
          </div>
          <div className="mt-7 rounded-[1.4rem] border border-cyan-300/15 bg-cyan-300/[0.06] p-5 text-center">
            <p className="text-5xl font-semibold text-white">{form.trust}%</p>
            <p className="mt-2 text-sm text-zinc-400">initial trust score</p>
          </div>
        </HoloPanel>
      </form>
    </div>
  )
}

function Field({ icon: Icon, label, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 flex items-center gap-2 text-sm text-zinc-300">
        <Icon size={16} className="text-cyan-200" />
        {label}
      </span>
      {children}
    </label>
  )
}

function PreviewItem({ label, value }) {
  return (
    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase text-zinc-500">{label}</p>
      <p className="mt-2 text-sm text-zinc-100">{value}</p>
    </div>
  )
}
