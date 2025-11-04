import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWorkflow } from '../contexts/WorkflowContext'
import { mockEvaluateTeam, mockSearch } from '../services/mockApi'

export default function TeamBuilder() {
  const [pool, setPool] = useState([])
  const [allCandidates, setAllCandidates] = useState([])
  const [query, setQuery] = useState('')
  const [team, setTeam] = useState([])
  const [evaluation, setEvaluation] = useState(null)
  const [latestSummary, setLatestSummary] = useState(null)
  const navigate = useNavigate()
  const { searchParams } = useWorkflow()
  const [loading, setLoading] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const [applyingLineupId, setApplyingLineupId] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function bootstrapCandidates() {
      setLoading(true)
      try {
        const response = await mockSearch({ limit: 30 })
        if (!isMounted) {
          return
        }
        const seededCandidates = response?.candidates || []
        setAllCandidates(seededCandidates)
        setPool(seededCandidates)
      } catch (error) {
        console.error('Unable to load initial candidates', error)
      } finally {
        if (isMounted) {
          setLoading(false)
          setInitializing(false)
        }
      }
    }

    bootstrapCandidates()

    return () => {
      isMounted = false
    }
  }, [])

  async function search() {
    const searchTerm = query.trim()
    setLoading(true)
    try {
      const response = await mockSearch({ query: searchTerm, limit: 30 })
      const candidates = response?.candidates || []
      setPool(candidates)

      if (!searchTerm) {
        setAllCandidates(candidates)
      }
    } catch (error) {
      console.error('Candidate search failed', error)
    } finally {
      setLoading(false)
    }
  }

  const selectedMembers = useMemo(() => {
    if (team.length === 0) {
      return []
    }

    const index = new Map()
    allCandidates.forEach((candidate) => {
      if (candidate?.id) {
        index.set(candidate.id, candidate)
      }
    })

    pool.forEach((candidate) => {
      if (candidate?.id) {
        index.set(candidate.id, candidate)
      }
    })

    return team
      .map((id) => index.get(id))
      .filter(Boolean)
  }, [team, pool, allCandidates])

  const highlightedSkills = useMemo(() => {
    if (selectedMembers.length === 0) {
      return []
    }

    const counts = new Map()

    selectedMembers.forEach((member) => {
      const skills = Array.isArray(member?.canonicalSkills) && member.canonicalSkills.length
        ? member.canonicalSkills
        : Array.isArray(member?.topSkills)
          ? member.topSkills
          : []

      skills.forEach((skill) => {
        if (!skill) {
          return
        }
        const current = counts.get(skill) || 0
        counts.set(skill, current + 1)
      })
    })

    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 10)
      .map(([skill, count]) => ({ skill, count }))
  }, [selectedMembers])

  function buildSummary(candidateIds, evaluationResult, memberDetails) {
    const members = candidateIds.map((id, index) => {
      const candidate = memberDetails[index]
      if (candidate) {
        const { name, title, photo } = candidate
        return { id, name, title, photo }
      }
      return { id, name: id }
    })

    return {
      id: `${Date.now()}`,
      teamIds: candidateIds,
      teamMembers: members,
      evaluation: evaluationResult,
      projectName: searchParams?.projectName || (typeof query === 'string' ? query : ''),
      createdAt: new Date().toISOString(),
    }
  }

  async function evaluate() {
    if (team.length === 0) {
      return
    }

    try {
      const result = await mockEvaluateTeam({ candidateIds: team })
      setEvaluation(result)

      const memberDetails = team.map((id) => {
        return pool.find((candidate) => candidate.id === id) ||
          allCandidates.find((candidate) => candidate.id === id) ||
          null
      })

      const summary = buildSummary(team, result, memberDetails)
      setLatestSummary(summary)
    } catch (error) {
      console.error('Failed to evaluate team', error)
    }
  }

  async function applyRecommendedTeam(lineup) {
    const memberIds = lineup?.members?.map((member) => member.id) || []
    if (!Array.isArray(memberIds) || memberIds.length === 0) {
      return
    }

    const uniqueMemberIds = Array.from(new Set(memberIds))
    setApplyingLineupId(lineup.id)

    setEvaluation(null)
    setLatestSummary(null)

    setPool((current) => {
      const currentIds = new Set(current.map((candidate) => candidate.id))
      const missingCandidates = uniqueMemberIds
        .map((id) => allCandidates.find((candidate) => candidate.id === id))
        .filter((candidate) => candidate && !currentIds.has(candidate.id))

      if (missingCandidates.length === 0) {
        return current
      }

      return [...missingCandidates, ...current]
    })

    setTeam(uniqueMemberIds)

    try {
      const memberDetails = uniqueMemberIds.map((id) => {
        return pool.find((candidate) => candidate.id === id) ||
          allCandidates.find((candidate) => candidate.id === id) ||
          null
      })

      const evaluationResult = await mockEvaluateTeam({ candidateIds: uniqueMemberIds })
      setEvaluation(evaluationResult)

      const summary = buildSummary(uniqueMemberIds, evaluationResult, memberDetails)
      setLatestSummary(summary)

      navigate('/team/summary', { state: { summary } })
    } catch (error) {
      console.error('Failed to apply recommended lineup', error)
    } finally {
      setApplyingLineupId(null)
    }
  }

  function goToSummary() {
    if (!latestSummary) {
      return
    }
    navigate('/team/summary', { state: { summary: latestSummary } })
  }

  const recommendedTeams = useMemo(() => {
    if (allCandidates.length < 3) {
      return []
    }

    const formatMember = (member) => {
      if (!member) {
        return ''
      }
      const name = member.name || 'Unnamed candidate'
      const title = member.title ? ` - ${member.title}` : ''
      return `${name}${title}`
    }

    const listMembers = (members) => {
      const formatted = members.map(formatMember).filter(Boolean)
      if (formatted.length === 0) {
        return ''
      }
      if (formatted.length === 1) {
        return formatted[0]
      }
      if (formatted.length === 2) {
        return `${formatted[0]} and ${formatted[1]}`
      }
      return `${formatted[0]}, ${formatted[1]}, and ${formatted[2]}`
    }

    const averageOf = (members, key) => {
      if (!members.length) {
        return 0
      }
      const total = members.reduce((sum, member) => {
        const value = Number(member?.[key])
        return sum + (Number.isFinite(value) ? value : 0)
      }, 0)
      return total / members.length
    }

    const averageExperienceYears = (members) => {
      if (!members.length) {
        return 0
      }
      return (
        members.reduce((sum, member) => sum + (Number(member?.yearsExperience) || 0), 0) /
        members.length
      )
    }

    const experiencePercent = (members) => {
      const years = averageExperienceYears(members)
      return Math.min(1, years / 15)
    }

    const formatPercent = (value) => {
      const clamped = Math.max(0, Math.min(1, Number(value) || 0))
      return `${Math.round(clamped * 100)}%`
    }

    const buildTeam = (id, name, members, copy) => {
      if (!members.length) {
        return null
      }
      const core = members.slice(0, 3)
      const overallScore = Math.max(0, Math.min(1, averageOf(core, 'score')))
      const score = Math.round(overallScore * 100)

      return {
        id,
        name,
        score,
        focus: copy.focus(core),
        summary: copy.summary(core, { listMembers, formatMember }),
        metrics: [
          { label: 'Skill Fit', value: formatPercent(averageOf(core, 'skillScore')) },
          { label: 'Experience', value: formatPercent(experiencePercent(core)) },
          { label: 'Collaboration', value: formatPercent(averageOf(core, 'networkScore')) },
          { label: 'Innovation', value: formatPercent(averageOf(core, 'semanticScore')) },
        ],
        members: core.map((member) => ({
          id: member.id,
          name: member.name || 'Unnamed candidate',
          title: member.title,
        })),
      }
    }

    const byExperience = [...allCandidates]
      .sort((a, b) => (b?.yearsExperience || 0) - (a?.yearsExperience || 0) || (b?.score || 0) - (a?.score || 0))
      .slice(0, 3)

    const bySkill = [...allCandidates]
      .sort((a, b) => (b?.skillScore || 0) - (a?.skillScore || 0) || (b?.score || 0) - (a?.score || 0))
      .slice(0, 3)

    const byCollaboration = [...allCandidates]
      .sort((a, b) => (b?.networkScore || 0) - (a?.networkScore || 0) || (b?.skillScore || 0) - (a?.skillScore || 0))
      .slice(0, 3)

    const teams = [
      buildTeam('strategic-anchor', 'Strategic Anchor Team', byExperience, {
        focus: () => 'Strength: Senior-led strategy & complex decision making',
        summary: (members, helpers) =>
          `${helpers.listMembers(members)} bring calm decision making for complex stakeholder moments.`,
      }),
      buildTeam('insight-ops', 'Insight Ops Team', bySkill, {
        focus: () => 'Strength: Data-first execution & risk control',
        summary: (members, helpers) =>
          `${helpers.listMembers(members)} keep experimentation grounded in data and fast measurement loops.`,
      }),
      buildTeam('momentum-builders', 'Momentum Builders', byCollaboration, {
        focus: () => 'Strength: Collaboration & growth mindset',
        summary: (members, helpers) =>
          `${helpers.listMembers(members)} create tight rituals and keep energy high for rapid delivery.`,
      }),
    ]

    return teams.filter(Boolean)
  }, [allCandidates])

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <section className="bg-white border border-[#0E706F33] rounded-3xl p-6 md:p-8 shadow-sm">
        <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#0E706F] text-white rounded-full flex items-center justify-center text-lg font-semibold">3</div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0E706F]/80">Step three (Step 3)</p>
              <h2 className="text-3xl md:text-[2.15rem] font-bold text-gray-900 leading-snug">Select an AI suggested lineup</h2>
              <p className="text-gray-600 mt-3 max-w-2xl text-base leading-relaxed">We used the skills you entered on the landing page to generate three team archetypes. Each lineup leans into a different strength so you can pick the one that matches the mission.</p>
            </div>
          </div>
          <div className="bg-[#F1F8F7] border border-[#0E706F1A] text-sm text-gray-600 rounded-2xl px-5 py-4 max-w-sm">
            <p className="font-semibold text-gray-800 text-base mb-1">Quick tip</p>
            <p className="leading-relaxed">Use these presets to kick-start conversations. You can still customise in Step Two if you need a bespoke mix.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {initializing && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500 text-base">
              <svg className="animate-spin h-8 w-8 text-[#0E706F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <p className="mt-3 font-medium">Loading recommended lineups...</p>
            </div>
          )}

          {!initializing && recommendedTeams.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500 text-base text-center">
              <p className="font-medium">We could not build a suggested lineup yet.</p>
              <p className="text-sm text-gray-400 mt-1">Try running a broader search to populate the candidate pool.</p>
            </div>
          )}

          {!initializing && recommendedTeams.map((teamCard) => (
            <article
              key={teamCard.id}
              className="flex flex-col h-full bg-white border border-[#0E706F1A] rounded-2xl shadow-sm hover:border-[#0E706F] hover:shadow-lg transition-all"
            >
              <div className="p-6 pb-5 space-y-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 leading-tight">{teamCard.name}</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0E706F] text-white">{teamCard.score}/100</span>
                </div>
                <div className="text-sm font-semibold text-[#0E706F] uppercase tracking-wide">{teamCard.focus}</div>
                <p className="text-base text-gray-700 leading-relaxed">{teamCard.summary}</p>
              </div>
              <div className="px-6 py-4 border-y border-dashed border-gray-200 bg-[#F4FAF9]">
                <div className="grid grid-cols-2 gap-4">
                  {teamCard.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col gap-1">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{metric.label}</span>
                      <span className="text-lg font-semibold text-gray-900">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Core members</span>
                  <ul className="mt-2 space-y-2 text-sm text-gray-700 leading-relaxed">
                    {teamCard.members.map((member) => (
                      <li key={member.id} className="border-b border-dashed border-gray-200 pb-2 last:border-0 last:pb-0">
                        <span className="font-semibold text-gray-900">{member.name}</span>
                        {member.title && <span className="block text-xs text-gray-500 mt-0.5">{member.title}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className="w-full px-4 py-3 bg-[#0E706F] text-white rounded-lg font-semibold text-base hover:bg-[#0B5655] transition-colors disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#0E706F]"
                  onClick={() => applyRecommendedTeam(teamCard)}
                  disabled={applyingLineupId === teamCard.id}
                >
                  {applyingLineupId === teamCard.id ? 'Preparing lineup...' : 'Use this lineup as a starting point'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#0E706F1A]"></div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0E706F]">Optional customisation track</span>
          <div className="flex-1 h-px bg-[#0E706F1A]"></div>
        </div>

        {/* <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-[#0E706F] text-white rounded-xl flex items-center justify-center shadow-sm text-lg font-semibold">A</div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0E706F]/80">Optional route A</p>
                <h3 className="text-2xl font-semibold text-gray-900 leading-snug">Fine tune skill weights</h3>
                <p className="text-base text-gray-600 mt-2 leading-relaxed">Nudge the sliders up or down by up to ten percent to emphasise critical skills while keeping a healthy candidate pool.</p>
              </div>
            </div>
            <button className="px-5 py-2 bg-white border border-[#0E706F] text-[#0E706F] rounded-lg text-sm font-semibold hover:bg-[#E6F2F2] transition-colors">Reset to default</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { label: 'Technical Fit', base: 35 },
              { label: 'Experience', base: 20 },
              { label: 'Collaboration', base: 15 },
              { label: 'Diversity', base: 10 },
              { label: 'Motivation', base: 10 },
              { label: 'Practicality', base: 10 },
            ].map((slider) => (
              <div key={slider.label} className="p-4 bg-[#F7FBFB] rounded-xl border border-gray-100 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700">{slider.label} weight</label>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Base {slider.base}%</span>
                </div>
                <input type="range" min={slider.base - 10} max={slider.base + 10} defaultValue={slider.base} className="w-full accent-[#0E706F]" />
                <div className="text-xs text-gray-500 leading-relaxed">Adjust within +/- 10% of the recommended base.</div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button className="w-full md:w-auto px-6 py-3 bg-[#0E706F] text-white rounded-lg font-semibold hover:bg-[#0B5655] transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Re-run suggestion with tweaks
            </button>
          </div>
        </div> */}

        <div className="space-y-8">
          <div className="bg-gradient-to-r from-[#0E706F] to-[#12847F] text-white rounded-3xl px-6 py-6 md:px-8 md:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/15 text-white rounded-full flex items-center justify-center text-lg font-semibold">B</div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">Optional route B</p>
                <h3 className="text-3xl font-semibold leading-snug">Build your own lineup from the candidate pool</h3>
                <p className="text-base mt-3 text-white/90 max-w-xl leading-relaxed">Pick people from the available candidates, tweak the mix, then evaluate the team health score against your custom choices.</p>
              </div>
            </div>
            <div className="bg-white/12 border border-white/20 rounded-2xl px-5 py-4 text-sm text-white/90 max-w-sm">
              <p className="font-semibold text-base mb-1">How it fits together</p>
              <p className="leading-relaxed">Start from an AI lineup or go freestyle here. Your latest evaluation will feed the Team Summary page.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Candidate pool</h4>

            <div className="flex gap-2 mb-4">
              <input
                className="flex-1 px-4 py-2.5 bg-[#FAFCFC] border border-gray-300 rounded-lg outline-none focus:border-[#0E706F] focus:ring-2 focus:ring-[#0E706F]/20 transition-all text-gray-900 placeholder:text-gray-400 text-base"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name or skill"
                onKeyPress={(event) => event.key === 'Enter' && search()}
              />
              <button
                className="px-5 py-2.5 bg-[#0E706F] text-white rounded-lg font-semibold text-base hover:bg-[#0B5655] transition-colors shadow-sm"
                onClick={search}
              >
                Search
              </button>
            </div>


            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {loading && (
                <div className="flex flex-col items-center justify-center py-16 text-gray-500 text-base">
                  <svg className="animate-spin h-8 w-8 text-[#0E706F]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <p className="mt-3 font-medium">Loading candidates...</p>
                </div>
              )}
              {!loading && pool.length === 0 && (
                <div className="text-center py-16 text-gray-500 text-base">
                  <div className="w-16 h-16 bg-[#E6F2F2] rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-[#0E706F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="font-medium">Search for candidates to add to your team</p>
                </div>
              )}
              {!loading && pool.map((candidate) => (
                <div key={candidate.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all">
                  <div className="flex items-center gap-3">
                    <img
                      src={candidate.photo || 'https://via.placeholder.com/40'}
                      alt="avatar"
                      className="w-11 h-11 rounded-lg object-cover border-2 border-gray-200"
                    />
                    <div>
                      <div className="font-semibold text-sm text-gray-900 leading-tight">{candidate.name}</div>
                      <div className="text-xs text-gray-600">{candidate.title}</div>
                    </div>
                  </div>
                  <button
                    className="px-3 py-1.5 bg-[#E6F2F2] text-[#0E706F] text-sm font-medium rounded-lg hover:bg-[#C9E5E4] border border-[#0E706F]/20 transition-all"
                    onClick={() => setTeam((current) => Array.from(new Set([...current, candidate.id])))}
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Team canvas</h4>

            <div className="space-y-2 mb-6 max-h-96 overflow-y-auto pr-2">
              {team.length === 0 && (
                <div className="text-center py-16 text-gray-500 text-base">
                  <div className="w-16 h-16 bg-[#E6F2F2] rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-[#0E706F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="font-medium">No team members yet</p>
                  <p className="text-gray-400 text-xs mt-1">Add candidates from the pool to start evaluating.</p>
                </div>
              )}
              {team.map((memberId) => {
                const member = pool.find((candidate) => candidate.id === memberId)
                return (
                  <div key={memberId} className="flex items-center justify-between p-4 bg-[#F4FAF9] rounded-lg border border-[#0E706F1A]">
                    <div className="flex items-center gap-3">
                      {member ? (
                        <>
                          <img
                            src={member.photo || 'https://via.placeholder.com/40'}
                            alt="avatar"
                            className="w-11 h-11 rounded-lg object-cover border-2 border-[#0E706F33]"
                          />
                          <div>
                            <div className="font-semibold text-sm text-gray-900 leading-tight">{member.name}</div>
                            <div className="text-xs text-gray-600">{member.title}</div>
                          </div>
                        </>
                      ) : (
                        <div className="font-semibold text-sm text-gray-900">{memberId}</div>
                      )}
                    </div>
                    <button
                      className="px-3 py-1.5 bg-red-50 text-red-700 text-sm font-medium rounded-lg hover:bg-red-100 border border-red-200 transition-all"
                      onClick={() => setTeam((current) => current.filter((id) => id !== memberId))}
                    >
                      Remove
                    </button>
                  </div>
                )
              })}
            </div>

            <button
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold text-base shadow-sm hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-green-600"
              onClick={evaluate}
              disabled={team.length === 0}
            >
              Evaluate team
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">Team health</h4>

          {evaluation ? (
            <div className="space-y-6">
              <div className="text-center p-8 bg-green-600 rounded-xl shadow-sm">
                <div className="text-sm text-white/90 mb-2 font-medium uppercase tracking-[0.2em]">Overall score</div>
                <div className="text-5xl font-bold text-white mb-1">{(evaluation.teamScore * 100).toFixed(0)}</div>
                <div className="text-green-100 text-sm uppercase tracking-wide">Team performance</div>
              </div>

              {highlightedSkills.length > 0 && (
                <div>
                  <div className="font-semibold text-gray-900 mb-3 text-lg">Skill coverage highlights</div>
                  <div className="flex flex-wrap gap-2">
                    {highlightedSkills.map((item) => (
                      <span
                        key={item.skill}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#E6F2F2] text-[#0E706F] text-xs font-medium border border-[#0E706F26]"
                      >
                        <span>{item.skill}</span>
                        <span className="text-[0.65rem] font-semibold bg-white/80 text-[#0E706F] px-1.5 py-0.5 rounded-full">{item.count}×</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {evaluation.gaps && evaluation.gaps.length > 0 && (
                <div>
                  <div className="font-semibold text-gray-900 mb-3 text-lg">Skill gaps</div>
                  <div className="space-y-2">
                    {evaluation.gaps.map((gap) => (
                      <div key={gap.skill} className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 text-sm">{gap.skill}</span>
                          <span className={`px-3 py-1 rounded-md text-xs font-semibold uppercase ${
                            gap.severity === 'high' ? 'bg-red-100 text-red-700' :
                            gap.severity === 'medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {gap.severity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500 text-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <p className="font-medium">Add team members and evaluate</p>
              <p className="text-gray-400 text-xs mt-1">We will calculate the score once you run an evaluation.</p>
            </div>
          )}
        </div>
        </div>
      </section>

      <div className="mt-6">
        <button
          className="w-full px-6 py-3 bg-[#0E706F] text-white rounded-lg font-semibold shadow-sm hover:bg-[#084343] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={goToSummary}
          disabled={!latestSummary}
        >
          Go to Team Summary
        </button>
      </div>
    </div>
  )
}
