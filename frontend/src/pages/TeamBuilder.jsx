import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockEvaluateTeam, mockSearch } from '../services/mockApi'

export default function TeamBuilder() {
  const [pool, setPool] = useState([])
  const [query, setQuery] = useState('')
  const [team, setTeam] = useState([])
  const [evaluation, setEvaluation] = useState(null)
  const [latestSummary, setLatestSummary] = useState(null)
  const navigate = useNavigate()

  async function search() {
    const response = await mockSearch({ query })
    setPool(response.candidates)
  }

  async function evaluate() {
    // if (team.length === 0) {
    //   return
    // }

    try {
      const result = await mockEvaluateTeam({ candidateIds: team })
      setEvaluation(result)

      const members = team.map((id) => {
        const candidate = pool.find((item) => item.id === id)
        if (candidate) {
          const { name, title, photo } = candidate
          return { id, name, title, photo }
        }
        return { id, name: id }
      })

      setLatestSummary({
        id: `${Date.now()}`,
        teamIds: team,
        teamMembers: members,
        evaluation: result,
        createdAt: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Failed to evaluate team', error)
    }
  }

  function goToSummary() {
    if (!latestSummary) {
      return
    }
    navigate('/team/summary', { state: { summary: latestSummary } })
  }

  const recommendedTeams = useMemo(
    () => [
      {
        id: 'strategic-anchor',
        name: 'Strategic Anchor Team',
        score: 92,
        focus: 'Strength: Senior-led strategy & complex decision making',
        summary: 'Pairs the selected skills with senior planners who set a clear direction and manage high-stakes risk for the squad.',
        metrics: [
          { label: 'Technical Fit', value: '88%' },
          { label: 'Experience', value: '95%' },
          { label: 'Collaboration', value: '78%' },
          { label: 'Diversity', value: '72%' },
        ],
  tradeOff: 'Needs extra space for fresh viewpoints, so keep junior voices balanced in rituals.',
  members: ['Ananya S. - Principal Strategist', 'Krit C. - Senior PM', 'May T. - Lead Architect'],
      },
      {
        id: 'insight-ops',
        name: 'Insight Ops Team',
        score: 89,
        focus: 'Strength: Data-first execution & risk control',
  summary: 'Data-obsessed lineup that loves KPI monitoring, quick iteration, and tight process optimization.',
        metrics: [
          { label: 'Technical Fit', value: '92%' },
          { label: 'Experience', value: '85%' },
          { label: 'Collaboration', value: '82%' },
          { label: 'Diversity', value: '88%' },
        ],
        tradeOff: 'Add a visionary partner so the team does not tilt purely into execution mode.',
  members: ['Beam L. - Data Lead', 'Chanisa P. - Risk Analyst', 'Jirawat K. - Automation Engineer'],
      },
      {
        id: 'momentum-builders',
        name: 'Momentum Builders',
        score: 87,
        focus: 'Strength: Collaboration & growth mindset',
        summary: 'Great for new initiatives that need speed, experimentation, and rapid learning loops.',
        metrics: [
          { label: 'Technical Fit', value: '80%' },
          { label: 'Experience', value: '75%' },
          { label: 'Collaboration', value: '95%' },
          { label: 'Diversity', value: '90%' },
        ],
  tradeOff: 'Limited senior mentorship, so set a clear coaching cadence to keep momentum growing.',
  members: ['Fon R. - Product Lead', 'Nick M. - CX Strategist', 'Dao Y. - Growth PM'],
      },
    ],
    []
  )

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <section className="bg-white border border-[#0E706F33] rounded-3xl p-6 md:p-8 shadow-sm">
        <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#0E706F] text-white rounded-full flex items-center justify-center text-lg font-semibold">1</div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0E706F]/80">Step one</p>
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
          {recommendedTeams.map((teamCard) => (
            <article key={teamCard.id} className="flex flex-col h-full bg-white border border-[#0E706F1A] rounded-2xl shadow-sm hover:border-[#0E706F] hover:shadow-lg transition-all">
              <div className="p-6 pb-5 space-y-4">
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
              <div className="px-6 py-4 space-y-3">
                <details className="border border-[#0E706F26] rounded-xl">
                  <summary className="px-4 py-3 cursor-pointer text-sm font-semibold text-gray-800 flex items-center justify-between">
                    <span>Core members<span className="text-gray-500 font-normal"> - tap to view names</span></span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <ul className="px-4 pb-4 space-y-2 text-sm text-gray-700 leading-relaxed">
                    {teamCard.members.map((member) => (
                      <li key={member} className="border-b border-dashed border-gray-200 pb-2 last:border-0 last:pb-0">
                        {member}
                      </li>
                    ))}
                  </ul>
                </details>
                <div className="bg-[#FDF6ED] border border-[#F0C48C] rounded-xl px-4 py-3 text-sm text-gray-700">
                  <span className="font-semibold text-[#C77B26] mr-1">Watch-out:</span>
                  {teamCard.tradeOff}
                </div>
                <button className="w-full px-4 py-3 bg-[#0E706F] text-white rounded-lg font-semibold text-base hover:bg-[#0B5655] transition-colors">
                  Use this lineup as a starting point
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-[#0E706F] text-white rounded-xl flex items-center justify-center shadow-sm text-lg font-semibold">1.5</div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 leading-snug">Fine tune skill weights (optional)</h3>
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
      </section>

      <section className="space-y-8">
        <div className="bg-gradient-to-r from-[#0E706F] to-[#12847F] text-white rounded-3xl px-6 py-6 md:px-8 md:py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/15 text-white rounded-full flex items-center justify-center text-lg font-semibold">2</div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">Step two</p>
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
              {pool.length === 0 && (
                <div className="text-center py-16 text-gray-500 text-base">
                  <div className="w-16 h-16 bg-[#E6F2F2] rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-[#0E706F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="font-medium">Search for candidates to add to your team</p>
                </div>
              )}
              {pool.map((candidate) => (
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
