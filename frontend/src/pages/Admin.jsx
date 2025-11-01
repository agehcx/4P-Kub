import React, { useState } from 'react'

export default function Admin() {
  const [dragActive, setDragActive] = useState(false)

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Data Pipeline & Integrations</h2>
        <p className="text-gray-600">Manage multi-signal data ingestion for Graph-RAG</p>
      </div>

      {/* Data Model Overview */}
      <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-[#0E706F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Multi-Signal Data Model
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-3 rounded-lg border border-indigo-200">
            <div className="font-semibold text-sm text-gray-900 mb-1">Core Entities</div>
            <div className="text-xs text-gray-600">Person, Skill, Project, KPI, Interest, Team</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-indigo-200">
            <div className="font-semibold text-sm text-gray-900 mb-1">Relations</div>
            <div className="text-xs text-gray-600">worked_with, has_skill, trust, conflict</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-indigo-200">
            <div className="font-semibold text-sm text-gray-900 mb-1">Signals</div>
            <div className="text-xs text-gray-600">HRIS, KPI, 360 feedback, interests, availability</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-indigo-200">
            <div className="font-semibold text-sm text-gray-900 mb-1">Graph DB</div>
            <div className="text-xs text-gray-600">Neo4j + FAISS vectors</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Upload Candidate Data</h3>
          
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
              dragActive 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Drag & drop CSV file here
            </p>
            <p className="text-sm text-gray-500 mb-6">or</p>
            <button className="px-6 py-3 bg-[#0E706F] text-white rounded-lg font-semibold shadow-sm hover:bg-indigo-700 transition-colors">
              Browse Files
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-gray-700">
                Accepted formats: CSV, Excel. Maximum file size: 50MB. Data will be processed with AI-powered matching.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Connected Integrations</h3>
          
          <div className="space-y-3">
            {[
              { name: 'LinkedIn Talent Hub', status: 'Connected', iconPath: 'M20 2H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2zm-2 14h-2v-5.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5V16h-2v-8h2v1.147c.417-.483 1.03-.897 1.75-.897 1.657 0 3 1.343 3 3v4.75zM6 8h2v8H6V8zm1-3a1.5 1.5 0 110 3 1.5 1.5 0 010-3z', statusColor: 'bg-green-100 text-green-700' },
              { name: 'GitHub', status: 'Connected', iconPath: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z', statusColor: 'bg-green-100 text-green-700' },
              { name: 'Greenhouse ATS', status: 'Pending', iconPath: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z', statusColor: 'bg-amber-100 text-amber-700' },
              { name: 'Slack Notifications', status: 'Disconnected', iconPath: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', statusColor: 'bg-red-100 text-red-700' },
            ].map((integration) => (
              <div key={integration.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#C4E0F6]/50 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#1C5581]" fill="currentColor" viewBox="0 0 24 24">
                      <path d={integration.iconPath} />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{integration.name}</div>
                    <div className={`text-xs px-2 py-1 rounded-md inline-block mt-1 font-medium ${integration.statusColor}`}>
                      {integration.status}
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#C4E0F6]/50 text-[#1C5581] rounded-lg hover:bg-indigo-100 border border-indigo-200 transition-all text-sm font-medium">
                  Configure
                </button>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 px-6 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg font-medium hover:border-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all">
            + Add New Integration
          </button>
        </div>
      </div>

      <div className="mt-6 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Ingestion Status</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 uppercase">Source</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 uppercase">Last Sync</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 uppercase">Records</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { source: 'candidates_2024.csv', lastSync: '2 hours ago', records: '1,234', status: 'Success', statusColor: 'bg-green-100 text-green-700' },
                { source: 'LinkedIn Import', lastSync: '5 hours ago', records: '856', status: 'Success', statusColor: 'bg-green-100 text-green-700' },
                { source: 'GitHub Profiles', lastSync: '1 day ago', records: '432', status: 'Success', statusColor: 'bg-green-100 text-green-700' },
                { source: 'Manual Upload', lastSync: '3 days ago', records: '92', status: 'Failed', statusColor: 'bg-red-100 text-red-700' },
              ].map((record, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium">{record.source}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{record.lastSync}</td>
                  <td className="py-4 px-4 text-sm text-gray-900 font-semibold">{record.records}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-md text-xs font-semibold uppercase ${record.statusColor}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
