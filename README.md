# Mobile Ledger

A responsive web app for mobile phone shopkeepers to record daily purchases and sales, track stock, and see profit/loss automatically.

**Live demo:** https://mobile-website-dnjh.vercel.app

## Features

- Add Entry form with auto date, model, IMEI, purchase price, seller details and photos (phone, seller, CNIC front and back)
- View Records page with thumbnails, search and In Stock / Sold filters
- Mark as Sold with automatic profit/loss calculation and status update
- Record detail page with full purchase and sale information
- Dashboard with inventory value, total sales, profit, loss and charts
- Fully responsive, with bottom navigation on mobile
- Demo data loader and clear-all option

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Context API
- Recharts
- lucide-react
- Deployed on Vercel

## Getting Started

```bash
git clone https://github.com/mabdullahmunawarfsc-gif/mobile-website.git
cd mobile-website
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Note

Data is currently stored in the browser's localStorage. A backend and database (Firebase or Supabase) is the planned next step.