import React from 'react'

export default function Landing() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Projects / Hiring Initiatives</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">No projects yet — click New Search</div>
        <div className="p-4 bg-white rounded shadow">Example: Data Science Hiring — Open</div>
      </div>
    </div>
  )
}
