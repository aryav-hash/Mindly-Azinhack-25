import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Question = {
  id: string
  text: string
  options: { label: string; value: number }[]
}

type Section = {
  key: string
  title: string
  description: string
  color: string
  questions: Question[]
}

const likert4 = [
  { label: 'Never', value: 0 },
  { label: 'Sometimes', value: 1 },
  { label: 'Often', value: 2 },
  { label: 'Almost always', value: 3 },
]

const likert5 = [
  { label: 'Strongly disagree', value: 0 },
  { label: 'Disagree', value: 1 },
  { label: 'Neutral', value: 2 },
  { label: 'Agree', value: 3 },
  { label: 'Strongly agree', value: 4 },
]

const sections: Section[] = [
  {
    key: 'phq',
    title: 'PHQ – Depression',
    description: 'Reflect on your mood over the last 2 weeks.',
    color: 'from-rose-500 to-pink-500',
    questions: [
      { id: 'phq1', text: 'Little interest or pleasure in doing things', options: likert4 },
      { id: 'phq2', text: 'Feeling down, depressed, or hopeless', options: likert4 },
      { id: 'phq3', text: 'Trouble falling/staying asleep, or sleeping too much', options: likert4 },
    ],
  },
  {
    key: 'ghq',
    title: 'GHQ – Anxiety',
    description: 'How have worry and tension shown up recently?',
    color: 'from-sky-500 to-indigo-500',
    questions: [
      { id: 'ghq1', text: 'Felt constantly under strain', options: likert4 },
      { id: 'ghq2', text: 'Found it hard to relax', options: likert4 },
      { id: 'ghq3', text: 'Felt nervous or on edge', options: likert4 },
    ],
  },
  {
    key: 'pss',
    title: 'PSS – Stress',
    description: 'Perceived stress during the last month.',
    color: 'from-emerald-500 to-teal-500',
    questions: [
      { id: 'pss1', text: 'Been upset because of something that happened unexpectedly', options: likert4 },
      { id: 'pss2', text: 'Felt that you were unable to control important things', options: likert4 },
      { id: 'pss3', text: 'Felt difficulties were piling up so high you could not overcome them', options: likert4 },
    ],
  },
  {
    key: 'ucla',
    title: 'UCLA – Social Connection',
    description: 'Your sense of connection with others.',
    color: 'from-violet-500 to-fuchsia-500',
    questions: [
      { id: 'ucla1', text: 'I feel in tune with the people around me', options: likert5 },
      { id: 'ucla2', text: 'I feel isolated from others', options: likert5 },
      { id: 'ucla3', text: 'There are people I can talk to', options: likert5 },
    ],
  },
  {
    key: 'financial',
    title: 'Financial Stress Index',
    description: 'How finances affect your wellbeing.',
    color: 'from-amber-500 to-orange-500',
    questions: [
      { id: 'fin1', text: 'I worry about being able to make ends meet', options: likert5 },
      { id: 'fin2', text: 'Financial stress affects my focus or sleep', options: likert5 },
      { id: 'fin3', text: 'I feel confident in my budgeting', options: likert5 },
    ],
  },
  {
    key: 'academic',
    title: 'Academic Motivation Scale',
    description: 'Your motivation and engagement with studies.',
    color: 'from-lime-500 to-green-500',
    questions: [
      { id: 'acad1', text: 'I set clear study goals and follow through', options: likert5 },
      { id: 'acad2', text: 'I feel motivated to attend classes and study', options: likert5 },
      { id: 'acad3', text: 'I procrastinate on assignments', options: likert5 },
    ],
  },
]

