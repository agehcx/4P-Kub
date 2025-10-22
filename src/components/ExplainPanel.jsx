import React from 'react'

export default function ExplainPanel({ candidate }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="font-medium mb-2">Explainability</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <div className="text-sm font-medium">Skill match</div>
          <div className="text-xs text-gray-600">{Math.round((candidate.skillScore || 0) * 100)}%</div>
        </div>
        <div>
          <div className="text-sm font-medium">Network proximity</div>
          <div className="text-xs text-gray-600">{Math.round((candidate.networkScore || 0) * 100)}%</div>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-700">
        Interactive re-weighting will be available in the Team Builder.
      </div>
    </div>
  )
}
