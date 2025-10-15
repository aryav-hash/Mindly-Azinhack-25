import { FormEvent, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

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
  // Added persistent history key
  const CHAT_LOG_KEY = 'mindly-chat-log'

  // Initialize from localStorage if present
  const [log, setLog] = useState<Bubble[]>(() => {
    try {
      const stored = localStorage.getItem(CHAT_LOG_KEY)
      if (stored) return JSON.parse(stored)
    } catch {}
    return [{ role: 'bot', text: "Hey! I'm Mindly. How can I support you today?" }]
  })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Added welcome message animation and auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [log, loading])

  // Added persistence: save log to localStorage whenever it changes
  useEffect(() => {
    try { localStorage.setItem(CHAT_LOG_KEY, JSON.stringify(log)) } catch {}
  }, [log])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return
    
    setLog(l => [...l, { role: 'user', text }]) // Added: state will persist via effect
    setInput('')
    setLoading(true)
    
    const reply = await generateReply(text)
    setLog(l => [...l, { role: 'bot', text: reply }]) // Added: state will persist via effect
    setLoading(false)
  }

  return (
    <div>
      <section className="card">
        <h1 className="text-2xl font-bold">Mindly Chatbot</h1>
        <p className="subtitle">A friendly companion for quick check-ins and tips.</p>
        <div className="grid grid-rows-[1fr_auto] gap-3 h-[60vh]">
          <div ref={scrollRef} className="overflow-auto p-3 border border-border rounded-md bg-card">
            {log.map((b, i) => (
              <motion.div 
                key={i} 
                className={`bubble ${b.role}`}
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.18 }}
              >
                {b.text}
              </motion.div>
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
            <motion.button whileHover={{ scale: loading ? 1 : 1.03 }} whileTap={{ scale: loading ? 1 : 0.98 }} className="btn" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </motion.button>
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