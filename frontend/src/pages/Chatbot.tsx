import { FormEvent, useState } from 'react'

type Bubble = { role: 'user' | 'bot'; text: string }

function generateReply(message: string) {
  const m = message.toLowerCase()
  if (!m.trim()) return "I'm here when you're ready."
  if (m.includes('hello') || m.includes('hi')) return 'Hi there! How are you feeling today?'
  if (m.includes('stress') || m.includes('stressed')) return 'Stress is tough. Try a 2-minute breathing break. Inhale 4s, exhale 6s.'
  if (m.includes('anxiety')) return 'Try 5-4-3-2-1 grounding: 5 things you see, 4 you feel, and so on.'
  if (m.includes('sleep')) return 'Good sleep helps. Try a consistent bedtime and limit screens 1 hour before.'
  if (m.includes('study') || m.includes('exam')) return 'Pomodoro: 25 minutes focus + 5 minutes rest can help.'
  if (m.includes('money') || m.includes('finance')) return 'Track expenses for a week to spot small savings.'
  if (m.includes('help') || m.includes('support')) return 'You deserve support. See the Resources page or talk to someone you trust.'
  return "Thanks for sharing. I'm listening. Want a quick tip or grounding exercise?"
}

export default function Chatbot() {
  const [log, setLog] = useState<Bubble[]>([{ role: 'bot', text: "Hey! I'm Mindly. How can I support you today?" }])
  const [input, setInput] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setLog(l => [...l, { role: 'user', text }])
    setInput('')
    setTimeout(() => {
      setLog(l => [...l, { role: 'bot', text: generateReply(text) }])
    }, 300)
  }

  return (
    <div>
      <section className="card">
        <h1 className="text-2xl font-bold">Mindly Chatbot</h1>
        <p className="subtitle">A friendly companion for quick check-ins and tips.</p>
        <div className="grid grid-rows-[1fr_auto] gap-3 h-[60vh]">
          <div className="overflow-auto p-2 border border-border rounded-md bg-card">
            {log.map((b, i) => (
              <div key={i} className={`bubble ${b.role}`}>{b.text}</div>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex gap-2">
            <input className="flex-1" value={input} onChange={e=>setInput(e.target.value)} placeholder="Type your message…" />
            <button className="btn" type="submit">Send</button>
          </form>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold">Note</h2>
        <p>This chatbot provides general wellness tips and is not a substitute for professional help. If you’re in crisis, please contact your local emergency services or a trusted support line.</p>
      </section>
    </div>
  )
}


