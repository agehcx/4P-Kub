import React from 'react'
import { Link } from 'react-router-dom'

const stats = [
  {
    label: 'Teams Activated',
    value: '28',
    caption: 'last 90 days',
    accent: 'bg-indigo-100 text-indigo-700',
  },
  {
    label: 'Hiring Velocity',
    value: '2.3x faster',
    caption: 'vs. manual staffing',
    accent: 'bg-emerald-100 text-emerald-700',
  },
  {
    label: 'Stakeholder Confidence',
    value: '94%',
    caption: 'leaders trust our picks',
    accent: 'bg-amber-100 text-amber-700',
  },
]

const scoreBreakdown = [
  { label: 'Technical Fit', value: '35%', description: 'Skills + Role Match', color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
  { label: 'Experience', value: '20%', description: 'KPI + Projects', color: 'text-blue-600 bg-blue-50 border-blue-100' },
  { label: 'Collaboration', value: '15%', description: 'Trust Network', color: 'text-purple-600 bg-purple-50 border-purple-100' },
  { label: 'Diversity', value: '10%', description: 'Inclusion Signals', color: 'text-green-600 bg-green-50 border-green-100' },
  { label: 'Motivation', value: '10%', description: 'Growth & Interests', color: 'text-amber-600 bg-amber-50 border-amber-100' },
  { label: 'Practicality', value: '10%', description: 'Availability & Load', color: 'text-gray-700 bg-gray-50 border-gray-100' },
]

const workflowSteps = [
  {
    title: 'Define Mission',
    description: 'Set team size, success metrics, and constraints.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
  {
    title: 'Generate Shortlist',
    description: 'AI ranks the top 30% with reasoning you can review.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  },
  {
    title: 'Propose Teams',
    description: 'Compare three mixes with trade-offs spelled out.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    title: 'Track & Analytics',
    description: 'Monitor OKRs, feedback, and iteration loops.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
]

const pillars = [
  {
    title: 'Transparent Decisions',
    body: 'Explainable scorecards and human approval in every step.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    accent: 'bg-indigo-100 text-indigo-700',
  },
  {
    title: 'Privacy by Design',
    body: 'Least-privilege access and auditable data trails.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    accent: 'bg-blue-100 text-blue-700',
  },
  {
    title: 'Continuous Learning',
    body: 'Feedback loops feed the model every sprint for accuracy gains.',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581',
    accent: 'bg-emerald-100 text-emerald-700',
  },
  {
    title: 'Human Outcomes',
    body: 'Focus on engagement, retention, and balanced workloads.',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    accent: 'bg-amber-100 text-amber-700',
  },
]

const projects = [
  {
    title: 'Energy Transition 2030',
    status: 'ACTIVE',
    statusTone: 'bg-emerald-100 text-emerald-700',
    description: 'Multi-disciplinary task force for sustainability goals.',
    badges: ['Strategy', 'Data', 'ESG'],
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    link: '/search',
    linkLabel: 'View Shortlist',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    title: 'Data Science Guild',
    status: 'REVIEW',
    statusTone: 'bg-amber-100 text-amber-700',
    description: 'Elevating ML leadership for new AI initiatives.',
    badges: ['Machine Learning', 'Python', 'NLP'],
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    link: '/team',
    linkLabel: 'Open Team Builder',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'Start a New Mission',
    status: 'NEW',
    statusTone: 'bg-sky-100 text-sky-700',
    description: 'Kick off a fresh search with contextual prompts.',
    badges: ['Roles', 'Skills', 'Constraints'],
    icon: 'M12 4v16m8-8H4',
    link: '/search',
    linkLabel: 'Launch Brief',
    color: 'bg-slate-100 text-slate-600',
  },
]

export default function Landing() {
  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF4F4] text-[#0E706F] text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#0E706F]"></span>
            AI Orchestrated Hiring
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Build elite teams with confidence, not guesswork
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            CP Konha blends graph intelligence, explainable AI, and human oversight to surface the right people, reveal trade-offs, and keep talent decisions fair and fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/search"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0E706F] text-white font-semibold shadow-md hover:bg-[#084343] transition-colors"
            >
              Start Team Formation
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              to="/analytics"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-lg border border-gray-300 text-gray-800 font-semibold hover:border-[#0E706F] hover:text-[#0E706F] transition-colors"
            >
              View Live Analytics
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${stat.accent} mb-3`}>{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{stat.caption}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#DCF3F2] via-white to-[#F3F8FB] rounded-3xl blur-xl opacity-70"></div>
          <div className="relative p-8 rounded-3xl bg-white border border-gray-200 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[#0E706F]">Composite Score</span>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-5xl font-bold text-gray-900">92</span>
                <span className="text-sm font-semibold text-emerald-600 mb-1">+12% vs last cycle</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Blended metric across capability, collaboration, and reliability signals.</p>
            </div>
            <div className="space-y-3">
              {scoreBreakdown.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl border ${item.color}`}
                >
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-10">
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">Workflow</div>
          <h2 className="text-3xl font-bold text-gray-900">Four deliberate moments for smarter staffing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Each stage is measurable, auditable, and designed to balance velocity with fairness.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {workflowSteps.map((step, index) => (
            <div key={step.title} className="relative p-6 bg-white border border-gray-200 rounded-2xl shadow-sm h-full">
              <div className="absolute -top-4 left-6 flex items-center justify-center w-10 h-10 rounded-full bg-[#0E706F] text-white font-bold shadow-md">{index + 1}</div>
              <div className="mt-2 mb-4 w-12 h-12 rounded-xl bg-[#EAF4F4] flex items-center justify-center text-[#0E706F]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6 p-8 rounded-3xl bg-gradient-to-br from-white via-white to-[#FFFF] border border-gray-200 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E706F]/10 text-[#0E706F] text-xs font-semibold">Operating Pillars</div>
          <h2 className="text-3xl font-bold text-gray-900">Governance that blends automation with human oversight</h2>
          <p className="text-gray-600">Guardrails ensure decisions stay equitable while learnings cycle back into the intelligence layer.</p>
          <div className="grid gap-4">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-200">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pillar.accent}`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={pillar.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{pillar.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{pillar.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Outcome Dashboard</h2>
              <p className="text-sm text-gray-600">Data-backed signals that leadership tracks every sprint.</p>
            </div>
            <Link to="/analytics" className="text-sm font-semibold text-[#0E706F] hover:underline">Open dashboard →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[ 
              { label: 'Quality', detail: 'Team OKRs hit', value: '87%', delta: '+9% QoQ', tone: 'text-emerald-600' },
              { label: 'People', detail: 'Engagement & retention', value: '4.6', delta: 'eNPS score', tone: 'text-indigo-600' },
              { label: 'Process', detail: 'Time-to-staff', value: '42m', delta: '-18 min', tone: 'text-blue-600' },
              { label: 'Fairness', detail: 'Hiring parity index', value: '0.98', delta: 'Within guardrails', tone: 'text-amber-600' },
            ].map((metric) => (
              <div key={metric.label} className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{metric.label}</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">{metric.value}</div>
                <div className={`text-xs font-medium mt-1 ${metric.tone}`}>{metric.delta}</div>
                <div className="mt-2 text-xs text-gray-500">{metric.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Active missions</h2>
            <p className="text-sm text-gray-600">Real teams come together with CP Konha. See the momentum live.</p>
          </div>
          <Link
            to="/team"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 text-sm font-semibold text-gray-800 hover:border-[#0E706F] hover:text-[#0E706F] transition-colors"
          >
            Review team canvas
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <div key={project.title} className="p-6 rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${project.color}`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={project.icon} />
                  </svg>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.statusTone}`}>{project.status}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.badges.map((badge) => (
                  <span key={badge} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">{badge}</span>
                ))}
              </div>
              <Link
                to={project.link}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E706F] hover:underline"
              >
                {project.linkLabel}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="p-10 rounded-3xl bg-gradient-to-r from-[#0E706F] to-[#143A58] text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to launch your next mission?</h2>
          <p className="text-white/80 max-w-xl text-sm md:text-base">Spin up a tailored candidate graph, surface diverse options, and keep stakeholders aligned from day one.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/search"
            className="px-6 py-3 bg-white text-[#0E706F] font-semibold rounded-lg shadow-md hover:text-[#084343] transition-colors text-center"
          >
            Create mission brief
          </Link>
          <Link
            to="/analytics"
            className="px-6 py-3 bg-transparent border border-white/60 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-center"
          >
            Explore analytics
          </Link>
        </div>
      </section>
    </div>
  )
}
