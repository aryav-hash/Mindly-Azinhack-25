import { Link, NavLink, Outlet } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link to="/" className="font-bold">Mindly</Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/" end className={({isActive})=>`px-3 py-2 rounded-md ${isActive? 'bg-primary/10' : 'text-muted hover:text-foreground'}`}>Home</NavLink>
            <NavLink to="/chatbot" className={({isActive})=>`px-3 py-2 rounded-md ${isActive? 'bg-primary/10' : 'text-muted hover:text-foreground'}`}>Chatbot</NavLink>
            <NavLink to="/resources" className={({isActive})=>`px-3 py-2 rounded-md ${isActive? 'bg-primary/10' : 'text-muted hover:text-foreground'}`}>Resources</NavLink>
            <NavLink to="/about" className={({isActive})=>`px-3 py-2 rounded-md ${isActive? 'bg-primary/10' : 'text-muted hover:text-foreground'}`}>About</NavLink>
            <NavLink to="/contact" className={({isActive})=>`px-3 py-2 rounded-md ${isActive? 'bg-primary/10' : 'text-muted hover:text-foreground'}`}>Contact</NavLink>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 my-6">
        <Outlet />
      </main>

      <footer className="bg-card border-t border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 text-sm">
          © {new Date().getFullYear()} Mindly. Be kind to your mind.
        </div>
      </footer>
    </div>
  )
}


