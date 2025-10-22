import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Landing from './pages/Landing'
import Search from './pages/Search'
import Candidate from './pages/Candidate'
import TeamBuilder from './pages/TeamBuilder'
import Analytics from './pages/Analytics'
import Admin from './pages/Admin'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">CPCUP — KG Hiring</h1>
          <nav className="space-x-4">
            <Link to="/">Projects</Link>
            <Link to="/search">Search</Link>
            <Link to="/team">Team Builder</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/admin">Admin</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/candidates/:id" element={<Candidate />} />
          <Route path="/team" element={<TeamBuilder />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  )
}
