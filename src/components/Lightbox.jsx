import { useEffect } from 'react'
import { X, ZoomIn } from 'lucide-react'

export default function Lightbox({ isOpen, image, title, onClose }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen || !image) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl max-h-[90vh] w-full mx-4 flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-4">
          <h3 className="text-white font-medium text-lg">{title}</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <img
          src={image}
          alt={title}
          className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
        />
      </div>
    </div>
  )
}
