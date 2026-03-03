import { useState, useEffect } from 'react'
import { 
  ToggleLeft, ToggleRight, MapPin, Navigation, Check, X,
  TrendingUp, Clock, Star, Zap
} from 'lucide-react'
import Navbar from '../components/common/NavBar'
import MapSimulation from '../components/common/MapSimulation'
import StatusBadge from '../components/common/StatusBadge'
import { driverEarnings } from '../data/mockData'

export default function DriverDashboard() {
  const [online, setOnline] = useState(false)
  const [rideRequest, setRideRequest] = useState(null)
  const [timer, setTimer] = useState(15)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [tripState, setTripState] = useState(null) // null | 'accepted' | 'arrived' | 'started' | 'completed'
  const [earnings, setEarnings] = useState(driverEarnings)

  // Simulate incoming ride request when online
  useEffect(() => {
    if (!online || rideRequest || tripState) return
    const t = setTimeout(() => {
      setRideRequest({
        rider: 'Aarav Mehta',
        rating: 4.7,
        trips: 47,
        pickup: 'Connaught Place, New Delhi',
        dropoff: 'India Gate, New Delhi',
        distance: '0.8 km to pickup',
        fare: 124,
        tripDist: '3.2 km',
        eta: '8 min',
      })
      setTimer(15)
    }, 3000)
    return () => clearTimeout(t)
  }, [online, rideRequest, tripState])

  // Timer countdown
  useEffect(() => {
    if (!rideRequest) return
    if (timer <= 0) {
      setRideRequest(null)
      return
    }
    const t = setInterval(() => setTimer(p => p - 1), 1000)
    return () => clearInterval(t)
  }, [rideRequest, timer])

  const handleAccept = () => {
    setRideRequest(null)
    setTripState('accepted')
  }

  const handleReject = () => {
    setRideRequest(null)
    setTimer(15)
  }

  const nextState = () => {
    if (tripState === 'accepted') setTripState('arrived')
    else if (tripState === 'arrived') setTripState('started')
    else if (tripState === 'started') {
      setTripState('completed')
      setEarnings(prev => ({
        ...prev,
        today: prev.today + 124,
        trips: { ...prev.trips, today: prev.trips.today + 1 }
      }))
    }
    else if (tripState === 'completed') {
      setTripState(null)
    }
  }

  const tripStateConfig = {
    accepted: { label: 'Driving to Pickup', icon: '🔵', action: 'Mark Arrived', color: 'bg-blue-500' },
    arrived: { label: 'Arrived at Pickup', icon: '🟢', action: 'Start Trip', color: 'bg-green-500' },
    started: { label: 'Trip In Progress', icon: '🚗', action: 'Complete Trip', color: 'bg-acid' },
    completed: { label: 'Trip Completed!', icon: '🏁', action: 'Done', color: 'bg-green-500' },
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-acid rounded-2xl flex items-center justify-center font-syne font-bold text-night text-2xl">RK</div>
            <div>
              <h1 className="font-syne font-bold text-2xl text-bright">Rajesh Kumar</h1>
              <div className="flex items-center gap-2">
                <StatusBadge status={online ? (tripState ? 'on_trip' : 'online') : 'offline'} />
                <span className="text-muted text-sm font-dm">Swift Dzire · DL 01 AB 1234</span>
              </div>
            </div>
          </div>

          {/* Online toggle */}
          <button
            onClick={() => { setOnline(!online); if (online) { setRideRequest(null); setTripState(null) } }}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 font-syne font-bold text-lg transition-all duration-300 ${
              online
                ? 'border-green-500 bg-green-500/10 text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.2)]'
                : 'border-border bg-surface text-muted'
            }`}
          >
            {online ? <ToggleRight size={28} className="text-green-400" /> : <ToggleLeft size={28} />}
            {online ? 'ONLINE' : 'OFFLINE'}
          </button>
        </div>

        {/* Ride request popup */}
        {rideRequest && (
          <div className="fixed inset-0 flex items-end justify-center z-50 bg-night/60 backdrop-blur-sm px-4 pb-8">
            <div className="w-full max-w-md card border-acid/40 neon-box animate-slide-up">
              {/* Timer bar */}
              <div className="w-full bg-void rounded-full h-2 mb-4 overflow-hidden">
                <div
                  className="h-2 rounded-full transition-all duration-1000"
                  style={{
                    width: `${(timer / 15) * 100}%`,
                    background: timer > 8 ? '#E8FF47' : '#ef4444',
                  }}
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-bright font-syne font-bold text-lg">
                  🔔 New Ride Request
                </div>
                <div className={`font-syne font-bold text-2xl px-3 py-1 rounded-xl ${
                  timer > 8 ? 'text-acid bg-acid/10' : 'text-red-400 bg-red-500/10 animate-pulse'
                }`}>
                  {timer}s
                </div>
              </div>

              {/* Rider info */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-void rounded-xl border border-border">
                <div className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center text-lg">👤</div>
                <div>
                  <div className="font-dm font-medium text-bright text-sm">{rideRequest.rider}</div>
                  <div className="text-xs text-muted">⭐ {rideRequest.rating} · {rideRequest.trips} trips</div>
                </div>
              </div>

              {/* Route */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3 p-3 bg-void rounded-xl border border-border">
                  <div className="w-2 h-2 rounded-full bg-acid" />
                  <span className="text-sm font-dm text-muted">{rideRequest.pickup}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-void rounded-xl border border-border">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-sm font-dm text-muted">{rideRequest.dropoff}</span>
                </div>
              </div>

              {/* Fare details */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="text-center p-3 bg-acid/10 rounded-xl border border-acid/30">
                  <div className="font-syne font-bold text-acid text-xl">₹{rideRequest.fare}</div>
                  <div className="text-xs text-muted font-dm">Fare</div>
                </div>
                <div className="text-center p-3 bg-surface rounded-xl border border-border">
                  <div className="font-syne font-bold text-bright text-sm">{rideRequest.distance}</div>
                  <div className="text-xs text-muted font-dm">To pickup</div>
                </div>
                <div className="text-center p-3 bg-surface rounded-xl border border-border">
                  <div className="font-syne font-bold text-bright text-sm">{rideRequest.tripDist}</div>
                  <div className="text-xs text-muted font-dm">Trip dist.</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button onClick={handleReject} className="py-4 rounded-xl border-2 border-red-500/40 text-red-400 font-syne font-bold text-lg hover:bg-red-500/10 transition-all flex items-center justify-center gap-2">
                  <X size={20} /> Reject
                </button>
                <button onClick={handleAccept} className="py-4 rounded-xl bg-acid text-night font-syne font-bold text-lg hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(232,255,71,0.4)]">
                  <Check size={20} /> Accept
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active trip panel */}
        {tripState && (
          <div className={`mb-6 card border-2 ${tripState === 'completed' ? 'border-green-500/40' : 'border-acid/40'} animate-fade-in`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{tripStateConfig[tripState]?.icon}</span>
                <div>
                  <div className="font-syne font-bold text-bright">{tripStateConfig[tripState]?.label}</div>
                  <div className="text-sm text-muted font-dm">Aarav Mehta · India Gate</div>
                </div>
              </div>
              {tripState === 'completed' && (
                <div className="text-right">
                  <div className="font-syne font-bold text-acid text-2xl">+₹124</div>
                  <div className="text-xs text-muted font-dm">Earned</div>
                </div>
              )}
            </div>
            {tripState !== 'completed' && (
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm font-dm">
                <div className="flex items-center gap-2 p-3 bg-void rounded-xl border border-border">
                  <div className="w-2 h-2 rounded-full bg-acid" />
                  <span className="text-muted">Connaught Place</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-void rounded-xl border border-border">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-muted">India Gate</span>
                </div>
              </div>
            )}
            <button onClick={nextState} className="btn-acid w-full text-center">
              {tripStateConfig[tripState]?.action}
            </button>
          </div>
        )}

        {/* Dashboard content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <MapSimulation
              showDrivers={online}
              showRoute={!!tripState}
              driverMoving={tripState === 'accepted'}
              className="h-72"
            />
          </div>

          {/* Earnings sidebar */}
          <div className="space-y-4">
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-acid" />
                <h3 className="font-syne font-bold text-bright">Earnings</h3>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-acid/10 rounded-xl border border-acid/30 text-center">
                  <div className="text-xs text-muted font-dm mb-1">Today</div>
                  <div className="font-syne font-bold text-3xl text-acid">₹{earnings.today.toLocaleString()}</div>
                  <div className="text-xs text-muted font-dm mt-1">{earnings.trips.today} trips</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-void rounded-xl border border-border text-center">
                    <div className="text-xs text-muted font-dm">This Week</div>
                    <div className="font-syne font-bold text-bright">₹{earnings.week.toLocaleString()}</div>
                    <div className="text-xs text-muted">{earnings.trips.week} trips</div>
                  </div>
                  <div className="p-3 bg-void rounded-xl border border-border text-center">
                    <div className="text-xs text-muted font-dm">This Month</div>
                    <div className="font-syne font-bold text-bright">₹{earnings.month.toLocaleString()}</div>
                    <div className="text-xs text-muted">{earnings.trips.month} trips</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="card">
              <h3 className="font-syne font-bold text-bright mb-4">Performance</h3>
              <div className="space-y-3">
                {[
                  { label: 'Rating', value: '4.8 ⭐', good: true },
                  { label: 'Acceptance Rate', value: '94%', good: true },
                  { label: 'Completion Rate', value: '98%', good: true },
                  { label: 'Online Hours Today', value: '6.5 hrs', good: null },
                ].map(({ label, value, good }) => (
                  <div key={label} className="flex justify-between text-sm font-dm">
                    <span className="text-muted">{label}</span>
                    <span className={good === true ? 'text-green-400' : good === false ? 'text-red-400' : 'text-bright'}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {!online && (
              <div className="card border-dashed border-acid/30 text-center p-8">
                <div className="text-4xl mb-3">🚦</div>
                <p className="font-dm text-muted text-sm">Go online to start receiving ride requests</p>
                <button onClick={() => setOnline(true)} className="btn-acid mt-4 text-sm">
                  Go Online
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}