import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Phone, MessageCircle, Share2, AlertTriangle, ChevronDown, Star } from 'lucide-react'
import Navbar from '../components/common/NavBar'
import MapSimulation from '../components/common/MapSimulation'
import StarRating from '../components/common/StarRating'

const TRIP_STATES = [
  { id: 'arriving', label: 'Driver Arriving', icon: '🔵', desc: 'Your driver is on the way' },
  { id: 'arrived', label: 'Driver Arrived', icon: '🟢', desc: 'Driver is at pickup location' },
  { id: 'started', label: 'Trip Started', icon: '🚗', desc: 'Enjoy your ride!' },
  { id: 'completed', label: 'Trip Completed', icon: '🏁', desc: 'You have arrived!' },
]

export default function TripTracking() {
  const [stateIndex, setStateIndex] = useState(0)
  const [eta, setEta] = useState(3)
  const [elapsed, setElapsed] = useState(0)
  const [showRating, setShowRating] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [ratingSubmitted, setRatingSubmitted] = useState(false)

  // Simulate trip progression
  useEffect(() => {
    const timers = [
      setTimeout(() => setStateIndex(1), 4000),
      setTimeout(() => setStateIndex(2), 8000),
      setTimeout(() => setStateIndex(3), 12000),
      setTimeout(() => setShowRating(true), 13000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // Countdown ETA
  useEffect(() => {
    if (stateIndex === 0 && eta > 0) {
      const t = setInterval(() => setEta(e => Math.max(0, e - 1)), 60000)
      return () => clearInterval(t)
    }
  }, [stateIndex, eta])

  // Elapsed time
  useEffect(() => {
    if (stateIndex === 2) {
      const t = setInterval(() => setElapsed(e => e + 1), 1000)
      return () => clearInterval(t)
    }
  }, [stateIndex])

  const formatElapsed = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const driver = {
    name: 'Rajesh Kumar',
    photo: 'RK',
    vehicle: 'Swift Dzire',
    plate: 'DL 01 AB 1234',
    rating: 4.8,
    trips: 1247,
    phone: '+91 98765 43210',
  }

  const currentState = TRIP_STATES[stateIndex]

  if (showRating && !ratingSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full card border-acid/20 animate-slide-up">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🏁</div>
            <h2 className="font-syne font-bold text-2xl text-bright mb-1">Trip Completed!</h2>
            <p className="text-muted font-dm text-sm">You've arrived safely</p>
          </div>

          {/* Trip summary */}
          <div className="bg-void rounded-2xl p-5 border border-border mb-6">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="text-xl font-syne font-bold text-acid">₹124</div>
                <div className="text-xs text-muted font-dm">Fare Paid</div>
              </div>
              <div className="text-center border-x border-border">
                <div className="text-xl font-syne font-bold text-bright">3.2 km</div>
                <div className="text-xs text-muted font-dm">Distance</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-syne font-bold text-bright">18 min</div>
                <div className="text-xs text-muted font-dm">Duration</div>
              </div>
            </div>
            <div className="border-t border-border pt-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-acid rounded-xl flex items-center justify-center font-syne font-bold text-night">RK</div>
              <div>
                <div className="font-dm font-medium text-bright text-sm">{driver.name}</div>
                <div className="text-xs text-muted">{driver.vehicle} · {driver.plate}</div>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h3 className="font-syne font-bold text-bright mb-3">Rate your experience</h3>
            <div className="flex justify-center gap-3 mb-4">
              {[1, 2, 3, 4, 5].map(s => (
                <button
                  key={s}
                  onClick={() => setRating(s)}
                  className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl transition-all duration-200 ${
                    s <= rating ? 'border-acid bg-acid/10 scale-110' : 'border-border hover:border-acid/30'
                  }`}
                >
                  ⭐
                </button>
              ))}
            </div>

            <textarea
              className="input-field resize-none"
              rows={3}
              placeholder="Share your feedback (optional)..."
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="btn-ghost text-sm">Download Receipt</button>
            <button
              onClick={() => setRatingSubmitted(true)}
              className={`btn-acid text-sm ${!rating ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!rating}
            >
              Submit Rating
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (ratingSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full card border-acid/30 text-center animate-slide-up">
          <div className="text-6xl mb-4">✨</div>
          <h2 className="font-syne font-bold text-2xl text-bright mb-2">Thanks for riding!</h2>
          <p className="text-muted font-dm mb-2">You rated your trip {rating} stars</p>
          <div className="flex justify-center mb-6">
            <StarRating rating={rating} size={20} />
          </div>
          <Link to="/rider" className="btn-acid inline-block">Back to Dashboard</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Full-ish map */}
        <div className="relative h-64 md:h-96">
          <MapSimulation
            showDrivers
            showRoute
            driverMoving={stateIndex === 0}
            className="h-full rounded-none"
          />
          
          {/* Status overlay */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <div className={`glass px-6 py-3 rounded-2xl border text-center transition-all duration-500 ${
              stateIndex === 3 ? 'border-green-500/30' : 'border-acid/30'
            }`}>
              <div className="text-lg mb-0.5">{currentState.icon}</div>
              <div className="font-syne font-bold text-bright text-sm">{currentState.label}</div>
              {stateIndex === 0 && (
                <div className="text-acid font-dm text-xs mt-0.5">ETA: {eta} min</div>
              )}
              {stateIndex === 2 && (
                <div className="text-acid font-dm text-xs mt-0.5 font-mono">{formatElapsed(elapsed)}</div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom panel */}
        <div className="max-w-3xl mx-auto px-6 py-6 space-y-4">
          {/* Trip state progress */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              {TRIP_STATES.map((state, i) => (
                <div key={state.id} className="flex items-center gap-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 transition-all duration-500 ${
                    i < stateIndex ? 'border-acid bg-acid/20 text-acid' :
                    i === stateIndex ? 'border-acid bg-acid text-night' :
                    'border-border text-muted'
                  }`}>
                    {i < stateIndex ? '✓' : (i + 1)}
                  </div>
                  {i < TRIP_STATES.length - 1 && (
                    <div className={`flex-1 h-0.5 transition-all duration-500 ${i < stateIndex ? 'bg-acid' : 'bg-border'}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="font-dm text-muted text-sm">{currentState.desc}</p>
            </div>
          </div>

          {/* Driver info */}
          <div className="card">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-acid rounded-2xl flex items-center justify-center font-syne font-bold text-night text-xl">
                {driver.photo}
              </div>
              <div className="flex-1">
                <div className="font-syne font-bold text-bright text-lg">{driver.name}</div>
                <div className="flex items-center gap-2 text-sm text-muted font-dm">
                  <span>⭐ {driver.rating}</span>
                  <span>·</span>
                  <span>{driver.trips.toLocaleString()} trips</span>
                </div>
                <div className="text-sm text-muted font-dm">{driver.vehicle} · {driver.plate}</div>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center border border-border hover:border-acid hover:text-acid text-muted transition-all">
                  <Phone size={16} />
                </button>
                <button className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center border border-border hover:border-acid hover:text-acid text-muted transition-all">
                  <MessageCircle size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Trip details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="card text-center">
              <div className="text-2xl font-syne font-bold text-acid">₹124</div>
              <div className="text-xs text-muted font-dm">Estimated Fare</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-syne font-bold text-bright">3.2 km</div>
              <div className="text-xs text-muted font-dm">Total Distance</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl border border-border text-muted font-dm text-sm hover:border-acid hover:text-acid transition-all flex items-center justify-center gap-2">
              <Share2 size={16} /> Share Trip
            </button>
            <button className="flex-1 py-3 rounded-xl border border-red-500/30 text-red-400 font-dm text-sm hover:bg-red-500/10 transition-all flex items-center justify-center gap-2">
              <AlertTriangle size={16} /> SOS
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}