import { useState, useEffect } from 'react'
import { X, TrendingUp, TrendingDown } from 'lucide-react'
import { formatPKR, getToday } from '../utils/formatPKR'

export default function SoldModal({ isOpen, record, onConfirm, onClose }) {
  const [salePrice, setSalePrice] = useState('')
  const [buyerName, setBuyerName] = useState('')
  const [saleDate, setSaleDate] = useState(getToday())
  const [error, setError] = useState('')

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSalePrice('')
      setBuyerName('')
      setSaleDate(getToday())
      setError('')
    }
  }, [isOpen])

  if (!isOpen || !record) return null

  const purchasePrice = record.purchasePrice
  const salePriceNum = parseFloat(salePrice) || 0
  const profit = salePriceNum - purchasePrice
  const isProfit = profit >= 0

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!salePrice || salePriceNum <= 0) {
      setError('Please enter a valid sale price')
      return
    }
    onConfirm(record.id, {
      salePrice: salePriceNum,
      buyerName: buyerName.trim(),
      saleDate,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
        {/* Handle bar for mobile */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Mark as Sold</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Record info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="font-semibold text-gray-900">{record.modelName}</p>
            <p className="text-sm text-gray-500 mt-1">
              Purchase Price: <span className="font-medium text-gray-700">{formatPKR(purchasePrice)}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sale Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Sale Price (PKR) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={salePrice}
                onChange={(e) => { setSalePrice(e.target.value); setError('') }}
                placeholder="Enter sale price"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-lg"
                min="0"
                step="0.01"
                autoFocus
              />
              {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
            </div>

            {/* Buyer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Buyer Name <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                placeholder="Enter buyer name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              />
            </div>

            {/* Sale Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Sale Date
              </label>
              <input
                type="date"
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              />
            </div>

            {/* Profit/Loss Preview */}
            {salePrice && salePriceNum > 0 && (
              <div className={`rounded-xl p-4 flex items-center gap-3 ${
                isProfit ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                {isProfit ? (
                  <TrendingUp className="w-6 h-6 text-green-600 shrink-0" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-600 shrink-0" />
                )}
                <div>
                  <p className={`text-sm font-medium ${isProfit ? 'text-green-700' : 'text-red-700'}`}>
                    {isProfit ? 'Profit' : 'Loss'}
                  </p>
                  <p className={`text-lg font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPKR(Math.abs(profit))}
                  </p>
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-base transition-colors shadow-lg shadow-green-600/20"
            >
              Confirm Sale
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
