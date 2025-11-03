import { parseCSVToCandidates } from '../utils/csvParser.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

// Cache for CSV data
let csvCandidates = null;

async function loadCandidatesFromCSV() {
  if (csvCandidates) {
    return csvCandidates;
  }
  
  try {
    const response = await fetch('/candidates.csv');
    if (!response.ok) {
      throw new Error('Failed to fetch CSV file');
    }
    const csvText = await response.text();
    csvCandidates = parseCSVToCandidates(csvText);
    return csvCandidates;
  } catch (error) {
    console.error('Error loading CSV:', error);
    // Fallback to sample data
    return sampleCandidates;
  }
}

const sampleCandidates = [
  {
    id: 'c1',
    name: 'Alice Chan',
    title: 'Senior Data Scientist',
    photo: 'https://i.pravatar.cc/150?img=1',
    score: 0.92,
    topSkills: ['Python', 'Machine Learning', 'NLP', 'TensorFlow', 'AWS'],
    rationaleShort: 'Exceptional ML expertise with proven track record in production systems',
    rationaleFull: 'Led development of recommendation systems at scale, published research in top-tier conferences. Strong background in deep learning and natural language processing with 8+ years experience.',
    skillScore: 0.95,
    networkScore: 0.88,
  },
  {
    id: 'c2',
    name: 'Boris Lee',
    title: 'Principal Software Engineer',
    photo: 'https://i.pravatar.cc/150?img=2',
    score: 0.89,
    topSkills: ['Go', 'Kubernetes', 'Distributed Systems', 'Cloud Architecture', 'GraphQL'],
    rationaleShort: 'Expert in distributed systems and cloud-native architectures',
    rationaleFull: 'Architected and built large-scale distributed systems serving millions of users. Deep expertise in microservices, container orchestration, and cloud infrastructure design.',
    skillScore: 0.91,
    networkScore: 0.86,
  },
  {
    id: 'c3',
    name: 'Carla Ruiz',
    title: 'Senior Product Analyst',
    photo: 'https://i.pravatar.cc/150?img=3',
    score: 0.85,
    topSkills: ['SQL', 'Python', 'Tableau', 'A/B Testing', 'Product Analytics'],
    rationaleShort: 'Strong analytical thinking with excellent product sense',
    rationaleFull: 'Led analytics initiatives that drove 40% increase in user engagement. Expert in statistical analysis, experimentation design, and data visualization. Strong business acumen.',
    skillScore: 0.83,
    networkScore: 0.87,
  },
  {
    id: 'c4',
    name: 'David Kim',
    title: 'DevOps Engineer',
    photo: 'https://i.pravatar.cc/150?img=4',
    score: 0.81,
    topSkills: ['Docker', 'Jenkins', 'AWS', 'Terraform', 'Monitoring'],
    rationaleShort: 'Infrastructure automation specialist with security focus',
    rationaleFull: 'Built CI/CD pipelines that reduced deployment time by 80%. Strong background in infrastructure as code, security best practices, and monitoring systems.',
    skillScore: 0.85,
    networkScore: 0.76,
  },
  {
    id: 'c5',
    name: 'Elena Volkov',
    title: 'Full Stack Developer',
    photo: 'https://i.pravatar.cc/150?img=5',
    score: 0.78,
    topSkills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    rationaleShort: 'Versatile full-stack developer with modern tech stack expertise',
    rationaleFull: 'Built multiple web applications from scratch with focus on performance and user experience. Strong in both frontend and backend development with cloud deployment experience.',
    skillScore: 0.80,
    networkScore: 0.75,
  },
  {
    id: 'c6',
    name: 'Frank Chen',
    title: 'Mobile Developer',
    photo: 'https://i.pravatar.cc/150?img=6',
    score: 0.74,
    topSkills: ['React Native', 'iOS', 'Android', 'Flutter', 'Firebase'],
    rationaleShort: 'Cross-platform mobile development expert',
    rationaleFull: 'Developed mobile apps with millions of downloads. Expert in React Native and native iOS/Android development with focus on performance optimization.',
    skillScore: 0.77,
    networkScore: 0.70,
  },
  {
    id: 'c7',
    name: 'Grace Liu',
    title: 'UX Designer',
    photo: 'https://i.pravatar.cc/150?img=7',
    score: 0.72,
    topSkills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Usability Testing'],
    rationaleShort: 'User-centered design approach with strong research background',
    rationaleFull: 'Led design for products used by millions of users. Strong background in user research, interaction design, and design systems. Excellent collaboration with engineering teams.',
    skillScore: 0.74,
    networkScore: 0.69,
  },
  {
    id: 'c8',
    name: 'Henry Park',
    title: 'Backend Engineer',
    photo: 'https://i.pravatar.cc/150?img=8',
    score: 0.69,
    topSkills: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Microservices'],
    rationaleShort: 'Solid backend engineering skills with enterprise experience',
    rationaleFull: 'Built robust backend systems handling high traffic loads. Experience with database optimization, caching strategies, and microservices architecture.',
    skillScore: 0.71,
    networkScore: 0.66,
  },
  {
    id: 'c9',
    name: 'Iris Wang',
    title: 'QA Engineer',
    photo: 'https://i.pravatar.cc/150?img=9',
    score: 0.67,
    topSkills: ['Selenium', 'Jest', 'API Testing', 'Performance Testing', 'Automation'],
    rationaleShort: 'Comprehensive testing expertise with automation focus',
    rationaleFull: 'Established testing frameworks that improved product quality significantly. Expert in automated testing, performance testing, and quality assurance processes.',
    skillScore: 0.68,
    networkScore: 0.65,
  },
  {
    id: 'c10',
    name: 'Jack Miller',
    title: 'Data Engineer',
    photo: 'https://i.pravatar.cc/150?img=10',
    score: 0.65,
    topSkills: ['Apache Spark', 'Kafka', 'Airflow', 'SQL', 'ETL'],
    rationaleShort: 'Data pipeline specialist with big data experience',
    rationaleFull: 'Built data pipelines processing terabytes of data daily. Strong background in stream processing, data warehousing, and ETL pipeline optimization.',
    skillScore: 0.66,
    networkScore: 0.63,
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
    console.warn('API not available, using CSV data:', error)
    
    // Load candidates from CSV
    const allCandidates = await loadCandidatesFromCSV();
    
    // Filter candidates based on query if provided
    let filteredCandidates = allCandidates;
    if (payload.query) {
      const queryLower = payload.query.toLowerCase();
      filteredCandidates = allCandidates.filter(candidate => {
        const nameMatch = candidate.name.toLowerCase().includes(queryLower);
        const skillMatch = candidate.topSkills.some(skill => 
          skill.toLowerCase().includes(queryLower)
        );
        const roleMatch = candidate.title.toLowerCase().includes(queryLower);
        const unitMatch = candidate.businessUnit?.toLowerCase().includes(queryLower);
        return nameMatch || skillMatch || roleMatch || unitMatch;
      });
    }
    
    // Sort by score and limit results
    const sortedCandidates = filteredCandidates
      .sort((a, b) => b.score - a.score)
      .slice(0, payload.limit);
    
    return { 
      candidates: sortedCandidates, 
      total: sortedCandidates.length 
    };
  }
}

