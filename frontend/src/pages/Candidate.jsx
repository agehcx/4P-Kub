import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { mockGetCandidate } from '../services/mockApi'
import ExplainPanel from '../components/ExplainPanel'

export default function Candidate() {
  const { id } = useParams()
  const [candidate, setCandidate] = useState(null)

  useEffect(() => {
    if (id) {
      mockGetCandidate(id).then(setCandidate)
    }
  }, [id])

  if (!candidate) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#0E706F] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Loading profile & graph analysis...</p>
        </div>
      </div>
    )
  }

  const score = (candidate.score * 100).toFixed(0)
  const scoreColor = score >= 80 ? 'bg-green-600' : score >= 60 ? 'bg-[#0E706F]' : 'bg-gray-500'

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600">
        <span>Step 2: Shortlist</span>
        <span className="mx-2">→</span>
        <span className="font-semibold text-gray-900">Candidate Detail</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="relative mb-6">
              <img 
                src={candidate.photo} 
                alt="avatar" 
                className="w-40 h-40 rounded-lg mx-auto object-cover border-4 border-gray-100" 
              />
              <div className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-2 ${scoreColor} rounded-lg shadow-lg`}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{score}</div>
                  <div className="text-xs text-white/90">Composite Score</div>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-center mt-8 text-gray-900">{candidate.name}</h3>
            <div className="text-center text-gray-600 mt-1">{candidate.title}</div>

            {/* Readiness Badge */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="bg-green-50 border border-green-200 p-3 rounded-lg text-center">
                <div className="text-xs text-green-700 font-semibold uppercase mb-1">Top 30% High-Readiness</div>
                <div className="text-xs text-gray-600">Multi-signal analysis confirmed</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Top Skills</h4>
              <div className="flex flex-wrap gap-2">
                {candidate.topSkills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1.5 bg-[#E8F0F0] text-[#084343] rounded-md text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
              <button className="w-full px-6 py-3 bg-[#0E706F] text-white rounded-lg font-semibold hover:bg-[#084343] transition-colors shadow-sm">
                Add to Team Canvas
              </button>
              <button className="w-full px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                View Full Graph
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Graph-RAG Explanation */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 p-6 rounded-xl">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Graph-RAG Reasoning
            </h4>
            <p className="text-gray-700 text-sm mb-4">
              Multi-hop traversal across: <strong>Person → Skills → Projects → KPIs → Peers → Trust Network</strong>
            </p>
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <p className="text-gray-700 leading-relaxed text-sm">{candidate.rationaleFull}</p>
            </div>
          </div>

          <ExplainPanel candidate={candidate} />

          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="text-xl font-semibold text-gray-900 mb-6">Additional Insights</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                <div className="text-sm text-purple-600 font-medium mb-1">Experience Level</div>
                <div className="text-2xl font-bold text-purple-900">Senior</div>
              </div>
              <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                <div className="text-sm text-green-600 font-medium mb-1">Availability</div>
                <div className="text-2xl font-bold text-green-900">2 weeks</div>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-sm text-blue-600 font-medium mb-1">Location</div>
                <div className="text-xl font-bold text-blue-900">Remote</div>
              </div>
              <div className="p-6 bg-amber-50 rounded-xl border border-amber-200">
                <div className="text-sm text-amber-600 font-medium mb-1">Salary Range</div>
                <div className="text-xl font-bold text-amber-900">$120k+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
