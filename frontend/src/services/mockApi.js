const sampleCandidates = [
  {
    id: 'c1',
    name: 'Alice Chan',
    title: 'Data Scientist',
    photo: '',
    score: 0.82,
    topSkills: ['Python', 'ML', 'NLP'],
    rationaleShort: 'Strong ML background',
    rationaleFull: 'Worked on recommender systems...',
    skillScore: 0.9,
    networkScore: 0.6,
  },
  {
    id: 'c2',
    name: 'Boris Lee',
    title: 'Software Engineer',
    photo: '',
    score: 0.74,
    topSkills: ['Go', 'Distributed Systems'],
    rationaleShort: 'Backend focus',
    rationaleFull: 'Contributed to infra...',
    skillScore: 0.7,
    networkScore: 0.4,
  },
  {
    id: 'c3',
    name: 'Carla Ruiz',
    title: 'Product Analyst',
    photo: '',
    score: 0.69,
    topSkills: ['SQL', 'Analytics'],
    rationaleShort: 'Strong analytics',
    rationaleFull: 'Led analytics for...',
    skillScore: 0.6,
    networkScore: 0.8,
  },
]

export async function mockSearch(body) {
  // simulate latency
  await new Promise((resolve) => setTimeout(resolve, 200))
  return { candidates: sampleCandidates, total: sampleCandidates.length }
}

export async function mockGetCandidate(id) {
  await new Promise((resolve) => setTimeout(resolve, 150))
  return sampleCandidates.find((candidate) => candidate.id === id) || sampleCandidates[0]
}

export async function mockEvaluateTeam(body) {
  await new Promise((resolve) => setTimeout(resolve, 250))
  const teamScore = Math.min(0.95, 0.5 + (body.candidateIds?.length || 0) * 0.15)
  const gaps = [{ skill: 'ML Ops', severity: 'high' }]
  const alternatives = [
    { name: 'Balanced', candidateIds: ['c1', 'c2'] },
    { name: 'Growth', candidateIds: ['c1', 'c3'] },
    { name: 'Efficiency', candidateIds: ['c2', 'c3'] },
  ]

  return {
    teamScore,
    gaps,
    diversityMetrics: { genderDiversity: 0.5 },
    alternatives,
  }
}
