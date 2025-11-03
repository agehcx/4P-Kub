import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Landing from './pages/Landing'
import Search from './pages/Search'
import Candidate from './pages/Candidate'
import TeamBuilder from './pages/TeamBuilder'
import TeamSummary from './pages/TeamSummary'
import Analytics from './pages/Analytics'
import Admin from './pages/Admin'

export default function App() {
  return (
    // <div className="min-h-screen bg-gray-50 text-gray-900">
    <div className="min-h-screen text-gray-900 bg-gradient-animate">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0E706F] to-[#084343] rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                CP Konha
              </h1>
              <p className="text-xs text-gray-500">Smart Hiring Platform</p>
            </div>
          </Link>
          <nav className="flex items-center gap-1">
            <Link to="/" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-[#0E706F] transition-all">
              Projects
            </Link>
            <Link to="/search" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-[#0E706F] transition-all">
              Search
            </Link>
            <Link to="/team" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-[#0E706F] transition-all">
              Team Builder
            </Link>
            <Link to="/analytics" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-[#0E706F] transition-all">
              Analytics
            </Link>
            <Link to="/admin" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-[#0E706F] transition-all">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/candidates/:id" element={<Candidate />} />
          <Route path="/team" element={<TeamBuilder />} />
          <Route path="/team/summary" element={<TeamSummary />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  )
}
