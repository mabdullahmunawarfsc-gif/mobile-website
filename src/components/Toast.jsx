import { CheckCircle2, XCircle } from 'lucide-react'
import { useRecords } from '../context/RecordsContext'

export default function Toast() {
  const { toast } = useRecords()

  if (!toast) return null

  const isSuccess = toast.type !== 'error'

  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto sm:w-96 z-50 animate-in slide-in-from-top duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-lg border ${
          isSuccess
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800'
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600 shrink-0" />
        )}
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
    </div>
  )
}
