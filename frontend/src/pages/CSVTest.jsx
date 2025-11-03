import React, { useEffect, useState } from 'react'
import { parseCSVToCandidates } from '../utils/csvParser'

export default function CSVTest() {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [csvText, setCsvText] = useState('')

  useEffect(() => {
    const testCSV = async () => {
      try {
        console.log('Fetching CSV...')
        const response = await fetch('/candidates.csv')
        if (!response.ok) {
          throw new Error('Failed to fetch CSV: ' + response.status)
        }
        const text = await response.text()
        setCsvText(text.substring(0, 1000) + '...') // First 1000 chars for display
        
        console.log('CSV fetched, parsing...')
        const parsed = parseCSVToCandidates(text)
        setCandidates(parsed)
        console.log('Candidates parsed:', parsed.length)
      } catch (err) {
        console.error('Error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    testCSV()
  }, [])

  if (loading) return <div className="p-8">Loading CSV...</div>
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CSV Test Page</h1>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">CSV Preview (first 1000 chars):</h2>
        <pre className="bg-gray-100 p-4 text-xs overflow-auto max-h-40">{csvText}</pre>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Parsed Candidates: {candidates.length}</h2>
      </div>

      <div className="grid gap-4">
        {candidates.slice(0, 5).map(candidate => (
          <div key={candidate.id} className="border p-4 rounded">
            <div className="font-semibold">{candidate.name}</div>
            <div className="text-sm text-gray-600">{candidate.title}</div>
            <div className="text-sm">{candidate.businessUnit}</div>
            <div className="text-sm">Score: {(candidate.score * 100).toFixed(0)}%</div>
            <div className="text-sm">Skills: {candidate.topSkills.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
