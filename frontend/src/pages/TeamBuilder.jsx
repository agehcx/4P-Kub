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
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#0E706F] text-white rounded-full flex items-center justify-center font-bold">3</div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Propose 3 Team Options</h2>
            <p className="text-gray-600">Compare teams with different strategic trade-offs</p>
          </div>
        </div>
      </div>

      {/* 3 Team Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-300 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Strategy-Led Team
            </h3>
            <div className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">92/100</div>
          </div>
          <p className="text-sm text-gray-700 mb-4">High strategic thinking + senior experience. Best for complex problem-solving.</p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Technical Fit:</span>
              <span className="font-semibold text-green-700">88%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Experience:</span>
              <span className="font-semibold text-green-700">95%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Collaboration:</span>
              <span className="font-semibold text-amber-600">78%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Diversity:</span>
              <span className="font-semibold text-amber-600">72%</span>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-green-200 mb-4">
            <div className="text-xs text-gray-600 mb-1 font-semibold">Trade-offs:</div>
            <div className="text-xs text-gray-700 flex items-start gap-1">
              <svg className="w-3 h-3 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Lower diversity, potential ego clashes</span>
            </div>
          </div>
          <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Select This Team
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-300 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Data/Risk-Led Team
            </h3>
            <div className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">89/100</div>
          </div>
          <p className="text-sm text-gray-700 mb-4">Strong analytical + risk management skills. Best for data-driven decisions.</p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Technical Fit:</span>
              <span className="font-semibold text-blue-700">92%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Experience:</span>
              <span className="font-semibold text-blue-700">85%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Collaboration:</span>
              <span className="font-semibold text-blue-700">82%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Diversity:</span>
              <span className="font-semibold text-green-700">88%</span>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-blue-200 mb-4">
            <div className="text-xs text-gray-600 mb-1 font-semibold">Trade-offs:</div>
            <div className="text-xs text-gray-700 flex items-start gap-1">
              <svg className="w-3 h-3 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Less strategic leadership, more execution-focused</span>
            </div>
          </div>
          <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Select This Team
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-300 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Collab/Growth-Led
            </h3>
            <div className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">87/100</div>
          </div>
          <p className="text-sm text-gray-700 mb-4">High collaboration + learning potential. Best for innovation & team synergy.</p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Technical Fit:</span>
              <span className="font-semibold text-amber-600">80%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Experience:</span>
              <span className="font-semibold text-amber-600">75%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Collaboration:</span>
              <span className="font-semibold text-purple-700">95%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Diversity:</span>
              <span className="font-semibold text-green-700">90%</span>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-purple-200 mb-4">
            <div className="text-xs text-gray-600 mb-1 font-semibold">Trade-offs:</div>
            <div className="text-xs text-gray-700 flex items-start gap-1">
              <svg className="w-3 h-3 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Less senior experience, may need more guidance</span>
            </div>
          </div>
          <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            Select This Team
          </button>
        </div>
      </div>

      {/* Interactive Builder */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#0E706F] text-white rounded-full flex items-center justify-center font-bold">4</div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Adjust & Fine-Tune</h3>
            <p className="text-sm text-gray-600">Customize weights and constraints for your needs</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Technical Fit Weight</label>
            <input type="range" min="0" max="50" defaultValue="35" className="w-full accent-[#1C5581]" />
            <div className="text-xs text-gray-500 mt-1">35%</div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Experience Weight</label>
            <input type="range" min="0" max="50" defaultValue="20" className="w-full accent-[#1C5581]" />
            <div className="text-xs text-gray-500 mt-1">20%</div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Collaboration Weight</label>
            <input type="range" min="0" max="50" defaultValue="15" className="w-full accent-[#1C5581]" />
            <div className="text-xs text-gray-500 mt-1">15%</div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Diversity Weight</label>
            <input type="range" min="0" max="50" defaultValue="10" className="w-full accent-[#1C5581]" />
            <div className="text-xs text-gray-500 mt-1">10%</div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Motivation Weight</label>
            <input type="range" min="0" max="50" defaultValue="10" className="w-full accent-[#1C5581]" />
            <div className="text-xs text-gray-500 mt-1">10%</div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Practicality Weight</label>
            <input type="range" min="0" max="50" defaultValue="10" className="w-full accent-[#1C5581]" />
            <div className="text-xs text-gray-500 mt-1">10%</div>
          </div>
        </div>

        <button className="w-full px-6 py-3 bg-[#0E706F] text-white rounded-lg font-semibold hover:bg-[#084343] transition-colors flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Recompute Teams with New Weights
        </button>
      </div>

      {/* Original Interactive Builder (For Manual Tweaking) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Candidate Pool</h4>
          
          <div className="flex gap-2 mb-4">
            <input
              className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-lg outline-none focus:border-[#1C5581] focus:ring-2 focus:ring-indigo-500/20 transition-all text-gray-900 placeholder:text-gray-400"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search candidates"
              onKeyPress={(e) => e.key === 'Enter' && search()}
            />
            <button 
              className="px-5 py-2.5 bg-[#1C5581] text-white rounded-lg font-semibold hover:bg-[#143A58] transition-colors shadow-sm"
              onClick={search}
            >
              Search
            </button>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {pool.length === 0 && (
              <div className="text-center py-12 text-gray-500 text-sm">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="font-medium">Search for candidates to add to your team</p>
              </div>
            )}
            {pool.map((candidate) => (
              <div key={candidate.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all">
                <div className="flex items-center gap-3">
                  <img 
                    src={candidate.photo || 'https://via.placeholder.com/40'} 
                    alt="avatar" 
                    className="w-10 h-10 rounded-lg object-cover border-2 border-gray-200" 
                  />
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{candidate.name}</div>
                    <div className="text-xs text-gray-600">{candidate.title}</div>
                  </div>
                </div>
                <button
                  className="px-3 py-1.5 bg-[#E8F0F0] text-[#1C5581] text-sm font-medium rounded-lg hover:bg-[#B7E6E5] border border-[#0E706F]/20 transition-all"
                  onClick={() => setTeam((current) => Array.from(new Set([...current, candidate.id])))}
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Team Canvas</h4>
          
          <div className="space-y-2 mb-6 max-h-96 overflow-y-auto pr-2">
            {team.length === 0 && (
              <div className="text-center py-12 text-gray-500 text-sm">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="font-medium">No team members yet</p>
                <p className="text-gray-400 text-xs mt-1">Add candidates from the pool</p>
              </div>
            )}
            {team.map((memberId) => {
              const member = pool.find(c => c.id === memberId)
              return (
                <div key={memberId} className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex items-center gap-3">
                    {member && (
                      <>
                        <img 
                          src={member.photo || 'https://via.placeholder.com/40'} 
                          alt="avatar" 
                          className="w-10 h-10 rounded-lg object-cover border-2 border-indigo-300" 
                        />
                        <div>
                          <div className="font-semibold text-sm text-gray-900">{member.name}</div>
                          <div className="text-xs text-gray-600">{member.title}</div>
                        </div>
                      </>
                    )}
                    {!member && <div className="font-semibold text-sm text-gray-900">{memberId}</div>}
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
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-sm hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-green-600"
            onClick={evaluate}
            disabled={team.length === 0}
          >
            Evaluate Team
          </button>
        </div>

        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Team Health</h4>
          
          {evaluation ? (
            <div className="space-y-6">
              <div className="text-center p-8 bg-green-600 rounded-xl shadow-sm">
                <div className="text-sm text-white/90 mb-2 font-medium uppercase tracking-wide">Overall Score</div>
                <div className="text-5xl font-bold text-white mb-1">{(evaluation.teamScore * 100).toFixed(0)}</div>
                <div className="text-green-100 text-sm">Team Performance</div>
              </div>
              
              {evaluation.gaps && evaluation.gaps.length > 0 && (
                <div>
                  <div className="font-semibold text-gray-900 mb-3">Skill Gaps</div>
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
              <p className="text-gray-400 text-xs mt-1">Get AI-powered insights</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
