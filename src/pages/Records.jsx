import { useState, useMemo } from 'react'
import { Search, Package, CheckCircle2, DollarSign, TrendingUp, Smartphone } from 'lucide-react'
import { useRecords } from '../context/RecordsContext'
import RecordCard from '../components/RecordCard'
import StatCard from '../components/StatCard'
import SoldModal from '../components/SoldModal'
import ConfirmDialog from '../components/ConfirmDialog'
import { formatPKR } from '../utils/formatPKR'

const filterTabs = [
  { key: 'all', label: 'All' },
  { key: 'in-stock', label: 'In Stock' },
  { key: 'sold', label: 'Sold' },
]

export default function Records() {
  const { records, markAsSold, deleteRecord, showToast } = useRecords()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [soldModalRecord, setSoldModalRecord] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  // Filter + search records
  const filteredRecords = useMemo(() => {
    let result = records

    // Filter by status
    if (activeFilter !== 'all') {
      result = result.filter((r) => r.status === activeFilter)
    }

    // Search by model or seller name
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (r) =>
          r.modelName.toLowerCase().includes(q) ||
          r.sellerName.toLowerCase().includes(q)
      )
    }

    return result
  }, [records, activeFilter, search])

  // Stats
  const stats = useMemo(() => {
    const total = records.length
    const inStock = records.filter((r) => r.status === 'in-stock').length
    const sold = records.filter((r) => r.status === 'sold').length
    const totalProfit = records
      .filter((r) => r.status === 'sold')
      .reduce((sum, r) => sum + (r.profit || 0), 0)
    return { total, inStock, sold, totalProfit }
  }, [records])

  const handleMarkSold = (record) => {
    setSoldModalRecord(record)
  }

  const handleConfirmSale = (id, saleData) => {
    markAsSold(id, saleData)
    setSoldModalRecord(null)
    showToast('Record marked as sold!')
  }

  const handleDelete = (record) => {
    setDeleteTarget(record)
  }

  const confirmDelete = () => {
    deleteRecord(deleteTarget.id)
    setDeleteTarget(null)
    showToast('Record deleted')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">View Records</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your phone inventory</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label="Total Phones" value={stats.total} icon={Smartphone} color="primary" />
        <StatCard label="In Stock" value={stats.inStock} icon={Package} color="amber" />
        <StatCard label="Sold" value={stats.sold} icon={CheckCircle2} color="green" />
        <StatCard label="Total Profit" value={formatPKR(stats.totalProfit)} icon={TrendingUp} color="green" />
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by model or seller name..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === tab.key
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Records Grid */}
      {filteredRecords.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredRecords.map((record) => (
            <RecordCard
              key={record.id}
              record={record}
              onMarkSold={handleMarkSold}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-16 sm:py-24">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Package className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No records found</h3>
          <p className="text-sm text-gray-500 text-center max-w-sm">
            {search || activeFilter !== 'all'
              ? 'Try adjusting your search or filter'
              : 'Start by adding your first phone purchase record'}
          </p>
        </div>
      )}

      {/* Sold Modal */}
      <SoldModal
        isOpen={!!soldModalRecord}
        record={soldModalRecord}
        onConfirm={handleConfirmSale}
        onClose={() => setSoldModalRecord(null)}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Record"
        message={`Are you sure you want to delete "${deleteTarget?.modelName}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
