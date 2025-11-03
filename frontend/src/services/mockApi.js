const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

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

function parseSkills(input) {
  if (!input) return []
  if (Array.isArray(input)) {
    return input.map((skill) => skill.trim()).filter(Boolean)
  }
  return String(input)
    .replace(/;/g, ',')
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean)
}

async function requestApi(endpoint, options) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`API ${endpoint} failed: ${response.status} ${message}`)
  }
  return response.json()
}

export async function mockSearch(body = {}) {
  const payload = {
    projectName: body.projectName || body.query || '',
    query: body.query || '',
    requiredSkills: parseSkills(body.requiredSkills),
    niceToHave: parseSkills(body.niceToHave),
    teamSize: body.teamSize ? Number(body.teamSize) : undefined,
    limit: body.limit || 10,
  }

  try {
    return await requestApi('/search', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  } catch (error) {
    console.warn('Falling back to mock search data:', error)
    await new Promise((resolve) => setTimeout(resolve, 200))
    return { candidates: sampleCandidates, total: sampleCandidates.length }
  }
}

export async function mockGetCandidate(id) {
  try {
    return await requestApi(`/candidates/${encodeURIComponent(id)}`, {
      method: 'GET',
    })
  } catch (error) {
    console.warn('Falling back to mock candidate detail:', error)
    await new Promise((resolve) => setTimeout(resolve, 150))
    return sampleCandidates.find((candidate) => candidate.id === id) || sampleCandidates[0]
  }
}

export async function mockEvaluateTeam(body = {}) {
  const payload = {
    candidateIds: body.candidateIds || [],
    requiredSkills: parseSkills(body.requiredSkills),
  }

  try {
    return await requestApi('/team/evaluate', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  } catch (error) {
    console.warn('Falling back to mock team evaluation:', error)
    await new Promise((resolve) => setTimeout(resolve, 250))
    const teamScore = Math.min(0.95, 0.5 + (payload.candidateIds.length || 0) * 0.15)
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
}
