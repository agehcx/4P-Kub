import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { mockGetHighReadinessCandidates } from '../services/mockApi'
import { useWorkflow } from '../contexts/WorkflowContext'
import ResultCard from '../components/ResultCard'

export default function HighReadinessCandidates() {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalCandidates: 0,
    averageScore: 0,
    topSkills: []
  })
  const { hasGeneratedShortlist } = useWorkflow()
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user has generated shortlist before allowing access
    if (!hasGeneratedShortlist) {
      navigate('/search')
      return
    }

    const fetchHighReadinessCandidates = async () => {
      try {
        setLoading(true)
        const response = await mockGetHighReadinessCandidates()
        const topCandidates = response.candidates || []
        
        // Calculate top skills
        const allSkills = topCandidates.flatMap(candidate => candidate.topSkills || [])
        const skillCount = allSkills.reduce((acc, skill) => {
          acc[skill] = (acc[skill] || 0) + 1
          return acc
        }, {})
        const topSkills = Object.entries(skillCount)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 8)
          .map(([skill]) => skill)

        setCandidates(topCandidates)
        setStats({
          totalCandidates: response.total || topCandidates.length,
          averageScore: response.averageScore || 0,
          topSkills
        })
      } catch (error) {
        console.error('Error fetching high-readiness candidates:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHighReadinessCandidates()
  }, [hasGeneratedShortlist, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#0E706F] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Loading high-readiness candidates...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600">
        <Link to="/search" className="hover:text-[#0E706F] transition-colors">
          Step 1: Define Mission
        </Link>
        <span className="mx-2">→</span>
        <span className="font-semibold text-gray-900">Step 2: Top 30% Shortlist</span>
      </div>

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[#0E706F] text-white rounded-full flex items-center justify-center font-bold">
            2
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Top 30% High-Readiness Candidates
            </h1>
            <p className="text-gray-600 mt-1">
              AI-ranked based on multi-signal analysis
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-6 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM9 9a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-800">{stats.totalCandidates}</div>
                <div className="text-sm text-green-600 font-medium">Elite Candidates</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-6 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-800">{(stats.averageScore * 100).toFixed(0)}%</div>
                <div className="text-sm text-blue-600 font-medium">Average Score</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 p-6 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-800">AI</div>
                <div className="text-sm text-purple-600 font-medium">Multi-Signal Analysis</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Skills Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-[#0E706F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Most In-Demand Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {stats.topSkills.map((skill, index) => (
              <span
                key={skill}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  index < 3
                    ? 'bg-gradient-to-r from-[#0E706F] to-[#24B4B2] text-white'
                    : 'bg-[#E8F0F0] text-[#0E706F]'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Filter Options */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Filters</h3>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-[#0E706F] text-white rounded-lg text-sm font-medium hover:bg-[#084343] transition-colors">
              All High-Readiness
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Score 80%+
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Available Now
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Remote Ready
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Senior Level
            </button>
          </div>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Top 30% Candidates
          </h2>
          <div className="flex items-center gap-3">
            <Link
              to="/team"
              className="px-6 py-2 bg-[#0E706F] text-white rounded-lg font-semibold hover:bg-[#084343] transition-colors flex items-center gap-2"
            >
              Proceed to Team Builder
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <span className="text-sm text-gray-600">Sort by:</span>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white">
              <option>Highest Score</option>
              <option>Most Recent</option>
              <option>Skills Match</option>
              <option>Availability</option>
            </select>
          </div>
        </div>

        {candidates.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="relative">
                {/* High-Readiness Badge */}
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    TOP 30%
                  </div>
                </div>
                <ResultCard candidate={candidate} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM9 9a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <button className="w-14 h-14 bg-[#0E706F] text-white rounded-full shadow-lg hover:bg-[#084343] transition-all hover:shadow-xl flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button className="w-14 h-14 bg-white border-2 border-[#0E706F] text-[#0E706F] rounded-full shadow-lg hover:bg-[#E8F0F0] transition-all hover:shadow-xl flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
