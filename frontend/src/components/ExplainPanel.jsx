import React from 'react'

export default function ExplainPanel({ candidate }) {
  const skillScore = Math.round((candidate.skillScore || 0) * 100)
  const networkScore = Math.round((candidate.networkScore || 0) * 100)
  
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      <h4 className="text-xl font-semibold text-gray-900 mb-6">Explainability & Scoring</h4>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-gray-700">Skill Match</div>
            <div className="text-lg font-bold text-indigo-600">{skillScore}%</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${skillScore}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-gray-700">Network Proximity</div>
            <div className="text-lg font-bold text-purple-600">{networkScore}%</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${networkScore}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p>Interactive re-weighting will be available in the Team Builder.</p>
        </div>
      </div>
    </div>
  )
}
