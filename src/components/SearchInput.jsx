import React from 'react'

export default function SearchInput({ value, onChange, onSearch }) {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <div className="flex gap-3 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
            <div className="relative flex-1">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          aria-label="Search candidates"
          className="flex-1 py-3 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search by role, skills, or paste job description..."
        />
      </div>
      <button 
        className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  )
}
