import React from 'react'

export default function Analytics() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">Discovered hidden talent: 32%</div>
        <div className="bg-white p-4 rounded shadow">Avg team build time: 42m</div>
        <div className="bg-white p-4 rounded shadow">Top skills demand</div>
      </div>
    </div>
  )
}
