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
    return <div>Loading profile...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 bg-white p-4 rounded shadow">
        <img src={candidate.photo} alt="avatar" className="w-32 h-32 rounded-full mx-auto" />
        <h3 className="text-xl font-semibold text-center mt-2">{candidate.name}</h3>
        <div className="text-center text-sm text-gray-600">{candidate.title}</div>

        <div className="mt-4">
          <h4 className="font-medium">Top skills</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {candidate.topSkills.map((skill) => (
              <span key={skill} className="px-2 py-1 bg-gray-100 rounded text-sm">{skill}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="md:col-span-2 space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-medium mb-2">Match rationale</h4>
          <p>{candidate.rationaleFull}</p>
        </div>

        <ExplainPanel candidate={candidate} />
      </div>
    </div>
  )
}
