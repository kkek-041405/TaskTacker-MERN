import React from 'react';

function Home({ stats, onGoToDashboard }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-600 text-white font-bold text-xl mb-3">
            TT
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Task Tracker</h1>
          <p className="mt-2 text-slate-600">
            A simple task management board. Your data is stored locally in your browser.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center">
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Tasks</span>
            <strong className="block mt-1 text-2xl font-bold text-slate-900">{stats.total}</strong>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-center">
            <span className="block text-xs font-semibold text-amber-600 uppercase tracking-wider">To Do</span>
            <strong className="block mt-1 text-2xl font-bold text-amber-900">{stats.todo}</strong>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
            <span className="block text-xs font-semibold text-blue-600 uppercase tracking-wider">In Progress</span>
            <strong className="block mt-1 text-2xl font-bold text-blue-900">{stats.inProgress}</strong>
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 text-center">
            <span className="block text-xs font-semibold text-emerald-600 uppercase tracking-wider">Completed</span>
            <strong className="block mt-1 text-2xl font-bold text-emerald-900">{stats.done}</strong>
          </div>
        </div>

        {/* Completion Progress */}
        <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Completion Rate</span>
            <span className="text-sm font-bold text-slate-900">{stats.completionRate}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${stats.completionRate}%` }}
            ></div>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button 
            type="button" 
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={onGoToDashboard}
          >
            Enter Task Board
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;