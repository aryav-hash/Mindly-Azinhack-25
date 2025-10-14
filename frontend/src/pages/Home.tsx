import { useEffect, useMemo, useState } from 'react'

const QUOTES = [
  { t: 'Small steps every day lead to big changes.', a: 'Mindly' },
  { t: 'You are doing better than you think.', a: 'Mindly' },
  { t: 'Pause. Breathe. Proceed.', a: 'Mindly' },
  { t: 'It’s okay to ask for help.', a: 'Mindly' },
  { t: 'Progress, not perfection.', a: 'Mindly' },
]

type MoodEntry = { ts: number; mood: string; note?: string }
const MOOD_KEY = 'mindly-moods-v1'

export default function Home() {
  const [quote, setQuote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)])
  const [moods, setMoods] = useState<MoodEntry[]>([])
  const [mood, setMood] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    try { setMoods(JSON.parse(localStorage.getItem(MOOD_KEY) || '[]')) } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem(MOOD_KEY, JSON.stringify(moods))
  }, [moods])

  function newQuote() {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)])
  }

  function addMood(e: React.FormEvent) {
    e.preventDefault()
    if (!mood) return
    setMoods(prev => [...prev, { ts: Date.now(), mood, note: note.trim() || undefined }])
    setMood('')
    setNote('')
  }

  function clearMoods() {
    if (!confirm('Clear all mood entries stored on this device?')) return
    setMoods([])
  }

  const recent = useMemo(() => [...moods].slice(-10).reverse(), [moods])

  return (
    <div>
      <section className="card">
        <h1 className="text-2xl font-bold">Welcome to Mindly</h1>
        <p className="subtitle">A calm space for students to care for their mental health and well-being.</p>
        <div className="flex gap-2 flex-wrap">
          <a className="btn" href="/chatbot">Try the Chatbot</a>
          <a className="btn btn-outline" href="/resources">Explore Resources</a>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold">Daily Motivation</h2>
        <blockquote className="my-2">
          <span>{quote.t}</span>
          <cite className="block subtitle">— {quote.a}</cite>
        </blockquote>
        <button onClick={newQuote} className="btn btn-ghost">New quote</button>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold">Mood Tracker</h2>
        <form onSubmit={addMood} className="space-y-3">
          <div>
            <label className="font-semibold" htmlFor="mood">How are you feeling today?</label>
            <select id="mood" value={mood} onChange={e=>setMood(e.target.value)}>
              <option value="">Select a mood…</option>
              <option>Great</option>
              <option>Good</option>
              <option>Okay</option>
              <option>Stressed</option>
              <option>Overwhelmed</option>
            </select>
          </div>
          <div>
            <label className="font-semibold" htmlFor="note">Want to jot a quick note?</label>
            <textarea id="note" rows={4} placeholder="A short journal entry (stored only on your device)…" value={note} onChange={e=>setNote(e.target.value)} />
          </div>
          <div className="row">
            <button className="btn" type="submit">Save</button>
            <button className="btn btn-outline" type="button" onClick={clearMoods}>Clear</button>
          </div>
        </form>
        <div className="mt-4">
          <h3 className="font-semibold">Your recent entries</h3>
          <ul className="list">
            {recent.map((e,i)=> (
              <li key={i}>{new Date(e.ts).toLocaleString()} — {e.mood}{e.note? ` — ${e.note}`: ''}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}