export default function Questionnaire() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, number>>({})
  const [showSummary, setShowSummary] = useState(false)
  const [runs, setRuns] = useState<Array<{ id: string; timestamp: string; responses: Record<string, number> }>>([])

  const STORAGE_KEY = 'mindly_questionnaire_runs'
  const DRAFT_KEY = 'mindly_questionnaire_draft'

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setRuns(parsed)
      }
    } catch {}
    // Restore draft if present
    try {
      const draftRaw = localStorage.getItem(DRAFT_KEY)
      if (draftRaw) {
        const draft = JSON.parse(draftRaw)
        if (draft && typeof draft === 'object') {
          if (typeof draft.currentIndex === 'number') setCurrentIndex(draft.currentIndex)
          if (draft.responses && typeof draft.responses === 'object') setResponses(draft.responses)
          if (typeof draft.showSummary === 'boolean') setShowSummary(draft.showSummary)
        }
      }
    } catch {}
  }, [])

  // Persist draft on changes so navigation away and back restores state
  useEffect(() => {
    try {
      const draft = {
        currentIndex,
        responses,
        showSummary,
        savedAt: Date.now(),
      }
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
    } catch {}
  }, [currentIndex, responses, showSummary])

  const current = sections[currentIndex]
  const totalQuestions = useMemo(
    () => sections.reduce((acc, s) => acc + s.questions.length, 0),
    []
  )
  const answeredCount = Object.keys(responses).length
  const progressPct = Math.round((answeredCount / totalQuestions) * 100)

  const canGoNext = current.questions.every(q => responses[q.id] !== undefined)

  function setAnswer(id: string, value: number) {
    setResponses(prev => ({ ...prev, [id]: value }))
  }

  function next() {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setShowSummary(true)
      // Save this run
      const run = {
        id: String(Date.now()),
        timestamp: new Date().toISOString(),
        responses: { ...responses },
      }
      const updated = [run, ...runs].slice(0, 20) // keep last 20
      setRuns(updated)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch {}
    }
  }

  function prev() {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
  }

  function restart() {
    setResponses({})
    setCurrentIndex(0)
    setShowSummary(false)
    try { localStorage.removeItem(DRAFT_KEY) } catch {}
  }

  function clearHistory() {
    setRuns([])
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-xl border border-border p-4 bg-card">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted">Interactive Assessment</div>
            <div className="font-semibold">{current.title}</div>
          </div>
          <div className="text-sm">{answeredCount}/{totalQuestions} answered</div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-border overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showSummary ? (
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl border border-border p-4 bg-card`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold">{current.title}</div>
                <div className="text-sm text-muted">{current.description}</div>
              </div>
              <div className={`px-2 py-1 rounded text-xs text-white bg-gradient-to-r ${current.color}`}>{currentIndex + 1} / {sections.length}</div>
            </div>

            <div className="mt-4 grid gap-3">
              {current.questions.map((q, idx) => (
                <motion.div key={q.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * idx }} className="rounded-lg border border-border p-3 bg-card">
                  <div className="font-medium mb-2">{q.text}</div>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((opt) => {
                      const selected = responses[q.id] === opt.value
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setAnswer(q.id, opt.value)}
                          className={`px-3 py-1.5 rounded-md border text-sm transition ${selected ? 'bg-primary text-white border-primary' : 'btn-outline'}`}
                        >
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button onClick={prev} disabled={currentIndex === 0} className={`px-3 py-1.5 rounded-md border ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'btn-outline'}`}>Back</button>
              <button onClick={next} disabled={!canGoNext} className={`px-4 py-1.5 rounded-md ${canGoNext ? 'bg-primary text-white' : 'bg-border text-muted cursor-not-allowed'}`}>{currentIndex === sections.length - 1 ? 'Finish' : 'Next'}</button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-border p-4 bg-card"
          >
            <div className="font-semibold mb-1">Your Summary</div>
            <div className="text-sm text-muted mb-4">These quick insights are for reflection only.</div>
            <div className="grid md:grid-cols-2 gap-3">
              {sections.map((s) => {
                const sAnswered = s.questions.map(q => responses[q.id]).filter(v => v !== undefined)
                const avg = sAnswered.length ? Math.round((sAnswered.reduce((a, b) => a + b, 0) / sAnswered.length) * 100) / 100 : 0
                return (
                  <div key={s.key} className="rounded-lg border border-border p-3 bg-card">
                    <div className="font-medium">{s.title}</div>
                    <div className="text-sm">Avg score: {avg}</div>
                    <div className="mt-2 h-2 bg-border rounded-full overflow-hidden">
                      <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${sAnswered.length ? (avg / 4) * 100 : 0}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button onClick={() => setShowSummary(false)} className="px-3 py-1.5 rounded-md border btn-outline">Edit answers</button>
              <a href="/booking" className="px-3 py-1.5 rounded-md bg-primary text-white">Book a counselor</a>
              <button onClick={restart} className="px-3 py-1.5 rounded-md border btn-outline">Take questionnaire again</button>
            </div>

            {runs.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">Past runs</div>
                  <button onClick={clearHistory} className="text-xs px-2 py-1 rounded-md border btn-outline">Clear history</button>
                </div>
                <div className="grid gap-2">
                  {runs.map((r, idx) => {
                    const perSection = sections.map((s) => {
                      const vals = s.questions.map(q => r.responses[q.id]).filter(v => v !== undefined)
                      const avg = vals.length ? Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100) / 100 : 0
                      return { key: s.key, title: s.title, avg }
                    })
                    const ts = new Date(r.timestamp)
                    return (
                      <div key={r.id} className="rounded-lg border border-border p-3 bg-card">
                        <div className="text-sm text-muted">Run {runs.length - idx} • {ts.toLocaleString()}</div>
                        <div className="mt-2 grid md:grid-cols-3 gap-2 text-sm">
                          {perSection.map(ps => (
                            <div key={ps.key} className="rounded border border-border px-2 py-1 bg-card">
                              <div className="truncate font-medium">{ps.title}</div>
                              <div>Avg: {ps.avg}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-xs text-muted">
        This is not a diagnosis. If you are in crisis, please reach out to a professional or a trusted helpline.
      </div>
    </div>
  )
}


