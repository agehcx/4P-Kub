import React, { useState } from 'react'
import { mockEvaluateTeam, mockSearch } from '../services/mockApi'

export default function TeamBuilder() {
  const [pool, setPool] = useState([])
  const [query, setQuery] = useState('')
  const [team, setTeam] = useState([])
  const [evaluation, setEvaluation] = useState(null)

  async function search() {
    const response = await mockSearch({ query })
    setPool(response.candidates)
  }

  async function evaluate() {
    const result = await mockEvaluateTeam({ candidateIds: team })
    setEvaluation(result)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1 bg-white p-4 rounded shadow">
        <h4 className="font-medium mb-2">Candidate pool</h4>
        <div className="flex gap-2">
          <input
            className="flex-1 p-2 border rounded"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search candidates"
          />
          <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={search}>
            Search
          </button>
        </div>
        <div className="mt-3 space-y-2">
          {pool.map((candidate) => (
            <div key={candidate.id} className="flex items-center justify-between">
              <div>{candidate.name}</div>
              <button
                className="text-sm text-blue-600"
                onClick={() => setTeam((current) => Array.from(new Set([...current, candidate.id])))}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-1 bg-white p-4 rounded shadow">
        <h4 className="font-medium">Team canvas</h4>
        <div className="mt-2 space-y-2">
          {team.length === 0 && <div className="text-sm text-gray-600">No members yet</div>}
          {team.map((memberId) => (
            <div key={memberId} className="flex items-center justify-between">
              <div>{memberId}</div>
              <button className="text-red-600" onClick={() => setTeam((current) => current.filter((id) => id !== memberId))}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={evaluate}>
            Evaluate team
          </button>
        </div>
      </div>

      <div className="md:col-span-1 bg-white p-4 rounded shadow">
        <h4 className="font-medium">Team health</h4>
        {evaluation ? (
          <div>
            <div>Score: {(evaluation.teamScore * 100).toFixed(0)}</div>
            <div className="mt-2">Gaps:</div>
            <ul className="list-disc ml-4 text-sm">
              {evaluation.gaps.map((gap) => (
                <li key={gap.skill}>
                  {gap.skill} — {gap.severity}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-sm text-gray-600">No evaluation yet</div>
        )}
      </div>
    </div>
  )
}
