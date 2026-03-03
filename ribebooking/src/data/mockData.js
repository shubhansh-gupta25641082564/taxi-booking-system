export const mockDrivers = [
  {
    id: 'd1',
    name: 'Rajesh Kumar',
    photo: 'RK',
    vehicle: 'Swift Dzire',
    plate: 'DL 01 AB 1234',
    rating: 4.8,
    trips: 1247,
    distance: '1.2 km away',
    eta: '3 min',
    type: 'sedan',
    status: 'online',
    lat: 28.6158,
    lng: 77.2098,
  },
  {
    id: 'd2',
    name: 'Priya Singh',
    photo: 'PS',
    vehicle: 'Honda Activa',
    plate: 'DL 05 CD 5678',
    rating: 4.9,
    trips: 892,
    distance: '0.8 km away',
    eta: '2 min',
    type: 'bike',
    status: 'online',
    lat: 28.6148,
    lng: 77.2088,
  },
  {
    id: 'd3',
    name: 'Amit Sharma',
    photo: 'AS',
    vehicle: 'Ertiga',
    plate: 'DL 02 EF 9012',
    rating: 4.7,
    trips: 2341,
    distance: '2.4 km away',
    eta: '6 min',
    type: 'suv',
    status: 'online',
    lat: 28.6178,
    lng: 77.2118,
  },
]

export const mockRides = [
  {
    id: 'r1',
    pickup: 'Connaught Place, New Delhi',
    dropoff: 'India Gate, New Delhi',
    date: '2024-02-28',
    time: '14:32',
    fare: 124,
    distance: '3.2 km',
    duration: '18 min',
    driver: 'Rajesh Kumar',
    rating: 5,
    status: 'completed',
  },
  {
    id: 'r2',
    pickup: 'Lajpat Nagar Metro',
    dropoff: 'DLF Cyber City, Gurugram',
    date: '2024-02-26',
    time: '09:15',
    fare: 342,
    distance: '18.7 km',
    duration: '47 min',
    driver: 'Priya Singh',
    rating: 4,
    status: 'completed',
  },
  {
    id: 'r3',
    pickup: 'Hauz Khas Village',
    dropoff: 'Saket Mall',
    date: '2024-02-24',
    time: '20:45',
    fare: 87,
    distance: '4.1 km',
    duration: '22 min',
    driver: 'Amit Sharma',
    rating: 5,
    status: 'completed',
  },
  {
    id: 'r4',
    pickup: 'IGI Airport T3',
    dropoff: 'Vasant Kunj',
    date: '2024-02-20',
    time: '06:30',
    fare: 512,
    distance: '28.3 km',
    duration: '55 min',
    driver: 'Rajesh Kumar',
    rating: 5,
    status: 'completed',
  },
]

export const vehicleTypes = [
  { id: 'bike', label: 'Bike', icon: '🏍️', basefare: 20, perKm: 7, desc: 'Fastest for solo trips', eta: '2 min' },
  { id: 'auto', label: 'Auto', icon: '🛺', basefare: 30, perKm: 10, desc: 'Economical 3-wheeler', eta: '4 min' },
  { id: 'sedan', label: 'Sedan', icon: '🚗', basefare: 50, perKm: 12, desc: 'Comfortable AC ride', eta: '5 min' },
  { id: 'suv', label: 'SUV', icon: '🚙', basefare: 80, perKm: 18, desc: 'Premium spacious ride', eta: '8 min' },
]

export const calculateFare = (distance, duration, vehicleType, surge = 1.0) => {
  const v = vehicleTypes.find(v => v.id === vehicleType) || vehicleTypes[2]
  const base = v.basefare
  const distCharge = distance * v.perKm
  const timeCharge = duration * 2
  return Math.round((base + distCharge + timeCharge) * surge)
}

export const tripStates = ['searching', 'driver_found', 'arriving', 'trip_started', 'completed']

export const adminStats = {
  totalRides: 15847,
  activeRides: 23,
  onlineDrivers: 187,
  revenue: 284560,
  avgRating: 4.7,
  successRate: 96.3,
}

export const popularRoutes = [
  { from: 'Connaught Place', to: 'India Gate', count: 342 },
  { from: 'IGI Airport', to: 'Gurugram', count: 287 },
  { from: 'Hauz Khas', to: 'Saket', count: 198 },
  { from: 'Lajpat Nagar', to: 'Cyber City', count: 176 },
]

export const driverEarnings = {
  today: 1840,
  week: 9320,
  month: 38450,
  trips: { today: 12, week: 63, month: 247 },
}