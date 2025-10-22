import React, { useState } from 'react'
import SearchInput from '../components/SearchInput'
import ResultCard from '../components/ResultCard'
import { mockSearch } from '../services/mockApi'

export default function Search() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  async function doSearch(nextQuery) {
    setLoading(true)
    const response = await mockSearch({ query: nextQuery })
    setResults(response.candidates)
    setLoading(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search / Discovery</h2>
      <SearchInput value={query} onChange={setQuery} onSearch={() => doSearch(query)} />

      <div className="mt-4">
        {loading && <div>Loading...</div>}
        {!loading && results.length === 0 && <div className="text-sm text-gray-600">No results</div>}
        <div className="space-y-3 mt-2">
          {results.map((candidate) => (
            <ResultCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </div>
    </div>
  )
}
