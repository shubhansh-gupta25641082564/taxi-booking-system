import { useState } from 'react'
import { 
  Users, Car, TrendingUp, AlertTriangle, Check, X, 
  Shield, DollarSign, BarChart2, MapPin, Eye
} from 'lucide-react'
import Navbar from '../components/common/NavBar'
import StatusBadge from '../components/common/StatusBadge'
import { adminStats, mockDrivers, mockRides, popularRoutes } from '../data/mockData'

const pendingDrivers = [
  { id: 'pd1', name: 'Suresh Gupta', vehicle: 'Honda City', date: '2024-02-28', docs: ['License', 'RC', 'Insurance'], status: 'pending' },
  { id: 'pd2', name: 'Meena Rao', vehicle: 'Tata Altroz', date: '2024-02-27', docs: ['License', 'RC'], status: 'pending' },
  { id: 'pd3', name: 'Vikram Shah', vehicle: 'Maruti Alto', date: '2024-02-26', docs: ['License', 'RC', 'Insurance', 'BG'], status: 'pending' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [drivers, setDrivers] = useState(pendingDrivers)
  const [baseRate, setBaseRate] = useState(50)
  const [perKm, setPerKm] = useState(12)
  const [perMin, setPerMin] = useState(2)
  const [surgeEnabled, setSurgeEnabled] = useState(true)

  const approveDriver = (id) => {
    setDrivers(prev => prev.map(d => d.id === id ? { ...d, status: 'verified' } : d))
  }
  const rejectDriver = (id) => {
    setDrivers(prev => prev.map(d => d.id === id ? { ...d, status: 'rejected' } : d))
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-acid/10 rounded-xl flex items-center justify-center border border-acid/30">
              <Shield size={22} className="text-acid" />
            </div>
            <div>
              <h1 className="font-syne font-bold text-2xl text-bright">Admin Console</h1>
              <p className="text-muted font-dm text-sm">Platform management & analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-xl border border-green-500/30">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 font-dm text-sm">Platform Live</span>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Total Rides', value: adminStats.totalRides.toLocaleString(), icon: '🚖', color: 'text-acid' },
            { label: 'Active Now', value: adminStats.activeRides, icon: '🟢', color: 'text-green-400' },
            { label: 'Online Drivers', value: adminStats.onlineDrivers, icon: '🚕', color: 'text-blue-400' },
            { label: 'Revenue', value: `₹${(adminStats.revenue / 1000).toFixed(0)}K`, icon: '💰', color: 'text-yellow-400' },
            { label: 'Avg Rating', value: `${adminStats.avgRating}⭐`, icon: '⭐', color: 'text-yellow-300' },
            { label: 'Success Rate', value: `${adminStats.successRate}%`, icon: '🎯', color: 'text-green-400' },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="card">
              <div className="text-xl mb-2">{icon}</div>
              <div className={`font-syne font-bold text-lg ${color}`}>{value}</div>
              <div className="text-muted text-xs font-dm mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border pb-4 overflow-x-auto">
          {['overview', 'drivers', 'rides', 'pricing', 'analytics'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-dm font-medium capitalize whitespace-nowrap transition-all ${
                activeTab === tab ? 'bg-acid text-night' : 'text-muted hover:text-bright'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
            <div className="lg:col-span-2 space-y-6">
              {/* Active rides */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-syne font-bold text-bright">Live Rides</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-dm">23 active</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { rider: 'Aarav M.', driver: 'Rajesh K.', status: 'Trip Started', fare: 124, progress: 60 },
                    { rider: 'Priya S.', driver: 'Amit G.', status: 'Arriving', fare: 280, progress: 30 },
                    { rider: 'Rahul B.', driver: 'Suresh R.', status: 'Searching', fare: 95, progress: 10 },
                  ].map((r, i) => (
                    <div key={i} className="p-4 bg-void rounded-xl border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3 text-sm font-dm">
                          <span className="text-bright">{r.rider}</span>
                          <span className="text-muted">→</span>
                          <span className="text-muted">{r.driver}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={r.status === 'Trip Started' ? 'on_trip' : r.status === 'Arriving' ? 'arriving' : 'searching'} />
                          <span className="text-acid font-dm text-sm font-medium">₹{r.fare}</span>
                        </div>
                      </div>
                      <div className="w-full bg-surface rounded-full h-1.5 overflow-hidden">
                        <div className="trip-progress-bar h-1.5 rounded-full transition-all" style={{ width: `${r.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div className="card">
                <h3 className="font-syne font-bold text-bright mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { icon: '✅', text: 'Driver Meena Rao verified', time: '2 min ago', color: 'text-green-400' },
                    { icon: '🚨', text: 'SOS alert from Trip #TR8834', time: '15 min ago', color: 'text-red-400' },
                    { icon: '💰', text: 'Revenue milestone: ₹2.84L today', time: '1 hr ago', color: 'text-acid' },
                    { icon: '🚫', text: 'User Arun K. suspended for violation', time: '2 hrs ago', color: 'text-orange-400' },
                  ].map(({ icon, text, time, color }, i) => (
                    <div key={i} className="flex items-center gap-3 py-2">
                      <span className="text-lg">{icon}</span>
                      <div className="flex-1">
                        <p className={`text-sm font-dm ${color}`}>{text}</p>
                      </div>
                      <span className="text-xs text-muted font-dm">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Popular routes */}
              <div className="card">
                <h3 className="font-syne font-bold text-bright mb-4">Popular Routes</h3>
                <div className="space-y-3">
                  {popularRoutes.map((route, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm font-dm mb-1">
                        <span className="text-muted">{route.from} → {route.to}</span>
                        <span className="text-acid font-medium">{route.count}</span>
                      </div>
                      <div className="w-full bg-void rounded-full h-1.5 overflow-hidden">
                        <div
                          className="trip-progress-bar h-1.5 rounded-full"
                          style={{ width: `${(route.count / 342) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending verifications */}
              <div className="card border-orange-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={16} className="text-orange-400" />
                  <h3 className="font-syne font-bold text-bright">Pending Verifications</h3>
                </div>
                <p className="text-orange-400 text-sm font-dm mb-3">{drivers.filter(d => d.status === 'pending').length} drivers awaiting approval</p>
                <button onClick={() => setActiveTab('drivers')} className="btn-ghost w-full text-sm text-center">
                  Review Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Drivers tab */}
        {activeTab === 'drivers' && (
          <div className="animate-fade-in space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-syne font-bold text-lg text-bright">Driver Verification</h2>
              <span className="tag bg-orange-500/10 text-orange-400 border border-orange-500/20">
                {drivers.filter(d => d.status === 'pending').length} pending
              </span>
            </div>
            {drivers.map(driver => (
              <div key={driver.id} className="card">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center text-xl border border-border">🚗</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-syne font-bold text-bright">{driver.name}</span>
                      <StatusBadge status={driver.status} />
                    </div>
                    <p className="text-sm text-muted font-dm mb-3">{driver.vehicle} · Applied {driver.date}</p>
                    <div className="flex flex-wrap gap-2">
                      {driver.docs.map(doc => (
                        <span key={doc} className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-lg border border-green-500/20 font-dm">
                          ✓ {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                  {driver.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => rejectDriver(driver.id)}
                        className="w-9 h-9 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-all"
                      >
                        <X size={16} />
                      </button>
                      <button
                        onClick={() => approveDriver(driver.id)}
                        className="w-9 h-9 rounded-xl bg-acid text-night hover:scale-105 flex items-center justify-center transition-all"
                      >
                        <Check size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Online drivers list */}
            <h2 className="font-syne font-bold text-lg text-bright pt-4">Online Drivers</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {mockDrivers.map(driver => (
                <div key={driver.id} className="card">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-acid rounded-xl flex items-center justify-center font-syne font-bold text-night">
                      {driver.photo}
                    </div>
                    <div className="flex-1">
                      <div className="font-syne font-bold text-bright">{driver.name}</div>
                      <div className="text-xs text-muted font-dm">{driver.vehicle} · ⭐ {driver.rating}</div>
                    </div>
                    <div className="text-right">
                      <StatusBadge status="online" />
                      <div className="text-xs text-muted mt-1 font-dm">{driver.distance}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rides tab */}
        {activeTab === 'rides' && (
          <div className="animate-fade-in">
            <h2 className="font-syne font-bold text-lg text-bright mb-6">All Trips</h2>
            <div className="card overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left">
                    {['Trip ID', 'Pickup', 'Dropoff', 'Driver', 'Fare', 'Distance', 'Rating', 'Status'].map(h => (
                      <th key={h} className="pb-3 pr-6 text-xs font-dm font-medium text-muted uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockRides.map((ride, i) => (
                    <tr key={ride.id} className="border-b border-border/50 hover:bg-surface/50 transition-colors">
                      <td className="py-4 pr-6 text-xs text-muted font-dm">#TR{1000 + i}</td>
                      <td className="py-4 pr-6 text-sm font-dm text-bright max-w-32 truncate">{ride.pickup}</td>
                      <td className="py-4 pr-6 text-sm font-dm text-muted max-w-32 truncate">{ride.dropoff}</td>
                      <td className="py-4 pr-6 text-sm font-dm text-muted">{ride.driver}</td>
                      <td className="py-4 pr-6 text-sm font-dm text-acid font-medium">₹{ride.fare}</td>
                      <td className="py-4 pr-6 text-sm font-dm text-muted">{ride.distance}</td>
                      <td className="py-4 pr-6 text-sm text-yellow-400">{'⭐'.repeat(ride.rating)}</td>
                      <td className="py-4 pr-6"><StatusBadge status={ride.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pricing tab */}
        {activeTab === 'pricing' && (
          <div className="animate-fade-in max-w-2xl">
            <h2 className="font-syne font-bold text-lg text-bright mb-6">Price Configuration</h2>
            <div className="card mb-6">
              <h3 className="font-syne font-bold text-bright mb-4">Base Rates</h3>
              <div className="space-y-4">
                {[
                  { label: 'Base Fare (₹)', val: baseRate, setter: setBaseRate, min: 20, max: 200, step: 5 },
                  { label: 'Per Kilometer (₹)', val: perKm, setter: setPerKm, min: 5, max: 50, step: 1 },
                  { label: 'Per Minute (₹)', val: perMin, setter: setPerMin, min: 1, max: 10, step: 0.5 },
                ].map(({ label, val, setter, min, max, step }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm font-dm mb-2">
                      <span className="text-muted">{label}</span>
                      <span className="text-acid font-bold">₹{val}</span>
                    </div>
                    <input
                      type="range" min={min} max={max} step={step}
                      value={val}
                      onChange={e => setter(Number(e.target.value))}
                      className="w-full accent-[#E8FF47]"
                    />
                    <div className="flex justify-between text-xs text-muted font-dm mt-1">
                      <span>₹{min}</span><span>₹{max}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-syne font-bold text-bright">Surge Pricing</h3>
                <button
                  onClick={() => setSurgeEnabled(!surgeEnabled)}
                  className={`px-4 py-2 rounded-lg text-sm font-dm font-medium transition-all ${
                    surgeEnabled ? 'bg-acid text-night' : 'bg-surface text-muted border border-border'
                  }`}
                >
                  {surgeEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
              {surgeEnabled && (
                <div className="space-y-2">
                  {[
                    { time: 'Morning Rush (7–10 AM)', multiplier: '1.5x' },
                    { time: 'Evening Rush (5–9 PM)', multiplier: '1.8x' },
                    { time: 'Late Night (12–5 AM)', multiplier: '1.3x' },
                    { time: 'Rain / Bad Weather', multiplier: '2.0x' },
                  ].map(({ time, multiplier }) => (
                    <div key={time} className="flex justify-between items-center py-3 px-4 bg-void rounded-xl border border-border text-sm font-dm">
                      <span className="text-muted">{time}</span>
                      <span className="text-acid font-bold">{multiplier}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card bg-acid/5 border-acid/30">
              <h3 className="font-syne font-bold text-acid mb-3">Sample Fare Preview</h3>
              <p className="text-muted font-dm text-sm mb-3">5 km trip · 20 min · No surge</p>
              <div className="text-3xl font-syne font-bold text-bright">
                ₹{baseRate + 5 * perKm + 20 * perMin}
              </div>
              <p className="text-xs text-muted font-dm mt-1">Base ₹{baseRate} + Distance ₹{5 * perKm} + Time ₹{20 * perMin}</p>
            </div>

            <button className="btn-acid w-full mt-6">Save Pricing Configuration</button>
          </div>
        )}

        {/* Analytics tab */}
        {activeTab === 'analytics' && (
          <div className="animate-fade-in">
            <h2 className="font-syne font-bold text-lg text-bright mb-6">Platform Analytics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Revenue chart (visual) */}
              <div className="card">
                <h3 className="font-syne font-bold text-bright mb-4">Daily Revenue (This Week)</h3>
                <div className="flex items-end gap-2 h-32">
                  {[180, 240, 195, 280, 320, 260, 285].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full trip-progress-bar rounded-t-lg transition-all duration-1000"
                        style={{ height: `${(val / 320) * 100}%` }}
                      />
                      <span className="text-xs text-muted font-dm">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-sm font-dm text-muted">Peak: Friday (₹32K)</div>
              </div>

              {/* Trips chart */}
              <div className="card">
                <h3 className="font-syne font-bold text-bright mb-4">Trips by Vehicle Type</h3>
                <div className="space-y-3">
                  {[
                    { type: 'Sedan', count: 6420, pct: 68, color: 'bg-acid' },
                    { type: 'Bike', count: 1890, pct: 20, color: 'bg-blue-500' },
                    { type: 'Auto', count: 952, pct: 10, color: 'bg-purple-500' },
                    { type: 'SUV', count: 585, pct: 6, color: 'bg-green-500' },
                  ].map(({ type, count, pct, color }) => (
                    <div key={type}>
                      <div className="flex justify-between text-sm font-dm mb-1">
                        <span className="text-muted">{type}</span>
                        <span className="text-bright">{count.toLocaleString()} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-void rounded-full h-2 overflow-hidden">
                        <div className={`${color} h-2 rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success metrics */}
              <div className="card md:col-span-2">
                <h3 className="font-syne font-bold text-bright mb-4">Success Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Avg Wait Time', value: '3.8 min', target: '< 5 min', good: true },
                    { label: 'Match Rate', value: '96.3%', target: '> 95%', good: true },
                    { label: 'Avg Rating', value: '4.7 ⭐', target: '> 4.5', good: true },
                    { label: 'Driver Utilization', value: '82%', target: '> 80%', good: true },
                  ].map(({ label, value, target, good }) => (
                    <div key={label} className={`p-4 rounded-xl border ${good ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                      <div className={`font-syne font-bold text-xl mb-1 ${good ? 'text-green-400' : 'text-red-400'}`}>{value}</div>
                      <div className="text-muted font-dm text-xs">{label}</div>
                      <div className="text-muted font-dm text-xs">Target: {target}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}