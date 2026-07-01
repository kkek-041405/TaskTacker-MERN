import React from 'react';

function Dashboard({ 
  stats, 
  removeTask, 
  updateTaskStatus, 
  visibleTasks, 
  filter, 
  setFilter, 
  searchTerm, 
  setSearchTerm, 
  onAddTask,
  setTasks
}) {
  const statusOptions = ['All', 'Todo', 'In Progress', 'Done'];

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-emerald-100 text-emerald-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Todo':
      default:
        return 'bg-amber-100 text-amber-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Task Board</h1>
            <p className="text-slate-600 mt-1">
              Manage your project tasks and track progress.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="w-full sm:w-64 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Add Task Button */}
            <button
              type="button"
              onClick={onAddTask}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-lg shadow-sm text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add New Task
            </button>
          </div>
        </header>

        {/* Simple Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Tasks</span>
            <div className="text-xl font-bold text-slate-900 mt-1">{stats.total}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase">To Do</span>
            <div className="text-xl font-bold text-slate-900 mt-1">{stats.todo}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase">In Progress</span>
            <div className="text-xl font-bold text-slate-900 mt-1">{stats.inProgress}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 uppercase">Completed</span>
            <div className="text-xl font-bold text-slate-900 mt-1">{stats.done}</div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="border-b border-slate-200 mb-6">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {statusOptions.map((statusOption) => {
              const isActive = filter === statusOption;
              return (
                <button
                  key={statusOption}
                  type="button"
                  onClick={() => setFilter(statusOption)}
                  className={`
                    py-4 px-1 border-b-2 font-medium text-sm transition-all focus:outline-none
                    ${isActive 
                      ? 'border-indigo-600 text-indigo-600' 
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }
                  `}
                >
                  {statusOption === 'All' ? 'All Tasks' : statusOption}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tasks List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleTasks.length ? (
            visibleTasks.map((task) => (
              
              <article 
                key={task._id} 
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Card Header Info */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getStatusClass(task.status)}`}>
                        {task.status}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${getPriorityClass(task.priority)}`}>
                        {task.priority} Priority
                      </span>
                    </div>
                    
                    <button
                      type="button"


                      onClick={() => {
                        removeTask(task._id); 
                        setTasks((currentTasks) => currentTasks.filter((t) => t._id !== task._id));}}
                      className="text-xs font-semibold text-red-600 hover:text-red-800 transition-colors focus:outline-none"
                    >
                      Delete
                    </button>
                  </div>

                  {/* Task Content */}
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">{task.title}</h3>
                  <p className="text-slate-600 text-sm mt-2 whitespace-pre-wrap">
                    {task.note || 'No description provided.'}
                  </p>
                </div>

                {/* Card Footer Actions */}
                <div className="border-t border-slate-100 mt-6 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    📅 Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                  </span>

                  <div className="flex flex-wrap gap-2">
                    {statusOptions
                      .filter((option) => option !== 'All' && option !== task.status)
                      .map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            updateTaskStatus(task._id, option);
                            setTasks((currentTasks) => 
                              currentTasks.map((t) => 
                                t._id === task._id ? { ...t, status: option } : t
                              )
                            );
                          }}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded transition-colors focus:outline-none"
                        >
                          Move to {option}
                        </button>
                      ))}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full bg-white border border-slate-200 rounded-xl p-12 text-center shadow-xs">
              <span className="text-3xl">📭</span>
              <h3 className="text-lg font-bold text-slate-900 mt-3">No tasks found</h3>
              <p className="text-slate-500 text-sm mt-1">
                Try adjustment of filters/search query, or add a new task.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;