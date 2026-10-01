import { useState, useRef } from 'react'
import { Upload, X, Camera } from 'lucide-react'
import { compressImage } from '../utils/imageCompress'

export default function ImageUpload({
  label,
  required = false,
  value,
  onChange,
  error,
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const inputRef = useRef(null)

  const handleFile = async (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      onChange(null, 'Please select an image file')
      return
    }
    setIsProcessing(true)
    try {
      const compressed = await compressImage(file, 800, 0.7)
      onChange(compressed, null)
    } catch (err) {
      onChange(null, 'Failed to process image')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleInputChange = (e) => {
    const file = e.target.files?.[0]
    handleFile(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    handleFile(file)
  }

  const handleRemove = () => {
    onChange(null, null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt={label}
            className="w-full h-48 object-cover rounded-xl border border-gray-200"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative cursor-pointer border-2 border-dashed rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center gap-2 transition-colors ${
            isDragging
              ? 'border-primary-400 bg-primary-50'
              : error
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }`}
        >
          {isProcessing ? (
            <div className="animate-spin w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full" />
          ) : (
            <>
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 text-center">
                <span className="font-medium text-primary-600">Click to upload</span> or drag & drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  )
}
