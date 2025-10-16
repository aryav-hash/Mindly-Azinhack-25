import { FormEvent, useEffect, useState } from 'react'
import { fetchLatestQuestionnaire } from '../api/questionnaire'

function formatText(text: string): string {
  let formatted = text
  
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  formatted = formatted.replace(/\n/g, '<br>')
  
  return formatted
}

type Bubble = { role: 'user' | 'bot'; text: string }
type Metrics = {
  stress: number
  anxiety: number
  loneliness: number
  motivation: number
  financial_burden: number
  academic_pressure: number
}

const CHAT_LOG_PREFIX = 'mindly_chat_log_'
const CHAT_METRICS_PREFIX = 'mindly_chat_metrics_'

const getSessionId = () => {
  let sessionId = localStorage.getItem('mindly_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('mindly_session_id', sessionId)
  }
  return sessionId
}

async function generateReply(message: string, sessionId: string, userId?: string): Promise<{response: string, metrics: Metrics}> {
  try {
    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message, 
        session_id: sessionId,
        user_id: userId
      }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to get response')
    }
    
    const data = await response.json()
    return { response: data.response, metrics: data.metrics }
  } catch (error) {
    console.error('Error:', error)
    return { 
      response: "Sorry, I'm having trouble connecting. Please try again.",
      metrics: { stress: 0, anxiety: 0, loneliness: 0, motivation: 0, financial_burden: 0, academic_pressure: 0 }
    }
  }
}

export default function Chatbot() {
  const [log, setLog] = useState<Bubble[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(getSessionId())
  const [currentMetrics, setCurrentMetrics] = useState<Metrics | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    try {
      const currentUserId = localStorage.getItem('mindly_current_user_id')
      if (currentUserId) {
        setUserId(currentUserId)
        triggerAutoResponse(currentUserId)
        return
      }
      
      const questionnaireRuns = localStorage.getItem('mindly_questionnaire_runs')
      if (questionnaireRuns) {
        const runs = JSON.parse(questionnaireRuns)
        if (runs.length > 0) {
          const latestRun = runs[0]
          if (latestRun.id) {
            setUserId(latestRun.id)
            triggerAutoResponse(latestRun.id)
          }
        }
      }
    } catch (error) {
      console.error('Error getting questionnaire user ID:', error)
    }
  }, [])
  async function triggerAutoResponse(userId: string) {
    try {
      setLoading(true)
      
      const questionnaireResult = await fetchLatestQuestionnaire(userId)
      if (questionnaireResult.ok && questionnaireResult.data) {
        console.log('Fetched questionnaire data:', questionnaireResult.data)
        
        const prompt = `Based on my recent mental health assessment, please provide personalized insights and recommendations. Here are my responses:
        
        Assessment Results:
        ${JSON.stringify(questionnaireResult.data.responses, null, 2)}
        
        Please analyze these responses and provide tailored advice, coping strategies, and recommendations for my mental wellbeing.`
        
        const { response: reply, metrics } = await generateReply(
          prompt, 
          sessionId, 
          userId
        )
        setLog(l => [...l, { role: 'bot', text: reply }])
        setCurrentMetrics(metrics)
      } else {
        console.error('Failed to fetch questionnaire data:', questionnaireResult.error)
        setLog([{ role: 'bot', text: "Hey! I'm Mindly. How can I support you today? 😊" }])
      }
      setLoading(false)
    } catch (error) {
      console.error('Error generating auto-response:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    try {
      const storedLog = localStorage.getItem(CHAT_LOG_PREFIX + sessionId)
      const storedMetrics = localStorage.getItem(CHAT_METRICS_PREFIX + sessionId)
      if (storedLog) {
        setLog(JSON.parse(storedLog))
      } else {
        const hasQuestionnaireData = localStorage.getItem('mindly_current_user_id') || localStorage.getItem('mindly_questionnaire_runs')
        if (!hasQuestionnaireData) {
          setLog([{ role: 'bot', text: "Hey! I'm Mindly. How can I support you today? 😊" }])
        } else {
          setLog([])
        }
      }
      if (storedMetrics) {
        setCurrentMetrics(JSON.parse(storedMetrics))
      }
    } catch {}
  }, [sessionId])

  useEffect(() => {
    try {
      if (log.length) {
        localStorage.setItem(CHAT_LOG_PREFIX + sessionId, JSON.stringify(log))
      }
    } catch {}
  }, [log, sessionId])

  useEffect(() => {
    try {
      if (currentMetrics) {
        localStorage.setItem(CHAT_METRICS_PREFIX + sessionId, JSON.stringify(currentMetrics))
      }
    } catch {}
  }, [currentMetrics, sessionId])

  function newConversation() {
    const welcome = { role: 'bot', text: "Hey! I'm Mindly. How can I support you today? 😊" } as Bubble
    setLog([welcome])
    setCurrentMetrics(null)
    setUserId(null)
    try {
      localStorage.setItem(CHAT_LOG_PREFIX + sessionId, JSON.stringify([welcome]))
      localStorage.removeItem(CHAT_METRICS_PREFIX + sessionId)
      localStorage.removeItem('mindly_current_user_id')
    } catch {}
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return
    
    setLog(l => [...l, { role: 'user', text }])
    setInput('')
    setLoading(true)
    
    const { response: reply, metrics } = await generateReply(text, sessionId, userId || undefined)
    setLog(l => [...l, { role: 'bot', text: reply }])
    setCurrentMetrics(metrics)
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <section className="card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Mindly Chatbot</h1>
            <p className="subtitle">A friendly companion for quick check-ins and tips.</p>
            {userId && (
              <div className="mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm inline-block">
                📊 Using your questionnaire data for personalized responses
              </div>
            )}
          </div>
          <button onClick={newConversation} className="btn btn-outline">New Conversation</button>
        </div>
        <div className="grid grid-rows-[1fr_auto] gap-3 h-[60vh]">
          <div className="overflow-auto p-2 border border-border rounded-md bg-card space-y-2">
            {log.map((b, i) => (
              <div key={i} className={`bubble ${b.role}`} style={{ whiteSpace: 'pre-wrap' }}>
                {b.role === 'bot' ? (
                  <div dangerouslySetInnerHTML={{ __html: formatText(b.text) }} />
                ) : (
                  b.text
                )}
              </div>
            ))}
            {loading && <div className="bubble bot">Thinking... 💭</div>}
          </div>
          <form onSubmit={onSubmit} className="flex gap-2">
            <input 
              className="flex-1 px-4 py-2 border rounded-lg" 
              value={input} 
              onChange={e=>setInput(e.target.value)} 
              placeholder="Type your message…"
              disabled={loading}
            />
            <button className="btn px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </section>

      {currentMetrics && (
        <section className="card">
          <h2 className="text-xl font-semibold mb-4">Current Wellness Indicators</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(currentMetrics).map(([key, value]) => (
              <div key={key} className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 capitalize mb-1">
                  {key.replace('_', ' ')}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${value > 7 ? 'bg-red-500' : value > 4 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${value * 10}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold">{value}/10</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="card">
        <h2 className="text-xl font-semibold">Note</h2>
        <p>This chatbot provides general wellness tips and is not a substitute for professional help. If you're in crisis, please contact your local emergency services or a trusted support line.</p>
      </section>
    </div>
  )
}