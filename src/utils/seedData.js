/**
 * SVG Data URI generators for demo record images.
 * Each returns a data:image/svg+xml URI that works without any network requests.
 */

function encodeSvg(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

/**
 * Generate a phone illustration SVG data URI
 */
export function makePhoneImage(color1, color2, label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="100%" stop-color="${color2}"/>
    </linearGradient>
    <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="#f8fafc"/>
  <rect x="120" y="20" width="160" height="260" rx="24" fill="url(#body)" stroke="#94a3b8" stroke-width="2"/>
  <rect x="130" y="35" width="140" height="220" rx="16" fill="url(#screen)"/>
  <rect x="170" y="28" width="60" height="8" rx="4" fill="#475569"/>
  <circle cx="155" cy="55" r="6" fill="#1e293b"/>
  <circle cx="155" cy="55" r="3" fill="#3b82f6"/>
  <circle cx="175" cy="55" r="6" fill="#1e293b"/>
  <circle cx="175" cy="55" r="3" fill="#22c55e"/>
  <text x="200" y="150" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="bold" fill="white" opacity="0.9">${label}</text>
  <rect x="160" y="240" width="80" height="4" rx="2" fill="#94a3b8"/>
</svg>`
  return encodeSvg(svg)
}

/**
 * Generate a seller photo placeholder SVG data URI
 */
export function makeSellerPhoto(initials, bgColor) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="${bgColor}"/>
  <circle cx="100" cy="75" r="35" fill="white" opacity="0.3"/>
  <circle cx="100" cy="75" r="28" fill="white" opacity="0.5"/>
  <text x="100" y="83" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" font-weight="bold" fill="white">${initials}</text>
  <ellipse cx="100" cy="165" rx="45" ry="30" fill="white" opacity="0.3"/>
</svg>`
  return encodeSvg(svg)
}

/**
 * Generate a CNIC front placeholder SVG data URI
 */
export function makeCnicFront() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200">
  <rect width="320" height="200" rx="12" fill="#dbeafe" stroke="#93c5fd" stroke-width="2"/>
  <rect x="12" y="12" width="296" height="176" rx="8" fill="#eff6ff"/>
  <rect x="20" y="20" width="60" height="70" rx="4" fill="#bfdbfe"/>
  <circle cx="50" cy="48" r="14" fill="#93c5fd"/>
  <ellipse cx="50" cy="80" rx="18" ry="12" fill="#93c5fd"/>
  <rect x="90" y="25" width="120" height="8" rx="4" fill="#3b82f6"/>
  <rect x="90" y="40" width="160" height="6" rx="3" fill="#93c5fd"/>
  <rect x="90" y="52" width="140" height="6" rx="3" fill="#93c5fd"/>
  <rect x="90" y="64" width="150" height="6" rx="3" fill="#93c5fd"/>
  <rect x="20" y="100" width="280" height="60" rx="6" fill="#dbeafe"/>
  <rect x="30" y="110" width="80" height="6" rx="3" fill="#3b82f6"/>
  <rect x="30" y="122" width="200" height="5" rx="2" fill="#93c5fd"/>
  <rect x="30" y="132" width="180" height="5" rx="2" fill="#93c5fd"/>
  <rect x="30" y="142" width="160" height="5" rx="2" fill="#93c5fd"/>
  <text x="160" y="185" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#3b82f6" font-weight="bold">CNIC FRONT</text>
</svg>`
  return encodeSvg(svg)
}

/**
 * Generate a CNIC back placeholder SVG data URI
 */
export function makeCnicBack() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200">
  <rect width="320" height="200" rx="12" fill="#dcfce7" stroke="#86efac" stroke-width="2"/>
  <rect x="12" y="12" width="296" height="176" rx="8" fill="#f0fdf4"/>
  <rect x="20" y="20" width="280" height="40" rx="6" fill="#bbf7d0"/>
  <text x="160" y="45" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#16a34a" font-weight="bold">PAKISTAN IDENTITY CARD</text>
  <rect x="20" y="70" width="280" height="6" rx="3" fill="#86efac"/>
  <rect x="20" y="82" width="260" height="6" rx="3" fill="#86efac"/>
  <rect x="20" y="94" width="270" height="6" rx="3" fill="#86efac"/>
  <rect x="20" y="106" width="240" height="6" rx="3" fill="#86efac"/>
  <rect x="20" y="125" width="120" height="50" rx="4" fill="#dcfce7" stroke="#86efac"/>
  <text x="80" y="155" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="#16a34a">SIGNATURE</text>
  <rect x="160" y="125" width="140" height="50" rx="4" fill="#dcfce7" stroke="#86efac"/>
  <text x="230" y="155" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="#16a34a">ISSUING AUTHORITY</text>
  <text x="160" y="195" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#16a34a" font-weight="bold">CNIC BACK</text>
</svg>`
  return encodeSvg(svg)
}

/**
 * Generate 9 demo records with realistic Pakistani names and data.
 * Dates are spread across the last 4 months for a good chart.
 */
