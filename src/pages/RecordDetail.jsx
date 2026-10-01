import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  User,
  Phone,
  Hash,
  Tag,
  TrendingUp,
  TrendingDown,
  ZoomIn,
} from 'lucide-react'
import { useRecords } from '../context/RecordsContext'
import Lightbox from '../components/Lightbox'
import SoldModal from '../components/SoldModal'
import { formatPKR, formatDate } from '../utils/formatPKR'

export default function RecordDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getRecord, markAsSold, showToast } = useRecords()
  const [lightbox, setLightbox] = useState({ isOpen: false, image: null, title: '' })
  const [showSoldModal, setShowSoldModal] = useState(false)

  const record = getRecord(id)

  if (!record) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Hash className="w-10 h-10 text-gray-300" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Record Not Found</h2>
        <p className="text-gray-500 mb-6">This record may have been deleted.</p>
        <Link
          to="/records"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Records
        </Link>
      </div>
    )
  }

  const isSold = record.status === 'sold'
  const profit = record.profit || 0
  const isProfit = profit >= 0

  const openLightbox = (image, title) => {
    setLightbox({ isOpen: true, image, title })
  }

  const handleConfirmSale = (id, saleData) => {
    markAsSold(id, saleData)
    setShowSoldModal(false)
    showToast('Record marked as sold!')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Records</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Left: Images */}
        <div className="space-y-4">
          {/* Main Mobile Photo */}
          <div
            className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-zoom-in group"
            onClick={() => record.mobilePhoto && openLightbox(record.mobilePhoto, record.modelName)}
          >
            {record.mobilePhoto ? (
              <>
                <img
                  src={record.mobilePhoto}
                  alt={record.modelName}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </>
            ) : (
              <div className="w-full aspect-[4/3] flex items-center justify-center text-gray-300 text-6xl">
                📱
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-3 gap-3">
            {record.sellerPhoto && (
              <div
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-zoom-in group"
                onClick={() => openLightbox(record.sellerPhoto, 'Seller Photo')}
              >
                <img src={record.sellerPhoto} alt="Seller" className="w-full aspect-square object-cover group-hover:scale-105 transition-transform" />
              </div>
            )}
            {record.cnicFront && (
              <div
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-zoom-in group"
                onClick={() => openLightbox(record.cnicFront, 'CNIC Front')}
              >
                <img src={record.cnicFront} alt="CNIC Front" className="w-full aspect-square object-cover group-hover:scale-105 transition-transform" />
              </div>
            )}
            {record.cnicBack && (
              <div
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-zoom-in group"
                onClick={() => openLightbox(record.cnicBack, 'CNIC Back')}
              >
                <img src={record.cnicBack} alt="CNIC Back" className="w-full aspect-square object-cover group-hover:scale-105 transition-transform" />
              </div>
            )}
          </div>
        </div>

        {/* Right: Details */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
            {/* Model Name + Status */}
            <div className="flex items-start justify-between gap-3 mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{record.modelName}</h1>
              {isSold && (
                <span className="shrink-0 bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">
                  SOLD
                </span>
              )}
            </div>

            {/* Info Grid */}
            <div className="space-y-4">
              <InfoRow icon={Hash} label="IMEI / Number" value={record.imei || '—'} />
              <InfoRow icon={Calendar} label="Date Added" value={formatDate(record.date || record.createdAt)} />
              <InfoRow icon={User} label="Seller Name" value={record.sellerName} />
              <InfoRow icon={Phone} label="Seller Phone" value={record.sellerPhone || '—'} />
              <InfoRow icon={Tag} label="Purchase Price" value={formatPKR(record.purchasePrice)} />
            </div>

            {/* Sale Info (only if sold) */}
            {isSold && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Sale Information
                </h3>
                <div className="space-y-4">
                  <InfoRow icon={Tag} label="Sale Price" value={formatPKR(record.salePrice)} />
                  <InfoRow icon={Calendar} label="Sale Date" value={formatDate(record.saleDate)} />
                  <InfoRow icon={User} label="Buyer Name" value={record.buyerName || '—'} />
                  <div className={`flex items-center gap-3 p-4 rounded-xl ${
                    isProfit ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    {isProfit ? (
                      <TrendingUp className="w-5 h-5 text-green-600 shrink-0" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600 shrink-0" />
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
                </div>
              </div>
            )}

            {/* Mark as Sold Button (only if not sold) */}
            {!isSold && (
              <button
                onClick={() => setShowSoldModal(true)}
                className="w-full mt-6 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors shadow-lg shadow-green-600/20"
              >
                Mark as Sold
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightbox.isOpen}
        image={lightbox.image}
        title={lightbox.title}
        onClose={() => setLightbox({ isOpen: false, image: null, title: '' })}
      />

      {/* Sold Modal */}
      <SoldModal
        isOpen={showSoldModal}
        record={record}
        onConfirm={handleConfirmSale}
        onClose={() => setShowSoldModal(false)}
      />
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-gray-500" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900 truncate">{value}</p>
      </div>
    </div>
  )
}
