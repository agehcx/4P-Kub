import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Graph-RAG Team Formation
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          From gut feeling to data-driven decisions. Build high-performance teams with AI-powered matching—transparent, fair, and optimized for success.
        </p>
        <Link 
          to="/search" 
          className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md text-lg"
        >
          Start Team Formation →
        </Link>
      </div>

      {/* Scoring System */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Composite Team-Fit Score</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <div className="text-2xl font-bold text-indigo-600 mb-1">35%</div>
            <div className="text-xs font-semibold text-gray-700">Technical Fit</div>
            <div className="text-xs text-gray-500 mt-1">Skills + Role Match</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">20%</div>
            <div className="text-xs font-semibold text-gray-700">Experience</div>
            <div className="text-xs text-gray-500 mt-1">KPI + Projects</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-600 mb-1">15%</div>
            <div className="text-xs font-semibold text-gray-700">Collaboration</div>
            <div className="text-xs text-gray-500 mt-1">Trust Network</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600 mb-1">10%</div>
            <div className="text-xs font-semibold text-gray-700">Diversity</div>
            <div className="text-xs text-gray-500 mt-1">Inclusion</div>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="text-2xl font-bold text-amber-600 mb-1">10%</div>
            <div className="text-xs font-semibold text-gray-700">Motivation</div>
            <div className="text-xs text-gray-500 mt-1">Interest + Growth</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-600 mb-1">10%</div>
            <div className="text-xs font-semibold text-gray-700">Practicality</div>
            <div className="text-xs text-gray-500 mt-1">Availability</div>
          </div>
        </div>
      </div>

      {/* HR User Flow - 10 Steps */}
      <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">HR Workflow (5-Step Process)</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg border-2 border-indigo-200 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 text-sm mb-1 text-center">Define Mission</h4>
            <p className="text-xs text-gray-600 text-center">Set team size, skills needed, constraints</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border-2 border-blue-200 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 text-sm mb-1 text-center">Generate Shortlist</h4>
            <p className="text-xs text-gray-600 text-center">AI ranks Top 30% candidates with explanations</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border-2 border-purple-200 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 text-sm mb-1 text-center">Propose Teams</h4>
            <p className="text-xs text-gray-600 text-center">3 team options with trade-offs</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border-2 border-green-200 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 text-sm mb-1 text-center">Adjust & Approve</h4>
            <p className="text-xs text-gray-600 text-center">Fine-tune weights, review risks, finalize</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border-2 border-amber-200 relative">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900 text-sm mb-1 text-center">Track & Learn</h4>
            <p className="text-xs text-gray-600 text-center">Monitor OKRs, collect feedback, retrain</p>
          </div>
        </div>
      </div>

      {/* Active Projects */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Energy Transition 2030</h3>
                  <p className="text-sm text-gray-500">20 members needed</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">ACTIVE</span>
            </div>
            <p className="text-gray-600 text-sm mb-3">Building multi-disciplinary team for sustainability project</p>
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md">Strategy</span>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md">Data</span>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md">ESG</span>
            </div>
            <Link to="/search" className="block w-full px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors text-center">
              View Shortlist
            </Link>
          </div>

          <div className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Data Science Team</h3>
                  <p className="text-sm text-gray-500">8 members needed</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">REVIEW</span>
            </div>
            <p className="text-gray-600 text-sm mb-3">Building elite ML team for AI initiatives</p>
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-md">ML</span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-md">Python</span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-md">NLP</span>
            </div>
            <Link to="/team-builder" className="block w-full px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors text-center">
              Build Team
            </Link>
          </div>

          <div className="group p-6 bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 transition-all cursor-pointer">
            <Link to="/search" className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-gray-400 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">New Project</h3>
              <p className="text-sm text-gray-500">Start a new team formation</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Guardrails & KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Guardrails
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span><strong>Fairness:</strong> Explainable scores + human approval</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span><strong>Privacy:</strong> Least-privilege data access</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span><strong>Learning:</strong> Feedback loops for improvement</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Key Metrics
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
              <span><strong>Quality:</strong> Team OKR attainment, skill coverage</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
              <span><strong>People:</strong> Engagement, retention, fairness perception</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
              <span><strong>Process:</strong> Time-to-staff, explainability, iteration speed</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
