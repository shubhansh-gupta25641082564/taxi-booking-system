import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, Car, Zap, Shield, Star, MapPin, Clock, 
  Users, TrendingUp, ChevronRight, Play
} from 'lucide-react'
import Navbar from '../components/common/NavBar'

function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = Date.now()
        const tick = () => {
          const elapsed = Date.now() - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(eased * end))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    { icon: '🎯', title: 'Smart Matching', desc: 'AI finds the nearest driver within 5km radius in milliseconds using geospatial indexing.' },
    { icon: '🛰️', title: 'Live Tracking', desc: 'Watch your driver approach in real-time. Map updates every 3 seconds via WebSockets.' },
    { icon: '💰', title: 'Transparent Fares', desc: 'Know your price before you ride. Dynamic pricing based on distance, time, and demand.' },
    { icon: '🛡️', title: 'Verified Drivers', desc: 'Every driver is background-checked with verified license and vehicle documents.' },
  ]

  const steps = [
    { num: '01', title: 'Set Your Location', desc: 'Pick your pickup and drop-off on the interactive map' },
    { num: '02', title: 'View Estimate', desc: 'See fare, ETA, and available vehicle types before booking' },
    { num: '03', title: 'Get Matched', desc: 'Algorithm finds the nearest driver instantly' },
    { num: '04', title: 'Ride & Rate', desc: 'Track in real-time and rate your experience after' },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-acid/5 blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-blue-500/5 blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-acid/30 bg-acid/5 text-acid text-sm font-dm mb-8">
              <span className="w-2 h-2 rounded-full bg-acid animate-pulse" />
              Real-time ride hailing platform
            </div>

            <h1 className="font-syne font-extrabold text-5xl lg:text-7xl leading-[0.95] mb-8">
              <span className="text-bright">Your Ride,</span>
              <br />
              <span className="text-acid neon-acid">On Time.</span>
              <br />
              <span className="text-bright">Every Time.</span>
            </h1>

            <p className="text-muted font-dm text-lg leading-relaxed mb-10 max-w-md">
              Connect with verified drivers in seconds. Track your ride live, pay transparently, and arrive safely — every single trip.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/rider/book" className="btn-acid flex items-center gap-2 justify-center text-base">
                Book a Ride Now <ArrowRight size={18} />
              </Link>
              <Link to="/driver" className="btn-ghost flex items-center gap-2 justify-center text-base">
                Become a Driver <ChevronRight size={18} />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: 15847, suffix: '+', label: 'Total Rides' },
                { value: 98, suffix: '%', label: 'Satisfaction' },
                { value: 4, suffix: ' min', label: 'Avg. Wait Time' },
              ].map(({ value, suffix, label }) => (
                <div key={label}>
                  <div className="font-syne font-bold text-2xl text-bright">
                    <AnimatedCounter end={value} suffix={suffix} />
                  </div>
                  <div className="text-muted text-sm font-dm">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Map/App preview */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Phone mockup */}
              <div className="glass rounded-3xl p-6 border border-border neon-box animate-float">
                {/* Map area */}
                <div className="relative rounded-2xl overflow-hidden mb-4 h-52 bg-void map-grid">
                  {/* Decorative roads */}
                  <div className="road-h" style={{ top: '40%', left: '0', right: '0' }} />
                  <div className="road-h" style={{ top: '70%', left: '0', right: '0' }} />
                  <div className="road-v" style={{ left: '35%', top: '0', bottom: '0' }} />
                  <div className="road-v" style={{ left: '65%', top: '0', bottom: '0' }} />
                  
                  {/* Your location */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <div className="relative">
                      <div className="w-5 h-5 bg-acid rounded-full border-2 border-night" />
                      <div className="absolute inset-0 bg-acid rounded-full pulse-ring opacity-50" />
                    </div>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-acid text-night px-2 py-0.5 rounded-md font-bold">YOU</div>
                  </div>

                  {/* Driver markers */}
                  {[
                    { top: '20%', left: '20%', delay: '0s' },
                    { top: '15%', left: '65%', delay: '0.5s' },
                    { top: '60%', left: '75%', delay: '1s' },
                  ].map((pos, i) => (
                    <div key={i} className="absolute" style={{ top: pos.top, left: pos.left }}>
                      <div className="w-7 h-7 bg-surface border border-border rounded-full flex items-center justify-center text-sm animate-float" style={{ animationDelay: pos.delay }}>
                        🚖
                      </div>
                    </div>
                  ))}

                  {/* Route line */}
                  <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                    <path
                      d="M 50% 75% Q 40% 50% 25% 25%"
                      stroke="rgba(232,255,71,0.4)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="6 4"
                    />
                  </svg>

                  <div className="absolute top-2 right-2 glass px-2 py-1 rounded-lg text-xs text-muted">
                    📍 New Delhi
                  </div>
                </div>

                {/* Booking card */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-void rounded-xl border border-border">
                    <div className="w-2 h-2 rounded-full bg-acid" />
                    <span className="text-sm font-dm text-muted">Connaught Place</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-void rounded-xl border border-border">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-sm font-dm text-muted">India Gate</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-acid/10 rounded-xl border border-acid/30">
                    <div>
                      <div className="text-xs text-acid font-dm">Estimated Fare</div>
                      <div className="text-xl font-syne font-bold text-acid">₹124</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted font-dm">ETA</div>
                      <div className="text-sm font-syne font-bold text-bright">3 min</div>
                    </div>
                    <button className="bg-acid text-night text-sm font-bold px-4 py-2 rounded-lg font-syne">
                      Book
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <div className="absolute -top-4 -right-4 glass rounded-2xl p-3 border border-green-500/30 animate-slide-up" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-8 h-8 bg-green-500/20 rounded-xl flex items-center justify-center text-lg">🚖</div>
                  <div>
                    <div className="text-bright font-dm font-medium">Driver Found!</div>
                    <div className="text-green-400">Arriving in 3 min</div>
                  </div>
                </div>
              </div>

              {/* Floating rating */}
              <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-3 border border-acid/30 animate-slide-up" style={{ animationDelay: '1.3s' }}>
                <div className="flex items-center gap-2 text-xs">
                  <div className="text-2xl">⭐</div>
                  <div>
                    <div className="text-bright font-dm font-medium">Rajesh Kumar</div>
                    <div className="text-acid">4.9 rating · 1.2K trips</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full border border-border text-muted text-sm font-dm mb-4">
              Core Features
            </div>
            <h2 className="font-syne font-bold text-4xl lg:text-5xl text-bright mb-4">
              Built for the <span className="text-acid">real world</span>
            </h2>
            <p className="text-muted font-dm text-lg max-w-xl mx-auto">
              Every feature engineered for speed, safety, and seamless experiences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Feature tabs */}
            <div className="space-y-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    activeFeature === i
                      ? 'border-acid/50 bg-acid/5 neon-box'
                      : 'border-border bg-surface hover:border-border/80'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{f.icon}</span>
                    <div>
                      <h3 className={`font-syne font-bold text-lg mb-1 ${activeFeature === i ? 'text-acid' : 'text-bright'}`}>
                        {f.title}
                      </h3>
                      {activeFeature === i && (
                        <p className="text-muted font-dm text-sm animate-fade-in">{f.desc}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature illustration */}
            <div className="gradient-border rounded-3xl p-8">
              <div className="text-6xl mb-4 text-center">{features[activeFeature].icon}</div>
              <h3 className="font-syne font-bold text-2xl text-acid text-center mb-3">{features[activeFeature].title}</h3>
              <p className="text-muted font-dm text-center leading-relaxed">{features[activeFeature].desc}</p>
              
              {/* Visual indicator */}
              <div className="mt-6 grid grid-cols-4 gap-2">
                {features.map((_, i) => (
                  <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === activeFeature ? 'bg-acid' : 'bg-border'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-surface/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-syne font-bold text-4xl text-bright mb-4">
              Ride in <span className="text-acid">4 simple steps</span>
            </h2>
            <p className="text-muted font-dm">From request to destination in minutes</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="card hover:border-acid/30 transition-all duration-300 group">
                  <div className="font-syne font-extrabold text-5xl text-acid/20 group-hover:text-acid/40 transition-colors mb-4">
                    {s.num}
                  </div>
                  <h3 className="font-syne font-bold text-bright text-lg mb-2">{s.title}</h3>
                  <p className="text-muted font-dm text-sm">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 text-acid z-10">
                    <ChevronRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-3xl p-10 border border-border grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Car size={24} />, value: 15847, suffix: '+', label: 'Total Rides' },
              { icon: <Users size={24} />, value: 187, suffix: '+', label: 'Active Drivers' },
              { icon: <Star size={24} />, value: 4.7, suffix: '', label: 'Avg. Rating', isFloat: true },
              { icon: <TrendingUp size={24} />, value: 96, suffix: '%', label: 'Match Rate' },
            ].map(({ icon, value, suffix, label, isFloat }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 bg-acid/10 rounded-2xl flex items-center justify-center text-acid mx-auto mb-3">
                  {icon}
                </div>
                <div className="font-syne font-bold text-3xl text-bright mb-1">
                  {isFloat ? value : <AnimatedCounter end={value} suffix={suffix} />}
                  {isFloat && suffix}
                </div>
                <div className="text-muted font-dm text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role cards */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-syne font-bold text-4xl text-bright text-center mb-12">
            Built for <span className="text-acid">everyone</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: '🙋‍♂️',
                role: 'Rider',
                desc: 'Book rides instantly, track your driver live, pay seamlessly and rate your experience.',
                features: ['Interactive map booking', 'Real-time tracking', 'Multiple payment options', 'Trip history & receipts'],
                link: '/rider',
                cta: 'Rider Dashboard',
              },
              {
                emoji: '🚕',
                role: 'Driver',
                desc: 'Go online to receive ride requests, navigate efficiently, and maximize your earnings.',
                features: ['Availability toggle', '15s accept/reject timer', 'Turn-by-turn navigation', 'Daily earnings tracker'],
                link: '/driver',
                cta: 'Driver Dashboard',
              },
              {
                emoji: '👔',
                role: 'Admin',
                desc: 'Manage users, verify drivers, control pricing, and monitor platform health in real-time.',
                features: ['Driver verification', 'Price control', 'Live trip monitoring', 'Platform analytics'],
                link: '/admin',
                cta: 'Admin Dashboard',
              },
            ].map(({ emoji, role, desc, features, link, cta }) => (
              <div key={role} className="card border-border hover:border-acid/30 transition-all duration-300 group flex flex-col">
                <div className="text-4xl mb-4">{emoji}</div>
                <h3 className="font-syne font-bold text-xl text-bright mb-2">{role}</h3>
                <p className="text-muted font-dm text-sm mb-5 leading-relaxed">{desc}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm font-dm text-muted">
                      <span className="text-acid">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link to={link} className="btn-ghost text-center text-sm group-hover:border-acid group-hover:text-acid">
                  {cta} <ArrowRight size={14} className="inline" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="gradient-border rounded-3xl p-16">
            <h2 className="font-syne font-extrabold text-5xl text-bright mb-4">
              Ready to <span className="text-acid">ride</span>?
            </h2>
            <p className="text-muted font-dm text-lg mb-8 max-w-md mx-auto">
              Join thousands of commuters who rely on TaxiRide for fast, safe, and transparent transportation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/rider/book" className="btn-acid flex items-center gap-2 justify-center">
                Book Your First Ride <ArrowRight size={18} />
              </Link>
              <Link to="/driver" className="btn-ghost flex items-center gap-2 justify-center">
                Drive with Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-acid rounded-lg flex items-center justify-center">
              <Car size={14} className="text-night" />
            </div>
            <span className="font-syne font-bold text-bright">Taxi<span className="text-acid">Ride</span></span>
          </div>
          <p className="text-muted font-dm text-sm">© 2024 TaxiRide. Real-time ride hailing platform.</p>
          <div className="flex gap-6 text-muted text-sm font-dm">
            <span className="hover:text-acid cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-acid cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-acid cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </footer>
    </div>
  )
}