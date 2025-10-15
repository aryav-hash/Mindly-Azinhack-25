import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const QUOTES = [
  { t: 'Small steps every day lead to big changes.', a: 'Mindly' },
  { t: 'You are doing better than you think.', a: 'Mindly' },
  { t: 'Pause. Breathe. Proceed.', a: 'Mindly' },
  { t: 'It’s okay to ask for help.', a: 'Mindly' },
  { t: 'Progress, not perfection.', a: 'Mindly' },
]

type MoodEntry = { 
  ts: number; 
  mood: string; 
  emoji: string;
  emotions: string[];
  triggers: string[];
  note?: string 
}
const MOOD_KEY = 'mindly-moods-v2'

const MOOD_LEVELS = [
  { emoji: '😢', mood: 'Terrible', color: 'bg-red-100 border-red-300 text-red-800' },
  { emoji: '😔', mood: 'Not Good', color: 'bg-orange-100 border-orange-300 text-orange-800' },
  { emoji: '😐', mood: 'Ok Ok', color: 'bg-yellow-100 border-yellow-300 text-yellow-800' },
  { emoji: '😊', mood: 'Good', color: 'bg-green-100 border-green-300 text-green-800' },
  { emoji: '🤩', mood: 'Great', color: 'bg-blue-100 border-blue-300 text-blue-800' },
]

const EMOTIONS = [
  { emoji: '😰', emotion: 'Anxious', category: 'negative' },
  { emoji: '😔', emotion: 'Sad', category: 'negative' },
  { emoji: '😤', emotion: 'Frustrated', category: 'negative' },
  { emoji: '😴', emotion: 'Tired', category: 'neutral' },
  { emoji: '😌', emotion: 'Calm', category: 'positive' },
  { emoji: '😄', emotion: 'Happy', category: 'positive' },
  { emoji: '🤗', emotion: 'Grateful', category: 'positive' },
  { emoji: '😎', emotion: 'Confident', category: 'positive' },
  { emoji: '🤔', emotion: 'Confused', category: 'neutral' },
  { emoji: '😅', emotion: 'Overwhelmed', category: 'negative' },
]

const TRIGGERS = [
  { emoji: '📚', trigger: 'Academic Work', category: 'academic' },
  { emoji: '👨‍👩‍👧‍👦', trigger: 'Family', category: 'personal' },
  { emoji: '👥', trigger: 'Friends', category: 'social' },
  { emoji: '💰', trigger: 'Financial', category: 'practical' },
  { emoji: '🏥', trigger: 'Health', category: 'personal' },
  { emoji: '💼', trigger: 'Work/Career', category: 'professional' },
  { emoji: '❤️', trigger: 'Relationships', category: 'personal' },
  { emoji: '🎯', trigger: 'Goals/Ambitions', category: 'personal' },
]

