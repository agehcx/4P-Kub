import React, { useState } from "react";
import SearchInput from "../components/SearchInput";
import ResultCard from "../components/ResultCard";
import { mockSearch } from "../services/mockApi";
import { Link, useNavigate } from "react-router-dom";
import { useWorkflow } from "../contexts/WorkflowContext";

export default function Search() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [teamSize, setTeamSize] = useState("5");
  const [requiredSkills, setRequiredSkills] = useState(
    "Strategy, Data Analysis, ESG"
  );
  const skillSuggestions = [
    'Project Management',
    'Change Management',
    'Stakeholder Engagement',
    'Operational Risk',
    'Data Visualisation',
  ]
  const navigate = useNavigate();
  const { setShortlistGenerated } = useWorkflow();

  async function doSearch(nextQuery) {
    setLoading(true);
    try {
      const response = await mockSearch({
        projectName: nextQuery,
        query: nextQuery,
        requiredSkills,
        teamSize,
      });
      setResults(response?.candidates || []);
    } finally {
      setLoading(false);
    }
  }

  function generateTop30Shortlist() {
    // Save the search parameters for workflow tracking
    const searchParams = {
      projectName: query,
      requiredSkills,
      teamSize,
      timestamp: Date.now()
    };
    
    // Mark that shortlist has been generated
    setShortlistGenerated(null, searchParams);
    
    // Navigate directly to the high-readiness candidates page
    navigate('/high-readiness');
  }

  function handleAddSuggestedSkill(skill) {
    const parsed = requiredSkills
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)

    if (!parsed.includes(skill)) {
      const updated = [...parsed, skill]
      setRequiredSkills(updated.join(', '))
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Step 1: Define Mission */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#0E706F] text-white rounded-full flex items-center justify-center font-bold">
            1
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Define Mission</h2>
            <p className="text-gray-600">
              Set your team objectives and requirements
            </p>
          </div>
        </div>
      </div>

      {/* Mission Parameters */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Project Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Energy Transition Mapping 2030"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Team Size
            </label>
            <input
              type="number"
              min={2}
              max={20}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder='5'
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Required Skills (comma-separated)
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., Strategy, Data Analysis, ESG, Project Management"
            value={requiredSkills}
            onChange={(e) => setRequiredSkills(e.target.value)}
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {skillSuggestions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleAddSuggestedSkill(skill)}
                className="px-3 py-1.5 bg-[#E6F2F2] text-[#0E706F] text-xs font-semibold rounded-full border border-[#0E706F1A] hover:bg-[#C9E5E4] transition-colors"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={generateTop30Shortlist}
          className="w-full px-6 py-4 bg-[#0E706F] text-white rounded-lg font-semibold hover:bg-[#084343] transition-colors shadow-md text-lg flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          Generate Top 30% Shortlist
        </button>
      </div>

      {/* Step 2: Shortlist Results */}
      {(loading || results.length > 0) && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#0E706F] text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Top 30% High-Readiness Candidates
              </h2>
              <p className="text-gray-600">
                AI-ranked based on multi-signal analysis
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-[#0E706F] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-600">
                Analyzing candidates across all signals...
              </p>
              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                  Skills
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                  KPIs
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                  Projects
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                  360 Feedback
                </span>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">
                  Interests
                </span>
                <span className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-full">
                  Availability
                </span>
              </div>
            </div>
          </div>
        )}
        {!loading && results.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-[#0E706F]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Ready to Generate Shortlist
            </h3>
            <p className="text-gray-600 mb-4">
              Fill in the mission parameters above and click "Generate Top 30%
              Shortlist"
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Multi-hop graph traversal</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Composite scoring</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Explainable AI</span>
              </div>
            </div>
          </div>
        )}
        {!loading && results.length > 0 && (
          <div className="space-y-4 mb-8">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Shortlist Generated
                    </h4>
                    <p className="text-sm text-gray-600">
                      {results.length} high-readiness candidates identified
                    </p>
                  </div>
                </div>
                <Link
                  to="/team"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  Proceed to Team Builder
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            {results.map((candidate) => (
              <ResultCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
