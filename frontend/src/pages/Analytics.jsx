import React, { useId, useMemo, useState } from 'react'

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const TEAM_PROFILES = {
  overall: {
    id: 'overall',
    name: 'Portfolio Overview',
    description: 'Aggregated view across 6 missions currently tracked',
    cycleTime: 36,
    cycleDelta: -6,
    csat: 4.6,
    csatDelta: 0.3,
    retention: 93,
    retentionDelta: 4,
    coverage: 82,
    coverageDelta: 5,
    velocitySeries: [68, 70, 72, 74, 76, 78, 81, 82, 84, 85, 87, 89],
    satisfactionSeries: [4.1, 4.2, 4.3, 4.2, 4.4, 4.5, 4.6, 4.6, 4.7, 4.7, 4.8, 4.8],
    contributions: [
      { label: 'Delivery Velocity', value: 92 },
      { label: 'Engagement Score', value: 88 },
      { label: 'Quality & Compliance', value: 85 },
    ],
    topSkills: [
      { skill: 'Strategic Ops', percentage: 86, color: 'bg-indigo-600' },
      { skill: 'Data Analysis', percentage: 82, color: 'bg-blue-600' },
      { skill: 'Stakeholder Comms', percentage: 76, color: 'bg-emerald-600' },
      { skill: 'Change Management', percentage: 69, color: 'bg-amber-600' },
      { skill: 'Program Delivery', percentage: 63, color: 'bg-purple-600' },
    ],
    recentActivity: [
      { action: 'Team evaluated', project: 'Energy Transition 2030', time: '2 hours ago', iconPath: 'M13 10V3L4 14h7v7l9-11h-7z' },
      { action: 'Feedback captured', project: 'Data Science Guild', time: '5 hours ago', iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
      { action: 'Search completed', project: 'Frontend Revamp', time: '1 day ago', iconPath: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
      { action: 'Team created', project: 'CX Innovation Pod', time: '2 days ago', iconPath: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
      { action: 'Project started', project: 'Mobile Experience', time: '3 days ago', iconPath: 'M13 10V3L4 14h7v7l9-11h-7z' },
    ],
  },
  'team-strategic': {
    id: 'team-strategic',
    name: 'Strategic Anchor Team',
    description: 'Senior-led strategy unit guiding multi-market launches',
    cycleTime: 32,
    cycleDelta: -8,
    csat: 4.8,
    csatDelta: 0.4,
    retention: 96,
    retentionDelta: 5,
    coverage: 88,
    coverageDelta: 6,
    velocitySeries: [72, 74, 75, 77, 79, 80, 82, 83, 85, 86, 87, 88],
    satisfactionSeries: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.8, 4.9, 4.9, 5.0, 5.0],
    contributions: [
      { label: 'Delivery Velocity', value: 94 },
      { label: 'Engagement Score', value: 91 },
      { label: 'Quality & Compliance', value: 89 },
    ],
    topSkills: [
      { skill: 'Program Architecture', percentage: 90, color: 'bg-indigo-600' },
      { skill: 'Risk Navigation', percentage: 84, color: 'bg-blue-600' },
      { skill: 'Stakeholder Comms', percentage: 80, color: 'bg-emerald-600' },
      { skill: 'Change Management', percentage: 74, color: 'bg-amber-600' },
      { skill: 'Financial Modeling', percentage: 64, color: 'bg-purple-600' },
    ],
    recentActivity: [
      { action: 'OKR update submitted', project: 'Strategic Anchor Team', time: '45 mins ago', iconPath: 'M5 13l4 4L19 7' },
      { action: 'Mentor session logged', project: 'Senior Analysts', time: '3 hours ago', iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
      { action: 'Risk register review', project: 'SE Asia rollout', time: 'yesterday', iconPath: 'M9 12l2 2 4-4' },
    ],
  },
  'team-ops': {
    id: 'team-ops',
    name: 'Insight Ops Team',
    description: 'Data-first delivery pod monitoring KPIs and automation',
    cycleTime: 38,
    cycleDelta: -4,
    csat: 4.4,
    csatDelta: 0.2,
    retention: 92,
    retentionDelta: 3,
    coverage: 79,
    coverageDelta: 4,
    velocitySeries: [63, 65, 67, 70, 72, 73, 75, 77, 78, 79, 81, 82],
    satisfactionSeries: [4.0, 4.1, 4.2, 4.2, 4.3, 4.4, 4.4, 4.5, 4.5, 4.6, 4.6, 4.6],
    contributions: [
      { label: 'Delivery Velocity', value: 88 },
      { label: 'Engagement Score', value: 84 },
      { label: 'Quality & Compliance', value: 82 },
    ],
    topSkills: [
      { skill: 'Automation', percentage: 88, color: 'bg-indigo-600' },
      { skill: 'Data Engineering', percentage: 83, color: 'bg-blue-600' },
      { skill: 'Monitoring & Alerting', percentage: 80, color: 'bg-emerald-600' },
      { skill: 'Incident Response', percentage: 71, color: 'bg-amber-600' },
      { skill: 'Process Design', percentage: 66, color: 'bg-purple-600' },
    ],
    recentActivity: [
      { action: 'Automation deployed', project: 'Insight Ops Team', time: '1 hour ago', iconPath: 'M13 10V3L4 14h7v7l9-11h-7z' },
      { action: 'Dashboard refresh', project: 'KPI Monitoring', time: '6 hours ago', iconPath: 'M21 12.79A9 9 0 1111.21 3H12' },
      { action: 'Incident drill', project: 'Resilience Run', time: 'yesterday', iconPath: 'M9 12l2 2 4-4' },
    ],
  },
  'team-momentum': {
    id: 'team-momentum',
    name: 'Momentum Builders',
    description: 'Cross-functional pod accelerating experimentation',
    cycleTime: 39,
    cycleDelta: -3,
    csat: 4.3,
    csatDelta: 0.1,
    retention: 90,
    retentionDelta: 2,
    coverage: 77,
    coverageDelta: 3,
    velocitySeries: [58, 60, 62, 65, 67, 69, 70, 72, 74, 75, 77, 79],
    satisfactionSeries: [3.9, 4.0, 4.2, 4.1, 4.2, 4.3, 4.3, 4.4, 4.4, 4.5, 4.5, 4.5],
    contributions: [
      { label: 'Delivery Velocity', value: 84 },
      { label: 'Engagement Score', value: 86 },
      { label: 'Quality & Compliance', value: 79 },
    ],
    topSkills: [
      { skill: 'Experiment Design', percentage: 82, color: 'bg-indigo-600' },
      { skill: 'Product Discovery', percentage: 78, color: 'bg-blue-600' },
      { skill: 'CX Research', percentage: 74, color: 'bg-emerald-600' },
      { skill: 'Rapid Prototyping', percentage: 70, color: 'bg-amber-600' },
      { skill: 'Growth Analytics', percentage: 65, color: 'bg-purple-600' },
    ],
    recentActivity: [
      { action: 'Experiment launched', project: 'Growth Loop', time: '30 mins ago', iconPath: 'M13 10V3L4 14h7v7l9-11h-7z' },
      { action: 'Retro feedback', project: 'Momentum Builders', time: '4 hours ago', iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
      { action: 'Hypothesis archived', project: 'CX Experimentation', time: 'yesterday', iconPath: 'M9 12l2 2 4-4' },
    ],
  },
}

const TEAM_LIST = [
  {
    id: 'team-strategic',
    name: 'Strategic Anchor Team',
    owner: 'Mission Control',
    cycleTime: 32,
    csat: 4.8,
    coverage: 88,
    status: 'Healthy',
    statusTone: 'bg-emerald-100 text-emerald-700',
    delta: -8,
  },
  {
    id: 'team-ops',
    name: 'Insight Ops Team',
    owner: 'Automation Guild',
    cycleTime: 38,
    csat: 4.4,
    coverage: 79,
    status: 'Watch',
    statusTone: 'bg-amber-100 text-amber-700',
    delta: -4,
  },
  {
    id: 'team-momentum',
    name: 'Momentum Builders',
    owner: 'Product Growth',
    cycleTime: 39,
    csat: 4.3,
    coverage: 77,
    status: 'Healthy',
    statusTone: 'bg-emerald-100 text-emerald-700',
    delta: -3,
  },
]

function Sparkline({ data, color = '#0E706F' }) {
  const gradientId = useId()
  const width = 460
  const height = 160

  const { linePath, fillPath, yPositions } = useMemo(() => {
    if (!data || data.length === 0) {
      return { linePath: '', fillPath: '', yPositions: [] }
    }
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    const step = width / Math.max(data.length - 1, 1)
    const baseline = height - 24

    let path = ''
    const points = data.map((value, index) => {
      const x = index * step
      const y = baseline - ((value - min) / range) * (height - 48)
      path += `${index === 0 ? 'M' : 'L'}${x},${y}`
      return { x, y }
    })

    const fill = `${path} L${points[points.length - 1].x},${baseline} L0,${baseline} Z`

    return {
      linePath: path,
      fillPath: fill,
      yPositions: points,
    }
  }, [data, height, width])

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={width} height={height} fill="none" />
      {fillPath && <path d={fillPath} fill={`url(#${gradientId})`} stroke="none" />}
      {linePath && <path d={linePath} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" />} 
      {yPositions.length > 0 && (
        <circle cx={yPositions[yPositions.length - 1].x} cy={yPositions[yPositions.length - 1].y} r={4} fill={color} />
      )}
    </svg>
  )
}

export default function Analytics() {
  const [selectedTeam, setSelectedTeam] = useState('overall')
  const [selectedRange, setSelectedRange] = useState('QTD')

  const teamChoices = useMemo(() => Object.values(TEAM_PROFILES), [])
  const currentTeam = TEAM_PROFILES[selectedTeam] || TEAM_PROFILES.overall

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#0E706F] to-[#084343] text-white rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V7a1 1 0 012 0v4h4a1 1 0 010 2h-4v4a1 1 0 01-2 0v-4H7a1 1 0 010-2h4z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Track & Analytics</h1>
            <p className="text-gray-600 leading-relaxed">Switch between missions to inspect velocity, sentiment, and coverage. All metrics update instantly so you can coach before issues spread.</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-3">
          <div className="flex items-center gap-1 bg-gray-100 border border-gray-200 p-1 rounded-xl">
            {teamChoices.map((team) => (
              <button
                key={team.id}
                type="button"
                onClick={() => setSelectedTeam(team.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${selectedTeam === team.id ? 'bg-white text-[#0E706F] shadow-sm border border-[#0E706F33]' : 'text-gray-600 hover:text-[#0E706F]'}`}
              >
                {team.name.replace(' Team', '')}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 bg-gray-100 border border-gray-200 p-1 rounded-xl">
            {['MTD', 'QTD', 'YTD'].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setSelectedRange(range)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${selectedRange === range ? 'bg-white text-[#0E706F] shadow-sm border border-[#0E706F33]' : 'text-gray-600 hover:text-[#0E706F]'}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-6 rounded-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Feedback Loop Active
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mt-1">
              Collecting OKR data, velocity metrics, and peer feedback from <strong>{teamChoices.length - 1} active pods</strong>. Model refresh scheduled in <strong>6 weeks</strong> with {TEAM_PROFILES.overall.contributions[0].value}% coverage across signals.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Cycle window', value: '4-8 wks' },
              { label: 'Signals logged', value: '156' },
              { label: 'Accuracy delta', value: '+12%' },
            ].map((item) => (
              <div key={item.label} className="bg-white px-4 py-3 rounded-lg border border-green-200 text-center">
                <div className="text-lg font-bold text-green-700">{item.value}</div>
                <div className="text-[11px] uppercase tracking-wide text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[{
          label: 'Median cycle time',
          value: `${currentTeam.cycleTime} hrs`,
          delta: currentTeam.cycleDelta,
          description: 'Brief to launch',
          icon: 'M12 8v4l3 3',
          tone: 'bg-blue-100 text-blue-600',
        }, {
          label: 'Stakeholder CSAT',
          value: `${currentTeam.csat.toFixed(1)} / 5`,
          delta: currentTeam.csatDelta,
          description: 'Post-handoff surveys',
          icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
          tone: 'bg-amber-100 text-amber-600',
        }, {
          label: 'Retention outlook',
          value: `${currentTeam.retention}%`,
          delta: currentTeam.retentionDelta,
          description: '3-month horizon',
          icon: 'M5 13l4 4L19 7',
          tone: 'bg-emerald-100 text-emerald-600',
        }, {
          label: 'Skill coverage',
          value: `${currentTeam.coverage}%`,
          delta: currentTeam.coverageDelta,
          description: 'Match vs brief',
          icon: 'M9 12l2 2 4-4',
          tone: 'bg-indigo-100 text-indigo-600',
        }].map((card) => (
          <div key={card.label} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${card.tone}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                </svg>
              </div>
              <div className={`text-xs font-semibold px-3 py-1 rounded-full ${card.delta >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                {card.delta >= 0 ? '+' : ''}{card.delta}{card.label.includes('CSAT') ? '' : '%'}
              </div>
            </div>
            <div className="mt-4 text-2xl font-bold text-gray-900">{card.value}</div>
            <div className="text-sm font-medium text-gray-700">{card.label}</div>
            <div className="text-xs text-gray-500 mt-1">{card.description}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.9fr] gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Velocity trend</h2>
              <p className="text-sm text-gray-600">Cycle time tracked over the last 12 weeks ({selectedRange})</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-[#0E706F]"></span>
                <span>Hours to launch</span>
              </span>
            </div>
          </div>
          <div className="mt-4">
            <Sparkline data={currentTeam.velocitySeries} color="#0E706F" />
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            {MONTH_LABELS.map((label, index) => (
              <span key={label} className="w-full text-center">
                {index % 2 === 0 ? label : ''}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Signal contribution</h2>
          <div className="space-y-4">
            {currentTeam.contributions.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-[#0E706F] rounded-full" style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-[#E6F2F2] border border-[#0E706F26] rounded-lg text-sm text-[#0E706F]">
            {currentTeam.description}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Top skills in demand</h2>
          <div className="space-y-4">
            {currentTeam.topSkills.map((item) => (
              <div key={item.skill} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">{item.skill}</div>
                  <div className="text-base font-semibold text-gray-900">{item.percentage}%</div>
                </div>
                <div className="mt-2 h-2.5 bg-white rounded-full border border-gray-100 overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent activity</h2>
          <div className="space-y-3">
            {(currentTeam.recentActivity || TEAM_PROFILES.overall.recentActivity).map((activity, index) => (
              <div key={`${activity.project}-${index}`} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activity.iconPath} />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900">{activity.action}</div>
                  <div className="text-xs text-gray-600">{activity.project}</div>
                </div>
                <div className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Team comparison</h2>
            <p className="text-sm text-gray-600">Stack rank pods to understand where coaching or reinforcements are needed.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-[11px] tracking-[0.18em]">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Team</th>
                <th className="px-4 py-3 text-left font-semibold">Owner</th>
                <th className="px-4 py-3 text-left font-semibold">Cycle time (hrs)</th>
                <th className="px-4 py-3 text-left font-semibold">CSAT</th>
                <th className="px-4 py-3 text-left font-semibold">Coverage</th>
                <th className="px-4 py-3 text-left font-semibold">Health</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {TEAM_LIST.map((team) => (
                <tr key={team.id} className={selectedTeam === team.id ? 'bg-[#F4FAF9]' : 'bg-white'}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-900">{team.name}</div>
                    <div className="text-xs text-gray-500">Δ {team.delta} hrs vs baseline</div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{team.owner}</td>
                  <td className="px-4 py-3 text-gray-700">{team.cycleTime}</td>
                  <td className="px-4 py-3 text-gray-700">{team.csat.toFixed(1)}</td>
                  <td className="px-4 py-3 text-gray-700">{team.coverage}%</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${team.statusTone}`}>{team.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedTeam(team.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-[#0E706F] border border-[#0E706F33] rounded-lg hover:bg-[#E6F2F2] transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="p-6 bg-indigo-50 border border-indigo-200 rounded-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 font-semibold mb-1">Performance insight</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {currentTeam.name} is trending {currentTeam.cycleDelta < 0 ? 'faster' : 'slower'} than baseline. Re-run a scenario from the Team Builder to reinforce strengths and address coaching opportunities before the next retrain.
            </p>
          </div>
          <button className="px-5 py-2 bg-[#0E706F] text-white rounded-lg font-semibold shadow-sm hover:bg-[#084343] transition-colors text-sm">
            Open Team Builder
          </button>
        </div>
      </section>
    </div>
  )
}
