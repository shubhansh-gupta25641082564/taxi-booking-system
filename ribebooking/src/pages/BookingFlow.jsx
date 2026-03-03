import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, MapPin, Navigation, ArrowRight, Clock, 
  ChevronDown, Zap, Check, X 
} from 'lucide-react'
import Navbar from '../components/common/NavBar'
import MapSimulation from '../components/common/MapSimulation'
import { vehicleTypes, calculateFare, mockDrivers } from '../data/mockData'
import StarRating from '../components/common/StarRating'

const STEPS = ['Location', 'Vehicle', 'Confirm', 'Matching']

export default function BookingFlow() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState('sedan')
  const [surge, setSurge] = useState(1.0)
  const [searching, setSearching] = useState(false)
  const [searchProgress, setSearchProgress] = useState(0)
  const [foundDriver, setFoundDriver] = useState(null)
  const [timer, setTimer] = useState(15)
  const [driverAccepted, setDriverAccepted] = useState(false)

  const distance = 3.2
  const duration = 18
  const fare = calculateFare(distance, duration, selectedVehicle, surge)

  // Simulate searching animation
  useEffect(() => {
    if (step === 3 && searching) {
      const interval = setInterval(() => {
        setSearchProgress(p => {
          if (p >= 100) {
            clearInterval(interval)
            setSearching(false)
            setFoundDriver(mockDrivers[0])
            return 100
          }
          return p + 3
        })
      }, 80)
      return () => clearInterval(interval)
    }
  }, [step, searching])

  // Timer countdown after driver found
  useEffect(() => {
    if (foundDriver && !driverAccepted) {
      const t = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(t)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(t)
    }
  }, [foundDriver, driverAccepted])

  const handleBook = () => {
    setStep(3)
    setSearching(true)
  }

  const handleAccept = () => {
    setDriverAccepted(true)
    setTimeout(() => navigate('/rider/track'), 1500)
  }

  const pickupSuggestions = [
    'Connaught Place, New Delhi',
    'Lajpat Nagar Metro Station',
    'IGI Airport Terminal 3',
    'Hauz Khas Village',
    'Saket District Centre',
  ]

  const dropoffSuggestions = [
    'India Gate, New Delhi',
    'DLF Cyber City, Gurugram',
    'Vasant Kunj',
    'Karol Bagh Metro',
    'Nehru Place Market',
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/rider" className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center border border-border hover:border-acid transition-colors">
            <ArrowLeft size={18} className="text-muted" />
          </Link>
          <div>
            <h1 className="font-syne font-bold text-2xl text-bright">Book a Ride</h1>
            <p className="text-muted font-dm text-sm">Step {step + 1} of {STEPS.length}</p>
          </div>
        </div>

        {/* Progress steps */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`h-2 rounded-full transition-all duration-500 flex-1 ${i <= step ? 'bg-acid' : 'bg-border'}`} />
              <span className={`text-xs font-dm whitespace-nowrap ${i === step ? 'text-acid' : 'text-muted'}`}>
                {s}
              </span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <MapSimulation
              showDrivers={step >= 1}
              showRoute={step >= 1}
              driverMoving={step === 3}
              className="h-80 lg:h-full"
            />
          </div>

          {/* Form */}
          <div className="order-1 lg:order-2">
            {/* STEP 0: Locations */}
            {step === 0 && (
              <div className="card animate-fade-in">
                <h2 className="font-syne font-bold text-xl text-bright mb-6">Set Your Locations</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-dm text-muted mb-2 block">Pickup Location</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <div className="w-2.5 h-2.5 rounded-full bg-acid" />
                      </div>
                      <input
                        className="input-field pl-10"
                        placeholder="Enter pickup location..."
                        value={pickup}
                        onChange={e => setPickup(e.target.value)}
                      />
                    </div>
                    {!pickup && (
                      <div className="mt-2 space-y-1">
                        {pickupSuggestions.slice(0, 3).map(s => (
                          <button key={s} onClick={() => setPickup(s)} className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface text-sm text-muted font-dm transition-colors flex items-center gap-2">
                            <MapPin size={12} className="text-acid" /> {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <div className="w-px h-6 bg-border" />
                  </div>

                  <div>
                    <label className="text-sm font-dm text-muted mb-2 block">Drop-off Location</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                      </div>
                      <input
                        className="input-field pl-10"
                        placeholder="Where to?"
                        value={dropoff}
                        onChange={e => setDropoff(e.target.value)}
                      />
                    </div>
                    {!dropoff && (
                      <div className="mt-2 space-y-1">
                        {dropoffSuggestions.slice(0, 3).map(s => (
                          <button key={s} onClick={() => setDropoff(s)} className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface text-sm text-muted font-dm transition-colors flex items-center gap-2">
                            <Navigation size={12} className="text-blue-400" /> {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {pickup && dropoff && (
                    <div className="bg-void rounded-xl p-4 border border-border animate-fade-in">
                      <div className="flex justify-between text-sm font-dm">
                        <span className="text-muted">Est. Distance</span>
                        <span className="text-bright font-medium">{distance} km</span>
                      </div>
                      <div className="flex justify-between text-sm font-dm mt-2">
                        <span className="text-muted">Est. Duration</span>
                        <span className="text-bright font-medium">{duration} min</span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setStep(1)}
                  disabled={!pickup || !dropoff}
                  className={`w-full mt-6 py-3 rounded-xl font-syne font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                    pickup && dropoff
                      ? 'bg-acid text-night hover:scale-105'
                      : 'bg-surface text-muted cursor-not-allowed'
                  }`}
                >
                  See Fare Estimates <ArrowRight size={18} />
                </button>
              </div>
            )}

            {/* STEP 1: Vehicle selection */}
            {step === 1 && (
              <div className="card animate-fade-in">
                <h2 className="font-syne font-bold text-xl text-bright mb-2">Choose Vehicle Type</h2>
                <p className="text-muted font-dm text-sm mb-6">Select based on your preference and budget</p>

                <div className="space-y-3">
                  {vehicleTypes.map(v => {
                    const fare = calculateFare(distance, duration, v.id, surge)
                    const isSelected = selectedVehicle === v.id
                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVehicle(v.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                          isSelected ? 'border-acid bg-acid/5' : 'border-border bg-void hover:border-border/60'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{v.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`font-syne font-bold ${isSelected ? 'text-acid' : 'text-bright'}`}>{v.label}</span>
                              <span className="text-xs text-muted font-dm">{v.desc}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock size={12} className="text-muted" />
                              <span className="text-xs text-muted font-dm">{v.eta}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-syne font-bold text-lg ${isSelected ? 'text-acid' : 'text-bright'}`}>
                              ₹{fare}
                            </div>
                            <div className="text-xs text-muted font-dm">₹{v.perKm}/km</div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-acid bg-acid' : 'border-border'
                          }`}>
                            {isSelected && <Check size={12} className="text-night" />}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Surge info */}
                <div className="mt-4 p-3 bg-void rounded-xl border border-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-dm">
                    <Zap size={14} className="text-acid" />
                    <span className="text-muted">Surge Multiplier</span>
                  </div>
                  <span className="text-bright font-medium font-dm">{surge}x</span>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)} className="btn-ghost flex-1">Back</button>
                  <button onClick={() => setStep(2)} className="btn-acid flex-1">Continue</button>
                </div>
              </div>
            )}

            {/* STEP 2: Confirm */}
            {step === 2 && (
              <div className="card animate-fade-in">
                <h2 className="font-syne font-bold text-xl text-bright mb-6">Confirm Your Ride</h2>

                <div className="space-y-4 mb-6">
                  {/* Route summary */}
                  <div className="bg-void rounded-xl p-4 border border-border space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-2.5 h-2.5 rounded-full bg-acid flex-shrink-0" />
                      <div>
                        <div className="text-xs text-muted font-dm">Pickup</div>
                        <div className="text-sm text-bright font-dm">{pickup}</div>
                      </div>
                    </div>
                    <div className="w-px h-4 bg-border ml-1.5" />
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-2.5 h-2.5 rounded-full bg-blue-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs text-muted font-dm">Drop-off</div>
                        <div className="text-sm text-bright font-dm">{dropoff}</div>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle */}
                  <div className="bg-void rounded-xl p-4 border border-border flex items-center gap-4">
                    <span className="text-2xl">{vehicleTypes.find(v => v.id === selectedVehicle)?.icon}</span>
                    <div className="flex-1">
                      <div className="font-dm font-medium text-bright">{vehicleTypes.find(v => v.id === selectedVehicle)?.label}</div>
                      <div className="text-xs text-muted font-dm">{vehicleTypes.find(v => v.id === selectedVehicle)?.desc}</div>
                    </div>
                    <button onClick={() => setStep(1)} className="text-xs text-acid font-dm hover:underline">Change</button>
                  </div>

                  {/* Fare breakdown */}
                  <div className="bg-acid/5 rounded-xl p-4 border border-acid/30">
                    <div className="font-syne font-bold text-sm text-acid mb-3">Fare Breakdown</div>
                    <div className="space-y-2 text-sm font-dm">
                      <div className="flex justify-between text-muted">
                        <span>Base fare</span>
                        <span>₹{vehicleTypes.find(v => v.id === selectedVehicle)?.basefare}</span>
                      </div>
                      <div className="flex justify-between text-muted">
                        <span>Distance ({distance} km × ₹{vehicleTypes.find(v => v.id === selectedVehicle)?.perKm})</span>
                        <span>₹{(distance * (vehicleTypes.find(v => v.id === selectedVehicle)?.perKm || 12)).toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between text-muted">
                        <span>Time ({duration} min × ₹2)</span>
                        <span>₹{duration * 2}</span>
                      </div>
                      <div className="border-t border-acid/20 pt-2 flex justify-between font-bold text-bright">
                        <span>Total</span>
                        <span className="text-acid text-lg">₹{fare}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="grid grid-cols-3 gap-3">
                    {['💰 Cash', '💳 Wallet', '🏦 UPI'].map(p => (
                      <button key={p} className="py-2 px-3 bg-void rounded-xl border border-border text-xs font-dm text-muted hover:border-acid hover:text-acid transition-all text-center">
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-ghost flex-1">Back</button>
                  <button onClick={handleBook} className="btn-acid flex-1 flex items-center justify-center gap-2">
                    Confirm Booking <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Matching */}
            {step === 3 && (
              <div className="card animate-fade-in">
                {!foundDriver ? (
                  <div className="text-center py-8">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full border-4 border-acid/20" />
                      <div
                        className="absolute inset-0 rounded-full border-4 border-acid border-t-transparent animate-spin"
                        style={{ animationDuration: '1s' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-3xl">🔍</div>
                    </div>
                    <h2 className="font-syne font-bold text-xl text-bright mb-2">Finding Nearest Driver</h2>
                    <p className="text-muted font-dm text-sm mb-6">Searching within 5km radius...</p>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-void rounded-full h-2 mb-4 overflow-hidden">
                      <div
                        className="trip-progress-bar h-2 rounded-full transition-all duration-100"
                        style={{ width: `${searchProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted font-dm">Checking {Math.round(searchProgress / 10 * 4)} nearby drivers...</p>
                  </div>
                ) : !driverAccepted ? (
                  <div className="animate-fade-in">
                    <div className="text-center mb-6">
                      <div className="inline-block bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-dm border border-green-500/30 mb-3">
                        ✓ Driver Found!
                      </div>
                    </div>

                    {/* Driver card */}
                    <div className="bg-void rounded-2xl p-5 border border-acid/30 mb-5">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-acid rounded-2xl flex items-center justify-center font-syne font-bold text-night text-lg">
                          {foundDriver.photo}
                        </div>
                        <div className="flex-1">
                          <div className="font-syne font-bold text-bright text-lg">{foundDriver.name}</div>
                          <div className="flex items-center gap-2 text-sm text-muted font-dm">
                            <StarRating rating={Math.floor(foundDriver.rating)} size={12} />
                            <span>{foundDriver.rating}</span>
                            <span>·</span>
                            <span>{foundDriver.trips.toLocaleString()} trips</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-surface rounded-xl p-3">
                          <div className="text-xs text-muted font-dm">Vehicle</div>
                          <div className="text-sm text-bright font-dm font-medium">{foundDriver.vehicle}</div>
                          <div className="text-xs text-muted">{foundDriver.plate}</div>
                        </div>
                        <div className="bg-surface rounded-xl p-3">
                          <div className="text-xs text-muted font-dm">ETA</div>
                          <div className="text-lg text-acid font-syne font-bold">{foundDriver.eta}</div>
                          <div className="text-xs text-muted">{foundDriver.distance}</div>
                        </div>
                      </div>
                    </div>

                    {/* Timer */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-sm text-muted font-dm">Driver notified — confirm ride</span>
                      <div className={`font-syne font-bold text-lg px-3 py-1 rounded-lg ${
                        timer > 8 ? 'text-acid bg-acid/10' : 'text-red-400 bg-red-500/10 animate-pulse'
                      }`}>
                        {timer}s
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => { setFoundDriver(null); setStep(0); setSearchProgress(0) }}
                        className="py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 font-dm font-medium transition-all flex items-center justify-center gap-2"
                      >
                        <X size={16} /> Cancel
                      </button>
                      <button onClick={handleAccept} className="btn-acid flex items-center justify-center gap-2">
                        <Check size={16} /> Accept
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 animate-fade-in">
                    <div className="text-5xl mb-4">🎉</div>
                    <h2 className="font-syne font-bold text-xl text-bright mb-2">Ride Confirmed!</h2>
                    <p className="text-muted font-dm text-sm">Redirecting to live tracking...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}