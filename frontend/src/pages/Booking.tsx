import { motion } from 'framer-motion'
import { Calendar, MessageCircle, MessageSquare, Share2 } from 'lucide-react'

export default function Booking() {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://mindly.example'

  return (
    <div className="space-y-6">
      <motion.section 
        className="card"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold">Book a Session</h1>
        <p className="subtitle">Choose how you’d like to connect and get support</p>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.a
          href="https://calendly.com/"
          target="_blank"
          rel="noopener"
          className="card hover:shadow-lg transition-shadow group"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Schedule session with expert counsellor</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pick a slot that works for you. Secure, private, and supportive.</p>
            </div>
          </div>
        </motion.a>

        <motion.a
          href="/chatbot"
          className="card hover:shadow-lg transition-shadow group"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Chat with chatbot</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Instant, friendly support 24/7 for quick guidance.</p>
            </div>
          </div>
        </motion.a>

        <motion.a
          href={`https://wa.me/917428417350?text=${encodeURIComponent('Hi Mindly Coach, I would like to chat for support. ' + siteUrl)}`}
          target="_blank"
          rel="noopener"
          className="card hover:shadow-lg transition-shadow group"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Chat with coach on WhatsApp</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Open WhatsApp with a pre-filled message to start the conversation.</p>
            </div>
          </div>
        </motion.a>

        <motion.a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent('Try Mindly with me')}&body=${encodeURIComponent('Hey! Check out Mindly – a calm space for students: ' + siteUrl)}`}
          className="card hover:shadow-lg transition-shadow group"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Refer a friend</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Invite a friend to Mindly via your email app.</p>
            </div>
          </div>
        </motion.a>
      </div>
    </div>
  )
}