export async function mockGetCandidate(id) {
  try {
    return await requestApi(`/candidates/${encodeURIComponent(id)}`, {
      method: 'GET',
    })
  } catch (error) {
    console.warn('API not available, using CSV data for candidate detail:', error)
    
    // Load candidates from CSV and find the specific candidate
    const allCandidates = await loadCandidatesFromCSV();
    const candidate = allCandidates.find(c => c.id === id);
    
    if (candidate) {
      return candidate;
    }
    
    // Fallback to first candidate if not found
    return allCandidates[0] || sampleCandidates[0];
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

export async function mockGetHighReadinessCandidates() {
  try {
    return await requestApi('/candidates/high-readiness', {
      method: 'GET',
    })
  } catch (error) {
    console.warn('API not available, using CSV data for high-readiness candidates:', error)
    
    // Load candidates from CSV
    const allCandidates = await loadCandidatesFromCSV();
    
    // Sort by score and take top 30%
    const sortedCandidates = allCandidates.sort((a, b) => b.score - a.score);
    const top30PercentCount = Math.ceil(sortedCandidates.length * 0.4);
    const topCandidates = sortedCandidates.slice(0, top30PercentCount);
    
    // Calculate average score
    const averageScore = topCandidates.length > 0 
      ? topCandidates.reduce((sum, c) => sum + c.score, 0) / topCandidates.length
      : 0;
    
    return { 
      candidates: topCandidates, 
      total: topCandidates.length,
      threshold: 0.8,
      averageScore: averageScore
    }
  }
}
