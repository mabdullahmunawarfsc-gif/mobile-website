export default function StatCard({ label, value, icon: Icon, color = 'primary' }) {
  const colorMap = {
    primary: 'bg-primary-50 text-primary-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    amber: 'bg-amber-50 text-amber-600',
  }

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 flex items-center gap-3 sm:gap-4">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0 ${colorMap[color]}`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <div className="min-w-0">
        <p className="text-xs sm:text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{value}</p>
      </div>
    </div>
  )
}
