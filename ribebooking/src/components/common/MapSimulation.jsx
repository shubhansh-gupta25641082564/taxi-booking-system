import { useEffect, useRef, useState } from 'react'

export default function MapSimulation({ 
  showDrivers = false, 
  driverMoving = false,
  showRoute = false,
  className = ''
}) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const [driverPos, setDriverPos] = useState({ x: 0.7, y: 0.3 })
  const [tick, setTick] = useState(0)

  // Static road network
  const roads = {
    horizontal: [15, 30, 45, 60, 75],
    vertical: [15, 30, 45, 60, 75],
  }

  const drivers = [
    { x: 0.72, y: 0.28, label: 'D1', moving: driverMoving },
    { x: 0.35, y: 0.55, label: 'D2', moving: false },
    { x: 0.55, y: 0.7, label: 'D3', moving: false },
    { x: 0.2, y: 0.3, label: 'D4', moving: false },
  ]

  const pickup = { x: 0.5, y: 0.5 }
  const dropoff = { x: 0.25, y: 0.25 }

  useEffect(() => {
    if (!driverMoving) return
    const interval = setInterval(() => {
      setDriverPos(prev => ({
        x: prev.x + (pickup.x - prev.x) * 0.05,
        y: prev.y + (pickup.y - prev.y) * 0.05,
      }))
    }, 200)
    return () => clearInterval(interval)
  }, [driverMoving])

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height

    ctx.clearRect(0, 0, W, H)

    // Background
    ctx.fillStyle = '#111118'
    ctx.fillRect(0, 0, W, H)

    // Grid
    ctx.strokeStyle = 'rgba(232,255,71,0.04)'
    ctx.lineWidth = 1
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
    }

    // Roads horizontal
    const hPositions = [0.2, 0.4, 0.6, 0.8].map(p => p * H)
    const vPositions = [0.2, 0.35, 0.5, 0.65, 0.8].map(p => p * W)

    ctx.strokeStyle = 'rgba(255,255,255,0.08)'
    ctx.lineWidth = 6
    ctx.lineCap = 'round'
    hPositions.forEach(y => {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
    })
    vPositions.forEach(x => {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
    })

    // Road center lines
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'
    ctx.lineWidth = 1
    ctx.setLineDash([8, 12])
    hPositions.forEach(y => {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
    })
    ctx.setLineDash([])

    // Route line
    if (showRoute) {
      const px = pickup.x * W, py = pickup.y * H
      const dx = driverPos.x * W, dy = driverPos.y * H

      ctx.strokeStyle = 'rgba(232,255,71,0.5)'
      ctx.lineWidth = 2.5
      ctx.setLineDash([6, 4])
      ctx.beginPath()
      ctx.moveTo(dx, dy)
      ctx.lineTo(px, py)
      ctx.stroke()
      ctx.setLineDash([])

      if (dropoff) {
        ctx.strokeStyle = 'rgba(100,100,255,0.4)'
        ctx.lineWidth = 2.5
        ctx.setLineDash([6, 4])
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(dropoff.x * W, dropoff.y * H)
        ctx.stroke()
        ctx.setLineDash([])
      }
    }

    // Radius circle
    if (showDrivers) {
      const px = pickup.x * W, py = pickup.y * H
      const radius = Math.min(W, H) * 0.35
      const gradient = ctx.createRadialGradient(px, py, 0, px, py, radius)
      gradient.addColorStop(0, 'rgba(232,255,71,0.08)')
      gradient.addColorStop(1, 'rgba(232,255,71,0)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(px, py, radius, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = 'rgba(232,255,71,0.2)'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 8])
      ctx.beginPath()
      ctx.arc(px, py, radius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Pickup marker
    const px = pickup.x * W, py = pickup.y * H
    ctx.fillStyle = '#E8FF47'
    ctx.shadowColor = '#E8FF47'
    ctx.shadowBlur = 20
    ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2); ctx.fill()
    ctx.shadowBlur = 0
    ctx.fillStyle = '#0A0A0F'
    ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill()

    // Pickup label
    ctx.fillStyle = '#E8FF47'
    ctx.font = 'bold 10px DM Sans'
    ctx.textAlign = 'center'
    ctx.fillText('YOU', px, py - 16)

    // Dropoff marker
    if (showRoute && dropoff) {
      const ddx = dropoff.x * W, ddy = dropoff.y * H
      ctx.fillStyle = '#6464FF'
      ctx.shadowColor = '#6464FF'
      ctx.shadowBlur = 15
      ctx.beginPath(); ctx.arc(ddx, ddy, 10, 0, Math.PI * 2); ctx.fill()
      ctx.shadowBlur = 0
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 10px DM Sans'
      ctx.fillText('DEST', ddx, ddy - 16)
    }

    // Driver markers
    if (showDrivers) {
      const activeDriver = { x: driverPos.x * W, y: driverPos.y * H, label: 'D1' }
      const staticDrivers = [
        { x: 0.35 * W, y: 0.55 * H, label: 'D2' },
        { x: 0.55 * W, y: 0.7 * H, label: 'D3' },
        { x: 0.2 * W, y: 0.3 * H, label: 'D4' },
      ]

      const allDrivers = driverMoving ? [activeDriver, ...staticDrivers] : [
        { x: 0.72 * W, y: 0.28 * H, label: 'D1' },
        ...staticDrivers
      ]

      allDrivers.forEach((d, i) => {
        const isActive = i === 0 && driverMoving
        ctx.fillStyle = isActive ? '#E8FF47' : 'rgba(255,255,255,0.7)'
        ctx.shadowColor = isActive ? '#E8FF47' : 'rgba(255,255,255,0.3)'
        ctx.shadowBlur = isActive ? 15 : 8

        // Taxi icon (rectangle + top)
        ctx.beginPath()
        ctx.roundRect(d.x - 10, d.y - 7, 20, 14, 4)
        ctx.fill()

        ctx.shadowBlur = 0
        ctx.fillStyle = isActive ? '#0A0A0F' : '#1A1A24'
        ctx.font = 'bold 7px DM Sans'
        ctx.textAlign = 'center'
        ctx.fillText('🚖', d.x, d.y + 4)
      })
    }

  }, [showDrivers, showRoute, driverPos, tick])

  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}>
      <canvas 
        ref={canvasRef}
        width={600} 
        height={400}
        className="w-full h-full"
      />
      <div className="absolute top-3 left-3 glass px-3 py-1.5 rounded-lg text-xs font-dm text-muted">
        📍 New Delhi, India
      </div>
      {showDrivers && (
        <div className="absolute top-3 right-3 glass px-3 py-1.5 rounded-lg text-xs font-dm">
          <span className="text-acid font-bold">4</span>
          <span className="text-muted ml-1">drivers nearby</span>
        </div>
      )}
    </div>
  )
}