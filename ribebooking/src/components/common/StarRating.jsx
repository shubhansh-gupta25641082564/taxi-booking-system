import { Star } from 'lucide-react'

export default function StarRating({ rating, size = 14, interactive = false, onChange }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star
          key={s}
          size={size}
          className={`transition-colors ${
            s <= rating ? 'text-acid fill-acid' : 'text-muted'
          } ${interactive ? 'cursor-pointer hover:text-acid' : ''}`}
          onClick={() => interactive && onChange && onChange(s)}
        />
      ))}
    </div>
  )
}