import { Link, NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function RootLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <div className="min-h-screen text-foreground app-noise relative">
      <header className="sticky top-0 z-40">
        {/* Enhanced navbar container with soft gradient and glassmorphism (tone aligned to peakmind.in) */}
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border shadow-card backdrop-blur supports-[backdrop-filter]:bg-white/30 bg-white/40 dark:supports-[backdrop-filter]:bg-card/30 dark:bg-card/40 bg-gradient-to-r from-purple-50/50 via-sky-50/50 to-emerald-50/50 dark:from-purple-400/5 dark:via-sky-400/5 dark:to-emerald-400/5">
            <Link to="/" className="inline-flex items-center gap-2 px-3 py-2">
              {/* Updated Mindly logo - softer, modern, emotionally uplifting */}
              <motion.span 
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl"
                style={{ 
                  background: 'linear-gradient(135deg, #c7d2fe 0%, #bae6fd 60%, #bbf7d0 100%)',
                  boxShadow: '0 6px 18px rgba(99, 102, 241, 0.18)'
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                aria-hidden
              >
                {/* Minimal friendly mark: soft circle with smile + leaf sprout */}
                {/* Updated Mindly logo - friendly smile + sprout */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95"/>
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85"/>
                    </linearGradient>
                  </defs>
                  <circle cx="12" cy="12" r="8.5" stroke="url(#g1)" strokeWidth="1.4" opacity="0.65" />
                  <path d="M8.2 12.7c1.2 1 2.7 1.5 3.8 1.5 1.1 0 2.6-.5 3.8-1.5" stroke="url(#g1)" strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="M12 8.8c0 .8.5 1.5 1.2 1.8 1.1.4 2.1-.4 2.1-1.5 0-1.6-1.7-2.7-3.3-2.1-1 .4-1.6 1.3-1.6 2.3 0 0 0 0 0 0" stroke="url(#g1)" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </motion.span>
              <span className="font-semibold text-lg tracking-tight" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto' }}>Mindly</span>
            </Link>
          {/* Enhanced navbar styling - soft gradient container */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full border border-border relative supports-[backdrop-filter]:bg-white/30 bg-white/20 dark:supports-[backdrop-filter]:bg-card/30 dark:bg-card/20 bg-gradient-to-r from-purple-200/30 via-sky-200/30 to-emerald-200/30 dark:from-purple-400/10 dark:via-sky-400/10 dark:to-emerald-400/10">
            <NavLink 
              to="/" 
              end 
              className={({isActive})=>`relative px-4 py-2 rounded-full text-sm font-medium transition ${isActive? 'text-foreground' : 'text-muted hover:text-foreground'}`}
            >
              {({ isActive }) => (
                <span className="relative inline-flex items-center">
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/15 border border-primary/30 shadow-sm"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  Home
                </span>
              )}
            </NavLink>
            <NavLink 
              to="/chatbot" 
              className={({isActive})=>`relative px-4 py-2 rounded-full text-sm font-medium transition ${isActive? 'text-foreground' : 'text-muted hover:text-foreground'}`}
            >
              {({ isActive }) => (
                <span className="relative inline-flex items-center">
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/15 border border-primary/30 shadow-sm"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  Chatbot
                </span>
              )}
            </NavLink>
            <NavLink 
              to="/resources" 
              className={({isActive})=>`relative px-4 py-2 rounded-full text-sm font-medium transition ${isActive? 'text-foreground' : 'text-muted hover:text-foreground'}`}
            >
              {({ isActive }) => (
                <span className="relative inline-flex items-center">
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/15 border border-primary/30 shadow-sm"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  Resources
                </span>
              )}
            </NavLink>
            <NavLink 
              to="/about" 
              className={({isActive})=>`relative px-4 py-2 rounded-full text-sm font-medium transition ${isActive? 'text-foreground' : 'text-muted hover:text-foreground'}`}
            >
              {({ isActive }) => (
                <span className="relative inline-flex items-center">
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/15 border border-primary/30 shadow-sm"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  About
                </span>
              )}
            </NavLink>
          </nav>
          <div className="flex items-center gap-2 md:gap-3 px-3">
            <button 
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-border bg-card/70"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={()=>setMobileOpen(v=>!v)}
            >
              <span className="sr-only">Menu</span>
              <motion.span 
                className="block w-5 h-0.5 bg-foreground rounded"
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 3 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="block w-5 h-0.5 bg-foreground rounded ml-[-20px]"
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="block w-5 h-0.5 bg-foreground rounded ml-[-20px]"
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -3 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
            <ThemeToggle />
          </div>
          </div>
        </div>
        {/* Mobile menu */}
        <motion.div 
          initial={false}
          animate={{ height: mobileOpen ? 'auto' : 0, opacity: mobileOpen ? 1 : 0 }}
          className="md:hidden border-t border-border bg-card/90 overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-4 py-3 grid gap-2">
            <NavLink onClick={()=>setMobileOpen(false)} to="/" end className={({isActive})=>`px-3 py-2 rounded-md ${isActive? 'bg-primary/10 text-foreground' : 'text-muted hover:text-foreground hover:bg-primary/5'}`}>Home</NavLink>
            <NavLink onClick={()=>setMobileOpen(false)} to="/chatbot" className={({isActive})=>`px-3 py-2 rounded-md ${isActive? 'bg-primary/10 text-foreground' : 'text-muted hover:text-foreground hover:bg-primary/5'}`}>Chatbot</NavLink>
            <NavLink onClick={()=>setMobileOpen(false)} to="/resources" className={({isActive})=>`px-3 py-2 rounded-md ${isActive? 'bg-primary/10 text-foreground' : 'text-muted hover:text-foreground hover:bg-primary/5'}`}>Resources</NavLink>
            <NavLink onClick={()=>setMobileOpen(false)} to="/about" className={({isActive})=>`px-3 py-2 rounded-md ${isActive? 'bg-primary/10 text-foreground' : 'text-muted hover:text-foreground hover:bg-primary/5'}`}>About</NavLink>
          </div>
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto px-4 my-8">
        <Outlet />
      </main>

      <footer className="bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 text-sm">
          © {new Date().getFullYear()} Mindly. Be kind to your mind.
        </div>
      </footer>
    </div>
  )
}


