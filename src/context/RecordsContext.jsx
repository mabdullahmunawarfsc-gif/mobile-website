import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { generateDemoRecords } from '../utils/seedData'

const RecordsContext = createContext(null)

const STORAGE_KEY = 'mobile-ledger-records'

function loadRecords() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

export function RecordsProvider({ children }) {
  const [records, setRecords] = useState(() => {
    const existing = loadRecords()
    // Auto-load demo data only when localStorage is empty
    if (existing.length === 0) {
      const demo = generateDemoRecords()
      saveRecords(demo)
      return demo
    }
    return existing
  })
  const [toast, setToast] = useState(null)

  // Persist to localStorage whenever records change
  useEffect(() => {
    saveRecords(records)
  }, [records])

  // Auto-dismiss toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
  }, [])

  const addRecord = useCallback((record) => {
    const newRecord = {
      ...record,
      id: crypto.randomUUID(),
      status: 'in-stock',
      createdAt: new Date().toISOString(),
    }
    setRecords((prev) => [newRecord, ...prev])
    return newRecord
  }, [])

  const markAsSold = useCallback((id, saleData) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'sold',
              salePrice: saleData.salePrice,
              saleDate: saleData.saleDate,
              buyerName: saleData.buyerName || '',
              profit: saleData.salePrice - r.purchasePrice,
            }
          : r
      )
    )
  }, [])

  const deleteRecord = useCallback((id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id))
  }, [])

  const getRecord = useCallback(
    (id) => records.find((r) => r.id === id) || null,
    [records]
  )

  const loadDemoData = useCallback(() => {
    const demo = generateDemoRecords()
    setRecords(demo)
    showToast('Demo data loaded successfully!')
  }, [showToast])

  const clearAllData = useCallback(() => {
    setRecords([])
    showToast('All data cleared')
  }, [showToast])

  const value = {
    records,
    addRecord,
    markAsSold,
    deleteRecord,
    getRecord,
    loadDemoData,
    clearAllData,
    toast,
    showToast,
  }

  return (
    <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>
  )
}

export function useRecords() {
  const context = useContext(RecordsContext)
  if (!context) {
    throw new Error('useRecords must be used within a RecordsProvider')
  }
  return context
}
