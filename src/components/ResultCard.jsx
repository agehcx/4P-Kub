import React from 'react'
import { Link } from 'react-router-dom'

export default function ResultCard({ candidate }) {
  return (
    <div className="p-4 bg-white rounded shadow flex items-center gap-4">
      <img src={candidate.photo || 'https://via.placeholder.com/64'} alt="avatar" className="w-16 h-16 rounded-full" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <Link to={`/candidates/${candidate.id}`} className="font-semibold">
              {candidate.name}
            </Link>
            <div className="text-sm text-gray-600">{candidate.title || '—'}</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">Score</div>
            <div className="text-lg font-bold">{(candidate.score * 100).toFixed(0)}</div>
          </div>
        </div>

        <div className="mt-2 flex gap-2">
          {(candidate.topSkills || []).slice(0, 3).map((skill) => (
            <span key={skill} className="px-2 py-1 bg-gray-100 rounded text-sm">{skill}</span>
          ))}
          {candidate.rationaleShort && (
            <span className="ml-2 text-xs text-gray-500">{candidate.rationaleShort}</span>
          )}
        </div>
      </div>
    </div>
  )
}
