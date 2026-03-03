import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import RiderDashboard from './pages/RiderDashboard'
import DriverDashboard from './pages/DriverDashboard'
import AdminDashboard from './pages/AdminDashboard'
import BookingFlow from './pages/BookingFlow'
import TripTracking from './pages/TripTracking'

function App() {
  return (
    <div className="min-h-screen mesh-bg">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/rider" element={<RiderDashboard />} />
        <Route path="/rider/book" element={<BookingFlow />} />
        <Route path="/rider/track" element={<TripTracking />} />
        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  )
}

export default App