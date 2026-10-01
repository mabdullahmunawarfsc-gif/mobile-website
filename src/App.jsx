import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { RecordsProvider } from './context/RecordsContext'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import AddEntry from './pages/AddEntry'
import Records from './pages/Records'
import RecordDetail from './pages/RecordDetail'
import Toast from './components/Toast'

export default function App() {
  return (
    <RecordsProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="md:ml-64">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add" element={<AddEntry />} />
              <Route path="/records" element={<Records />} />
              <Route path="/records/:id" element={<RecordDetail />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
          <Toast />
        </div>
      </BrowserRouter>
    </RecordsProvider>
  )
}
