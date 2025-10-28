import React from 'react'

export default function Analytics() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#0E706F] text-white rounded-full flex items-center justify-center font-bold">5</div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Track & Learn</h2>
            <p className="text-gray-600">Monitor team performance and feed insights back into the system</p>
          </div>
        </div>
      </div>

      {/* Post-Deployment Tracking */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 p-6 rounded-xl mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Feedback Loop Active
        </h3>
        <p className="text-gray-700 mb-4">
          Collecting OKR data, velocity metrics, and peer feedback from <strong>3 active teams</strong>. 
          Next model retrain scheduled in <strong>6 weeks</strong>.
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white p-3 rounded-lg border border-green-200 text-center">
            <div className="text-xl font-bold text-green-700">4-8</div>
            <div className="text-xs text-gray-600">weeks post-eval</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-green-200 text-center">
            <div className="text-xl font-bold text-green-700">156</div>
            <div className="text-xs text-gray-600">data points collected</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-green-200 text-center">
            <div className="text-xl font-bold text-green-700">+12%</div>
            <div className="text-xs text-gray-600">accuracy improvement</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">+12% ↑</div>
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-2">32%</div>
          <div className="text-gray-700 font-medium">Hidden Talent Discovered</div>
          <div className="text-gray-500 text-xs mt-1">vs last month</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">-8min ↓</div>
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-2">42m</div>
          <div className="text-gray-700 font-medium">Avg Team Build Time</div>
          <div className="text-gray-500 text-xs mt-1">improvement</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold">Top</div>
          </div>
          <div className="text-4xl font-bold text-gray-900 mb-2">156</div>
          <div className="text-gray-700 font-medium">Candidates Reviewed</div>
          <div className="text-gray-500 text-xs mt-1">this quarter</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Top Skills in Demand</h3>
          <div className="space-y-4">
            {[
              { skill: 'Machine Learning', percentage: 85, color: 'bg-indigo-600' },
              { skill: 'Python', percentage: 78, color: 'bg-blue-600' },
              { skill: 'Data Analysis', percentage: 72, color: 'bg-green-600' },
              { skill: 'Cloud Computing', percentage: 65, color: 'bg-orange-600' },
              { skill: 'JavaScript', percentage: 58, color: 'bg-amber-600' },
            ].map((item) => (
              <div key={item.skill} className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{item.skill}</span>
                  <span className="text-lg font-bold text-gray-900">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'Team evaluated', project: 'Data Science Hiring', time: '2 hours ago', iconPath: 'M13 10V3L4 14h7v7l9-11h-7z' },
              { action: 'Candidate added', project: 'Engineering Lead', time: '5 hours ago', iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
              { action: 'Search completed', project: 'Frontend Developer', time: '1 day ago', iconPath: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
              { action: 'Team created', project: 'Product Team', time: '2 days ago', iconPath: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
              { action: 'Project started', project: 'Mobile Development', time: '3 days ago', iconPath: 'M13 10V3L4 14h7v7l9-11h-7z' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activity.iconPath} />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900">{activity.action}</div>
                  <div className="text-xs text-gray-600">{activity.project}</div>
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-6 bg-indigo-50 rounded-xl border border-indigo-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-gray-900 font-semibold mb-1">Performance Insights</h4>
            <p className="text-gray-700 text-sm">Your hiring efficiency has improved by 23% this quarter. Keep using AI-powered search to maintain momentum!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
