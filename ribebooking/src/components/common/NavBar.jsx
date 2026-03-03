import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Car, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-acid rounded-xl flex items-center justify-center">
            <Car size={18} className="text-night" />
          </div>
          <span className="font-syne font-bold text-xl text-bright">
            Taxi<span className="text-acid">Ride</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {[
            { to: '/rider', label: 'Rider' },
            { to: '/driver', label: 'Driver' },
            { to: '/admin', label: 'Admin' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2 rounded-lg font-dm font-medium text-sm transition-all duration-200 ${
                location.pathname.startsWith(to)
                  ? 'bg-acid text-night'
                  : 'text-muted hover:text-bright hover:bg-surface'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <Link
          to="/rider/book"
          className="hidden md:block btn-acid text-sm"
        >
          Book a Ride
        </Link>

        <button
          className="md:hidden text-muted hover:text-bright"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border px-6 py-4 flex flex-col gap-2 animate-fade-in">
          {[
            { to: '/rider', label: 'Rider Dashboard' },
            { to: '/driver', label: 'Driver Dashboard' },
            { to: '/admin', label: 'Admin Dashboard' },
            { to: '/rider/book', label: 'Book a Ride' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="py-3 px-4 rounded-xl text-bright hover:bg-surface font-dm transition-all"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}