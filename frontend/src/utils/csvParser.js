// Utility to parse CSV data and convert to candidate format
export function parseCSVToCandidates(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim());
  
  // Find the header line - look for the line containing EmployeeID
  let headerLine = '';
  let dataStartIndex = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Look for the line that contains EmployeeID and other expected columns
    if (line.includes('EmployeeID') || line.includes('Name') || line.includes('BusinessUnit')) {
      headerLine = line;
      dataStartIndex = i + 1;
      break;
    }
  }
  
  if (!headerLine) {
    throw new Error('Could not find CSV header');
  }
  
  // Parse header - handle the leading comma
  let headers = headerLine.split(',').map(h => h.trim());
  
  // Remove empty first column if present
  if (headers[0] === '' || headers[0] === undefined) {
    headers = headers.slice(1);
  }
  
  const candidates = [];
  
  // Parse data rows
  for (let i = dataStartIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line === ',,,,,,,,,,,,') continue;
    
    const values = parseCSVLine(line);
    
    // Remove the first empty value if it exists (to match header adjustment)
    let adjustedValues = values;
    if (values[0] === '' || values[0] === undefined) {
      adjustedValues = values.slice(1);
    }
    
    if (adjustedValues.length < headers.length) continue;
    
    const row = {};
    headers.forEach((header, index) => {
      row[header] = adjustedValues[index] || '';
    });
    
    // Skip empty rows
    if (!row.EmployeeID || !row.Name || row.EmployeeID.trim() === '') continue;
    
    // Convert to candidate format
    const candidate = convertRowToCandidate(row);
    if (candidate) {
      candidates.push(candidate);
    }
  }
  
  return candidates;
}

function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  values.push(current.trim());
  return values;
}

function convertRowToCandidate(row) {
  try {
    // Extract skills from the Skills column
    const skillsText = row.Skills || '';
    const skills = skillsText.split(',').map(s => s.trim()).filter(s => s);
    
    // Calculate a composite score based on personality traits and role
    const oScore = parseFloat(row.O_Score) || 0;
    const cScore = parseFloat(row.C_Score) || 0;
    const eScore = parseFloat(row.E_Score) || 0;
    const aScore = parseFloat(row.A_Score) || 0;
    const nScore = parseFloat(row.N_Score) || 0;
    
    // Normalize scores (assuming they're on 1-5 scale)
    const normalizedScores = {
      o: oScore / 5,
      c: cScore / 5,
      e: eScore / 5,
      a: aScore / 5,
      n: nScore / 5
    };
    
    // Calculate composite score (higher C, E, A and lower N typically indicate better performance)
    const compositeScore = (
      normalizedScores.o * 0.2 +
      normalizedScores.c * 0.3 +
      normalizedScores.e * 0.2 +
      normalizedScores.a * 0.2 +
      (1 - normalizedScores.n) * 0.1
    );
    
    // Estimate years of experience based on role
    const yearsExp = estimateExperience(row.Role || '');
    
    // Create rationale
    const rationaleShort = `${skills.length > 0 ? skills.length + ' key skills' : 'Diverse background'} with ${yearsExp} years experience in ${row.BusinessUnit || 'various domains'}`;
    
    const rationaleFull = `${row.Name} works in ${row.BusinessUnit} as ${row.Role}. ` +
      `Key skills: ${skills.slice(0, 3).join(', ')}. ` +
      `Past projects: ${row.PastProjects || 'Various initiatives'}. ` +
      `Performance: ${row.PerformanceReviewSummary || 'Strong contributor'}`;
    
    return {
      id: row.EmployeeID,
      name: row.Name,
      title: row.Role || 'Team Member',
      photo: `https://i.pravatar.cc/150?u=${row.EmployeeID}`,
      score: Math.max(0.3, Math.min(1.0, compositeScore + Math.random() * 0.1)), // Add slight randomization
      skillScore: Math.min(1.0, skills.length / 10), // Normalize based on skill count
      networkScore: normalizedScores.e * normalizedScores.a, // Extraversion * Agreeableness
      semanticScore: normalizedScores.o, // Openness as creativity/learning
      coverageNice: Math.random() * 0.3 + 0.2, // Random nice-to-have coverage
      yearsExperience: yearsExp,
      topSkills: skills.slice(0, 6),
      canonicalSkills: skills,
      businessUnit: row.BusinessUnit,
      pastProjects: row.PastProjects,
      rationaleShort,
      rationaleFull,
      personality: {
        O: normalizedScores.o,
        C: normalizedScores.c,
        E: normalizedScores.e,
        A: normalizedScores.a,
        N: normalizedScores.n
      }
    };
  } catch (error) {
    console.warn('Error converting row to candidate:', error, row);
    return null;
  }
}

function estimateExperience(role) {
  const roleLower = role.toLowerCase();
  if (roleLower.includes('head') || roleLower.includes('director') || roleLower.includes('chief')) {
    return 15;
  }
  if (roleLower.includes('senior') || roleLower.includes('sr.')) {
    return 8;
  }
  if (roleLower.includes('manager') || roleLower.includes('lead')) {
    return 6;
  }
  if (roleLower.includes('specialist') || roleLower.includes('analyst') || roleLower.includes('engineer')) {
    return 4;
  }
  if (roleLower.includes('junior') || roleLower.includes('jr.')) {
    return 2;
  }
  return 5; // Default
}
