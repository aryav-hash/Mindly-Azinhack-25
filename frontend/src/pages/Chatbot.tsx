import { FormEvent, useState } from 'react'

type Bubble = { role: 'user' | 'bot'; text: string }

async function generateReply(message: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to get response')
    }
    
    const data = await response.json()
    return data.response
  } catch (error) {
    console.error('Error:', error)
    return "Sorry, I'm having trouble connecting. Please try again."
  }
}

export default function Chatbot() {
  const [log, setLog] = useState<Bubble[]>([{ role: 'bot', text: "Hey! I'm Mindly. How can I support you today?" }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return
    
    setLog(l => [...l, { role: 'user', text }])
    setInput('')
    setLoading(true)
    
    const reply = await generateReply(text)
    setLog(l => [...l, { role: 'bot', text: reply }])
    setLoading(false)
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
            {loading && <div className="bubble bot">Thinking...</div>}
          </div>
          <form onSubmit={onSubmit} className="flex gap-2">
            <input 
              className="flex-1" 
              value={input} 
              onChange={e=>setInput(e.target.value)} 
              placeholder="Type your message…"
              disabled={loading}
            />
            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold">Note</h2>
        <p>This chatbot provides general wellness tips and is not a substitute for professional help. If you're in crisis, please contact your local emergency services or a trusted support line.</p>
      </section>
    </div>
  )
}