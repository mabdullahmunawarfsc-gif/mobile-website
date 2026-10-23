import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { generateDemoRecords } from '../utils/seedData'

const RecordsContext = createContext(null)

const STORAGE_KEY = 'mobile-ledger-records'
const SEED_VERSION_KEY = 'mobile-ledger-seed-version'
const CURRENT_SEED_VERSION = '2'

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

function getSeedVersion() {
  return localStorage.getItem(SEED_VERSION_KEY)
}

function setSeedVersion(version) {
  localStorage.setItem(SEED_VERSION_KEY, version)
}

export function RecordsProvider({ children }) {
  const [records, setRecords] = useState(() => {
    const existing = loadRecords()
    const version = getSeedVersion()

    // Auto-load demo data when localStorage is empty or seed version changed
    if (existing.length === 0 || version !== CURRENT_SEED_VERSION) {
      const demo = generateDemoRecords()
      saveRecords(demo)
      setSeedVersion(CURRENT_SEED_VERSION)
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
