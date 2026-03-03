import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, Star, ArrowRight, Download, CreditCard, TrendingUp } from 'lucide-react'
import Navbar from '../components/common/NavBar'
import { mockRides } from '../data/mockData'
import StarRating from '../components/common/StarRating'

export default function RiderDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = ['overview', 'rides', 'payment', 'profile']

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-acid/20 rounded-2xl flex items-center justify-center text-2xl border border-acid/30">
              🙋‍♂️
            </div>
            <div>
              <h1 className="font-syne font-bold text-2xl text-bright">Aarav Mehta</h1>
              <p className="text-muted font-dm text-sm">Rider since Jan 2024 · 47 total rides</p>
            </div>
          </div>
          <Link to="/rider/book" className="btn-acid flex items-center gap-2">
            Book New Ride <ArrowRight size={18} />
          </Link>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Rides', value: '47', icon: '🚖', color: 'text-acid' },
            { label: 'Amount Spent', value: '₹8,240', icon: '💳', color: 'text-blue-400' },
            { label: 'Avg Rating Given', value: '4.6 ⭐', icon: '⭐', color: 'text-yellow-400' },
            { label: 'Saved Places', value: '5', icon: '📍', color: 'text-green-400' },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="card">
              <div className="text-2xl mb-2">{icon}</div>
              <div className={`font-syne font-bold text-xl ${color}`}>{value}</div>
              <div className="text-muted text-xs font-dm mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border pb-4">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-dm font-medium capitalize transition-all ${
                activeTab === tab ? 'bg-acid text-night' : 'text-muted hover:text-bright'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Recent ride */}
            <div className="lg:col-span-2">
              <h2 className="font-syne font-bold text-lg text-bright mb-4">Recent Rides</h2>
              <div className="space-y-3">
                {mockRides.slice(0, 3).map(ride => (
                  <div key={ride.id} className="card hover:border-acid/20 transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-acid" />
                              <span className="text-sm font-dm text-bright">{ride.pickup}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-blue-400" />
                              <span className="text-sm font-dm text-muted">{ride.dropoff}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted font-dm">
                          <span>{ride.date} · {ride.time}</span>
                          <span>{ride.distance}</span>
                          <span>{ride.duration}</span>
                          <span>👤 {ride.driver}</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="font-syne font-bold text-acid text-lg">₹{ride.fare}</div>
                        <StarRating rating={ride.rating} size={12} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveTab('rides')} className="mt-4 text-acid text-sm font-dm hover:underline">
                View all rides →
              </button>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Quick book */}
              <div className="card border-acid/20 bg-acid/5">
                <h3 className="font-syne font-bold text-bright mb-3">Quick Book</h3>
                <div className="space-y-2 mb-4">
                  {['Connaught Place', 'Home', 'Office'].map(p => (
                    <div key={p} className="flex items-center gap-2 py-2 px-3 bg-void rounded-lg border border-border hover:border-acid/30 cursor-pointer transition-all">
                      <MapPin size={12} className="text-acid" />
                      <span className="text-sm text-muted font-dm">{p}</span>
                    </div>
                  ))}
                </div>
                <Link to="/rider/book" className="btn-acid w-full text-center text-sm block">
                  Book Now
                </Link>
              </div>

              {/* Spending */}
              <div className="card">
                <h3 className="font-syne font-bold text-bright mb-4">This Month</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-dm">
                    <span className="text-muted">Rides</span>
                    <span className="text-bright font-medium">12</span>
                  </div>
                  <div className="flex justify-between text-sm font-dm">
                    <span className="text-muted">Amount</span>
                    <span className="text-acid font-medium">₹2,140</span>
                  </div>
                  <div className="flex justify-between text-sm font-dm">
                    <span className="text-muted">Avg. Fare</span>
                    <span className="text-bright font-medium">₹178</span>
                  </div>
                  <div className="w-full bg-void rounded-full h-2">
                    <div className="trip-progress-bar h-2 rounded-full" style={{ width: '68%' }} />
                  </div>
                  <div className="text-xs text-muted font-dm">68% of usual monthly spend</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rides tab */}
        {activeTab === 'rides' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-syne font-bold text-lg text-bright">All Rides</h2>
              <select className="input-field w-auto text-sm py-2">
                <option>All Time</option>
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
            <div className="space-y-3">
              {mockRides.map(ride => (
                <div key={ride.id} className="card hover:border-acid/20 transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-acid" />
                          <span className="text-sm font-dm text-bright">{ride.pickup}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-400" />
                          <span className="text-sm font-dm text-muted">{ride.dropoff}</span>
                        </div>
                      </div>
                      <div className="flex items-center flex-wrap gap-3 text-xs text-muted font-dm">
                        <span className="flex items-center gap-1">
                          <Clock size={10} /> {ride.date} · {ride.time}
                        </span>
                        <span>{ride.distance} · {ride.duration}</span>
                        <span>Driver: {ride.driver}</span>
                        <StarRating rating={ride.rating} size={10} />
                      </div>
                    </div>
                    <div className="text-right ml-6 flex flex-col items-end gap-2">
                      <div className="font-syne font-bold text-acid text-xl">₹{ride.fare}</div>
                      <span className="tag bg-green-500/10 text-green-400 border border-green-500/20">Completed</span>
                      <button className="flex items-center gap-1 text-xs text-muted hover:text-acid font-dm transition-colors">
                        <Download size={10} /> Receipt
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment tab */}
        {activeTab === 'payment' && (
          <div className="animate-fade-in max-w-xl">
            <h2 className="font-syne font-bold text-lg text-bright mb-6">Payment Methods</h2>
            <div className="space-y-3 mb-8">
              {[
                { icon: '💳', label: 'Visa Debit Card', sub: '**** **** **** 4832', default: true },
                { icon: '💰', label: 'TaxiRide Wallet', sub: 'Balance: ₹850', default: false },
                { icon: '🏦', label: 'UPI', sub: 'user@upi', default: false },
              ].map(({ icon, label, sub, default: isDefault }) => (
                <div key={label} className={`card flex items-center gap-4 ${isDefault ? 'border-acid/30 bg-acid/5' : ''}`}>
                  <div className="text-2xl">{icon}</div>
                  <div className="flex-1">
                    <div className="font-dm font-medium text-bright text-sm">{label}</div>
                    <div className="text-xs text-muted">{sub}</div>
                  </div>
                  {isDefault && <span className="tag bg-acid/20 text-acid">Default</span>}
                </div>
              ))}
            </div>
            <button className="btn-ghost w-full flex items-center justify-center gap-2">
              <CreditCard size={16} /> Add Payment Method
            </button>
          </div>
        )}

        {/* Profile tab */}
        {activeTab === 'profile' && (
          <div className="animate-fade-in max-w-lg">
            <div className="card mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-acid rounded-2xl flex items-center justify-center text-2xl">🙋‍♂️</div>
                <div>
                  <h2 className="font-syne font-bold text-xl text-bright">Aarav Mehta</h2>
                  <p className="text-muted font-dm text-sm">+91 98765 12345 · aarav@email.com</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Full Name', val: 'Aarav Mehta' },
                  { label: 'Phone', val: '+91 98765 12345' },
                  { label: 'Email', val: 'aarav@email.com' },
                  { label: 'City', val: 'New Delhi' },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between py-3 border-b border-border last:border-0">
                    <span className="text-muted font-dm text-sm">{label}</span>
                    <span className="text-bright font-dm text-sm">{val}</span>
                  </div>
                ))}
              </div>
              <button className="btn-acid w-full mt-4 text-sm">Edit Profile</button>
            </div>

            <div className="card">
              <h3 className="font-syne font-bold text-bright mb-4">Saved Places</h3>
              <div className="space-y-2">
                {[
                  { icon: '🏠', label: 'Home', addr: 'Sector 15, Noida' },
                  { icon: '🏢', label: 'Office', addr: 'Cyber City, Gurugram' },
                  { icon: '❤️', label: 'Favourite', addr: 'Connaught Place' },
                ].map(({ icon, label, addr }) => (
                  <div key={label} className="flex items-center gap-3 py-2">
                    <span className="text-xl">{icon}</span>
                    <div>
                      <div className="text-sm font-dm font-medium text-bright">{label}</div>
                      <div className="text-xs text-muted">{addr}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}