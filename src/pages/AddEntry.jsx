import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, ArrowLeft } from 'lucide-react'
import { useRecords } from '../context/RecordsContext'
import ImageUpload from '../components/ImageUpload'
import { getToday } from '../utils/formatPKR'

const initialForm = {
  date: getToday(),
  modelName: '',
  imei: '',
  purchasePrice: '',
  sellerName: '',
  sellerPhone: '',
  mobilePhoto: null,
  sellerPhoto: null,
  cnicFront: null,
  cnicBack: null,
}

export default function AddEntry() {
  const navigate = useNavigate()
  const { addRecord, showToast } = useRecords()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const setImageField = (field, value, error) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }))
    } else if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!form.modelName.trim()) newErrors.modelName = 'Mobile model name is required'
    if (!form.purchasePrice || parseFloat(form.purchasePrice) <= 0)
      newErrors.purchasePrice = 'Purchase price is required'
    if (!form.sellerName.trim()) newErrors.sellerName = 'Seller name is required'
    if (!form.mobilePhoto) newErrors.mobilePhoto = 'Mobile photo is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // Scroll to first error
      const firstError = document.querySelector('[data-error]')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setIsSubmitting(true)
    try {
      addRecord({
        date: form.date,
        modelName: form.modelName.trim(),
        imei: form.imei.trim(),
        purchasePrice: parseFloat(form.purchasePrice),
        sellerName: form.sellerName.trim(),
        sellerPhone: form.sellerPhone.trim(),
        mobilePhoto: form.mobilePhoto,
        sellerPhoto: form.sellerPhoto,
        cnicFront: form.cnicFront,
        cnicBack: form.cnicBack,
      })
      showToast('Record saved successfully!')
      navigate('/records')
    } catch {
      showToast('Failed to save record', 'error')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add Entry</h1>
          <p className="text-sm text-gray-500">Add a new phone purchase record</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setField('date', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
          />
        </div>

        {/* Mobile Info Section */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-5">
          <h2 className="text-base font-semibold text-gray-900">Mobile Information</h2>

          {/* Model Name */}
          <div data-error={errors.modelName ? '' : undefined}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Mobile Model Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.modelName}
              onChange={(e) => setField('modelName', e.target.value)}
              placeholder="e.g., iPhone 15 Pro, Samsung S24 Ultra"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.modelName ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all`}
            />
            {errors.modelName && <p className="mt-1.5 text-sm text-red-600">{errors.modelName}</p>}
          </div>

          {/* IMEI */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              IMEI / Mobile Number
            </label>
            <input
              type="text"
              value={form.imei}
              onChange={(e) => setField('imei', e.target.value)}
              placeholder="e.g., 356789012345678 or 03001234567"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
          </div>

          {/* Purchase Price */}
          <div data-error={errors.purchasePrice ? '' : undefined}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Purchase Price (PKR) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={form.purchasePrice}
              onChange={(e) => setField('purchasePrice', e.target.value)}
              placeholder="e.g., 85000"
              min="0"
              step="0.01"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.purchasePrice ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all`}
            />
            {errors.purchasePrice && <p className="mt-1.5 text-sm text-red-600">{errors.purchasePrice}</p>}
          </div>

          {/* Mobile Photo */}
          <div data-error={errors.mobilePhoto ? '' : undefined}>
            <ImageUpload
              label="Mobile Photo"
              required
              value={form.mobilePhoto}
              onChange={(val, err) => setImageField('mobilePhoto', val, err)}
              error={errors.mobilePhoto}
            />
          </div>
        </div>

        {/* Seller Info Section */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 space-y-5">
          <h2 className="text-base font-semibold text-gray-900">Seller Information</h2>

          {/* Seller Name */}
          <div data-error={errors.sellerName ? '' : undefined}>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Seller Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.sellerName}
              onChange={(e) => setField('sellerName', e.target.value)}
              placeholder="e.g., Ahmed Khan"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.sellerName ? 'border-red-300 bg-red-50' : 'border-gray-300'
              } focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all`}
            />
            {errors.sellerName && <p className="mt-1.5 text-sm text-red-600">{errors.sellerName}</p>}
          </div>

          {/* Seller Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Seller Phone Number
            </label>
            <input
              type="tel"
              value={form.sellerPhone}
              onChange={(e) => setField('sellerPhone', e.target.value)}
              placeholder="e.g., 03001234567"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            />
          </div>

          {/* Seller Photo */}
          <ImageUpload
            label="Seller Photo"
            value={form.sellerPhoto}
            onChange={(val, err) => setImageField('sellerPhoto', val, err)}
          />

          {/* CNIC Front */}
          <ImageUpload
            label="Seller CNIC Front"
            value={form.cnicFront}
            onChange={(val, err) => setImageField('cnicFront', val, err)}
          />

          {/* CNIC Back */}
          <ImageUpload
            label="Seller CNIC Back"
            value={form.cnicBack}
            onChange={(val, err) => setImageField('cnicBack', val, err)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-base transition-colors shadow-lg shadow-primary-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          {isSubmitting ? 'Saving...' : 'Save Record'}
        </button>
      </form>
    </div>
  )
}
