import { useState } from 'react';

export default function HireForm() {
  const [hireType, setHireType] = useState('freelancer');
  const [projectSize, setProjectSize] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [scopeOfWork, setScopeOfWork] = useState('');

  return (
    <div className="max-w-2xl p-6 bg-white">
      {/* Hire type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Hire type
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setHireType('freelancer')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              hireType === 'freelancer'
                ? 'bg-purple-100 text-purple-700 border border-purple-300'
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
            }`}
          >
            Freelancer
          </button>
          <button
            onClick={() => setHireType('contractor')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              hireType === 'contractor'
                ? 'bg-purple-100 text-purple-700 border border-purple-300'
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
            }`}
          >
            Contractor
          </button>
        </div>
      </div>

      {/* Project size and Job role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project size
          </label>
          <input
            type="text"
            placeholder="Placeholder"
            value={projectSize}
            onChange={(e) => setProjectSize(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job role
          </label>
          <div className="relative">
            <select
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
            >
              <option value="">Select--</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Scope of work */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Scope of work
          </label>
          <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
            Select
          </button>
        </div>
        <textarea
          placeholder="Select--"
          value={scopeOfWork}
          onChange={(e) => setScopeOfWork(e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        />
      </div>
    </div>
  );
}