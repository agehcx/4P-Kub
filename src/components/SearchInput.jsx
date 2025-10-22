import React from 'react'

export default function SearchInput({ value, onChange, onSearch }) {
  return (
    <div className="flex gap-2">
      <input
        aria-label="Search candidates"
        className="flex-1 p-2 border rounded"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by role, skills, or paste JD..."
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={onSearch}>
        Search
      </button>
    </div>
  )
}
