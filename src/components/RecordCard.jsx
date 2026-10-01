import { useNavigate } from 'react-router-dom'
import { Check, Trash2 } from 'lucide-react'
import { formatPKR } from '../utils/formatPKR'

export default function RecordCard({ record, onMarkSold, onDelete }) {
  const navigate = useNavigate()
  const isSold = record.status === 'sold'

  const handleCardClick = () => {
    navigate(`/records/${record.id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {record.mobilePhoto ? (
          <img
            src={record.mobilePhoto}
            alt={record.modelName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <span className="text-4xl">📱</span>
          </div>
        )}

        {/* SOLD Badge */}
        {isSold && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            SOLD
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-base truncate">
          {record.modelName}
        </h3>
        <p className="text-primary-600 font-bold text-lg mt-1">
          {formatPKR(record.purchasePrice)}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
          {!isSold && (
            <button
              onClick={() => onMarkSold(record)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors"
            >
              <Check className="w-4 h-4" />
              Mark as Sold
            </button>
          )}
          <button
            onClick={() => onDelete(record)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