export function generateDemoRecords() {
  const now = new Date()
  const daysAgo = (n) => {
    const d = new Date(now)
    d.setDate(d.getDate() - n)
    return d.toISOString().split('T')[0]
  }

  const cnicFront = makeCnicFront()
  const cnicBack = makeCnicBack()

  return [
    // SOLD (5)
    {
      id: 'demo-1',
      date: daysAgo(120),
      modelName: 'iPhone 13 Pro 128GB',
      imei: '356789012345678',
      purchasePrice: 215000,
      sellerName: 'Ahmed Khan',
      sellerPhone: '03001234567',
      mobilePhoto: makePhoneImage('#1e3a5f', '#3b82f6', 'iPhone 13 Pro'),
      sellerPhoto: makeSellerPhoto('AK', '#3b82f6'),
      cnicFront,
      cnicBack,
      status: 'sold',
      salePrice: 232000,
      saleDate: daysAgo(95),
      buyerName: 'Bilal Ahmed',
      profit: 17000,
      createdAt: daysAgo(120),
    },
    {
      id: 'demo-2',
      date: daysAgo(105),
      modelName: 'Samsung Galaxy S23 Ultra',
      imei: '356789012345679',
      purchasePrice: 245000,
      sellerName: 'Fatima Malik',
      sellerPhone: '03123456789',
      mobilePhoto: makePhoneImage('#4c1d95', '#7c3aed', 'S23 Ultra'),
      sellerPhoto: makeSellerPhoto('FM', '#7c3aed'),
      cnicFront,
      cnicBack,
      status: 'sold',
      salePrice: 262000,
      saleDate: daysAgo(80),
      buyerName: 'Usman Tariq',
      profit: 17000,
      createdAt: daysAgo(105),
    },
    {
      id: 'demo-3',
      date: daysAgo(90),
      modelName: 'Redmi Note 12',
      imei: '356789012345680',
      purchasePrice: 38000,
      sellerName: 'Ayesha Siddiqui',
      sellerPhone: '03234567890',
      mobilePhoto: makePhoneImage('#064e3b', '#10b981', 'Redmi Note 12'),
      sellerPhoto: makeSellerPhoto('AS', '#10b981'),
      cnicFront,
      cnicBack,
      status: 'sold',
      salePrice: 35500,
      saleDate: daysAgo(70),
      buyerName: 'Hassan Raza',
      profit: -2500,
      createdAt: daysAgo(90),
    },
    {
      id: 'demo-4',
      date: daysAgo(75),
      modelName: 'Infinix Hot 30',
      imei: '356789012345681',
      purchasePrice: 24000,
      sellerName: 'Muhammad Ali',
      sellerPhone: '03345678901',
      mobilePhoto: makePhoneImage('#7c2d12', '#f97316', 'Infinix Hot 30'),
      sellerPhoto: makeSellerPhoto('MA', '#f97316'),
      cnicFront,
      cnicBack,
      status: 'sold',
      salePrice: 27500,
      saleDate: daysAgo(50),
      buyerName: 'Sana Javed',
      profit: 3500,
      createdAt: daysAgo(75),
    },
    {
      id: 'demo-5',
      date: daysAgo(60),
      modelName: 'Oppo Reno 8',
      imei: '356789012345682',
      purchasePrice: 58000,
      sellerName: 'Zainab Hussain',
      sellerPhone: '03456789012',
      mobilePhoto: makePhoneImage('#831843', '#ec4899', 'Oppo Reno 8'),
      sellerPhoto: makeSellerPhoto('ZH', '#ec4899'),
      cnicFront,
      cnicBack,
      status: 'sold',
      salePrice: 63000,
      saleDate: daysAgo(30),
      buyerName: 'Kamran Shah',
      profit: 5000,
      createdAt: daysAgo(60),
    },
    // IN STOCK (4)
    {
      id: 'demo-6',
      date: daysAgo(45),
      modelName: 'iPhone 14 Pro Max 256GB',
      imei: '356789012345683',
      purchasePrice: 310000,
      sellerName: 'Imran Sheikh',
      sellerPhone: '03012345678',
      mobilePhoto: makePhoneImage('#1e1b4b', '#4f46e5', 'iPhone 14 Pro Max'),
      sellerPhoto: makeSellerPhoto('IS', '#4f46e5'),
      cnicFront,
      cnicBack,
      status: 'in-stock',
      createdAt: daysAgo(45),
    },
    {
      id: 'demo-7',
      date: daysAgo(30),
      modelName: 'Vivo V27',
      imei: '356789012345684',
      purchasePrice: 72000,
      sellerName: 'Nadia Akhtar',
      sellerPhone: '03123456780',
      mobilePhoto: makePhoneImage('#0c4a6e', '#0ea5e9', 'Vivo V27'),
      sellerPhoto: makeSellerPhoto('NA', '#0ea5e9'),
      cnicFront,
      cnicBack,
      status: 'in-stock',
      createdAt: daysAgo(30),
    },
    {
      id: 'demo-8',
      date: daysAgo(15),
      modelName: 'Tecno Spark 10',
      imei: '356789012345685',
      purchasePrice: 21000,
      sellerName: 'Rashid Mehmood',
      sellerPhone: '03234567891',
      mobilePhoto: makePhoneImage('#713f12', '#eab308', 'Tecno Spark 10'),
      sellerPhoto: makeSellerPhoto('RM', '#eab308'),
      cnicFront,
      cnicBack,
      status: 'in-stock',
      createdAt: daysAgo(15),
    },
    {
      id: 'demo-9',
      date: daysAgo(5),
      modelName: 'Google Pixel 7',
      imei: '356789012345686',
      purchasePrice: 95000,
      sellerName: 'Sadia Anwar',
      sellerPhone: '03345678902',
      mobilePhoto: makePhoneImage('#134e4a', '#14b8a6', 'Pixel 7'),
      sellerPhoto: makeSellerPhoto('SA', '#14b8a6'),
      cnicFront,
      cnicBack,
      status: 'in-stock',
      createdAt: daysAgo(5),
    },
  ]
}
