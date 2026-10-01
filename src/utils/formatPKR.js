/**
 * Format a number as Pakistani Rupees
 * @param {number} amount
 * @returns {string}
 */
export function formatPKR(amount) {
  if (amount == null || isNaN(amount)) return 'Rs 0'
  const formatted = new Intl.NumberFormat('en-PK', {
    maximumFractionDigits: 0,
  }).format(amount)
  return `Rs ${formatted}`
}

/**
 * Format a date string for display
 * @param {string} dateString - ISO date string
 * @returns {string}
 */
export function formatDate(dateString) {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Get today's date in YYYY-MM-DD format for input[type="date"]
 * @returns {string}
 */
export function getToday() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
