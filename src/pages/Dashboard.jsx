import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Legend, Cell,
} from 'recharts'
import {
  Smartphone, Package, CheckCircle2, DollarSign, TrendingUp, TrendingDown,
  Wallet, Plus, List, Calendar, Trash2, Database,
} from 'lucide-react'
import { useRecords } from '../context/RecordsContext'
import { formatPKR, formatDate } from '../utils/formatPKR'
import ConfirmDialog from '../components/ConfirmDialog'

const dateRanges = [
  { key: 'today', label: 'Today' },
  { key: 'week', label: 'This Week' },
  { key: 'month', label: 'This Month' },
  { key: 'all', label: 'All Time' },
]

function getDateRange(rangeKey) {
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  switch (rangeKey) {
    case 'today':
      return { start: startOfToday, end: now }
    case 'week': {
      const startOfWeek = new Date(startOfToday)
      startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay())
      return { start: startOfWeek, end: now }
    }
    case 'month': {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      return { start: startOfMonth, end: now }
    }
    default:
      return { start: null, end: null }
  }
}

export default function Dashboard() {
  const { records, loadDemoData, clearAllData } = useRecords()
  const [dateRange, setDateRange] = useState('all')
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const filteredRecords = useMemo(() => {
    const { start, end } = getDateRange(dateRange)
    if (!start || !end) return records
    return records.filter((r) => {
      const recordDate = new Date(r.saleDate || r.createdAt)
      return recordDate >= start && recordDate <= end
    })
  }, [records, dateRange])

  const stats = useMemo(() => {
    const total = records.length
    const inStock = records.filter((r) => r.status === 'in-stock').length
    const sold = records.filter((r) => r.status === 'sold').length
    const inventoryValue = records
      .filter((r) => r.status === 'in-stock')
      .reduce((sum, r) => sum + r.purchasePrice, 0)
    const totalSales = filteredRecords
      .filter((r) => r.status === 'sold')
      .reduce((sum, r) => sum + (r.salePrice || 0), 0)
    const totalProfit = filteredRecords
      .filter((r) => r.status === 'sold' && r.profit > 0)
      .reduce((sum, r) => sum + r.profit, 0)
    const totalLoss = filteredRecords
      .filter((r) => r.status === 'sold' && r.profit < 0)
      .reduce((sum, r) => sum + Math.abs(r.profit), 0)
    const netProfit = totalProfit - totalLoss
    return { total, inStock, sold, inventoryValue, totalSales, totalProfit, totalLoss, netProfit }
  }, [records, filteredRecords])

  const monthlyData = useMemo(() => {
    const months = {}
    const now = new Date()
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      months[key] = {
        month: d.toLocaleDateString('en-PK', { month: 'short' }),
        profit: 0,
        loss: 0,
      }
    }
    filteredRecords
      .filter((r) => r.status === 'sold')
      .forEach((r) => {
        const d = new Date(r.saleDate || r.createdAt)
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        if (months[key]) {
          if (r.profit >= 0) {
            months[key].profit += r.profit
          } else {
            months[key].loss += Math.abs(r.profit)
          }
        }
      })
    return Object.values(months)
  }, [filteredRecords])

  const donutData = useMemo(() => [
    { name: 'In Stock', value: stats.inStock, color: '#3b82f6' },
    { name: 'Sold', value: stats.sold, color: '#22c55e' },
  ], [stats.inStock, stats.sold])

  const recentSales = useMemo(() => {
    return records
      .filter((r) => r.status === 'sold')
      .sort((a, b) => new Date(b.saleDate || b.createdAt) - new Date(a.saleDate || a.createdAt))
      .slice(0, 5)
  }, [records])

  const recentAdded = useMemo(() => {
    return [...records]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
  }, [records])

  const hasData = records.length > 0
  const todayFormatted = new Date().toLocaleDateString('en-PK', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-24 md:pb-8">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-6 sm:p-8 mb-6 shadow-xl shadow-blue-900/20">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-1">{todayFormatted}</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Assalam o Alaikum, welcome back
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-blue-200 text-sm">Net Profit:</span>
                <span className={`text-2xl sm:text-3xl font-bold ${stats.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatPKR(Math.abs(stats.netProfit))}
                </span>
              </div>
            </div>
            <Link
              to="/add"
              className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-800 font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add New Entry
            </Link>
          </div>
        </div>

        {/* Date Range Filter + Data Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200/60 self-start">
            {dateRanges.map((range) => (
              <button
                key={range.key}
                onClick={() => setDateRange(range.key)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  dateRange === range.key
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 self-start">
            <button
              onClick={loadDemoData}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
            >
              <Database className="w-3.5 h-3.5" />
              Load Demo Data
            </button>
            {hasData && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-red-200 text-red-600 text-xs font-medium hover:bg-red-50 transition-colors shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {!hasData && (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Smartphone className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No data yet</h3>
            <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
              Add your first phone purchase record or load demo data to explore the dashboard
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/add"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
              >
                <Plus className="w-4 h-4" />
                Add Your First Entry
              </Link>
              <button
                onClick={loadDemoData}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                <Database className="w-4 h-4" />
                Load Demo Data
              </button>
            </div>
          </div>
        )}

        {hasData && (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <DashStatCard
                icon={Smartphone}
                label="Total Phones"
                value={String(stats.total)}
                subtitle="All records"
                gradient="from-blue-500 to-blue-600"
              />
              <DashStatCard
                icon={Package}
                label="In Stock"
                value={String(stats.inStock)}
                subtitle="Available"
                gradient="from-orange-400 to-orange-500"
              />
              <DashStatCard
                icon={CheckCircle2}
                label="Sold Items"
                value={String(stats.sold)}
                subtitle="Completed sales"
                gradient="from-green-500 to-green-600"
              />
              <DashStatCard
                icon={Wallet}
                label="Inventory Value"
                value={formatPKR(stats.inventoryValue)}
                subtitle="Unsold stock"
                gradient="from-purple-500 to-purple-600"
              />
              <DashStatCard
                icon={DollarSign}
                label="Total Sales"
                value={formatPKR(stats.totalSales)}
                subtitle="Revenue"
                gradient="from-emerald-500 to-emerald-600"
              />
              <DashStatCard
                icon={TrendingUp}
                label="Total Profit"
                value={formatPKR(stats.totalProfit)}
                subtitle="Gross profit"
                gradient="from-green-500 to-green-600"
              />
              <DashStatCard
                icon={TrendingDown}
                label="Total Loss"
                value={formatPKR(stats.totalLoss)}
                subtitle="Gross loss"
                gradient="from-red-500 to-red-600"
              />
              <DashStatCard
                icon={stats.netProfit >= 0 ? TrendingUp : TrendingDown}
                label="Net Profit/Loss"
                value={formatPKR(Math.abs(stats.netProfit))}
                subtitle={stats.netProfit >= 0 ? 'Net profit' : 'Net loss'}
                gradient={stats.netProfit >= 0 ? 'from-green-500 to-emerald-600' : 'from-red-500 to-red-600'}
                valueColor={stats.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
              {/* Monthly Profit/Loss Bar Chart */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Monthly Profit & Loss</h3>
                <div className="h-64 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} />
                      <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                      <Tooltip
                        formatter={(value, name) => [formatPKR(value), name === 'profit' ? 'Profit' : 'Loss']}
                        contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                      />
                      <Bar dataKey="profit" fill="#22c55e" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="loss" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Donut Chart */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Stock vs Sold</h3>
                <div className="h-64 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {donutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [value, name]}
                        contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        iconSize={10}
                        formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Lists Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
              {/* Recent Sales */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Sales</h3>
                {recentSales.length > 0 ? (
                  <div className="space-y-3">
                    {recentSales.map((record) => (
                      <Link
                        key={record.id}
                        to={`/records/${record.id}`}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                          {record.mobilePhoto ? (
                            <img src={record.mobilePhoto} alt={record.modelName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">📱</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{record.modelName}</p>
                          <p className="text-xs text-gray-500">{formatDate(record.saleDate)}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-semibold text-gray-900">{formatPKR(record.salePrice)}</p>
                          <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                            record.profit >= 0
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {record.profit >= 0 ? '+' : ''}{formatPKR(record.profit)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 text-center py-8">No sales yet</p>
                )}
              </div>

              {/* Recently Added */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Recently Added</h3>
                {recentAdded.length > 0 ? (
                  <div className="space-y-3">
                    {recentAdded.map((record) => (
                      <Link
                        key={record.id}
                        to={`/records/${record.id}`}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                          {record.mobilePhoto ? (
                            <img src={record.mobilePhoto} alt={record.modelName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">📱</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{record.modelName}</p>
                          <p className="text-xs text-gray-500">{formatDate(record.date || record.createdAt)}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-semibold text-gray-900">{formatPKR(record.purchasePrice)}</p>
                          <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                            record.status === 'sold'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {record.status === 'sold' ? 'Sold' : 'In Stock'}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 text-center py-8">No records yet</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/add"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-lg shadow-blue-600/20"
              >
                <Plus className="w-5 h-5" />
                Add New Entry
              </Link>
              <Link
                to="/records"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold transition-colors"
              >
                <List className="w-5 h-5" />
                View All Records
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Clear All Confirmation */}
      <ConfirmDialog
        isOpen={showClearConfirm}
        title="Clear All Data"
        message="Are you sure you want to delete all records? This action cannot be undone."
        confirmLabel="Clear All"
        onConfirm={() => { clearAllData(); setShowClearConfirm(false) }}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  )
}

function DashStatCard({ icon: Icon, label, value, subtitle, gradient, valueColor }) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-sm`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">{label}</p>
          <p className={`text-lg sm:text-2xl font-bold truncate ${valueColor || 'text-gray-900'}`}>{value}</p>
          <p className="text-xs text-gray-400 hidden sm:block">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