export default function Home() {
  const [quote, setQuote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)])
  const [moods, setMoods] = useState<MoodEntry[]>([])
  
  // Multi-step form state
  const [currentStep, setCurrentStep] = useState<'mood' | 'emotions' | 'triggers' | 'note'>('mood')
  const [selectedMood, setSelectedMood] = useState<typeof MOOD_LEVELS[0] | null>(null)
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([])
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

  function handleMoodSelection(mood: typeof MOOD_LEVELS[0]) {
    setSelectedMood(mood)
    setCurrentStep('emotions')
  }

  function handleEmotionToggle(emotion: string) {
    setSelectedEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    )
  }

  function handleTriggerToggle(trigger: string) {
    setSelectedTriggers(prev => 
      prev.includes(trigger) 
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    )
  }

  function nextStep() {
    if (currentStep === 'mood') setCurrentStep('emotions')
    else if (currentStep === 'emotions') setCurrentStep('triggers')
    else if (currentStep === 'triggers') setCurrentStep('note')
  }

  function prevStep() {
    if (currentStep === 'emotions') setCurrentStep('mood')
    else if (currentStep === 'triggers') setCurrentStep('emotions')
    else if (currentStep === 'note') setCurrentStep('triggers')
  }

  function saveMoodEntry() {
    if (!selectedMood) return
    
    const newEntry: MoodEntry = {
      ts: Date.now(),
      mood: selectedMood.mood,
      emoji: selectedMood.emoji,
      emotions: selectedEmotions,
      triggers: selectedTriggers,
      note: note.trim() || undefined
    }
    
    setMoods(prev => [...prev, newEntry])
    resetForm()
  }

  function resetForm() {
    setCurrentStep('mood')
    setSelectedMood(null)
    setSelectedEmotions([])
    setSelectedTriggers([])
    setNote('')
  }

  function clearMoods() {
    if (!confirm('Clear all mood entries stored on this device?')) return
    setMoods([])
  }

  const recent = useMemo(() => [...moods].slice(-10).reverse(), [moods])

  return (
    <div>
      <motion.section 
        className="card overflow-hidden"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <motion.h1 
              className="text-3xl md:text-4xl font-bold"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Welcome to Mindly
            </motion.h1>
            <motion.p 
              className="subtitle mt-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              A calm space for students to care for their mental health and well-being.
            </motion.p>
            <motion.div 
              className="flex gap-2 flex-wrap mt-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="btn" href="/chatbot">Try the Chatbot</motion.a>
              <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="btn btn-outline" href="/resources">Explore Resources</motion.a>
            </motion.div>
          </div>
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop"
              alt="Calm workspace"
              className="w-full h-56 md:h-64 object-cover rounded-lg border border-border"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-white/10"></div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="card"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold">Daily Motivation</h2>
        <motion.blockquote 
          className="my-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span>{quote.t}</span>
          <cite className="block subtitle">— {quote.a}</cite>
        </motion.blockquote>
        <motion.button 
          onClick={newQuote} 
          className="btn btn-ghost"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          New quote
        </motion.button>
      </motion.section>

      <motion.section 
        className="card"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold">Mood Tracker</h2>
        
        {/* Step 1: Mood Selection */}
        {currentStep === 'mood' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">How are you feeling today? 😊</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {MOOD_LEVELS.map((moodOption) => (
                  <motion.button
                    key={moodOption.mood}
                    onClick={() => handleMoodSelection(moodOption)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${moodOption.color} hover:shadow-md`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-3xl mb-2">{moodOption.emoji}</div>
                    <div className="text-sm font-medium">{moodOption.mood}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Emotion Selection */}
        {currentStep === 'emotions' && selectedMood && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => setCurrentStep('mood')} className="btn btn-ghost">← Back</button>
              <div>
                <h3 className="text-lg font-semibold">What emotions are you currently experiencing?</h3>
                <p className="text-sm text-muted-foreground">You selected: {selectedMood.emoji} {selectedMood.mood}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {EMOTIONS.map((emotionOption) => (
                <button
                  key={emotionOption.emotion}
                  onClick={() => handleEmotionToggle(emotionOption.emotion)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    selectedEmotions.includes(emotionOption.emotion)
                      ? 'border-primary bg-primary/10 scale-105'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-2xl mb-1">{emotionOption.emoji}</div>
                  <div className="text-xs font-medium">{emotionOption.emotion}</div>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <motion.button whileHover={{ scale: selectedEmotions.length ? 1.04 : 1 }} whileTap={{ scale: selectedEmotions.length ? 0.98 : 1 }} onClick={nextStep} className="btn" disabled={selectedEmotions.length === 0}>
                Continue ({selectedEmotions.length} selected)
              </motion.button>
            </div>
          </div>
        )}

        {/* Step 3: Trigger Selection */}
        {currentStep === 'triggers' && selectedMood && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={prevStep} className="btn btn-ghost">← Back</button>
              <div>
                <h3 className="text-lg font-semibold">What made you feel this way?</h3>
                <p className="text-sm text-muted-foreground">Select all that apply</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {TRIGGERS.map((triggerOption) => (
                <button
                  key={triggerOption.trigger}
                  onClick={() => handleTriggerToggle(triggerOption.trigger)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    selectedTriggers.includes(triggerOption.trigger)
                      ? 'border-primary bg-primary/10 scale-105'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-2xl mb-1">{triggerOption.emoji}</div>
                  <div className="text-xs font-medium text-center">{triggerOption.trigger}</div>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} onClick={nextStep} className="btn">
                Continue ({selectedTriggers.length} selected)
              </motion.button>
            </div>
          </div>
        )}

        {/* Step 4: Note */}
        {currentStep === 'note' && selectedMood && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={prevStep} className="btn btn-ghost">← Back</button>
              <div>
                <h3 className="text-lg font-semibold">Any additional thoughts?</h3>
                <p className="text-sm text-muted-foreground">Optional: Add a note about your day</p>
              </div>
            </div>
            <div>
              <textarea 
                rows={4} 
                placeholder="Share what's on your mind... (stored only on your device)" 
                value={note} 
                onChange={e => setNote(e.target.value)}
                className="w-full p-3 border border-border rounded-lg resize-none"
              />
            </div>
            <div className="flex gap-2">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} onClick={saveMoodEntry} className="btn">
                Save Entry
              </motion.button>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} onClick={resetForm} className="btn btn-outline">
                Start Over
              </motion.button>
            </div>
          </div>
        )}

        {/* Navigation and Clear */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex gap-2">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="btn btn-outline" onClick={clearMoods}>Clear All Entries</motion.button>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Your recent entries</h3>
          <div className="space-y-3">
            {recent.map((e,i)=> (
              <motion.div 
                key={i} 
                className="p-3 border border-border rounded-lg bg-card"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{e.emoji}</span>
                  <span className="font-medium">{e.mood}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(e.ts).toLocaleString()}
                  </span>
                </div>
                {e.emotions.length > 0 && (
                  <div className="mb-2">
                    <span className="text-sm font-medium">Emotions: </span>
                    <span className="text-sm text-muted-foreground">
                      {e.emotions.join(', ')}
                    </span>
                  </div>
                )}
                {e.triggers.length > 0 && (
                  <div className="mb-2">
                    <span className="text-sm font-medium">Triggers: </span>
                    <span className="text-sm text-muted-foreground">
                      {e.triggers.join(', ')}
                    </span>
                  </div>
                )}
                {e.note && (
                  <div className="text-sm italic text-muted-foreground">
                    "{e.note}"
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}


