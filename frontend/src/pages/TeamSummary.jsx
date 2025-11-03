import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const STORAGE_KEY = 'teamSummaries'
function normalizeProjectName(value) {
  if (!value && value !== '') return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value !== null) {
    // common case: saved `query` object like { projectName: 'X' }
    if (typeof value.projectName === 'string') return value.projectName
    // fallback to extracting a nested property named projectName (if any)
    for (const key of Object.keys(value)) {
      if (key.toLowerCase().includes('project') && typeof value[key] === 'string') {
        return value[key]
      }
    }
    return ''
  }
  try {
    return String(value)
  } catch {
    return ''
  }
}

function readStoredSummaries() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []

    // Normalize projectName to a string for all saved entries and persist the cleaned data.
    const normalized = Array.isArray(parsed)
      ? parsed.map((entry) => ({
          ...entry,
          projectName: normalizeProjectName(entry && entry.projectName),
        }))
      : []

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized))
    } catch (err) {
      // ignore write-back failures
    }

    return normalized
  } catch (error) {
    console.warn('Failed to read stored team summaries', error)
    return []
  }
}

function persistSummaries(summaries) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(summaries))
  } catch (error) {
    console.warn('Failed to persist team summaries', error)
  }
}

export default function TeamSummary() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const incomingSummary = state?.summary

  const [summaries, setSummaries] = useState(() => readStoredSummaries())
  const [selectedId, setSelectedId] = useState(incomingSummary?.id || null)

  useEffect(() => {
    if (!incomingSummary) {
      return
    }

    const normalizedIncoming = {
      ...incomingSummary,
      projectName: normalizeProjectName(incomingSummary && incomingSummary.projectName),
    }

    setSummaries((previous) => {
      const exists = previous.some((entry) => entry.id === normalizedIncoming.id)
      if (exists) {
        return previous
      }
      return [normalizedIncoming, ...previous]
    })
    setSelectedId(normalizedIncoming.id)
  }, [incomingSummary])

  useEffect(() => {
    if (summaries.length === 0) {
      return
    }
    persistSummaries(summaries)
  }, [summaries])

  useEffect(() => {
    if (selectedId) {
      return
    }
    if (summaries.length > 0) {
      setSelectedId(summaries[0].id)
    }
  }, [selectedId, summaries])

  const activeSummary = useMemo(() => {
    return summaries.find((entry) => entry.id === selectedId) || null
  }, [summaries, selectedId])

  if (!activeSummary) {
    return (
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="text-2xl font-semibold text-gray-900">No saved team evaluations yet</div>
        <p className="text-sm text-gray-600">
          Build a team and run an evaluation to see the summary view.
        </p>
        <button
          className="px-5 py-2.5 bg-[#1C5581] text-white rounded-lg font-semibold hover:bg-[#143A58] transition-colors"
          onClick={() => navigate('/team')}
        >
          Go to Team Builder
        </button>
      </div>
    )
  }

  const createdAt = activeSummary.createdAt
    ? new Date(activeSummary.createdAt)
    : new Date(Number.parseInt(activeSummary.id, 10))
  const createdAtValid = createdAt instanceof Date && !Number.isNaN(createdAt.getTime())

  const gaps = activeSummary.evaluation?.gaps || []
  const alternatives = activeSummary.evaluation?.alternatives || []
  const diversity = activeSummary.evaluation?.diversityMetrics
  const teamMembers = Array.isArray(activeSummary.teamMembers) ? activeSummary.teamMembers : []

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Team Summary</h2>
          {activeSummary?.projectName && (
            <p className="text-2xl font-semibold text-gray-700 mt-1">
              {activeSummary.projectName}
            </p>
          )}
          <p className="text-sm text-gray-500">
            Generated {createdAtValid ? createdAt.toLocaleString() : 'recently'}
          </p>
          
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-gray-200 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            onClick={() => navigate('/team')}
          >
            Back to Builder
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm uppercase tracking-wide text-gray-500 font-medium">Overall Score</div>
                <div className="text-4xl font-extrabold text-[#0E706F] mt-2">
                  {activeSummary.evaluation?.teamScore
                    ? (activeSummary.evaluation.teamScore * 100).toFixed(0)
                    : '—'}
                </div>
              </div>
              {diversity && (
                <div className="text-sm text-gray-600">
                  <div className="font-semibold text-gray-900">Diversity Snapshot</div>
                  <div>Gender Diversity: {(diversity.genderDiversity * 100).toFixed(0)}%</div>
                </div>
              )}
            </div>

            <div>
              <div className="font-semibold text-gray-900 mb-4">Team Members</div>
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div
                    key={member.id || member.name}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {member.name || member.id}
                      </div>
                      {member.title && (
                        <div className="text-xs text-gray-600">{member.title}</div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{member.id}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {gaps.length > 0 && (
            <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="font-semibold text-gray-900 mb-4">Skill Gaps</div>
              <div className="space-y-3">
                {gaps.map((gap) => (
                  <div
                    key={gap.skill}
                    className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{gap.skill}</div>
                      {gap.description && (
                        <div className="text-xs text-gray-600 mt-1">{gap.description}</div>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-md text-xs font-semibold uppercase ${
                        gap.severity === 'high'
                          ? 'bg-red-100 text-red-700'
                          : gap.severity === 'medium'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {gap.severity || 'info'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {alternatives.length > 0 && (
            <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="font-semibold text-gray-900 mb-4">Suggested Alternatives</div>
              <div className="space-y-3">
                {alternatives.map((option) => (
                  <div key={option.name} className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                    <div className="font-medium text-gray-900">{option.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{option.candidateIds.join(', ')}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="font-semibold text-gray-900 mb-3">Saved Evaluations</div>
            <div className="space-y-2">
              {summaries.map((entry) => {
                const entryDate = entry.createdAt
                  ? new Date(entry.createdAt)
                  : new Date(Number.parseInt(entry.id, 10))
                const label = entryDate instanceof Date && !Number.isNaN(entryDate.getTime())
                  ? entryDate.toLocaleString()
                  : 'Unknown date'
                const memberCount = Array.isArray(entry.teamMembers) ? entry.teamMembers.length : 0

                return (
                  <button
                    key={entry.id}
                    className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                      entry.id === selectedId
                        ? 'border-[#0E706F] bg-[#E8F5F5] text-[#0E706F]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedId(entry.id)}
                  >
                    <div className="font-medium">{entry.projectName || `Team of ${memberCount}`}</div>
                    <div className="text-xs text-gray-500">{label}</div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="p-4 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-600">
            Evaluations are stored locally in this browser so you can revisit previous team runs.
          </div>
        </div>
      </div>
    </div>
  )
}
