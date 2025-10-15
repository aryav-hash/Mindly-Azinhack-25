import { Link, NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function RootLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <div className="min-h-screen text-foreground app-noise relative">
      <header className="sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border shadow-card backdrop-blur supports-[backdrop-filter]:bg-white/50 bg-white/60 dark:supports-[backdrop-filter]:bg-card/70 dark:bg-card/80 bg-gradient-to-r from-purple-50/70 via-sky-50/70 to-emerald-50/70 dark:from-purple-400/15 dark:via-sky-400/15 dark:to-emerald-400/15">
            <Link to="/" className="inline-flex items-center gap-2 px-3 py-2">
              {/* Site logo image */}
              <motion.img 
                src={`${import.meta.env.BASE_URL}logo.png`} 
                alt="Mindly logo"
                className="w-9 h-9 rounded-xl object-contain"
                style={{ boxShadow: '0 6px 18px rgba(99, 102, 241, 0.18)' }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />
              <span className="font-semibold text-lg tracking-tight" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto' }}>Mindly</span>
            </Link>
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full border border-border relative supports-[backdrop-filter]:bg-white/60 bg-white/50 dark:supports-[backdrop-filter]:bg-card/80 dark:bg-card/80 bg-gradient-to-r from-purple-200/60 via-sky-200/60 to-emerald-200/60 dark:from-purple-400/25 dark:via-sky-400/25 dark:to-emerald-400/25">
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
              to="/booking" 
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
                  Booking
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
            <NavLink onClick={()=>setMobileOpen(false)} to="/booking" className={({isActive})=>`px-3 py-2 rounded-md ${isActive? 'bg-primary/10 text-foreground' : 'text-muted hover:text-foreground hover:bg-primary/5'}`}>Booking</NavLink>
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


