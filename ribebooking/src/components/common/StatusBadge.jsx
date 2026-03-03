export default function StatusBadge({ status }) {
  const configs = {
    online: { color: 'bg-green-500/20 text-green-400 border-green-500/30', dot: 'bg-green-400', label: 'Online' },
    offline: { color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', dot: 'bg-gray-400', label: 'Offline' },
    on_trip: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', dot: 'bg-blue-400', label: 'On Trip' },
    completed: { color: 'bg-green-500/20 text-green-400 border-green-500/30', dot: 'bg-green-400', label: 'Completed' },
    cancelled: { color: 'bg-red-500/20 text-red-400 border-red-500/30', dot: 'bg-red-400', label: 'Cancelled' },
    searching: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', dot: 'bg-yellow-400', label: 'Searching' },
    arriving: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', dot: 'bg-blue-400', label: 'Arriving' },
    pending: { color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', dot: 'bg-orange-400', label: 'Pending' },
    verified: { color: 'bg-green-500/20 text-green-400 border-green-500/30', dot: 'bg-green-400', label: 'Verified' },
    rejected: { color: 'bg-red-500/20 text-red-400 border-red-500/30', dot: 'bg-red-400', label: 'Rejected' },
  }

  const cfg = configs[status] || configs.offline
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-dm font-medium border ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${status === 'online' ? 'animate-pulse' : ''}`} />
      {cfg.label}
    </span>
  )
}