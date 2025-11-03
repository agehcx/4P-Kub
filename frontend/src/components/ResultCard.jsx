import React from "react";
import { Link } from "react-router-dom";

export default function ResultCard({ candidate }) {
  const score = (candidate.score * 100).toFixed(0);
  const scoreColor =
    score >= 80
      ? "bg-green-600"
      : score >= 60
      ? "bg-indigo-600"
      : "bg-gray-500";

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-[#24B4B2] hover:shadow-md transition-all">
      <div className="flex items-start gap-5">
        <img
          src={candidate.photo || "https://i.pravatar.cc/103"}
          alt="avatar"
          className="w-20 h-20 rounded-lg object-cover border-2 border-gray-100"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <Link
                to={`/candidates/${candidate.id}`}
                className="text-xl font-semibold text-gray-900 hover:text-[#0E706F] transition-colors block truncate"
              >
                {candidate.name}
              </Link>
              <div className="text-gray-600 mt-1">
                {candidate.title || "No title specified"}
              </div>
            </div>

            
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {(candidate.topSkills || []).slice(0, 5).map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-[#E8F0F0] text-[#0E706F] rounded-md text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          {candidate.rationaleShort && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {candidate.rationaleShort}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
